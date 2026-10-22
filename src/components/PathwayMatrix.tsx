import React, { useState } from 'react';
import { GitBranch, Shield, Heart, Activity, AlertTriangle, CheckCircle2, ChevronRight, Layers } from 'lucide-react';

export const PathwayMatrix: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [searchFilter, setSearchFilter] = useState<string>('');

  const DRUG_MATRIX_DATA = [
    {
      class: 'SGLT2 Inhibitor',
      agents: 'Empagliflozin (Jardiance 10–25mg) / Dapagliflozin (Forxiga 10mg)',
      indication: '1st-line organ protection in T2DM with CKD, Heart Failure (HFrEF/HFpEF), or established ASCVD regardless of HbA1c',
      renalCutoff: 'Initiate down to eGFR 20 mL/min; continue until dialysis for renal/cardiac preservation',
      monitoring: 'Genital hygiene, hydration status. Withhold during acute illness (SADMANS)',
      safety: 'Risk of Euglycemic DKA during surgery or starvation; Fournier gangrene (rare)',
    },
    {
      class: 'GLP-1 Receptor Agonist',
      agents: 'Dulaglutide (Trulicity 0.75–1.5mg SC qw) / Semaglutide (Ozempic 0.25–1mg qw / Rybelsus 3–14mg PO)',
      indication: 'Established ASCVD or high CV risk, obesity / weight reduction priority',
      renalCutoff: 'Dulaglutide safe down to eGFR 15 mL/min; Semaglutide no dose adjustment required',
      monitoring: 'Nausea, vomiting, GI tolerability (slow dose titration)',
      safety: 'Contraindicated in personal/family history of Medullary Thyroid Carcinoma or MEN 2; history of pancreatitis',
    },
    {
      class: 'Biguanide',
      agents: 'Metformin (Glucophage 500mg, 850mg, 1000mg, XR 500–1000mg)',
      indication: 'Foundational 1st-line oral glucose-lowering therapy in all robust T2DM patients',
      renalCutoff: 'eGFR ≥60: max 2000mg; eGFR 45–59: 3–6 monthly checks; eGFR 30–44: max 1000mg/day; eGFR <30: STRICTLY CONTRAINDICATED',
      monitoring: 'Serum creatinine/eGFR, Vitamin B12 levels on long-term therapy',
      safety: 'Metformin-Associated Lactic Acidosis (MALA) in hypoperfusion / severe sepsis / AKI',
    },
    {
      class: 'DPP-4 Inhibitor (Renal safe)',
      agents: 'Linagliptin (Trajenta 5mg) / Sitagliptin (Januvia 25–100mg) / Vildagliptin (Galvus 50mg)',
      indication: 'Add-on oral therapy with neutral weight and extremely low hypoglycemia risk; ideal in elderly and renal impairment',
      renalCutoff: 'Linagliptin: NO RENAL ADJUSTMENT (95% biliary excretion); Sitagliptin: 50mg if eGFR 30–44, 25mg if <30',
      monitoring: 'Well tolerated, minimal monitoring needed',
      safety: 'Avoid combining with GLP-1 RA (redundant mechanism); discontinue if acute pancreatitis',
    },
    {
      class: 'ACE-Inhibitor (A)',
      agents: 'Perindopril (Coversyl 4–8mg) / Ramipril (Tritace 5–10mg) / Enalapril (5–20mg)',
      indication: '1st-line antihypertensive in T2DM, microalbuminuria, post-MI, or heart failure',
      renalCutoff: 'Up to 30% rise in serum creatinine from baseline is acceptable hemodynamic response; withhold if K+ ≥ 5.5',
      monitoring: 'Serum Creatinine & K+ at 2–4 weeks after initiation or dose escalation',
      safety: 'Dry bradykinin cough (switch to ARB), Angioedema, Hyperkalemia. Strictly contraindicated in pregnancy',
    },
    {
      class: 'Angiotensin Receptor Blocker (A)',
      agents: 'Telmisartan (Micardis 40–80mg) / Losartan (Cozaar 50–100mg) / Valsartan (Diovan 80–160mg)',
      indication: '1st-line alternative to ACEi (no dry cough); excellent cardiorenal and metabolic profile',
      renalCutoff: 'Acceptable rise in creatinine up to 30%; withhold if persistent hyperkalemia',
      monitoring: 'Serum Creatinine and Potassium',
      safety: 'Contraindicated in pregnancy and bilateral renal artery stenosis',
    },
    {
      class: 'Dihydropyridine CCB (C)',
      agents: 'Amlodipine (Norvasc 5–10mg) / Felodipine (Plendil 5–10mg)',
      indication: '1st-line in isolated systolic hypertension, elderly, and preferred partner in Single-Pill Combinations (A+C)',
      renalCutoff: 'No renal adjustment needed; excellent renal blood flow preservation',
      monitoring: 'Bilateral ankle edema (vasodilatory, not heart failure fluid overload)',
      safety: 'Flushing, headache, reflex tachycardia (rare with long-acting agents)',
    },
    {
      class: 'Thiazide-like Diuretic (D)',
      agents: 'Indapamide SR (Natrilix SR 1.5mg) / Chlorthalidone (12.5–25mg)',
      indication: 'Preferred diuretic in CPG HTN 2026; metabolic neutral; superior stroke and CVD event reduction over HCTZ',
      renalCutoff: 'Less effective if eGFR < 30 mL/min (switch to Loop Diuretic e.g. Furosemide)',
      monitoring: 'Serum sodium (hyponatremia in elderly), potassium (hypokalemia), uric acid',
      safety: 'Hyperuricemia/gout precipitation, hypokalemia',
    },
    {
      class: 'High-Intensity Statin',
      agents: 'Atorvastatin (Lipitor 40–80mg) / Rosuvastatin (Crestor 20–40mg)',
      indication: 'Mandatory in High, Very High, and Extreme CV risk categories; delivers ≥50% LDL reduction',
      renalCutoff: 'Atorvastatin: no renal dose adjustment; Rosuvastatin: start 5mg if eGFR < 30',
      monitoring: 'Baseline ALT/AST and CK; recheck lipids at 4–12 weeks to assess target attainment',
      safety: 'Statin-associated muscle symptoms (SAMS), rare rhabdomyolysis; check drug-drug interactions',
    },
    {
      class: 'Cholesterol Absorption Inhibitor',
      agents: 'Ezetimibe (Ezetrol 10mg)',
      indication: 'Add-on to high-intensity statin if LDL goal not met; gives additional 15–20% LDL drop',
      renalCutoff: 'Safe in renal impairment without dose adjustment',
      monitoring: 'Check lipid profile 4–12 weeks after addition',
      safety: 'Minimal systemic side effects; excellent gastrointestinal tolerability',
    },
    {
      class: 'Peroxisome Proliferator (Fibrate)',
      agents: 'Fenofibrate (Lipanthyl 145mg / 160mg)',
      indication: 'URGENT PRIORITY when fasting Triglycerides ≥ 5.6 mmol/L to prevent Acute Pancreatitis',
      renalCutoff: 'Reduce dose if eGFR 30–59; contraindicated if eGFR < 30 mL/min',
      monitoring: 'Renal function and muscle enzymes',
      safety: 'Do NOT combine Gemfibrozil with statins (high rhabdomyolysis risk). Fenofibrate is the safer fibrate',
    },
  ];

  const filteredDrugs = DRUG_MATRIX_DATA.filter(
    (d) =>
      d.class.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.agents.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.indication.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-emerald-600" />
              Unified Malaysian Primary Care Decision Flowchart & Drug Matrix
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Cross-referencing CPG T2DM (6th Ed), CPG HTN (6th Ed, 2026), CPG Dyslipidemia (6th Ed, 2023), and CPG DKD.
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-full border border-emerald-200 dark:border-emerald-800">
            Interactive Clinical Logic
          </span>
        </div>
      </div>

      {/* 4-Step Interactive Flowchart */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          {
            step: 1,
            title: 'Cardiovascular Risk Stratification',
            summary: 'Tier patient into Extreme, Very High, High, or Moderate based on ASCVD, TOD & CKD',
            icon: Shield,
            color: 'emerald',
          },
          {
            step: 2,
            title: 'Tri-Target Formulation',
            summary: 'Individualize goals: BP (<130/80 or <140/90), LDL (<1.0, <1.4, <1.8), HbA1c (6.6-7.0%)',
            icon: Activity,
            color: 'blue',
          },
          {
            step: 3,
            title: 'Organ-Protection First',
            summary: 'Prescribe SGLT2i / GLP-1 RA for ASCVD/HF/CKD regardless of baseline HbA1c',
            icon: Heart,
            color: 'rose',
          },
          {
            step: 4,
            title: 'Synergistic Combination Escalation',
            summary: 'Deploy Single-Pill Combinations (A+C or A+D) and Statin + Ezetimibe combinations early',
            icon: Layers,
            color: 'amber',
          },
        ].map((item) => {
          const Icon = item.icon;
          const isSelected = activeStep === item.step;
          return (
            <button
              key={item.step}
              onClick={() => setActiveStep(item.step)}
              className={`p-4 rounded-2xl text-left border transition-all ${
                isSelected
                  ? 'bg-white dark:bg-slate-800 border-emerald-600 dark:border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                  : 'bg-white/60 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                  Step {item.step}
                </span>
                <Icon className={`w-4 h-4 text-emerald-600`} />
              </div>
              <h4 className="font-bold text-xs text-slate-900 dark:text-white">{item.title}</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                {item.summary}
              </p>
            </button>
          );
        })}
      </div>

      {/* Step Detail Expandable Panel */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-xs text-xs space-y-4">
        {activeStep === 1 && (
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-600" />
              Step 1: Malaysian Multi-Factorial Cardiovascular Risk Stratification
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              <div className="p-3 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900 rounded-xl space-y-1">
                <span className="font-extrabold text-purple-900 dark:text-purple-300">Extreme Risk Tier</span>
                <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-purple-950 dark:text-purple-200">
                  <li>Established ASCVD with a second vascular event within past 2 years</li>
                  <li>Established ASCVD in patient with Diabetes AND CKD (eGFR &lt; 60 or UACR A2/A3)</li>
                  <li>Premature CAD in patient with Familial Hypercholesterolemia (LDL &ge; 4.9)</li>
                  <li>Target LDL-C: <b>&lt; 1.0 mmol/L</b> with &ge; 50% baseline drop</li>
                </ul>
              </div>
              <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-xl space-y-1">
                <span className="font-extrabold text-rose-900 dark:text-rose-300">Very High Risk Tier</span>
                <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-rose-950 dark:text-rose-200">
                  <li>Documented clinical ASCVD (prior MI, CABG, PCI, Stroke, TIA, symptomatic PAD)</li>
                  <li>T2DM with microvascular target organ damage (Retinopathy, Neuropathy, or Albuminuria)</li>
                  <li>Severe Chronic Kidney Disease (eGFR &lt; 30 mL/min/1.73m²)</li>
                  <li>Target LDL-C: <b>&lt; 1.4 mmol/L</b> with &ge; 50% baseline drop</li>
                </ul>
              </div>
              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 rounded-xl space-y-1">
                <span className="font-extrabold text-amber-900 dark:text-amber-300">High Risk Tier</span>
                <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-amber-950 dark:text-amber-200">
                  <li>T2DM duration &ge; 10 years without TOD OR with &ge; 1 other CV risk factor (smoking, HTN)</li>
                  <li>Moderate CKD (eGFR 30–59 mL/min/1.73m²)</li>
                  <li>Severe single risk factor (LDL &ge; 4.9 mmol/L, Total Cholesterol &ge; 8.0, BP &ge; 180/110)</li>
                  <li>Target LDL-C: <b>&lt; 1.8 mmol/L</b> with &ge; 50% baseline drop</li>
                </ul>
              </div>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 rounded-xl space-y-1">
                <span className="font-extrabold text-emerald-900 dark:text-emerald-300">Moderate / Low Risk Tier</span>
                <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-emerald-950 dark:text-emerald-200">
                  <li>Young patients with T2DM (&lt; 40 years) with short duration (&lt; 10 years) and no complications</li>
                  <li>Non-diabetic with calculated 10-year CV risk &lt; 10%</li>
                  <li>Target LDL-C: <b>&lt; 2.6 mmol/L</b> (Moderate) or <b>&lt; 3.0 mmol/L</b> (Low)</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeStep === 2 && (
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-600" />
              Step 2: Tri-Target Formulation (CPG HTN 2026, DLP 2023, T2DM 6th Ed)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="font-bold text-slate-800 dark:text-slate-200 block text-xs">1. Blood Pressure Target</span>
                <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                  <b>&lt; 130 / 80 mmHg</b> for all diabetic, CKD, or ASCVD patients.<br />
                  <b>&lt; 140 / 90 mmHg</b> for frail elderly (&ge;65y).<br />
                  <span className="text-rose-600 dark:text-rose-400 font-semibold">Avoid DBP &lt; 60 mmHg in CAD to preserve coronary flow.</span>
                </p>
              </div>
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="font-bold text-slate-800 dark:text-slate-200 block text-xs">2. LDL-Cholesterol Target</span>
                <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                  Extreme: <b>&lt; 1.0 mmol/L</b><br />
                  Very High: <b>&lt; 1.4 mmol/L</b><br />
                  High: <b>&lt; 1.8 mmol/L</b><br />
                  Requires &ge;50% drop from baseline on High-intensity statin &plusmn; Ezetimibe.
                </p>
              </div>
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="font-bold text-slate-800 dark:text-slate-200 block text-xs">3. Glycemic Target (HbA1c)</span>
                <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                  Standard: <b>6.6 – 7.0 %</b><br />
                  Young / New onset / No complications: <b>&le; 6.5 %</b><br />
                  Frail Elderly / High Hypo Risk: <b>7.1 – 8.0 %</b> (relax targets to prevent fatal falls/neuroglycopenia).
                </p>
              </div>
            </div>
          </div>
        )}

        {activeStep === 3 && (
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-600" />
              Step 3: Organ-Protection First Principle (Cardiorenal SGLT2i / GLP-1 RA Axis)
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
              In modern Malaysian guideline practice, antihyperglycemic selection has moved beyond pure glucose lowering. In patients with <b>established ASCVD, Heart Failure, or Chronic Kidney Disease</b>, SGLT2 inhibitors or GLP-1 RAs are initiated for organ protection regardless of current HbA1c!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 rounded-xl">
                <span className="font-bold text-emerald-900 dark:text-emerald-300 block mb-1">CKD &amp; Heart Failure: SGLT2 Inhibitors</span>
                <p className="text-[11px] text-emerald-950 dark:text-emerald-200">
                  Empagliflozin 10–25 mg or Dapagliflozin 10 mg. Initiated down to eGFR 20 mL/min to slow renal functional decline, attenuate microalbuminuria, and reduce HF hospitalizations by ~30%.
                </p>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 rounded-xl">
                <span className="font-bold text-blue-900 dark:text-blue-300 block mb-1">Established Atherosclerosis: GLP-1 RA</span>
                <p className="text-[11px] text-blue-950 dark:text-blue-200">
                  Dulaglutide or Semaglutide. Demonstrates powerful reduction in stroke, recurrent MI, and cardiovascular mortality while facilitating weight loss.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeStep === 4 && (
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-600" />
              Step 4: Upfront Single-Pill Combinations &amp; Combination Lipid Lowering
            </h3>
            <div className="space-y-2 text-slate-700 dark:text-slate-300 text-xs leading-relaxed">
              <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border">
                <span className="font-bold text-slate-900 dark:text-white block mb-1">CPG HTN 2026 Core Shift: Single-Pill Combination (SPC) Upfront</span>
                <p className="text-[11px]">
                  When BP is &ge; 20/10 mmHg above goal (e.g. SBP &ge; 150 or DBP &ge; 90), starting monotherapy results in high therapeutic inertia. Start SPC: <b>A+C</b> (Perindopril/Amlodipine or Telmisartan/Amlodipine) or <b>A+D</b> (Perindopril/Indapamide SR).
                </p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border">
                <span className="font-bold text-slate-900 dark:text-white block mb-1">CPG Dyslipidemia 2023: Statin + Ezetimibe Synergy</span>
                <p className="text-[11px]">
                  Doubling statin dose yields only an additional ~6% LDL reduction ("Rule of 6"), but adding Ezetimibe 10 mg yields an additional 15–20% reduction. Add Ezetimibe at 4–12 weeks if LDL remains above target.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Drug Escalation Matrix Table */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-700 pb-3">
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Primary Care Pharmacotherapy Formulary &amp; Renal Cut-Offs (Malaysia)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Generic classes, brand equivalents commonly seen in Malaysia, renal restrictions, and safety alerts.
            </p>
          </div>
          <input
            type="text"
            placeholder="Search drug / class..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 w-full sm:w-60 focus:outline-emerald-600"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse min-w-[720px]">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[11px] border-b border-slate-200 dark:border-slate-700">
                <th className="p-3 font-bold">Class &amp; Malaysian Agents</th>
                <th className="p-3 font-bold">CPG Indication &amp; Role</th>
                <th className="p-3 font-bold text-amber-600 dark:text-amber-400">Renal Cut-Off (eGFR)</th>
                <th className="p-3 font-bold">Key Safety &amp; Monitoring</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-slate-700 dark:text-slate-300">
              {filteredDrugs.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                  <td className="p-3 font-semibold text-slate-900 dark:text-white">
                    <span className="block font-bold text-emerald-700 dark:text-emerald-400">{row.class}</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">{row.agents}</span>
                  </td>
                  <td className="p-3 text-[11px] max-w-xs">{row.indication}</td>
                  <td className="p-3 text-[11px] font-medium text-amber-800 dark:text-amber-300">{row.renalCutoff}</td>
                  <td className="p-3 text-[11px] text-slate-600 dark:text-slate-400 max-w-xs">
                    <span className="block"><b>Monitor:</b> {row.monitoring}</span>
                    <span className="block text-rose-600 dark:text-rose-400 mt-0.5"><b>Safety:</b> {row.safety}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
