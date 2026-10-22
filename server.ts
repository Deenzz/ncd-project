import express from 'express';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT) || 3000;

// Initialize Google Gen AI
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const MALAYSIAN_CPG_SYSTEM_INSTRUCTION = `You are a Senior Consultant Family Medicine Specialist (FMS) and Clinical Pharmacologist advising General Practitioners (GPs) and Medical Officers in primary care clinics across Malaysia (Klinik Kesihatan and private GP practices).

Your advice is strictly anchored in the official Malaysian Ministry of Health (MOH) Clinical Practice Guidelines (CPGs):
1. MOH CPG Management of Type 2 Diabetes Mellitus (6th Edition)
2. MOH CPG Management of Hypertension (6th Edition, 2026)
3. MOH CPG Management of Dyslipidemia (6th Edition, 2023)
4. MOH CPG Management of Diabetic Kidney Disease / Chronic Kidney Disease

Key Malaysian CPG rules to always enforce:
- Risk Tiering:
  * Extreme Risk: Established ASCVD with recurrent event (<2y), ASCVD + DM + CKD, or CAD + Familial Hypercholesterolemia. Target LDL < 1.0 mmol/L with >=50% reduction.
  * Very High Risk: Documented ASCVD (prior MI, CABG, PCI, ischemic stroke, PAD), or T2DM with microvascular target organ damage (retinopathy, neuropathy, nephropathy/albuminuria), or severe CKD (eGFR <30), or 10-year FRS >20%. Target LDL < 1.4 mmol/L with >=50% reduction.
  * High Risk: T2DM >=10 years or with >=1 cardiovascular risk factor (smoking, HTN), moderate CKD (eGFR 30-59), or severe single risk factor (LDL >=4.9, BP >=180/110). Target LDL < 1.8 mmol/L with >=50% reduction.
  * Moderate Risk: Young diabetic (<40y) with duration <10y and no other risk factors. Target LDL < 2.6 mmol/L.
- Blood Pressure Targets:
  * < 130/80 mmHg for all patients with T2DM, CKD, or established ASCVD.
  * In elderly (>=65y) or frail patients, systolic target is 130-139 mmHg (or <140/90 mmHg).
  * Caution: In patients with established CAD, avoid lowering DBP < 60 mmHg (coronary perfusion hazard).
  * 1st Line in DM/CKD/Microalbuminuria: ACE-inhibitor (e.g. Perindopril 4-8mg, Ramipril 5-10mg) or ARB (e.g. Telmisartan 40-80mg, Losartan 50-100mg).
  * Single-Pill Combinations (SPC): Recommended upfront if baseline BP is >=20/10 mmHg above target (A+C: ACEi/ARB + CCB e.g., Amlodipine; or A+D: ACEi/ARB + Indapamide SR 1.5mg).
- Glycemic & Organ Protection:
  * SGLT2 inhibitors (Empagliflozin 10-25mg, Dapagliflozin 10mg) or GLP-1 RAs (Dulaglutide, Semaglutide) must be initiated for patients with established ASCVD, Heart Failure (HFrEF/HFpEF), or CKD (eGFR 20-60 or UACR >=30 mg/mmol) regardless of baseline HbA1c!
  * Metformin safety: Maintain dose up to 2000mg if eGFR >=60; maximum 1000mg/day if eGFR 30-44; strictly discontinue if eGFR < 30 mL/min/1.73m² (risk of lactic acidosis).
  * If eGFR is low or renal adjustment needed: Linagliptin 5mg requires no renal dose adjustment down to dialysis.
  * Standard HbA1c target: 6.6% - 7.0%. Stringent <=6.5% for young/new onset without complications. Relaxed 7.1% - 8.0% for frail elderly or patients with severe hypoglycemia unawareness.
- Lipid Escalation:
  * High-intensity statin: Atorvastatin 40-80mg or Rosuvastatin 20-40mg daily.
  * Add Ezetimibe 10mg daily if LDL-C target not achieved at 4-12 weeks follow-up.
  * Severe Hypertriglyceridemia (TG >= 5.6 mmol/L): Priority is prevention of acute pancreatitis! Restrict simple sugars/alcohol and initiate Fenofibrate 145mg daily before focusing on LDL.
- Sick-Day Medication Protocol (SADMANS):
  * Temporarily withhold Sulfonylureas, ACE-inhibitors, Diuretics, Metformin, ARBs, NSAIDs, and SGLT2 inhibitors during acute illness, dehydration, vomiting, or diarrhea.
  * SGLT2 inhibitors must be stopped to prevent normoglycemic/euglycemic DKA.

Format responses with high clinical clarity:
- Use clear bullet points and bold highlights for critical drug dosages and warnings.
- Provide practical primary care steps that a Malaysian GP can immediately write on a prescription pad.
- Maintain professional, empathetic medical collegiality.`;

