import React, { useState } from 'react';
import { PatientProfile, TriageResult } from '../types/ncd';
import {
  Sliders,
  RotateCcw,
  Bot,
  Send,
  Copy,
  Check,
  AlertTriangle,
  ShieldAlert,
  ArrowUpRight,
  Sparkles,
  HelpCircle,
  FileText,
  Loader2,
  Heart,
  Activity,
  Flame,
} from 'lucide-react';

interface TripleTargetEngineProps {
  patient: PatientProfile;
  setPatient: React.Dispatch<React.SetStateAction<PatientProfile>>;
  triage: TriageResult;
  onReset: () => void;
}

export const TripleTargetEngine: React.FC<TripleTargetEngineProps> = ({
  patient,
  setPatient,
  triage,
  onReset,
}) => {
  // AI Consultation State
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiConsultResult, setAiConsultResult] = useState<string | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Interactive Ask AI State
  const [askQuestion, setAskQuestion] = useState('');
  const [isAskLoading, setIsAskLoading] = useState(false);
  const [askAnswer, setAskAnswer] = useState<string | null>(null);

  const handleConsultAi = async () => {
    setIsAiLoading(true);
    setAiError(null);
    try {
      const response = await fetch('/api/consult-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patient, triage }),
      });
      const data = await response.json();
      if (response.ok) {
        setAiConsultResult(data.result);
      } else {
        setAiError(data.error || 'Failed to generate clinical consult.');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Network error connecting to AI engine.';
      setAiError(msg);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleAskAi = async (q?: string) => {
    const questionText = q || askQuestion;
    if (!questionText.trim()) return;
    setIsAskLoading(true);
    setAskAnswer(null);
    try {
      const response = await fetch('/api/ask-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: questionText,
          patientContext: {
            age: patient.age,
            gender: patient.gender,
            sbp: patient.sbp,
            dbp: patient.dbp,
            hba1c: patient.hba1c,
            ldl: patient.ldl,
            egfr: patient.egfr,
            uacr: patient.uacr,
            k: patient.k,
            comorbidities: `${patient.hasAscvd ? 'ASCVD, ' : ''}${patient.hasHf ? 'Heart Failure, ' : ''}${
              patient.hasTod ? 'TOD' : ''
            }`,
          },
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setAskAnswer(data.result);
      } else {
        setAskAnswer(`Error: ${data.error}`);
      }
    } catch {
      setAskAnswer('Network error connecting to AI engine.');
    } finally {
      setIsAskLoading(false);
    }
  };

  const handleCopyConsult = () => {
    if (!aiConsultResult) return;
    navigator.clipboard.writeText(aiConsultResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* 2-Column Clinical Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: SINGLE-FORM ENTRY (7 COLS) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 sm:p-5 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-emerald-600" />
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Patient Profile &amp; NCD Clinical Parameters
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  MOH Malaysia Unified Input Entry (T2DM, HTN 2026 &amp; DLP 2023)
                </p>
              </div>
            </div>
            <button
              onClick={onReset}
              className="text-xs text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 flex items-center gap-1 transition"
              title="Reset to default case"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Demographics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                Age (Years)
              </label>
              <input
                type="number"
                value={patient.age}
                onChange={(e) => setPatient({ ...patient, age: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-emerald-600"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                Gender
              </label>
              <select
                value={patient.gender}
                onChange={(e) =>
                  setPatient({ ...patient, gender: e.target.value as 'male' | 'female' })
                }
                className="w-full px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-emerald-600"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                Smoking Status
              </label>
              <select
                value={patient.isSmoker ? 'yes' : 'no'}
                onChange={(e) => setPatient({ ...patient, isSmoker: e.target.value === 'yes' })}
                className="w-full px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-emerald-600"
              >
                <option value="no">Non-Smoker</option>
                <option value="yes">Current Smoker / Vaper</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                Frailty / Age Target
              </label>
              <select
                value={patient.isFrail ? 'frail' : 'robust'}
                onChange={(e) => setPatient({ ...patient, isFrail: e.target.value === 'frail' })}
                className="w-full px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-emerald-600"
              >
                <option value="robust">Robust Adult</option>
                <option value="frail">Frail Elderly / High Hypo Risk</option>
              </select>
            </div>
          </div>

          {/* Blood Pressure & Heart Rate */}
          <div className="p-3.5 bg-slate-50/70 dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-700/80 space-y-3">
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-blue-600" />
              Hypertension Profile (CPG HTN 2026)
            </h4>
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Systolic BP (mmHg)
                </label>
                <input
                  type="number"
                  value={patient.sbp}
                  onChange={(e) => setPatient({ ...patient, sbp: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border rounded-xl bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-blue-600"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Diastolic BP (mmHg)
                </label>
                <input
                  type="number"
                  value={patient.dbp}
                  onChange={(e) => setPatient({ ...patient, dbp: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border rounded-xl bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-blue-600"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Resting HR (bpm)
                </label>
                <input
                  type="number"
                  value={patient.hr}
                  onChange={(e) => setPatient({ ...patient, hr: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border rounded-xl bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-blue-600"
                />
              </div>
            </div>
          </div>

          {/* Glycemia & Diabetes */}
          <div className="p-3.5 bg-slate-50/70 dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-700/80 space-y-3">
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-emerald-600" />
              Glycemic Profile (CPG T2DM 6th Ed)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  T2DM Status
                </label>
                <select
                  value={patient.hasDm ? 'yes' : 'no'}
                  onChange={(e) => setPatient({ ...patient, hasDm: e.target.value === 'yes' })}
                  className="w-full px-3 py-2 border rounded-xl bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-emerald-600"
                >
                  <option value="yes">Confirmed T2DM</option>
                  <option value="no">Non-Diabetic</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  T2DM Duration
                </label>
                <select
                  value={patient.dmDurationOver10 ? 'over10' : 'under10'}
                  onChange={(e) =>
                    setPatient({ ...patient, dmDurationOver10: e.target.value === 'over10' })
                  }
                  className="w-full px-3 py-2 border rounded-xl bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-emerald-600"
                >
                  <option value="under10">&lt; 10 Years</option>
                  <option value="over10">&ge; 10 Years</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Current HbA1c (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={patient.hba1c}
                  onChange={(e) =>
                    setPatient({ ...patient, hba1c: parseFloat(e.target.value) || 0 })
                  }
                  className="w-full px-3 py-2 border rounded-xl bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-emerald-600"
                />
              </div>
            </div>
          </div>

          {/* Lipid Profile */}
          <div className="p-3.5 bg-slate-50/70 dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-700/80 space-y-3">
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-amber-600" />
              Fasting Lipid Profile (CPG Dyslipidemia 2023)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Total Chol (mmol/L)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={patient.tc}
                  onChange={(e) => setPatient({ ...patient, tc: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border rounded-xl bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-amber-600"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  LDL-C (mmol/L)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={patient.ldl}
                  onChange={(e) => setPatient({ ...patient, ldl: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border rounded-xl bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-amber-600"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  HDL-C (mmol/L)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={patient.hdl}
                  onChange={(e) => setPatient({ ...patient, hdl: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border rounded-xl bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-amber-600"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Fasting TG (mmol/L)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={patient.tg}
                  onChange={(e) => setPatient({ ...patient, tg: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border rounded-xl bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-amber-600"
                />
              </div>
            </div>
          </div>

          {/* Renal Function & Potassium */}
          <div className="p-3.5 bg-slate-50/70 dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-700/80 space-y-3">
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-sky-600" />
              Renal Markers &amp; Electrolytes (CPG DKD)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  eGFR (mL/min/1.73m²)
                </label>
                <input
                  type="number"
                  value={patient.egfr}
                  onChange={(e) =>
                    setPatient({ ...patient, egfr: parseFloat(e.target.value) || 0 })
                  }
                  className="w-full px-3 py-2 border rounded-xl bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-sky-600"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Urine Albumin (UACR)
                </label>
                <select
                  value={patient.uacr}
                  onChange={(e) =>
                    setPatient({ ...patient, uacr: e.target.value as 'a1' | 'a2' | 'a3' })
                  }
                  className="w-full px-3 py-2 border rounded-xl bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-sky-600"
                >
                  <option value="a1">A1: &lt; 3.0 mg/mmol (Normal)</option>
                  <option value="a2">A2: 3.0 – 30.0 mg/mmol (Microalbuminuria)</option>
                  <option value="a3">A3: &gt; 30.0 mg/mmol (Macroalbuminuria)</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Serum Potassium (mmol/L)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={patient.k}
                  onChange={(e) => setPatient({ ...patient, k: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border rounded-xl bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-sky-600"
                />
              </div>
            </div>
          </div>

          {/* Compelling Vascular & Target Organ Comorbidities */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
              Documented Organ Comorbidities
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <label className="flex items-center gap-2 p-2.5 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition">
                <input
                  type="checkbox"
                  checked={patient.hasAscvd}
                  onChange={(e) => setPatient({ ...patient, hasAscvd: e.target.checked })}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span className="text-slate-800 dark:text-slate-200">
                  <b>Established ASCVD:</b> Prior MI, Stent, Stroke, TIA, or PAD
                </span>
              </label>

              <label className="flex items-center gap-2 p-2.5 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition">
                <input
                  type="checkbox"
                  checked={patient.hasRecurrentAscvd}
                  onChange={(e) => setPatient({ ...patient, hasRecurrentAscvd: e.target.checked })}
                  className="rounded text-rose-600 focus:ring-rose-500 w-4 h-4"
                />
                <span className="text-slate-800 dark:text-slate-200">
                  <b>Recurrent ASCVD:</b> 2nd event within past 2 years (Extreme Risk)
                </span>
              </label>

              <label className="flex items-center gap-2 p-2.5 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition">
                <input
                  type="checkbox"
                  checked={patient.hasHf}
                  onChange={(e) => setPatient({ ...patient, hasHf: e.target.checked })}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span className="text-slate-800 dark:text-slate-200">
                  <b>Heart Failure:</b> Documented HFrEF or HFpEF
                </span>
              </label>

              <label className="flex items-center gap-2 p-2.5 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition">
                <input
                  type="checkbox"
                  checked={patient.hasTod}
                  onChange={(e) => setPatient({ ...patient, hasTod: e.target.checked })}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span className="text-slate-800 dark:text-slate-200">
                  <b>Microvascular TOD:</b> Retinopathy / Neuropathy / Albuminuria
                </span>
              </label>
            </div>
          </div>

          {/* Patient Label for PDF Export */}
          <div>
            <label className="block font-medium text-slate-700 dark:text-slate-300 text-xs mb-1">
              Patient Name / Clinic ID (Included in Consultation Sheet Export)
            </label>
            <input
              type="text"
              value={patient.name}
              placeholder="e.g. Encik Ismail / MRN 82910"
              onChange={(e) => setPatient({ ...patient, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-emerald-600"
            />
          </div>
        </div>

        {/* RIGHT COLUMN: COMPUTED TRIPLE-TARGET RESULT (5 COLS) */}
        <div className="lg:col-span-5 space-y-4" id="ncd-summary-card">
          
          {/* Card Head: Risk Tier */}
          <div className="bg-white dark:bg-slate-800 border-2 border-emerald-600 dark:border-emerald-500 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
            
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span
                className={`font-extrabold text-xs uppercase px-3 py-1.5 rounded-lg shadow-xs ${triage.riskTierBadgeClass}`}
              >
                {triage.riskTier} Cardiovascular Risk
              </span>
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                CPG Stratification
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
              {triage.riskTierReason}
            </p>

            {/* TRIPLE TARGET TILES */}
            <div className="space-y-2.5 text-xs">
              
              {/* TARGET 1: BP */}
              <div className="p-3 bg-slate-50 dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase block">
                    1. Blood Pressure Goal
                  </span>
                  <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                    {triage.goalBp}
                  </span>
                </div>
                <div className="text-right">
                  <span
                    className={`font-bold text-xs ${
                      triage.isBpOffTarget
                        ? 'text-rose-600 dark:text-rose-400'
                        : 'text-emerald-600 dark:text-emerald-400'
                    }`}
                  >
                    {triage.gapBp}
                  </span>
                  <span className="block text-[10px] text-slate-400">
                    Current: {patient.sbp}/{patient.dbp}
                  </span>
                </div>
              </div>

              {/* TARGET 2: LDL-C */}
              <div className="p-3 bg-slate-50 dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase block">
                    2. LDL-Cholesterol Goal
                  </span>
                  <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                    {triage.goalLdl}
                  </span>
                </div>
                <div className="text-right">
                  <span
                    className={`font-bold text-xs ${
                      triage.isLdlOffTarget
                        ? 'text-rose-600 dark:text-rose-400'
                        : 'text-emerald-600 dark:text-emerald-400'
                    }`}
                  >
                    {triage.gapLdl}
                  </span>
                  <span className="block text-[10px] text-slate-400">
                    Current: {patient.ldl} mmol/L
                  </span>
                </div>
              </div>

              {/* TARGET 3: HBA1C */}
              <div className="p-3 bg-slate-50 dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase block">
                    3. Glycemic Goal (HbA1c)
                  </span>
                  <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                    {triage.goalHba1c}
                  </span>
                </div>
                <div className="text-right">
                  <span
                    className={`font-bold text-xs ${
                      triage.isHba1cOffTarget
                        ? 'text-rose-600 dark:text-rose-400'
                        : 'text-emerald-600 dark:text-emerald-400'
                    }`}
                  >
                    {triage.gapHba1c}
                  </span>
                  {patient.hasDm && (
                    <span className="block text-[10px] text-slate-400">
                      Current: {patient.hba1c}%
                    </span>
                  )}
                </div>
              </div>

            </div>

            {/* SAFETY ALERTS BANNER */}
            {triage.safetyAlerts.length > 0 && (
              <div className="space-y-2">
                {triage.safetyAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="p-3 rounded-xl border bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-900 text-rose-950 dark:text-rose-200 text-xs space-y-1"
                  >
                    <div className="font-bold flex items-center gap-1.5 text-rose-900 dark:text-rose-300">
                      <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                      <span>{alert.title}</span>
                    </div>
                    <p className="text-[11px] leading-relaxed">{alert.message}</p>
                  </div>
                ))}
              </div>
            )}

            {/* ORGAN-PROTECTIVE PHARMACOTHERAPY RECOMMENDATIONS */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-700 space-y-2.5">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
                Evidence-Based Pharmacotherapy Actions:
              </h4>

              <div className="space-y-2">
                {triage.escalationActions.map((action) => (
                  <div
                    key={action.id}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700/80 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-bold text-slate-900 dark:text-white">
                        {action.title}
                      </span>
                      {action.badge && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                          {action.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                      {action.description}
                    </p>
                    <span className="text-[10px] text-slate-400 block pt-0.5">
                      {action.cpgReference}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* SICK-DAY CRITICAL ALERT (SADMANS) */}
            {triage.sadmansActive && (
              <div className="p-3 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900 rounded-xl text-xs text-amber-950 dark:text-amber-200 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-amber-900 dark:text-amber-300">
                  <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>SADMANS Sick-Day Alert Active</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Patient takes organ-protective agents (SGLT2i, Metformin, ACEi/ARB). Instruct patient to <b>temporarily withhold these during acute dehydration, high fever, vomiting, or diarrhea</b> to prevent euglycemic DKA and AKI.
                </p>
              </div>
            )}

            {/* AI CONSULT BUTTON */}
            <div className="pt-2">
              <button
                onClick={handleConsultAi}
                disabled={isAiLoading}
                className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition active:scale-95 disabled:opacity-50"
              >
                {isAiLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing Malaysian CPG Matrix...</span>
                  </>
                ) : (
                  <>
                    <Bot className="w-4 h-4" />
                    <span>Generate AI Clinical Reasoning &amp; EMR Consult Note</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* AI CONSULT REASONING & EMR NOTE OUTPUT */}
      {(aiConsultResult || aiError) && (
        <div className="bg-white dark:bg-slate-800 border-2 border-emerald-500/40 dark:border-emerald-600/40 rounded-2xl p-5 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-xl">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Consultant FMS Clinical Reasoning &amp; EMR Prescription Plan
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Synthesized via Malaysian CPG T2DM (6th Ed), HTN (2026), Dyslipidemia (2023)
                </p>
              </div>
            </div>

            {aiConsultResult && (
              <button
                onClick={handleCopyConsult}
                className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 flex items-center gap-1.5 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Clinical Note'}</span>
              </button>
            )}
          </div>

          {aiError && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 text-rose-800 text-xs">
              {aiError}
            </div>
          )}

          {aiConsultResult && (
            <div className="text-xs leading-relaxed text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-100 dark:border-slate-700 font-sans whitespace-pre-line space-y-2">
              {aiConsultResult}
            </div>
          )}
        </div>
      )}

      {/* INTERACTIVE ASK AI CLINICAL ASSISTANT BAR */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Interactive Primary Care AI Copilot
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ask specific clinical questions regarding drug interactions, renal thresholds, or guidelines.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Question Pills */}
        <div className="flex flex-wrap gap-2 text-xs">
          {[
            'Can I initiate Empagliflozin 10mg if eGFR is 24 mL/min?',
            'What if the patient develops a dry cough with Perindopril?',
            'How to safely switch from Glibenclamide to Linagliptin in elderly CKD?',
            'Fasting TG is 6.2 mmol/L and LDL is 3.8. Do I start Statin or Fenofibrate first?',
            'Patient has bilateral ankle swelling on Amlodipine 10mg. How to adjust?',
          ].map((pill, idx) => (
            <button
              key={idx}
              onClick={() => {
                setAskQuestion(pill);
                handleAskAi(pill);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-950 hover:text-emerald-800 dark:hover:text-emerald-300 transition text-[11px]"
            >
              {pill}
            </button>
          ))}
        </div>

        {/* Question Input */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask anything about Malaysian CPGs, drug dosing, or clinical reasoning..."
            value={askQuestion}
            onChange={(e) => setAskQuestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAskAi()}
            className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-emerald-600"
          />
          <button
            onClick={() => handleAskAi()}
            disabled={isAskLoading || !askQuestion.trim()}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition active:scale-95 disabled:opacity-50"
          >
            {isAskLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
            <span>Ask</span>
          </button>
        </div>

        {/* Question Answer Box */}
        {askAnswer && (
          <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line space-y-2">
            <span className="font-bold text-emerald-800 dark:text-emerald-400 block">
              Consultant Clinical Response:
            </span>
            {askAnswer}
          </div>
        )}
      </div>

    </div>
  );
};
