import { PatientProfile, RiskTier, TriageResult, EscalationAction, SafetyAlert } from '../types/ncd';

export function calculateNcdTriage(patient: PatientProfile): TriageResult {
  const {
    age,
    isSmoker,
    isFrail,
    sbp,
    dbp,
    hasDm,
    dmDurationOver10,
    hba1c,
    tc,
    ldl,
    tg,
    egfr,
    uacr,
    k,
    hasAscvd,
    hasRecurrentAscvd,
    hasHf,
    hasTod,
  } = patient;

  // 1. RISK STRATIFICATION ALGORITHM (CPG Dyslipidemia 2023 & CPG HTN 2026)
  let riskTier: RiskTier = 'Moderate';
  let badgeClass = 'bg-sky-600 text-white';
  let riskTierReason = '';

  const isExtreme =
    hasAscvd &&
    (hasRecurrentAscvd || (hasDm && (egfr < 60 || uacr !== 'a1')) || egfr < 30 || ldl >= 4.9);

  const isVeryHigh =
    hasAscvd ||
    (hasDm && (hasTod || uacr !== 'a1' || egfr < 60)) ||
    egfr < 30 ||
    hasHf;

  const isHigh =
    (hasDm && (dmDurationOver10 || isSmoker || sbp >= 140)) ||
    (egfr >= 30 && egfr < 60) ||
    ldl >= 4.9 ||
    sbp >= 180 ||
    tc >= 8.0;

  if (isExtreme) {
    riskTier = 'Extreme';
    badgeClass = 'bg-purple-800 text-white';
    riskTierReason =
      'Extreme Risk: Established ASCVD with recurrent event (<2y), severe CKD (eGFR <30), or combined ASCVD + T2DM with albuminuria/CKD.';
  } else if (isVeryHigh) {
    riskTier = 'Very High';
    badgeClass = 'bg-rose-700 text-white';
    riskTierReason =
      'Very High Risk: Documented ASCVD, T2DM with microvascular target organ damage (TOD/albuminuria/eGFR <60), or Heart Failure.';
  } else if (isHigh) {
    riskTier = 'High';
    badgeClass = 'bg-amber-600 text-white';
    riskTierReason =
      'High Risk: T2DM with duration >=10 yrs or cardiovascular risk factors, moderate CKD (eGFR 30–59), or severe single risk factor.';
  } else if (hasDm) {
    riskTier = 'Moderate';
    badgeClass = 'bg-emerald-600 text-white';
    riskTierReason =
      'Moderate Risk: Young T2DM (<40 yrs) of short duration (<10 yrs) without microvascular target organ damage or other major risk factors.';
  } else {
    riskTier = 'Low';
    badgeClass = 'bg-slate-600 text-white';
    riskTierReason = 'Low Risk: Non-diabetic without major organ damage or high calculated CV risk.';
  }

  // 2. TARGET CALCULATION & GAP ANALYSIS
  // Blood Pressure Target
  let targetSbp = 130;
  let targetDbp = 80;
  let goalBpText = '< 130 / 80 mmHg';

  if (isFrail || (age >= 65 && !hasDm && !hasAscvd)) {
    targetSbp = 140;
    targetDbp = 90;
    goalBpText = '< 140 / 90 mmHg (Frail/Elderly Target)';
  } else if (hasAscvd) {
    goalBpText = '< 130 / 80 mmHg (Maintain DBP >= 60)';
  }

  const isBpOffTarget = sbp >= targetSbp || dbp >= targetDbp;
  let gapBp = 'At Target ✓';
  if (isBpOffTarget) {
    const sbpDiff = sbp - targetSbp;
    const dbpDiff = dbp - targetDbp;
    gapBp = `Off Target (+${Math.max(0, sbpDiff)} / +${Math.max(0, dbpDiff)} mmHg)`;
  }

  // LDL-C Target
  let targetLdl = 2.6;
  let goalLdlText = '< 2.6 mmol/L';

  if (riskTier === 'Extreme') {
    targetLdl = 1.0;
    goalLdlText = '< 1.0 mmol/L (≥50% reduction)';
  } else if (riskTier === 'Very High') {
    targetLdl = 1.4;
    goalLdlText = '< 1.4 mmol/L (≥50% reduction)';
  } else if (riskTier === 'High') {
    targetLdl = 1.8;
    goalLdlText = '< 1.8 mmol/L (≥50% reduction)';
  } else if (riskTier === 'Low') {
    targetLdl = 3.0;
    goalLdlText = '< 3.0 mmol/L';
  }

  const isLdlOffTarget = ldl > targetLdl;
  let gapLdl = 'At Target ✓';
  if (isLdlOffTarget) {
    const ldlDiff = (ldl - targetLdl).toFixed(1);
    gapLdl = `Off Target (+${ldlDiff} mmol/L above target)`;
  }

  // HbA1c Target
  let targetHba1c = 7.0;
  let goalHba1cText = '6.6 – 7.0 % (Standard)';

  if (isFrail || (hasAscvd && age >= 65)) {
    targetHba1c = 8.0;
    goalHba1cText = '7.1 – 8.0 % (Individualized / Frail / High Hypo Risk)';
  } else if (!hasAscvd && age < 45 && !dmDurationOver10) {
    targetHba1c = 6.5;
    goalHba1cText = '≤ 6.5 % (Stringent - Young / Short Duration)';
  }

  let isHba1cOffTarget = false;
  let gapHba1c = 'Non-Diabetic';

  if (hasDm) {
    isHba1cOffTarget = hba1c > targetHba1c;
    if (isHba1cOffTarget) {
      const a1cDiff = (hba1c - targetHba1c).toFixed(1);
      gapHba1c = `Off Target (+${a1cDiff}%)`;
    } else {
      gapHba1c = 'At Target ✓';
    }
  }

  // 3. SAFETY ALERTS
  const safetyAlerts: SafetyAlert[] = [];

  // TG >= 5.6 Pancreatitis Risk
  if (tg >= 5.6) {
    safetyAlerts.push({
      id: 'alert-pancreatitis',
      type: 'danger',
      title: 'ACUTE PANCREATITIS RED FLAG (TG ≥ 5.6 mmol/L)',
      message: `Fasting Triglycerides are critically elevated at ${tg} mmol/L. Primary goal is preventing acute pancreatitis. Urgently eliminate refined carbohydrates/sweetened condensed milk and initiate Fenofibrate 145 mg daily before addressing LDL-C targets.`,
    });
  }

  // Potassium Red Flag
  if (k >= 5.5) {
    safetyAlerts.push({
      id: 'alert-hyperkalemia',
      type: 'danger',
      title: 'HYPERKALEMIA ALERT (K+ ≥ 5.5 mmol/L)',
      message: `Serum Potassium is ${k} mmol/L. Perform STAT 12-lead ECG. Temporarily withhold RAAS blockers (ACEi, ARBs, MRAs) and restrict potassium-rich foods (bananas, dates, herbal brews). If K+ > 6.0 or ECG changes present, transfer to Emergency Department for IV Calcium Gluconate and Insulin-Dextrose.`,
    });
  }

  // Metformin eGFR contraindication
  if (hasDm && egfr < 30) {
    safetyAlerts.push({
      id: 'alert-metformin-contraindicated',
      type: 'danger',
      title: 'METFORMIN CONTRAINDICATED (eGFR < 30 mL/min)',
      message: `Current eGFR is ${egfr} mL/min/1.73m². Metformin must be discontinued immediately due to significant risk of Metformin-Associated Lactic Acidosis (MALA). Switch to non-renally cleared DPP-4 inhibitor (Linagliptin 5 mg) or Basal Insulin.`,
    });
  } else if (hasDm && egfr < 45) {
    safetyAlerts.push({
      id: 'alert-metformin-dose-cap',
      type: 'warning',
      title: 'METFORMIN DOSE CAP (eGFR 30–44 mL/min)',
      message: `Current eGFR is ${egfr} mL/min/1.73m². Cap maximum Metformin dose at 1,000 mg daily (e.g. 500 mg BD) and recheck renal profile every 3 months.`,
    });
  }

  // Coronary DBP warning
  if (hasAscvd && dbp < 60) {
    safetyAlerts.push({
      id: 'alert-cad-dbp',
      type: 'warning',
      title: 'CORONARY PERFUSION ALERT (DBP < 60 mmHg in CAD)',
      message: `Diastolic BP is ${dbp} mmHg. In patients with established coronary artery disease, excessive DBP reduction below 60 mmHg impairs myocardial perfusion and increases ischemic events (J-curve phenomenon). De-escalate antihypertensives cautiously.`,
    });
  }

  // 4. ESCALATION ACTIONS & PHARMACOTHERAPY
  const escalationActions: EscalationAction[] = [];

  // Pancreatitis First Priority
  if (tg >= 5.6) {
    escalationActions.push({
      id: 'act-fibrate',
      category: 'urgent',
      title: 'Pancreatitis Prevention: Initiate Fenofibrate 145 mg Daily',
      description:
        'Withhold LDL escalation until TG is brought under control below 5.6 mmol/L. Counsel on strict avoidance of high-glycemic foods, alcohol, and sweetened condensed milk.',
      cpgReference: 'CPG Dyslipidemia (6th Ed, 2023) Section 4.5',
      badge: 'Priority 1',
      level: 'warning',
    });
  }

  // Organ Protection for T2DM
  if (hasDm) {
    const needsCardiorenalProtection = hasAscvd || hasHf || egfr < 60 || uacr !== 'a1';
    if (needsCardiorenalProtection) {
      let organReasons = [];
      if (hasAscvd) organReasons.push('Established ASCVD');
      if (hasHf) organReasons.push('Heart Failure');
      if (egfr < 60 || uacr !== 'a1') organReasons.push('DKD / Albuminuria (eGFR ' + egfr + ', UACR ' + uacr.toUpperCase() + ')');

      escalationActions.push({
        id: 'act-sglt2i',
        category: 'organ',
        title: 'Initiate SGLT2 Inhibitor with Proven Cardiorenal Benefit',
        description: `Prescribe Empagliflozin 10–25 mg OM or Dapagliflozin 10 mg OM. Indicated for ${organReasons.join(
          ', '
        )} regardless of baseline HbA1c to reduce cardiovascular death, HF hospitalization, and CKD progression down to eGFR 20 mL/min.`,
        cpgReference: 'CPG T2DM (6th Ed) & CPG DKD / Cardiorenal Axis',
        badge: 'Class 1A',
        level: 'essential',
      });

      if (hasAscvd && !hasHf) {
        escalationActions.push({
          id: 'act-glp1ra',
          category: 'organ',
          title: 'Consider GLP-1 Receptor Agonist for ASCVD Secondary Prevention',
          description:
            'Dulaglutide (0.75–1.5 mg weekly SC) or Semaglutide (0.25–1.0 mg weekly SC) provides potent MACE reduction and significant weight loss benefits in patients with established vascular disease.',
          cpgReference: 'CPG T2DM (6th Ed) Chapter 5',
          badge: 'Class 1A',
          level: 'recommended',
        });
      }
    }

    // Glycemic agent adjustment based on eGFR
    if (egfr < 30) {
      escalationActions.push({
        id: 'act-linagliptin',
        category: 'dm',
        title: 'Switch to Linagliptin 5 mg Daily (No Renal Adjustment Needed)',
        description:
          'Because eGFR is <30 mL/min, DPP-4 inhibitor Linagliptin 5 mg daily is safe and effective as it is 95% eliminated via biliary route without requiring dose titration down to end-stage kidney disease.',
        cpgReference: 'CPG T2DM (6th Ed) Table 6.3 - Renal Dosing',
        badge: 'Renal Safe',
        level: 'essential',
      });
    } else if (hba1c > targetHba1c) {
      escalationActions.push({
        id: 'act-metformin-opt',
        category: 'dm',
        title: 'Optimize Baseline Metformin & Dual Therapy',
        description: `Current HbA1c is ${hba1c}% (Goal: ${goalHba1cText}). Titrate Metformin up to ${
          egfr < 45 ? '1,000 mg/day max' : '2,000 mg/day'
        } with meals. If already on maximum tolerated dose, add SGLT2i or DPP-4i.`,
        cpgReference: 'CPG T2DM (6th Ed) Stepwise Therapy',
        level: 'recommended',
      });
    }
  }

  // Hypertension Escalation
  if (isBpOffTarget || sbp >= 140 || dbp >= 90) {
    if (hasDm || uacr !== 'a1' || egfr < 60) {
      escalationActions.push({
        id: 'act-raas-blocker',
        category: 'htn',
        title: 'Mandatory ACE-Inhibitor or ARB for Cardiorenal Protection',
        description:
          'Initiate Perindopril 4–8 mg OM or Telmisartan 40–80 mg / Losartan 50–100 mg OM. Indispensable for reducing intraglomerular pressure and attenuating albuminuria. Check serum creatinine and K+ at 2–4 weeks.',
        cpgReference: 'CPG Hypertension (6th Ed, 2026) Chapter 6',
        badge: 'Compelling Indication',
        level: 'essential',
      });
    }

    if (sbp >= 150 || (sbp - targetSbp >= 20)) {
      escalationActions.push({
        id: 'act-spc',
        category: 'htn',
        title: 'Upfront Single-Pill Combination (SPC): A+C or A+D',
        description:
          'Baseline BP is >=20 mmHg above target. CPG HTN 2026 strongly recommends starting dual fixed-dose combination therapy: A+C (ACEi/ARB + Amlodipine 5mg) or A+D (ACEi/ARB + Indapamide SR 1.5mg) for rapid, synergistic blood pressure normalization and enhanced compliance.',
        cpgReference: 'CPG Hypertension (6th Ed, 2026) Algorithm 1',
        badge: 'CPG 2026 Update',
        level: 'essential',
      });
    } else {
      escalationActions.push({
        id: 'act-htn-addon',
        category: 'htn',
        title: 'Add Dihydropyridine CCB (Amlodipine 5 mg)',
        description:
          'Add Amlodipine 5 mg OM to RAAS blockade to achieve the target BP < 130/80 mmHg without causing renal hemodynamics deterioration.',
        cpgReference: 'CPG Hypertension (6th Ed, 2026)',
        level: 'recommended',
      });
    }
  }

  // Dyslipidemia Escalation
  if (riskTier === 'Extreme' || riskTier === 'Very High' || riskTier === 'High') {
    escalationActions.push({
      id: 'act-statin-high',
      category: 'dlp',
      title: 'High-Intensity Statin Therapy Upfront',
      description:
        'Initiate Atorvastatin 40–80 mg daily or Rosuvastatin 20–40 mg daily. High-intensity statin produces >=50% LDL-C reduction necessary for high and very high cardiovascular risk cohorts.',
      cpgReference: 'CPG Dyslipidemia (6th Ed, 2023) Section 4.1',
      badge: 'High-Intensity',
      level: 'essential',
    });

    if (isLdlOffTarget) {
      escalationActions.push({
        id: 'act-ezetimibe',
        category: 'dlp',
        title: 'Early Add-On: Ezetimibe 10 mg Daily',
        description: `Current LDL-C is ${ldl} mmol/L (Goal: ${goalLdlText}). If patient is already taking statin or remains above target at 4–12 weeks follow-up, add Ezetimibe 10 mg daily for an additional 15–20% LDL reduction.`,
        cpgReference: 'CPG Dyslipidemia (6th Ed, 2023) Table 4.2',
        badge: 'Combination Lipid Lowering',
        level: 'recommended',
      });
    }
  }

  // Check if SADMANS is active
  const sadmansActive = hasDm || sbp >= 130 || egfr < 60;

  return {
    riskTier,
    riskTierBadgeClass: badgeClass,
    riskTierReason,
    goalBp: goalBpText,
    targetSbp,
    targetDbp,
    gapBp,
    isBpOffTarget,
    goalLdl: goalLdlText,
    targetLdl,
    gapLdl,
    isLdlOffTarget,
    goalHba1c: goalHba1cText,
    targetHba1c,
    gapHba1c,
    isHba1cOffTarget,
    escalationActions,
    safetyAlerts,
    sadmansActive,
  };
}