async function generateWithFallback(prompt: string) {
  if (!ai) throw new Error('Gemini API is not configured. Please ensure GEMINI_API_KEY is available.');
  const modelsToTry = ['gemini-3.8-flash', 'gemini-flash-latest'];
  let lastError: unknown = null;

  for (const model of modelsToTry) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          systemInstruction: MALAYSIAN_CPG_SYSTEM_INSTRUCTION,
          temperature: 0.2,
        },
      });
      if (response && response.text) {
        return response.text;
      }
    } catch (err) {
      lastError = err;
      console.warn(`Model ${model} failed, trying next if available...`, err);
    }
  }
  throw lastError;
}

// API route: AI Clinical Consult Reasoning
app.post('/api/consult-ai', async (req, res) => {
  try {
    const { patient, triage } = req.body;

    const prompt = `Patient Clinical Presentation:
- Age: ${patient.age} years old, Sex: ${patient.gender}, Smoker: ${patient.isSmoker ? 'Yes' : 'No'}, Frailty: ${patient.isFrail ? 'Frail/Elderly' : 'Robust'}
- Blood Pressure: ${patient.sbp}/${patient.dbp} mmHg, Heart Rate: ${patient.hr} bpm
- Diabetes: ${patient.hasDm ? 'Yes (Duration: ' + (patient.dmDurationOver10 ? '>= 10 yrs' : '< 10 yrs') + ')' : 'No'}, HbA1c: ${patient.hba1c}%
- Lipid Profile: Total Chol: ${patient.tc} mmol/L, LDL-C: ${patient.ldl} mmol/L, HDL-C: ${patient.hdl} mmol/L, TG: ${patient.tg} mmol/L
- Renal Profile: eGFR: ${patient.egfr} mL/min/1.73m², Urine Albumin (UACR): ${patient.uacr}, Serum K+: ${patient.k} mmol/L
- Comorbidities: Established ASCVD: ${patient.hasAscvd ? 'Yes' : 'No'}, Recurrent ASCVD (<2y): ${patient.hasRecurrentAscvd ? 'Yes' : 'No'}, Heart Failure: ${patient.hasHf ? 'Yes' : 'No'}, Microvascular TOD (retinopathy/neuropathy): ${patient.hasTod ? 'Yes' : 'No'}
- Current Algorithmic Tier: ${triage.riskTier} Risk
- Algorithmic Targets: BP: ${triage.goalBp}, LDL-C: ${triage.goalLdl}, HbA1c: ${triage.goalHba1c}

Task:
Please provide a comprehensive Clinical Decision Support & Expert Clinical Reasoning note for the Primary Care Doctor / GP:
1. Executive Clinical Synthesis & Risk Tier Justification (cite specific CPG criteria).
2. Gap Analysis & Pathophysiology (explain the danger of current BP, LDL-C, HbA1c, eGFR/albuminuria status).
3. Evidence-Based Pharmacotherapy Prescription Plan (Specify exact Malaysian drug regimens, starting dose, titration target, and timing).
4. Renal & Safety Cut-offs (Specific advice on Metformin, SGLT2i, RAAS blockers, and K+ monitoring).
5. Sick-Day Action (SADMANS rules tailored to this patient).
6. Structured Consultation & Referral Note (A concise clinical summary that the GP can print or paste into the clinic EMR/referral letter to KK FMS, Cardiology, or Nephrology).`;

    const text = await generateWithFallback(prompt);
    return res.json({ result: text });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('Error in /api/consult-ai:', message);
    return res.status(500).json({ error: message });
  }
});

