import React, { useState } from 'react';
import { ECG_PATTERNS } from '../data/clinicalReferences';
import { Activity, Heart, AlertOctagon, Zap, Calculator, Check, AlertTriangle } from 'lucide-react';

export const EcgReference: React.FC = () => {
  // Interactive LVH Calculator State
  const [sV1, setSV1] = useState<number>(18);
  const [rV5, setRV5] = useState<number>(20);
  const [rAvl, setRAvl] = useState<number>(14);
  const [sV3, setSV3] = useState<number>(16);
  const [ecgGender, setEcgGender] = useState<'male' | 'female'>('male');

  const sokolowSum = (Number(sV1) || 0) + (Number(rV5) || 0);
  const isSokolowLvh = sokolowSum >= 35;

  const cornellSum = (Number(rAvl) || 0) + (Number(sV3) || 0);
  const cornellThreshold = ecgGender === 'male' ? 28 : 20;
  const isCornellLvh = cornellSum > cornellThreshold;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-rose-600" />
              Bedside ECG Quick Reference for Primary Care NCD Clinics
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Hallmark ECG patterns in Hypertensive Heart Disease, Diabetic Silent Ischemia, and Life-Threatening Electrolyte Derangements.
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 rounded-full border border-rose-200 dark:border-rose-800">
            Bedside Recognition
          </span>
        </div>
      </div>

      {/* Interactive Bedside LVH Voltage Calculator */}
      <div className="bg-white dark:bg-slate-800 border-2 border-blue-200 dark:border-blue-900/60 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-xl">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Interactive Bedside LVH Voltage Calculator
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Instantly check Sokolow-Lyon and Cornell criteria for Left Ventricular Hypertrophy (Hypertensive Target Organ Damage).
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <button
              onClick={() => setEcgGender('male')}
              className={`px-2.5 py-1 rounded-lg font-medium transition ${
                ecgGender === 'male'
                  ? 'bg-blue-600 text-white font-bold'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              Male
            </button>
            <button
              onClick={() => setEcgGender('female')}
              className={`px-2.5 py-1 rounded-lg font-medium transition ${
                ecgGender === 'female'
                  ? 'bg-blue-600 text-white font-bold'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              Female
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Sokolow-Lyon Input & Result */}
          <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
            <span className="font-bold text-xs text-slate-800 dark:text-slate-200 block">
              1. Sokolow-Lyon Criteria (S in V1 + R in V5/V6 ≥ 35 mm)
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="block text-slate-500 dark:text-slate-400 mb-1">S wave in V1 (mm)</label>
                <input
                  type="number"
                  value={sV1}
                  onChange={(e) => setSV1(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-1.5 border rounded-lg bg-white dark:bg-slate-800"
                />
              </div>
              <div>
                <label className="block text-slate-500 dark:text-slate-400 mb-1">R wave in V5/V6 (mm)</label>
                <input
                  type="number"
                  value={rV5}
                  onChange={(e) => setRV5(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-1.5 border rounded-lg bg-white dark:bg-slate-800"
                />
              </div>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg border bg-white dark:bg-slate-800 text-xs">
              <span className="text-slate-600 dark:text-slate-400">Total Sum: <b>{sokolowSum} mm</b></span>
              <span
                className={`font-bold px-2 py-0.5 rounded-md ${
                  isSokolowLvh
                    ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                    : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                }`}
              >
                {isSokolowLvh ? 'LVH POSITIVE (≥ 35 mm)' : 'Negative (< 35 mm)'}
              </span>
            </div>
          </div>

          {/* Cornell Criteria Input & Result */}
          <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
            <span className="font-bold text-xs text-slate-800 dark:text-slate-200 block">
              2. Cornell Voltage Criteria (R in aVL + S in V3 &gt; {cornellThreshold} mm)
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="block text-slate-500 dark:text-slate-400 mb-1">R wave in aVL (mm)</label>
                <input
                  type="number"
                  value={rAvl}
                  onChange={(e) => setRAvl(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-1.5 border rounded-lg bg-white dark:bg-slate-800"
                />
              </div>
              <div>
                <label className="block text-slate-500 dark:text-slate-400 mb-1">S wave in V3 (mm)</label>
                <input
                  type="number"
                  value={sV3}
                  onChange={(e) => setSV3(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-1.5 border rounded-lg bg-white dark:bg-slate-800"
                />
              </div>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg border bg-white dark:bg-slate-800 text-xs">
              <span className="text-slate-600 dark:text-slate-400">Total Sum: <b>{cornellSum} mm</b></span>
              <span
                className={`font-bold px-2 py-0.5 rounded-md ${
                  isCornellLvh
                    ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                    : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                }`}
              >
                {isCornellLvh ? `LVH POSITIVE (> ${cornellThreshold} mm)` : `Negative (≤ ${cornellThreshold} mm)`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hyperkalemia Visual Emergency Cascade */}
      <div className="bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-rose-200 dark:border-rose-900/60 pb-3">
          <div className="flex items-center gap-2">
            <AlertOctagon className="w-5 h-5 text-rose-600" />
            <div>
              <h3 className="font-extrabold text-sm text-rose-950 dark:text-rose-200">
                Hyperkalemia Bedside ECG Progression &amp; Emergency Treatment Protocol
              </h3>
              <p className="text-xs text-rose-800 dark:text-rose-300">
                Occurs frequently in Diabetic Kidney Disease with RAAS blockade (ACEi / ARB) during acute dehydration or illness.
              </p>
            </div>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 bg-rose-600 text-white rounded-lg">
            Emergency Algorithm
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-rose-200 dark:border-rose-900 space-y-1">
            <span className="font-bold text-rose-900 dark:text-rose-300 block">Stage 1: K+ 5.5 – 6.5 mmol/L</span>
            <p className="text-slate-600 dark:text-slate-300 text-[11px]">
              Tall, narrow-based, symmetrical <b>"tented" T waves</b> (most prominent in II, III, V2–V4 leads).
            </p>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-rose-200 dark:border-rose-900 space-y-1">
            <span className="font-bold text-rose-900 dark:text-rose-300 block">Stage 2: K+ 6.5 – 7.5 mmol/L</span>
            <p className="text-slate-600 dark:text-slate-300 text-[11px]">
              Prolonged PR interval, progressive flattening and disappearance of P waves, mild ST depression.
            </p>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-rose-200 dark:border-rose-900 space-y-1">
            <span className="font-bold text-rose-900 dark:text-rose-300 block">Stage 3: K+ &gt; 7.5 mmol/L</span>
            <p className="text-slate-600 dark:text-slate-300 text-[11px]">
              Marked QRS widening merging with T wave to form a dangerous <b>Sine-Wave pattern</b>.
            </p>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-rose-200 dark:border-rose-900 space-y-1">
            <span className="font-bold text-rose-900 dark:text-rose-300 block">Stage 4: Terminal</span>
            <p className="text-slate-600 dark:text-slate-300 text-[11px]">
              Ventricular fibrillation, idioventricular bradycardia, or asystolic cardiac arrest.
            </p>
          </div>
        </div>

        <div className="p-3 bg-white/90 dark:bg-slate-900/90 rounded-xl border border-rose-300 dark:border-rose-800 text-xs space-y-1.5">
          <span className="font-extrabold text-rose-950 dark:text-rose-200 block">
            GP Clinic Immediate Stabilization Steps (While arranging 999 ambulance):
          </span>
          <ol className="list-decimal pl-4 space-y-1 text-[11px] text-slate-700 dark:text-slate-300">
            <li>
              <b>Membrane Stabilization:</b> IV Calcium Gluconate 10% 10 mL over 5 minutes (repeat at 5–10 min if ECG widens).
            </li>
            <li>
              <b>Intracellular K+ Shift:</b> IV Dextrose 50% 50 mL mixed with 10 units Regular Insulin (Actrapid) over 15 minutes.
            </li>
            <li>
              <b>Adrenergic Shift:</b> Nebulized Salbutamol 10–20 mg in 4 mL normal saline.
            </li>
            <li>
              <b>Withhold:</b> Stop all ACE-inhibitors, ARBs, and Spironolactone immediately.
            </li>
          </ol>
        </div>
      </div>

      {/* Clinical Pattern Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ECG_PATTERNS.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-xs space-y-3"
          >
            <div className="flex items-start justify-between gap-2 border-b border-slate-100 dark:border-slate-700 pb-2.5">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-emerald-600" />
                {item.title}
              </h4>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                {item.badge}
              </span>
            </div>

            <div>
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Diagnostic Criteria:
              </span>
              <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-600 dark:text-slate-400">
                {item.diagnosticCriteria.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-100 dark:border-slate-800 space-y-1 text-xs">
              <span className="font-bold text-slate-800 dark:text-slate-200 block text-[11px]">
                Clinical Significance:
              </span>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                {item.clinicalSignificance}
              </p>
            </div>

            <div className="p-3 bg-emerald-50/70 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-900 space-y-1 text-xs">
              <span className="font-bold text-emerald-900 dark:text-emerald-300 block text-[11px]">
                Primary Care Action &amp; Escalation:
              </span>
              <p className="text-[11px] text-emerald-950 dark:text-emerald-200 leading-relaxed">
                {item.gpAction}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
