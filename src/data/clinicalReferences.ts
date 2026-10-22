export interface LabReferenceItem {
  investigation: string;
  normalRange: string;
  ncdTargetRange: string;
  redFlagTrigger: string;
  gpAction: string;
  specialistReferral: string;
}

export const LAB_REFERENCE_DATA: LabReferenceItem[] = [
  {
    investigation: 'Blood Pressure (BP)',
    normalRange: '< 120/80 mmHg',
    ncdTargetRange: '< 130/80 mmHg (DM / CKD / ASCVD); < 140/90 mmHg (Frail Elderly)',
    redFlagTrigger: '≥ 180/110 mmHg (Hypertensive Crisis) OR DBP < 60 mmHg in CAD',
    gpAction:
      'If ≥180/110: Screen immediately for acute target organ damage (chest pain, focal neurological deficits, acute pulmonary edema). Initiate Single-Pill Combination A+C or A+D. Avoid lowering DBP <60 in CAD to protect coronary perfusion.',
    specialistReferral:
      'Refer to Emergency Department if BP ≥180/110 with acute symptoms (hypertensive emergency). Refer to Cardiology / FMS if resistant hypertension (uncontrolled on 3 drugs including a diuretic).',
  },
  {
    investigation: 'LDL-Cholesterol (LDL-C)',
    normalRange: '< 3.0 mmol/L',
    ncdTargetRange: 'Extreme: < 1.0; Very High: < 1.4; High: < 1.8; Moderate: < 2.6 mmol/L (≥50% reduction)',
    redFlagTrigger: 'LDL-C ≥ 4.9 mmol/L (Severe Hypercholesterolemia / Possible FH)',
    gpAction:
      'High-intensity Statin (Atorvastatin 40–80mg or Rosuvastatin 20–40mg) upfront. If not at target in 4–12 weeks, add Ezetimibe 10mg daily. Cascade screen 1st-degree relatives if LDL ≥ 4.9.',
    specialistReferral:
      'Refer to Lipid Clinic / Cardiologist if LDL remains >2.6 despite dual high-intensity statin + ezetimibe, or for PCSK9 inhibitor evaluation in Extreme Risk.',
  },
  {
    investigation: 'Fasting Triglycerides (TG)',
    normalRange: '< 1.7 mmol/L',
    ncdTargetRange: '< 1.7 mmol/L (Borderline high: 1.7 – 2.2 mmol/L)',
    redFlagTrigger: 'TG ≥ 5.6 mmol/L (Risk of Acute Pancreatitis); Extreme ≥ 10.0 mmol/L',
    gpAction:
      'PRIORITY 1 IS PANCREATITIS PREVENTION: Stop all simple sugars, sweet drinks (teh tarik, cordials), and alcohol. Initiate Fenofibrate 145mg daily before focusing on LDL. Re-check fasting lipids in 4 weeks.',
    specialistReferral:
      'Immediate hospital referral if acute epigastric pain radiating to back with vomiting (suspected pancreatitis). Refer to Endocrinologist for refractory chylomicronemia.',
  },
  {
    investigation: 'Glycated Hemoglobin (HbA1c)',
    normalRange: '< 5.7 % (Normal); 5.7 – 6.2 % (Prediabetes)',
    ncdTargetRange: 'Standard: 6.6 – 7.0 %; Young/New: ≤ 6.5 %; Frail Elderly: 7.1 – 8.0 %',
    redFlagTrigger: 'HbA1c > 10.0 % with rapid weight loss, ketonuria, or symptomatic polyuria',
    gpAction:
      'Indicates severe insulin deficiency or severe glucotoxicity. Initiate Basal Insulin (Glargine or Degludec) or combine Metformin + SGLT2i + DPP4i. In frail elderly with frequent hypoglycemia, de-escalate sulfonylureas to prevent falls.',
    specialistReferral:
      'Refer to Diabetes Nurse Educator & FMS for insulin titration or when secondary diabetes is suspected.',
  },
  {
    investigation: 'Estimated GFR (eGFR, CKD-EPI)',
    normalRange: '≥ 90 mL/min/1.73m²',
    ncdTargetRange: 'Maintain stable renal function; delay progression to ESRD',
    redFlagTrigger: 'eGFR < 30 mL/min (CKD 4-5) OR rapid decline > 5 mL/min/year (or >25% baseline drop)',
    gpAction:
      'DISCONTINUE METFORMIN if eGFR < 30 (lactic acidosis risk). Cap Metformin at 1,000mg/day if eGFR 30–44. SGLT2i (Empagliflozin/Dapagliflozin) can be initiated down to eGFR 20 and continued until dialysis for cardiorenal protection. Switch to Linagliptin 5mg.',
    specialistReferral:
      'Mandatory Nephrology referral if eGFR < 30 mL/min, rapid unexplained eGFR drop (>25%), or refractory hypertension.',
  },
  {
    investigation: 'Urine Albumin-to-Creatinine Ratio (UACR)',
    normalRange: '< 3.0 mg/mmol (A1: Normal)',
    ncdTargetRange: 'Aim for regression to A1 or at least 30-50% reduction from baseline',
    redFlagTrigger: 'UACR > 30.0 mg/mmol (A3: Macroalbuminuria / Overt Nephropathy)',
    gpAction:
      'Initiate and titrate ACE-inhibitor (Perindopril) or ARB (Telmisartan) to maximum tolerated dose. Combine with SGLT2 inhibitor (Dapagliflozin/Empagliflozin) for synergistic antiproteinuric and nephroprotective benefit.',
    specialistReferral:
      'Refer to Nephrology if macroscopic hematuria present, rapidly escalating proteinuria, or nephrotic-range proteinuria (>300 mg/mmol).',
  },
  {
    investigation: 'Serum Potassium (K+)',
    normalRange: '3.5 – 5.0 mmol/L',
    ncdTargetRange: '4.0 – 5.0 mmol/L',
    redFlagTrigger: 'K+ ≥ 5.5 mmol/L (Hyperkalemia) OR K+ < 3.0 mmol/L (Severe Hypokalemia)',
    gpAction:
      'If K+ ≥ 5.5: STAT ECG. Withhold ACEi, ARB, and Spironolactone. Dietary potassium restriction. If K+ ≥ 6.0 or ECG changes (peaked T waves, wide QRS): IV Calcium Gluconate 10% 10ml over 5 mins + IV Dextrose 50% 50ml with 10U Actrapid.',
    specialistReferral:
      'Urgent ED transfer for severe hyperkalemia (K+ ≥ 6.0) or symptomatic arrhythmia.',
  },
];