// API route: Ask AI Clinical Assistant
app.post('/api/ask-ai', async (req, res) => {
  try {
    const { question, patientContext } = req.body;

    const prompt = `Primary Care Doctor Question:
"${question}"

${
  patientContext
    ? `Current Patient Context:
Age ${patientContext.age}, ${patientContext.gender}, BP: ${patientContext.sbp}/${patientContext.dbp}, HbA1c: ${patientContext.hba1c}%, LDL-C: ${patientContext.ldl} mmol/L, eGFR: ${patientContext.egfr} mL/min, UACR: ${patientContext.uacr}, K+: ${patientContext.k} mmol/L, Comorbidities: ${patientContext.comorbidities || 'None'}`
    : 'General Malaysian Primary Care query.'
}

Please provide an authoritative, practical, and concise response based on the Malaysian MOH CPGs (T2DM 6th Ed, HTN 2026, Dyslipidemia 2023, CKD). Include specific drug dosages, monitoring schedules, and referral thresholds where appropriate.`;

    const text = await generateWithFallback(prompt);
    return res.json({ result: text });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('Error in /api/ask-ai:', message);
    return res.status(500).json({ error: message });
  }
});

// API route: Drug Interaction & Polypharmacy Deep Analysis
app.post('/api/check-interactions', async (req, res) => {
  try {
    const { medications, patientContext } = req.body;

    if (!Array.isArray(medications) || medications.length === 0) {
      return res.status(400).json({ error: 'Medications list must not be empty.' });
    }

    const prompt = `You are a Senior Clinical Pharmacologist and Primary Care Medication Safety Specialist in Malaysia.
Evaluate this patient's polypharmacy regimen for Drug-Drug Interactions (DDIs), contraindications, and synergistic guideline combinations according to the Malaysian MOH Drug Formulary (FUKKM) and Malaysian CPGs (T2DM, HTN 2026, Dyslipidemia 2023, CKD).

Medication Regimen:
${medications.map((m: string, i: number) => `${i + 1}. ${m}`).join('\n')}

${
  patientContext
    ? `Patient Clinical Context:
- Age: ${patientContext.age}, Sex: ${patientContext.gender}
- Blood Pressure: ${patientContext.sbp}/${patientContext.dbp} mmHg
- HbA1c: ${patientContext.hba1c}%, eGFR: ${patientContext.egfr} mL/min/1.73m², Urine Albumin: ${patientContext.uacr}, K+: ${patientContext.k} mmol/L
- Comorbidities: ${patientContext.comorbidities || 'None'}`
    : ''
}

Please provide a structured, high-yield primary care review:
1. **Critical Contraindications & Major Alerts** (Highlight fatal combinations such as Dual RAAS, Triple Whammy, Statin+Gemfibrozil, Metformin MALA cutoffs, Clopidogrel+Omeprazole, Non-DHP CCB+Beta Blocker, or severe hypoglycemia).
2. **Moderate Interactions to Monitor** (Dosage adjustments, timing spacing, and laboratory monitoring timelines).
3. **Guideline-Directed Synergies (Positive Combinations)** (e.g. A+C, A+D, Statin+Ezetimibe, SGLT2i+RAAS in CKD).
4. **Actionable Primary Care Prescribing Advice** (Specify exact safer substitute drugs, dose titrations, and patient counseling pearls for the GP prescription pad).`;

    const text = await generateWithFallback(prompt);
    return res.json({ result: text });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('Error in /api/check-interactions:', message);
    return res.status(500).json({ error: message });
  }
});

// Setup dev server or static files
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Malaysian NCD Triple-Target Master running on port ${PORT}`);
  });
}

startServer();
