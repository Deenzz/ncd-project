import { DrugInteraction } from '../types/ncd';

export interface FormMedication {
  id: string;
  name: string;
  genericName: string;
  category: 'antidiabetic' | 'antihypertensive' | 'lipid' | 'cardiovascular' | 'analgesic' | 'anti-infective' | 'gi_other';
  fukkmCategory: 'Category A' | 'Category B' | 'Category C' | 'General';
  standardDose: string;
  renalCutoffNotes: string;
}

export const MALAYSIAN_PRIMARY_CARE_FORMULARY: FormMedication[] = [
  // Antidiabetics
  { id: 'metformin', name: 'Metformin', genericName: 'Metformin HCl', category: 'antidiabetic', fukkmCategory: 'Category B', standardDose: '500mg - 1000mg BD (max 2000mg)', renalCutoffNotes: 'Stop if eGFR < 30; max 1000mg if eGFR 30-44' },
  { id: 'empagliflozin', name: 'Empagliflozin (Jardiance)', genericName: 'Empagliflozin', category: 'antidiabetic', fukkmCategory: 'Category A', standardDose: '10mg - 25mg OD', renalCutoffNotes: 'Initiate down to eGFR 20; cardiorenal protection' },
  { id: 'dapagliflozin', name: 'Dapagliflozin (Forxiga)', genericName: 'Dapagliflozin', category: 'antidiabetic', fukkmCategory: 'Category A', standardDose: '10mg OD', renalCutoffNotes: 'Initiate down to eGFR 20; cardiorenal protection' },
  { id: 'linagliptin', name: 'Linagliptin (Trajenta)', genericName: 'Linagliptin', category: 'antidiabetic', fukkmCategory: 'Category A', standardDose: '5mg OD', renalCutoffNotes: 'Safe at any eGFR down to dialysis (95% biliary excretion)' },
  { id: 'sitagliptin', name: 'Sitagliptin (Januvia)', genericName: 'Sitagliptin', category: 'antidiabetic', fukkmCategory: 'Category A', standardDose: '100mg OD', renalCutoffNotes: '50mg if eGFR 30-44; 25mg if eGFR < 30' },
  { id: 'vildagliptin', name: 'Vildagliptin (Galvus)', genericName: 'Vildagliptin', category: 'antidiabetic', fukkmCategory: 'Category A', standardDose: '50mg BD', renalCutoffNotes: '50mg OD if eGFR < 50; monitor LFT' },
  { id: 'gliclazide', name: 'Gliclazide MR (Diamicron MR)', genericName: 'Gliclazide', category: 'antidiabetic', fukkmCategory: 'Category B', standardDose: '30mg - 120mg OM', renalCutoffNotes: 'Safer sulfonylurea; dose adjust if eGFR < 30' },
  { id: 'glibenclamide', name: 'Glibenclamide (Daonil)', genericName: 'Glibenclamide', category: 'antidiabetic', fukkmCategory: 'Category B', standardDose: '2.5mg - 10mg BD', renalCutoffNotes: 'AVOID in elderly/CKD (prolonged fatal hypoglycemia)' },
  { id: 'glimepiride', name: 'Glimepiride (Amaryl)', genericName: 'Glimepiride', category: 'antidiabetic', fukkmCategory: 'Category B', standardDose: '1mg - 4mg OD', renalCutoffNotes: 'Use caution in eGFR < 60; high hypo risk' },
  { id: 'semaglutide', name: 'Semaglutide (Ozempic/Rybelsus)', genericName: 'Semaglutide', category: 'antidiabetic', fukkmCategory: 'Category A', standardDose: '0.25mg - 1.0mg SC qw', renalCutoffNotes: 'No renal adjustment needed; ASCVD & weight benefit' },
  { id: 'dulaglutide', name: 'Dulaglutide (Trulicity)', genericName: 'Dulaglutide', category: 'antidiabetic', fukkmCategory: 'Category A', standardDose: '0.75mg - 1.5mg SC qw', renalCutoffNotes: 'Safe down to eGFR 15; powerful ASCVD benefit' },
  { id: 'insulin_glargine', name: 'Insulin Glargine (Lantus)', genericName: 'Insulin Glargine', category: 'antidiabetic', fukkmCategory: 'Category A', standardDose: '10 - 40 units ON', renalCutoffNotes: 'Reduce dose as eGFR falls due to reduced clearance' },

  // Antihypertensives
  { id: 'perindopril', name: 'Perindopril (Coversyl)', genericName: 'Perindopril Erbumine/Arginine', category: 'antihypertensive', fukkmCategory: 'Category B', standardDose: '4mg - 8mg OM', renalCutoffNotes: 'Acceptable creatinine rise up to 30%; hold if K+ >= 5.5' },
  { id: 'ramipril', name: 'Ramipril (Tritace)', genericName: 'Ramipril', category: 'antihypertensive', fukkmCategory: 'Category B', standardDose: '2.5mg - 10mg OM', renalCutoffNotes: 'Check renal function at 2-4 weeks' },
  { id: 'enalapril', name: 'Enalapril', genericName: 'Enalapril Maleate', category: 'antihypertensive', fukkmCategory: 'Category B', standardDose: '5mg - 20mg BD', renalCutoffNotes: 'Check K+ and renal profile' },
  { id: 'telmisartan', name: 'Telmisartan (Micardis)', genericName: 'Telmisartan', category: 'antihypertensive', fukkmCategory: 'Category B', standardDose: '40mg - 80mg OM', renalCutoffNotes: 'No renal dose adjustment; ideal in metabolic syndrome' },
  { id: 'losartan', name: 'Losartan (Cozaar)', genericName: 'Losartan Potassium', category: 'antihypertensive', fukkmCategory: 'Category B', standardDose: '50mg - 100mg OM', renalCutoffNotes: 'Proven reduction in end-stage renal disease (RENAAL)' },
  { id: 'valsartan', name: 'Valsartan (Diovan)', genericName: 'Valsartan', category: 'antihypertensive', fukkmCategory: 'Category B', standardDose: '80mg - 160mg OM', renalCutoffNotes: 'Excellent post-MI and HF evidence' },
  { id: 'amlodipine', name: 'Amlodipine (Norvasc)', genericName: 'Amlodipine Besylate', category: 'antihypertensive', fukkmCategory: 'Category B', standardDose: '5mg - 10mg OM', renalCutoffNotes: 'Safe at any eGFR; watch for vasodilatory pedal edema' },
  { id: 'felodipine', name: 'Felodipine (Plendil)', genericName: 'Felodipine', category: 'antihypertensive', fukkmCategory: 'Category B', standardDose: '5mg - 10mg OM', renalCutoffNotes: 'Safe in renal impairment' },
  { id: 'indapamide', name: 'Indapamide SR (Natrilix SR)', genericName: 'Indapamide Hemihydrate', category: 'antihypertensive', fukkmCategory: 'Category B', standardDose: '1.5mg OM', renalCutoffNotes: 'Preferred thiazide-like diuretic in CPG HTN 2026' },
  { id: 'hydrochlorothiazide', name: 'Hydrochlorothiazide (HCTZ)', genericName: 'Hydrochlorothiazide', category: 'antihypertensive', fukkmCategory: 'Category B', standardDose: '12.5mg - 25mg OM', renalCutoffNotes: 'Ineffective if eGFR < 30' },
  { id: 'furosemide', name: 'Furosemide (Lasix)', genericName: 'Furosemide', category: 'antihypertensive', fukkmCategory: 'Category B', standardDose: '20mg - 80mg BD', renalCutoffNotes: 'Loop diuretic indicated for fluid overload and eGFR < 30' },
  { id: 'spironolactone', name: 'Spironolactone (Aldactone)', genericName: 'Spironolactone', category: 'antihypertensive', fukkmCategory: 'Category B', standardDose: '12.5mg - 50mg OM', renalCutoffNotes: 'MRA for resistant HTN / HF; strict K+ monitoring if eGFR < 45' },
  { id: 'bisoprolol', name: 'Bisoprolol (Concor)', genericName: 'Bisoprolol Fumarate', category: 'antihypertensive', fukkmCategory: 'Category B', standardDose: '2.5mg - 10mg OM', renalCutoffNotes: 'Indicated post-MI or Heart Failure' },
  { id: 'metoprolol', name: 'Metoprolol (Betaloc)', genericName: 'Metoprolol Tartrate/Succinate', category: 'antihypertensive', fukkmCategory: 'Category B', standardDose: '25mg - 100mg BD', renalCutoffNotes: 'Hepatic clearance' },
  { id: 'verapamil', name: 'Verapamil (Isoptin)', genericName: 'Verapamil HCl', category: 'antihypertensive', fukkmCategory: 'Category B', standardDose: '40mg - 120mg TDS', renalCutoffNotes: 'Non-DHP CCB: negative inotrope/chronotrope' },
  { id: 'diltiazem', name: 'Diltiazem (Herbesser)', genericName: 'Diltiazem HCl', category: 'antihypertensive', fukkmCategory: 'Category B', standardDose: '30mg - 60mg TDS', renalCutoffNotes: 'Non-DHP CCB: rate control' },

  // Lipid Lowering
  { id: 'atorvastatin', name: 'Atorvastatin (Lipitor)', genericName: 'Atorvastatin Calcium', category: 'lipid', fukkmCategory: 'Category B', standardDose: '20mg - 80mg ON', renalCutoffNotes: 'High-intensity statin; no renal dose adjustment' },
  { id: 'rosuvastatin', name: 'Rosuvastatin (Crestor)', genericName: 'Rosuvastatin Calcium', category: 'lipid', fukkmCategory: 'Category B', standardDose: '10mg - 40mg ON', renalCutoffNotes: 'Start 5mg if eGFR < 30; high potency' },
  { id: 'simvastatin', name: 'Simvastatin (Zocor)', genericName: 'Simvastatin', category: 'lipid', fukkmCategory: 'Category B', standardDose: '20mg - 40mg ON', renalCutoffNotes: 'Moderate intensity; max 20mg if on Amlodipine' },
  { id: 'ezetimibe', name: 'Ezetimibe (Ezetrol)', genericName: 'Ezetimibe', category: 'lipid', fukkmCategory: 'Category B', standardDose: '10mg OM', renalCutoffNotes: 'Safe across all eGFR levels' },
  { id: 'fenofibrate', name: 'Fenofibrate (Lipanthyl)', genericName: 'Fenofibrate', category: 'lipid', fukkmCategory: 'Category B', standardDose: '145mg OM', renalCutoffNotes: 'Reduce if eGFR 30-59; avoid if eGFR < 30' },
  { id: 'gemfibrozil', name: 'Gemfibrozil (Lopid)', genericName: 'Gemfibrozil', category: 'lipid', fukkmCategory: 'Category B', standardDose: '600mg BD', renalCutoffNotes: 'STRICTLY AVOID WITH STATINS (high rhabdo risk)' },

  // Cardiovascular / Antiplatelet / Anticoagulant
  { id: 'aspirin', name: 'Aspirin (Cardiprin)', genericName: 'Acetylsalicylic Acid', category: 'cardiovascular', fukkmCategory: 'Category B', standardDose: '75mg - 100mg OM', renalCutoffNotes: 'Secondary prevention in established ASCVD' },
  { id: 'clopidogrel', name: 'Clopidogrel (Plavix)', genericName: 'Clopidogrel Bisulfate', category: 'cardiovascular', fukkmCategory: 'Category B', standardDose: '75mg OM', renalCutoffNotes: 'Avoid with Omeprazole/Esomeprazole' },
  { id: 'dabigatran', name: 'Dabigatran (Pradaxa)', genericName: 'Dabigatran Etexilate', category: 'cardiovascular', fukkmCategory: 'Category A', standardDose: '110mg - 150mg BD', renalCutoffNotes: 'Contraindicated if eGFR < 30' },
  { id: 'rivaroxaban', name: 'Rivaroxaban (Xarelto)', genericName: 'Rivaroxaban', category: 'cardiovascular', fukkmCategory: 'Category A', standardDose: '15mg - 20mg OM', renalCutoffNotes: '15mg if eGFR 15-49' },
  { id: 'warfarin', name: 'Warfarin', genericName: 'Warfarin Sodium', category: 'cardiovascular', fukkmCategory: 'Category B', standardDose: 'Individualized (INR 2.0 - 3.0)', renalCutoffNotes: 'Extensive drug-food-herbal interactions' },

  // Analgesics / NSAIDs
  { id: 'mefenamic_acid', name: 'Mefenamic Acid (Ponstan)', genericName: 'Mefenamic Acid', category: 'analgesic', fukkmCategory: 'Category B', standardDose: '500mg TDS PRN', renalCutoffNotes: 'High AKI risk with ACEi/ARB and Diuretic' },
  { id: 'ibuprofen', name: 'Ibuprofen (Brufen)', genericName: 'Ibuprofen', category: 'analgesic', fukkmCategory: 'Category B', standardDose: '200mg - 400mg TDS PRN', renalCutoffNotes: 'Avoid in CKD, HTN, and HF' },
  { id: 'diclofenac', name: 'Diclofenac (Voltaren)', genericName: 'Diclofenac Sodium', category: 'analgesic', fukkmCategory: 'Category B', standardDose: '50mg BD/TDS PRN', renalCutoffNotes: 'Cardiovascular toxicity + renal vasoconstriction' },
  { id: 'celecoxib', name: 'Celecoxib (Celebrex)', genericName: 'Celecoxib', category: 'analgesic', fukkmCategory: 'Category B', standardDose: '100mg - 200mg OD/BD', renalCutoffNotes: 'COX-2 inhibitor: causes fluid retention and blunts antihypertensives' },
  { id: 'paracetamol', name: 'Paracetamol (Panadol)', genericName: 'Paracetamol', category: 'analgesic', fukkmCategory: 'Category B', standardDose: '500mg - 1000mg QDS PRN', renalCutoffNotes: 'Safest 1st-line analgesic in CKD and HTN' },

  // Anti-Infectives
  { id: 'ciprofloxacin', name: 'Ciprofloxacin', genericName: 'Ciprofloxacin HCl', category: 'anti-infective', fukkmCategory: 'Category B', standardDose: '250mg - 500mg BD', renalCutoffNotes: 'Prolongs QTc; CYP1A2 inhibitor' },
  { id: 'clarithromycin', name: 'Clarithromycin (Klacid)', genericName: 'Clarithromycin', category: 'anti-infective', fukkmCategory: 'Category B', standardDose: '250mg - 500mg BD', renalCutoffNotes: 'Potent CYP3A4 inhibitor; QTc prolonger' },
  { id: 'fluconazole', name: 'Fluconazole (Diflucan)', genericName: 'Fluconazole', category: 'anti-infective', fukkmCategory: 'Category B', standardDose: '150mg single / 50-200mg OD', renalCutoffNotes: 'CYP2C9 inhibitor: exaggerates sulfonylureas' },
  { id: 'bactrim', name: 'Co-Trimoxazole (Bactrim)', genericName: 'Trimethoprim / Sulfamethoxazole', category: 'anti-infective', fukkmCategory: 'Category B', standardDose: '960mg BD', renalCutoffNotes: 'Increases serum K+; inhibits sulfonylurea metabolism' },

  // Gastrointestinal / Others
  { id: 'omeprazole', name: 'Omeprazole (Losec)', genericName: 'Omeprazole', category: 'gi_other', fukkmCategory: 'Category B', standardDose: '20mg - 40mg OM', renalCutoffNotes: 'CYP2C19 inhibitor: blunts Clopidogrel' },
  { id: 'pantoprazole', name: 'Pantoprazole (Controloc)', genericName: 'Pantoprazole Sodium', category: 'gi_other', fukkmCategory: 'Category B', standardDose: '20mg - 40mg OM', renalCutoffNotes: 'Preferred PPI with Clopidogrel' },
];

