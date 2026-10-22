import { EcgInteractiveCase } from '../types/ncd';

export const ECG_INTERACTIVE_CASES: EcgInteractiveCase[] = [
  {
    id: 'ecg-lvh-strain',
    title: 'Left Ventricular Hypertrophy (LVH) & Lateral Strain',
    category: 'hypertrophy',
    badge: 'Target Organ Damage',
    badgeColor: 'bg-blue-600 text-white',
    subtitle: 'Classic hallmark of chronic uncontrolled hypertension (MOH CPG HTN 2026)',
    normalRange: 'Sokolow-Lyon < 35 mm; Cornell < 28 mm (men) / < 20 mm (women)',
    characteristicPattern: [
      'High Voltage: S in V1 + R in V5 or V6 >= 35 mm (35 small squares)',
      'Cornell Voltage: R in aVL + S in V3 > 28 mm (men) or > 20 mm (women)',
      'LV Strain: Asymmetric, downsloping ST-segment depression with inverted T waves in I, aVL, V5, V6',
      'Left Axis Deviation (-30° to -90°)',
    ],
    waveformType: 'lvh',
    redFlags: [
      'Dynamic ST elevation or new chest pain (superimposed acute coronary syndrome)',
      'Accompanied by bibasilar lung crackles or orthopnea (decompensated heart failure)',
      'Arrhythmias: frequent PVCs, ventricular tachycardia, or new AFib',
    ],
    clinicalReasoning:
      'Myocardial hypertrophy occurs as an adaptive response to chronically elevated afterload. Over time, increased oxygen demand outstrips coronary microvascular supply, resulting in subendocardial ischemia (the strain pattern) and progressive interstitial fibrosis.',
    gpActionPlan:
      'Mandates aggressive BP target < 130/80 mmHg. Initiate or titrate Single-Pill Combination A+C (ACEi/ARB + Amlodipine) or A+D to induce regression of LV mass. Request transthoracic Echocardiogram (TTE) to evaluate LV ejection fraction and diastolic dysfunction.',
  },
  {
    id: 'ecg-anterior-stemi',
    title: 'Acute Anterior STEMI (Hyperacute Injury Current)',
    category: 'ischemia',
    badge: 'STAT Emergency Transfer',
    badgeColor: 'bg-red-700 text-white',
    subtitle: 'LAD occlusion requiring immediate Primary PCI (MOH CPG ACS)',
    normalRange: 'Isoelectric ST segment; ST elevation < 1.0 mm in limb leads',
    characteristicPattern: [
      'Convex / Coved ST-segment elevation >= 1.5–2.0 mm in >= 2 contiguous chest leads (V1–V4)',
      'Reciprocal ST-segment depression in inferior leads (II, III, aVF)',
      'Hyperacute, tall, broad-based T waves in early minutes of occlusion',
      'Loss of normal R wave progression across precordial leads',
    ],
    waveformType: 'stemi',
    redFlags: [
      'Ongoing ischemic chest pressure or radiation to neck/jaw/left arm',
      'Cardiogenic shock (SBP < 90 mmHg, cold extremities, confusion)',
      'Pulmonary edema (Killip Class II/III)',
      'Malignant ventricular arrhythmias (VT/VF)',
    ],
    clinicalReasoning:
      'Transmural myocardial ischemia secondary to acute coronary plaque rupture and occlusive thrombus in the Left Anterior Descending (LAD) artery. Every 30 minutes of delay increases 1-year mortality by 7.5%.',
    gpActionPlan:
      'STAT 999 AMBULANCE ACTIVATION for primary PCI transfer. Give chewable Aspirin 300 mg + Clopidogrel 300–600 mg (or Ticagrelor 180 mg) + sublingual GTN 0.5 mg (if SBP > 90 and no RV infarction). High-flow oxygen ONLY if SpO2 < 90%. Prepare defibrillator.',
  },
  {
    id: 'ecg-wellens',
    title: "Wellens' Syndrome (Critical Proximal LAD Stenosis)",
    category: 'ischemia',
    badge: 'Pre-Infarction Warning',
    badgeColor: 'bg-purple-700 text-white',
    subtitle: 'High risk of extensive anterior wall MI within days',
    normalRange: 'Upright, asymmetric T waves; no chest lead T-wave inversion beyond V1',
    characteristicPattern: [
      'Type A (25%): Biphasic T waves in leads V2 and V3 (initial positivity followed by terminal negativity)',
      'Type B (75%): Deeply and symmetrically inverted T waves in V2 and V3 (often extending to V1–V4)',
      'Minimal or NO ST-segment elevation (typically < 1 mm)',
      'Preserved precordial R waves and absence of pathological Q waves',
    ],
    waveformType: 'wellens',
    redFlags: [
      'Recent episode of severe angina that has now resolved at presentation',
      'Normal or minimally elevated cardiac enzymes at initial bedside testing',
      'STRESS TESTING IS CONTRAINDICATED (can trigger fatal transmural infarction)',
    ],
    clinicalReasoning:
      "Wellens' pattern represents reperfusion after a transient total or subtotal occlusion of the proximal LAD. The ECG changes typically appear when the patient is PAIN-FREE. It heralds impending catastrophic anterior MI.",
    gpActionPlan:
      'Urgent Cardiology admission for urgent coronary angiography. Do NOT perform exercise treadmill test (ETT). Initiate DAPT (Aspirin + Clopidogrel), therapeutic Enoxaparin, and High-intensity Statin (Atorvastatin 80 mg).',
  },
  {
    id: 'ecg-path-q',
    title: 'Pathological Q-Waves (Silent Diabetic CAD)',
    category: 'ischemia',
    badge: 'Chronic Myocardial Necrosis',
    badgeColor: 'bg-amber-700 text-white',
    subtitle: 'Painless previous myocardial infarction in diabetic autonomic neuropathy',
    normalRange: 'Q-wave duration < 0.04s (< 1 small square); depth < 25% of R wave',
    characteristicPattern: [
      'Wide Q-waves: Duration >= 0.04s (1 small box) in >= 2 contiguous leads',
      'Deep Q-waves: Depth >= 25% of the amplitude of the following R wave',
      'Inferior leads (II, III, aVF) = prior RCA / LCx infarction',
      'Anteroseptal leads (V1–V3) = prior LAD infarction',
    ],
    waveformType: 'qwave',
    redFlags: [
      'Diabetic patient presenting with new unprovoked dyspnea or fatigue (anginal equivalent)',
      'Evidence of heart failure with reduced ejection fraction (HFrEF)',
      'Presence of dynamic ST-T wave changes overlying old Q-waves',
    ],
    clinicalReasoning:
      'Up to 30% of myocardial infarctions in diabetic patients are unrecognized or "silent" due to sensory and cardiac autonomic neuropathy (CAN). Pathological Q waves reflect electrical silence from transmural scar tissue.',
    gpActionPlan:
      'Upgrades patient immediately to Extreme / Very High cardiovascular risk. Target LDL < 1.4 (or < 1.0 mmol/L). Initiate SGLT2 inhibitor for cardiovascular protection, ACEi/ARB, Aspirin 100 mg, and refer for Echocardiogram and Cardiology evaluation.',
  },
  {
    id: 'ecg-afib',
    title: 'Atrial Fibrillation (AFib) in Hypertensive Heart Disease',
    category: 'arrhythmia',
    badge: 'High Stroke Risk',
    badgeColor: 'bg-rose-700 text-white',
    subtitle: 'Chaotic atrial activity requiring thromboembolic stroke prevention',
    normalRange: 'Regular P-P and R-R intervals; discrete P waves preceding each QRS',
    characteristicPattern: [
      'Irregularly irregular ventricular rhythm (varying R-R intervals)',
      'Absence of distinct P waves; replaced by irregular fibrillatory "f" waves (350–600 bpm)',
      'Narrow QRS complex unless underlying bundle branch block present',
      'Rapid ventricular response (RVR > 100 bpm) in untreated patients',
    ],
    waveformType: 'afib',
    redFlags: [
      'Hemodynamic instability: SBP < 90 mmHg, altered mental state, ongoing chest pain (requires immediate synchronized cardioversion)',
      'Rapid ventricular response (HR > 150 bpm) precipitating acute pulmonary edema',
      'Acute focal neurological deficit (stroke / TIA)',
    ],
    clinicalReasoning:
      'Chronic hypertension causes left atrial dilation and electrical remodeling, fostering multiple re-entrant wavelets. Diabetics with AFib have a 5-fold higher risk of thromboembolic stroke.',
    gpActionPlan:
      '1. Calculate CHA2DS2-VASc score (Age, Sex, HTN, DM, Stroke, Vascular disease, HF). If score >= 2 in men or >= 3 in women, initiate Oral Anticoagulation (DOAC: Rivaroxaban, Dabigatran, or Apixaban).\n2. Rate control: Bisoprolol 2.5–5 mg OD or Diltiazem.\n3. Transthoracic echocardiogram to assess LA size and valvular disease.',
  },
  {
    id: 'ecg-hyperk-tented',
    title: 'Hyperkalemia Stage 1: Symmetrical Tented T-Waves',
    category: 'electrolyte',
    badge: 'Potassium 5.5 – 6.5 mmol/L',
    badgeColor: 'bg-red-600 text-white',
    subtitle: 'Early cardiotoxicity from RAAS blockade in diabetic CKD',
    normalRange: 'T-wave amplitude < 5 mm in limb leads, < 10 mm in precordial leads; asymmetric shape',
    characteristicPattern: [
      'Tall, narrow-based, symmetrical, sharply pointed "tented" T waves',
      'Most visible in leads II, III, and V2–V4',
      'Differentiated from hyperacute STEMI T-waves which are broad-based and asymmetric',
      'Normal PR and QRS duration at this early stage',
    ],
    waveformType: 'hyperk_peaked',
    redFlags: [
      'Rapidly rising serum potassium in patient with oliguria / acute gastroenteritis',
      'Progression to PR prolongation or QRS widening (immediate transition to Stage 2/3)',
      'Bradycardia or dropped beats',
    ],
    clinicalReasoning:
      'Elevated extracellular K+ increases myocardial membrane potassium conductance, accelerating Phase 3 repolarization and producing tall, peaked T waves.',
    gpActionPlan:
      'Stat serum K+ confirmation. Withhold ACE-inhibitors, ARBs, Spironolactone, and NSAIDs. Restrict dietary potassium. If K+ >= 6.0 or any further ECG widening: initiate IV Calcium Gluconate 10% 10 mL + IV D50 50 mL + 10U Regular Insulin.',
  },
  {
    id: 'ecg-hyperk-sine',
    title: 'Hyperkalemia Stage 3/4: Sine-Wave Cardiac Arrest Impending',
    category: 'electrolyte',
    badge: 'Fatal Cardiac Arrest Alert',
    badgeColor: 'bg-red-950 text-white',
    subtitle: 'Severe cardiotoxicity (K+ > 7.5 mmol/L) requiring instant resuscitation',
    normalRange: 'QRS duration < 0.12s (< 3 small squares)',
    characteristicPattern: [
      'Complete loss of P waves (sinoventricular conduction)',
      'Severe, marked QRS widening merging directly with the T-wave',
      'Continuous, undulating sinusoidal waveform ("Sine-Wave" pattern)',
      'Bradycardia progressing to ventricular fibrillation or asystole',
    ],
    waveformType: 'hyperk_sine',
    redFlags: [
      'Altered consciousness, severe weakness, flaccid quadriplegia',
      'Profound hypotension / impending cardiac arrest',
    ],
    clinicalReasoning:
      'Severe extracellular hyperkalemia depolarizes the resting membrane potential, inactivating sodium channels and slowing Phase 0 depolarization across the entire cardiac conduction system.',
    gpActionPlan:
      'CRITICAL RESUSCITATION: 1) IV Calcium Gluconate 10% 10 mL IV push over 2–3 minutes (repeat every 5 min until QRS narrows). 2) IV Dextrose 50% 50 mL + 10 units Regular Insulin over 15 min. 3) Salbutamol nebulizer 20 mg. 4) Immediate emergency ambulance transfer for emergency hemodialysis.',
  },
  {
    id: 'ecg-hypok-u',
    title: 'Hypokalemia: ST Depression & Prominent U-Waves',
    category: 'electrolyte',
    badge: 'Potassium < 3.0 mmol/L',
    badgeColor: 'bg-amber-600 text-white',
    subtitle: 'Secondary to high-dose loop or thiazide diuretics in hypertension',
    normalRange: 'U wave amplitude < 1 mm or absent; T wave upright',
    characteristicPattern: [
      'Flattened or inverted T waves',
      'Prominent U waves (> 1 mm or larger than the T wave, best observed in V2–V4)',
      'Apparent prolongation of QT interval (QU interval prolongation)',
      'Mild downsloping ST-segment depression',
    ],
    waveformType: 'hypok_u',
    redFlags: [
      'Ventricular ectopics (PVCs), bigeminy, or trigeminy',
      'Polymorphic ventricular tachycardia (Torsades de Pointes)',
      'Muscle cramping, weakness, or hypoventilation',
    ],
    clinicalReasoning:
      'Hypokalemia delays ventricular repolarization, causing prominent Purkinje fiber repolarization deflections (U waves). It creates electrical dispersion and triggers early afterdepolarizations (EADs).',
    gpActionPlan:
      'Replenish potassium: Mist KCl 15–30 mL TDS or Slow-K tablets 1200–2400 mg daily. Check serum magnesium (hypomagnesemia prevents intracellular potassium repletion). Down-titrate loop or thiazide diuretics.',
  },
  {
    id: 'ecg-long-qt',
    title: 'Drug-Induced Prolonged QTc & Torsades Warning',
    category: 'drug',
    badge: 'Pharmacovigilance Risk',
    badgeColor: 'bg-purple-800 text-white',
    subtitle: 'Synergistic prolongation from antibiotics, diuretics, and psychotropics',
    normalRange: 'QTc <= 450 ms (men); <= 460 ms (women)',
    characteristicPattern: [
      'Prolonged QTc interval (> 470 ms in men, > 480 ms in women; > 500 ms = Critical High Risk)',
      'Bazett Formula: QTc = QT / √(RR interval in seconds)',
      'T-wave widening and notched or biphasic morphology',
      'Torsades de Pointes: Rapid, irregular ventricular tachycardia twisting around the baseline',
    ],
    waveformType: 'long_qt',
    redFlags: [
      'QTc > 500 ms or prolongation > 60 ms from baseline',
      'Episodes of unexplained syncope, presyncope, or palpitations',
      'Concurrent administration of multiple QT-prolonging agents (e.g. Ciprofloxacin + Indapamide)',
    ],
    clinicalReasoning:
      'Blockade of the human ether-a-go-go-related gene (hERG) delayed rectifier potassium channel ($I_{Kr}$) prolongs cardiac action potential duration, promoting lethal polymorphic ventricular arrhythmias.',
    gpActionPlan:
      'Discontinue all offending QT-prolonging drugs immediately. Ensure serum K+ is > 4.0 mmol/L and Mg2+ is > 0.8 mmol/L. If polymorphic VT or syncope occurs: IV Magnesium Sulfate 2g over 10 min + Emergency ED transfer.',
  },
];