export interface EcgPattern {
  id: string;
  title: string;
  category: 'lvh' | 'ischemia' | 'hyperk' | 'hypok' | 'qt';
  badge: string;
  badgeColor: string;
  diagnosticCriteria: string[];
  clinicalSignificance: string;
  gpAction: string;
}

export const ECG_PATTERNS: EcgPattern[] = [
  {
    id: 'ecg-lvh',
    title: 'Left Ventricular Hypertrophy (LVH) & Strain Pattern',
    category: 'lvh',
    badge: 'Hypertensive TOD',
    badgeColor: 'bg-blue-600 text-white',
    diagnosticCriteria: [
      'Sokolow-Lyon Voltage: S in V1 + R in V5 or V6 ≥ 35 mm (35 small squares)',
      'Cornell Voltage: R in aVL + S in V3 > 28 mm (men) or > 20 mm (women)',
      'LV Strain Pattern: Asymmetric, downsloping ST-segment depression with inverted T waves in lateral leads (I, aVL, V5, V6)',
      'Left axis deviation (often -30° to -90°)',
    ],
    clinicalSignificance:
      'Indicates established hypertensive target organ damage with increased risk of sudden cardiac death, heart failure, and stroke. Confirms Very High / High cardiovascular risk tier.',
    gpAction:
      'Intensify BP control to target < 130/80 mmHg. Prioritize RAAS blocker (ACEi/ARB) + Dihydropyridine CCB (Amlodipine) to promote LVH regression. Request transthoracic Echocardiogram.',
  },
  {
    id: 'ecg-ischemia',
    title: 'Silent Ischemia & Pathological Q-Waves in Diabetes',
    category: 'ischemia',
    badge: 'Ischemic Heart Disease',
    badgeColor: 'bg-rose-600 text-white',
    diagnosticCriteria: [
      'Pathological Q-Waves: Width ≥ 0.04s (1 small box) or depth ≥ 25% of the ensuing R wave in ≥ 2 contiguous leads (e.g. II, III, aVF for inferior; V1-V4 for anterior)',
      'ST-segment elevation: ≥ 1 mm in limb leads or ≥ 1.5–2.0 mm in chest leads indicates acute STEMI',
      'Horizontal or downsloping ST-segment depression ≥ 0.5 mm in contiguous leads (subendocardial ischemia)',
      'Deep, symmetrical T-wave inversions (Wellens warning pattern in V2-V3)',
    ],
    clinicalSignificance:
      'Patients with long-standing diabetes often have cardiac autonomic neuropathy (CAN), experiencing "silent" painless myocardial infarctions presenting only as fatigue, dyspnea, or nausea.',
    gpAction:
      'If acute: STAT chewable Aspirin 300mg + Clopidogrel 300-600mg + sublingual GTN + Emergency transfer to PCI center. If chronic old Q-waves: re-stratify to Extreme/Very High Risk, initiate DAPT/statin/SGLT2i, and refer to Cardiology.',
  },
  {
    id: 'ecg-hyperk',
    title: 'Hyperkalemia Progression (K+ ≥ 5.5 to > 7.5 mmol/L)',
    category: 'hyperk',
    badge: 'Life-Threatening Emergency',
    badgeColor: 'bg-red-700 text-white',
    diagnosticCriteria: [
      'Stage 1 (K+ 5.5–6.5 mmol/L): Tall, narrow, symmetrical "tented" T waves (most visible in II, III, V2-V4)',
      'Stage 2 (K+ 6.5–7.5 mmol/L): Prolongation of PR interval, flattening and disappearance of P waves, ST-segment depression',
      'Stage 3 (K+ > 7.5 mmol/L): Widening of QRS complex, blending of QRS and T waves into a classic "Sine-Wave" pattern',
      'Stage 4 (Terminal): Ventricular fibrillation, idioventricular rhythm, or asystole',
    ],
    clinicalSignificance:
      'Common consequence in diabetic CKD patients taking ACEi, ARB, or Spironolactone, especially during acute gastroenteritis or dehydration.',
    gpAction:
      'EMERGENCY RESUSCITATION: 1) IV Calcium Gluconate 10% 10 mL over 5 min to stabilize cardiomyocyte membranes (repeat after 5-10 min if ECG unchanged). 2) IV Dextrose 50% 50 mL + 10 units Regular Insulin to shift K+ intracellularly. 3) Salbutamol nebulizer 10-20 mg. 4) Urgent ED ambulance transfer.',
  },
  {
    id: 'ecg-hypok',
    title: 'Hypokalemia & Prominent U-Waves',
    category: 'hypok',
    badge: 'Electrolyte Derangement',
    badgeColor: 'bg-amber-600 text-white',
    diagnosticCriteria: [
      'T-wave flattening and ST-segment depression',
      'Prominent U-waves (deflection following T-wave, amplitude > 1mm or > T-wave, best seen in V2-V4)',
      'Apparent prolongation of QT interval (due to fusion of T and U wave: "QU interval")',
      'Frequent ventricular premature beats (PVCs) or ventricular arrhythmias (Torsades de Pointes)',
    ],
    clinicalSignificance:
      'Usually secondary to high-dose loop diuretics (Furosemide) or thiazide diuretics without adequate potassium supplementation.',
    gpAction:
      'Oral Potassium Chloride (Mist KCl or Slow-K tablets 1200-2400mg/day). Check serum magnesium (hypomagnesemia refractory hypokalemia). Adjust diuretic doses.',
  },
  {
    id: 'ecg-qt',
    title: 'Drug-Induced QTc Prolongation & Torsades Warning',
    category: 'qt',
    badge: 'Pharmacovigilance Alert',
    badgeColor: 'bg-purple-700 text-white',
    diagnosticCriteria: [
      'Corrected QT (QTc) > 450 ms in men or > 460 ms in women (Bazett formula: QTc = QT / √RR)',
      'QTc > 500 ms or increase > 60 ms from baseline: High risk of polymorphic VT (Torsades de Pointes)',
      'Synergistic prolongation when combining macrolides (Azithromycin), fluoroquinolones, domperidone, antipsychotics, or antiarrhythmics',
    ],
    clinicalSignificance:
      'Can lead to sudden syncope, palpitations, and fatal ventricular tachyarrhythmias.',
    gpAction:
      'Discontinue offending QT-prolonging drugs immediately. Correct hypokalemia and hypomagnesemia (keep K+ > 4.0, Mg2+ > 0.8 mmol/L). If syncope occurs: urgent hospital admission.',
  },
];