export const KNOWN_INTERACTION_RULES: DrugInteraction[] = [
  // 1. Dual RAAS Blockade (Contraindicated)
  {
    id: 'int-dual-raas',
    drugA: 'ACE-Inhibitor (e.g. Perindopril, Ramipril)',
    drugB: 'ARB (e.g. Telmisartan, Losartan, Valsartan)',
    severity: 'contraindicated',
    title: 'Dual RAAS Blockade: ACE-Inhibitor + ARB Combination',
    mechanism: 'Simultaneous blockade of angiotensin converting enzyme and AT1 receptor triggers severe renal hemodynamic collapse.',
    clinicalRisk: 'Significantly increases risk of Acute Kidney Injury, profound hyperkalemia, and cardiovascular mortality without improving clinical outcomes (ONTARGET trial).',
    actionableAdvice: 'STRICTLY CONTRAINDICATED in Malaysian CPG HTN 2026. Discontinue one agent immediately. Maintain monotherapy RAAS blockade and add Dihydropyridine CCB (Amlodipine) or Indapamide instead.',
    cpgOrPharmacologyRef: 'CPG Hypertension (6th Ed, 2026) Chapter 6 & ONTARGET Trial',
  },

  // 2. The "Triple Whammy" (Contraindicated / Critical)
  {
    id: 'int-triple-whammy',
    drugA: 'ACEi or ARB (Perindopril / Telmisartan)',
    drugB: 'NSAID (Ponstan, Voltaren, Ibuprofen, Celecoxib) + Diuretic',
    severity: 'contraindicated',
    title: 'The "Triple Whammy": RAAS Blocker + Diuretic + NSAID',
    mechanism: 'NSAIDs block vasodilatory prostaglandins (afferent arteriolar constriction) + ACEi/ARB dilates efferent arterioles + Diuretic depletes intravascular volume = abrupt collapse in intraglomerular filtration pressure.',
    clinicalRisk: 'Catastrophic precipitous drop in eGFR, acute tubular necrosis (ATN), hyperkalemia, and emergency hospitalization for acute kidney failure.',
    actionableAdvice: 'Avoid NSAIDs in patients taking ACEi/ARB + Diuretic. Switch analgesic to Paracetamol (Panadol) or topical NSAID gel. Educate patient never to buy over-the-counter painkillers or Jamu without GP review.',
    cpgOrPharmacologyRef: 'Malaysian Adverse Drug Reaction Advisory & CPG DKD',
  },

  // 3. Statin + Gemfibrozil (Contraindicated)
  {
    id: 'int-statin-gemfibrozil',
    drugA: 'Statin (Simvastatin / Atorvastatin / Rosuvastatin)',
    drugB: 'Gemfibrozil (Lopid)',
    severity: 'contraindicated',
    title: 'Statin + Gemfibrozil: Severe Rhabdomyolysis Risk',
    mechanism: 'Gemfibrozil strongly inhibits glucuronidation and OATP1B1 hepatic uptake of statins, causing up to a 15-fold increase in circulating statin concentrations.',
    clinicalRisk: 'Severe necrotizing myopathy, myoglobinuria, and fatal rhabdomyolysis leading to acute renal failure.',
    actionableAdvice: 'STRICTLY CONTRAINDICATED. If a fibrate is required for severe hypertriglyceridemia (TG >= 5.6 mmol/L), ALWAYS use Fenofibrate 145 mg daily instead. Fenofibrate uses a different metabolic pathway and is safe with statins.',
    cpgOrPharmacologyRef: 'CPG Dyslipidemia (6th Ed, 2023) Section 4.5 & Table 4.4',
  },

  // 4. Non-DHP CCB + Beta-Blocker (Contraindicated / Major)
  {
    id: 'int-verapamil-betablocker',
    drugA: 'Non-Dihydropyridine CCB (Verapamil / Diltiazem)',
    drugB: 'Beta-Blocker (Bisoprolol / Metoprolol / Atenolol)',
    severity: 'contraindicated',
    title: 'Non-DHP CCB + Beta-Blocker: Severe Bradycardia & AV Block',
    mechanism: 'Synergistic, potent depression of SA node automaticity and AV nodal conduction, plus additive negative inotropic effect on ventricular myocardium.',
    clinicalRisk: 'Profound bradycardia, complete heart block, asystole, acute heart failure exacerbation, and cardiogenic shock.',
    actionableAdvice: 'Do NOT co-prescribe Verapamil or Diltiazem with Beta-Blockers in primary care. If rate control or BP lowering is needed with a beta-blocker, use a Dihydropyridine CCB (Amlodipine) which has no AV nodal depressive action.',
    cpgOrPharmacologyRef: 'CPG Hypertension (6th Ed, 2026) & BNF Cardiovascular Guidance',
  },

  // 5. Clopidogrel + Omeprazole (Major Alert)
  {
    id: 'int-clopidogrel-omeprazole',
    drugA: 'Clopidogrel (Plavix)',
    drugB: 'Omeprazole (Losec) / Esomeprazole (Nexium)',
    severity: 'major',
    title: 'CYP2C19 Inhibition: Clopidogrel Antiplatelet Failure',
    mechanism: 'Clopidogrel is an inactive prodrug that requires hepatic bioactivation by CYP2C19. Omeprazole is a competitive inhibitor of CYP2C19, cutting active metabolite levels by 45%.',
    clinicalRisk: 'Loss of antiplatelet protection, leading to stent thrombosis, secondary myocardial infarction, and recurrent ischemic stroke.',
    actionableAdvice: 'Switch PPI to Pantoprazole (Controloc 20–40 mg) or Rabeprazole (Pariet 20 mg), which have minimal CYP2C19 affinity and do not attenuate Clopidogrel efficacy. Alternatively, use Famotidine.',
    cpgOrPharmacologyRef: 'MOH Malaysia Drug Formulary & US FDA Drug Safety Alert',
  },

  // 6. SGLT2i + Loop Diuretic (Major Alert)
  {
    id: 'int-sglt2i-furosemide',
    drugA: 'SGLT2 Inhibitor (Empagliflozin / Dapagliflozin)',
    drugB: 'Loop Diuretic (Furosemide / Lasix)',
    severity: 'major',
    title: 'Excessive Osmotic Diuresis & Volume Depletion',
    mechanism: 'SGLT2i causes glucosuria-induced osmotic diuresis (~300-500 mL/day fluid loss). When combined with loop diuretics, synergistic volume loss occurs.',
    clinicalRisk: 'Severe orthostatic hypotension, falls in elderly, prerenal acute kidney injury, and hemoconcentration triggering Euglycemic DKA.',
    actionableAdvice: 'Review volume status carefully. Consider lowering Furosemide dose by 25–50% upon SGLT2i initiation if the patient is euvolemic. Instruct patient to maintain oral hydration and emphasize SADMANS sick-day rules.',
    cpgOrPharmacologyRef: 'CPG T2DM (6th Ed) & CPG Diabetic Kidney Disease',
  },

  // 7. Sulfonylurea + CYP2C9 Inhibitor (Major Alert)
  {
    id: 'int-su-cyp2c9',
    drugA: 'Sulfonylurea (Gliclazide / Glimepiride / Glibenclamide)',
    drugB: 'Fluconazole (Diflucan) or Co-Trimoxazole (Bactrim)',
    severity: 'major',
    title: 'Severe Prolonged Hypoglycemia from CYP2C9 Inhibition',
    mechanism: 'Fluconazole and Bactrim are potent inhibitors of CYP2C9, the primary enzyme responsible for sulfonylurea clearance, prolonging drug half-life exponentially.',
    clinicalRisk: 'Refractory, profound hypoglycemia that may persist for 24 to 72 hours, resulting in neuroglycopenic brain injury, seizures, and death.',
    actionableAdvice: 'Temporarily reduce sulfonylurea dose by 50% or suspend during antimicrobial course. Increase self-monitoring of blood glucose (SMBG). In elderly CKD patients, consider replacing sulfonylurea with Linagliptin 5 mg.',
    cpgOrPharmacologyRef: 'Clinical Pharmacokinetics & Malaysian CPG T2DM (6th Ed)',
  },

  // 8. Simvastatin + Amlodipine (Major Alert)
  {
    id: 'int-simvastatin-amlodipine',
    drugA: 'Simvastatin (Zocor)',
    drugB: 'Amlodipine (Norvasc)',
    severity: 'major',
    title: 'Amlodipine-Induced Simvastatin Toxicity',
    mechanism: 'Amlodipine inhibits CYP3A4, doubling plasma concentrations and exposure to Simvastatin.',
    clinicalRisk: 'Increased incidence of statin-associated muscle symptoms (SAMS), severe myopathy, and elevated serum creatine kinase (CK).',
    actionableAdvice: 'Cap Simvastatin dose at a MAXIMUM of 20 mg daily when co-prescribed with Amlodipine. For patients in High or Very High CV risk, switch to Atorvastatin (40–80 mg) or Rosuvastatin (20–40 mg) which have higher potency and safer co-administration profiles.',
    cpgOrPharmacologyRef: 'CPG Dyslipidemia (6th Ed, 2023) Table 4.4 & US FDA Simvastatin Safety Labeling',
  },

  // 9. Macrolides / Fluoroquinolones + Indapamide (Major Alert)
  {
    id: 'int-qt-synergy',
    drugA: 'Macrolide (Azithromycin/Clarithromycin) or Fluoroquinolone (Ciprofloxacin)',
    drugB: 'Indapamide / Antiarrhythmics',
    severity: 'major',
    title: 'Synergistic QTc Prolongation & Torsades de Pointes',
    mechanism: 'Antibiotic hERG potassium channel blockade compounded by diuretic-induced borderline hypokalemia / hypomagnesemia.',
    clinicalRisk: 'Prolongation of QTc > 500 ms, leading to polymorphic ventricular tachycardia (Torsades de Pointes) and syncope.',
    actionableAdvice: 'Check baseline ECG. Ensure serum K+ is > 4.0 mmol/L. Prefer Amoxicillin/Clavulanate (Augmentin) or Cephalosporins for uncomplicated infections in patients on Indapamide.',
    cpgOrPharmacologyRef: 'Bedside ECG Pharmacology & CPG HTN 2026',
  },

  // 10. Aspirin + NSAIDs (Major Alert)
  {
    id: 'int-aspirin-nsaid',
    drugA: 'Low-dose Aspirin (Cardiprin 100mg)',
    drugB: 'NSAID (Mefenamic Acid / Ibuprofen / Diclofenac)',
    severity: 'major',
    title: 'Aspirin Antiplatelet Antagonism & Severe GI Bleeding',
    mechanism: 'Reversible NSAIDs compete for the COX-1 binding pocket, blocking Aspirin from irreversibly acetylating Serine 529. Also causes additive mucosal ulceration.',
    clinicalRisk: 'Loss of cardioprotective antiplatelet effect against recurrent coronary thrombosis + up to 4-fold increase in upper GI bleeding.',
    actionableAdvice: 'Avoid regular NSAIDs in patients taking cardioprotective Aspirin. If an NSAID is strictly necessary, take Aspirin at least 2 hours BEFORE the NSAID, co-prescribe Pantoprazole, and limit to shortest possible duration.',
    cpgOrPharmacologyRef: 'CPG Management of Dyslipidemia (6th Ed) & CPG ACS',
  },

  // 11. Dual Antiplatelet / Anticoagulant + NSAID (Critical)
  {
    id: 'int-anticoag-nsaid',
    drugA: 'DOAC (Dabigatran / Rivaroxaban) or Warfarin',
    drugB: 'NSAID (Ponstan, Voltaren, Celebrex)',
    severity: 'contraindicated',
    title: 'Anticoagulant + NSAID: Critical Hemorrhagic Risk',
    mechanism: 'Systemic anticoagulation combined with NSAID-induced gastric mucosal barrier breakdown and platelet inhibition.',
    clinicalRisk: 'Massive upper gastrointestinal bleeding, intracranial hemorrhage, and hemorrhagic shock.',
    actionableAdvice: 'STRICTLY CONTRAINDICATED in routine primary care. Use Paracetamol or short-course Tramadol for analgesia.',
    cpgOrPharmacologyRef: 'CPG Atrial Fibrillation & Primary Care Bleeding Safety',
  },

  // 12. POSITIVE SYNERGY: ACEi/ARB + Dihydropyridine CCB (Synergistic)
  {
    id: 'syn-a-plus-c',
    drugA: 'ACEi or ARB (Perindopril / Telmisartan)',
    drugB: 'Dihydropyridine CCB (Amlodipine)',
    severity: 'synergistic',
    title: 'Guideline-Preferred Synergy: Single-Pill Combination A+C',
    mechanism: 'CCB induces preferential precapillary arteriolar vasodilation; ACEi/ARB induces postcapillary venular vasodilation, equalizing capillary hydrostatic pressure.',
    clinicalRisk: 'Reduces Amlodipine-induced peripheral ankle edema by ~70% while producing potent, complementary 24-hour ambulatory blood pressure reduction.',
    actionableAdvice: 'Class 1A Upfront recommendation in CPG Hypertension 2026. Superior stroke and cardiovascular mortality reduction over betablocker-diuretic regimens.',
    cpgOrPharmacologyRef: 'CPG Hypertension (6th Ed, 2026) Algorithm 1 & ACCOMPLISH Trial',
  },

  // 13. POSITIVE SYNERGY: High-Intensity Statin + Ezetimibe (Synergistic)
  {
    id: 'syn-statin-ezetimibe',
    drugA: 'High-Intensity Statin (Atorvastatin / Rosuvastatin)',
    drugB: 'Ezetimibe 10 mg (Ezetrol)',
    severity: 'synergistic',
    title: 'Dual Cholesterol Inhibition: Hepatic Synthesis + Intestinal Absorption',
    mechanism: 'Statin inhibits HMG-CoA reductase (reducing hepatic cholesterol synthesis); Ezetimibe selectively inhibits NPC1L1 transporter in the brush border of the small intestine.',
    clinicalRisk: 'Achieves an additional 15–20% LDL-C reduction beyond high-intensity statin without increasing statin-associated muscle symptoms (SAMS).',
    actionableAdvice: 'Recommended in CPG Dyslipidemia 2023 for all High, Very High, and Extreme risk patients not reaching their LDL target (<1.8, <1.4, or <1.0 mmol/L) at 4–12 weeks.',
    cpgOrPharmacologyRef: 'CPG Dyslipidemia (6th Ed, 2023) Section 4.2 & IMPROVE-IT Trial',
  },

  // 14. POSITIVE SYNERGY: SGLT2i + ACEi/ARB in Diabetic CKD (Synergistic)
  {
    id: 'syn-sglt2i-raas',
    drugA: 'SGLT2 Inhibitor (Empagliflozin / Dapagliflozin)',
    drugB: 'ACE-Inhibitor or ARB (Perindopril / Telmisartan)',
    severity: 'synergistic',
    title: 'Dual Glomerular Hemodynamic Renal Protection',
    mechanism: 'SGLT2i restores tubuloglomerular feedback causing afferent arteriolar constriction; ACEi/ARB causes efferent arteriolar vasodilation. Together, they dramatically reduce intraglomerular hypertension.',
    clinicalRisk: 'Synergistically reduces microalbuminuria by 40-50% and reduces the risk of doubling of serum creatinine, ESRD, and cardiovascular death.',
    actionableAdvice: 'Foundational organ-protective combination in CPG T2DM 6th Ed and CPG Diabetic Kidney Disease down to eGFR 20 mL/min.',
    cpgOrPharmacologyRef: 'CPG T2DM (6th Ed) & DAPA-CKD / EMPA-KIDNEY Trials',
  },
];

export function analyzeMedicationList(selectedMeds: string[]): DrugInteraction[] {
  if (selectedMeds.length < 2) return [];

  const foundInteractions: DrugInteraction[] = [];
  const lowerMeds = selectedMeds.map((m) => m.toLowerCase());

  const hasAny = (names: string[]) =>
    names.some((n) => lowerMeds.some((m) => m.includes(n.toLowerCase())));

  // Check Dual RAAS
  const hasAcei = hasAny(['perindopril', 'ramipril', 'enalapril', 'lisinopril', 'coversyl', 'tritace']);
  const hasArb = hasAny(['telmisartan', 'losartan', 'valsartan', 'candesartan', 'micardis', 'cozaar', 'diovan']);
  if (hasAcei && hasArb) {
    foundInteractions.push(KNOWN_INTERACTION_RULES.find((r) => r.id === 'int-dual-raas')!);
  }

  // Check Triple Whammy
  const hasNsaid = hasAny(['mefenamic', 'ponstan', 'ibuprofen', 'brufen', 'diclofenac', 'voltaren', 'celecoxib', 'celebrex', 'naproxen']);
  const hasDiuretic = hasAny(['indapamide', 'furosemide', 'hydrochlorothiazide', 'hctz', 'lasix', 'natrilix', 'spironolactone']);
  if ((hasAcei || hasArb) && hasDiuretic && hasNsaid) {
    foundInteractions.push(KNOWN_INTERACTION_RULES.find((r) => r.id === 'int-triple-whammy')!);
  }

  // Check Statin + Gemfibrozil
  const hasStatin = hasAny(['statin', 'atorvastatin', 'rosuvastatin', 'simvastatin', 'lipitor', 'crestor', 'zocor']);
  const hasGemfibrozil = hasAny(['gemfibrozil', 'lopid']);
  if (hasStatin && hasGemfibrozil) {
    foundInteractions.push(KNOWN_INTERACTION_RULES.find((r) => r.id === 'int-statin-gemfibrozil')!);
  }

  // Check Non-DHP CCB + Beta-Blocker
  const hasNonDhpCcb = hasAny(['verapamil', 'diltiazem', 'isoptin', 'herbesser']);
  const hasBetaBlocker = hasAny(['bisoprolol', 'metoprolol', 'atenolol', 'concor', 'betaloc']);
  if (hasNonDhpCcb && hasBetaBlocker) {
    foundInteractions.push(KNOWN_INTERACTION_RULES.find((r) => r.id === 'int-verapamil-betablocker')!);
  }

  // Check Clopidogrel + Omeprazole
  const hasClopidogrel = hasAny(['clopidogrel', 'plavix']);
  const hasOmeprazole = hasAny(['omeprazole', 'losec', 'esomeprazole', 'nexium']);
  if (hasClopidogrel && hasOmeprazole) {
    foundInteractions.push(KNOWN_INTERACTION_RULES.find((r) => r.id === 'int-clopidogrel-omeprazole')!);
  }

  // Check SGLT2i + Loop Diuretic
  const hasSglt2i = hasAny(['empagliflozin', 'dapagliflozin', 'jardiance', 'forxiga']);
  const hasLoopDiuretic = hasAny(['furosemide', 'lasix']);
  if (hasSglt2i && hasLoopDiuretic) {
    foundInteractions.push(KNOWN_INTERACTION_RULES.find((r) => r.id === 'int-sglt2i-furosemide')!);
  }

  // Check Sulfonylurea + CYP2C9 inhibitor
  const hasSu = hasAny(['gliclazide', 'glibenclamide', 'glimepiride', 'diamicron', 'daonil', 'amaryl']);
  const hasCyp2c9Inhib = hasAny(['fluconazole', 'diflucan', 'bactrim', 'co-trimoxazole']);
  if (hasSu && hasCyp2c9Inhib) {
    foundInteractions.push(KNOWN_INTERACTION_RULES.find((r) => r.id === 'int-su-cyp2c9')!);
  }

  // Check Simvastatin + Amlodipine
  const hasSimvastatin = hasAny(['simvastatin', 'zocor']);
  const hasAmlodipine = hasAny(['amlodipine', 'norvasc']);
  if (hasSimvastatin && hasAmlodipine) {
    foundInteractions.push(KNOWN_INTERACTION_RULES.find((r) => r.id === 'int-simvastatin-amlodipine')!);
  }

  // Check QTc synergy (Indapamide + Macrolide/Quinolone)
  const hasQtAntibiotic = hasAny(['clarithromycin', 'azithromycin', 'ciprofloxacin', 'levofloxacin', 'klacid']);
  const hasIndapamide = hasAny(['indapamide', 'natrilix']);
  if (hasQtAntibiotic && hasIndapamide) {
    foundInteractions.push(KNOWN_INTERACTION_RULES.find((r) => r.id === 'int-qt-synergy')!);
  }

  // Check Aspirin + NSAID
  const hasAspirin = hasAny(['aspirin', 'cardiprin']);
  if (hasAspirin && hasNsaid) {
    foundInteractions.push(KNOWN_INTERACTION_RULES.find((r) => r.id === 'int-aspirin-nsaid')!);
  }

  // Check Anticoagulant + NSAID
  const hasAnticoag = hasAny(['dabigatran', 'rivaroxaban', 'warfarin', 'pradaxa', 'xarelto']);
  if (hasAnticoag && hasNsaid) {
    foundInteractions.push(KNOWN_INTERACTION_RULES.find((r) => r.id === 'int-anticoag-nsaid')!);
  }

  // Check Positive Synergy: A+C
  if ((hasAcei || hasArb) && hasAmlodipine) {
    foundInteractions.push(KNOWN_INTERACTION_RULES.find((r) => r.id === 'syn-a-plus-c')!);
  }

  // Check Positive Synergy: Statin + Ezetimibe
  const hasEzetimibe = hasAny(['ezetimibe', 'ezetrol']);
  if (hasStatin && hasEzetimibe) {
    foundInteractions.push(KNOWN_INTERACTION_RULES.find((r) => r.id === 'syn-statin-ezetimibe')!);
  }

  // Check Positive Synergy: SGLT2i + RAAS
  if (hasSglt2i && (hasAcei || hasArb)) {
    foundInteractions.push(KNOWN_INTERACTION_RULES.find((r) => r.id === 'syn-sglt2i-raas')!);
  }

  return foundInteractions;
}
