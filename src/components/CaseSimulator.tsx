import React from 'react';
import { MALAYSIAN_GP_CASES } from '../data/cases';
import { PresetCase } from '../types/ncd';
import { Play, UserCheck, AlertCircle, BookOpen, ArrowRight } from 'lucide-react';

interface CaseSimulatorProps {
  onSelectCase: (preset: PresetCase) => void;
}

export const CaseSimulator: React.FC<CaseSimulatorProps> = ({ onSelectCase }) => {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-blue-600" />
              Primary Care Clinical Case Archetypes (Malaysia)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Test real-world GP scenarios representing over 80% of daily NCD encounters in Malaysian primary care (Klinik Kesihatan & GP clinics).
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-full border border-blue-200 dark:border-blue-800">
            5 Validated Cases
          </span>
        </div>
      </div>

      {/* Case Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {MALAYSIAN_GP_CASES.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-xs hover:border-blue-400 dark:hover:border-blue-600 transition flex flex-col justify-between"
          >
            <div className="space-y-3">
              {/* Patient Badge & Title */}
              <div className="flex items-start justify-between gap-2 border-b border-slate-100 dark:border-slate-700 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                      {item.patientName}
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                      {item.ageGender}
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 mt-1">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Story / Presentation */}
              <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                  Clinical Presentation:
                </span>
                {item.clinicalSummary}
              </div>

              {/* The Clinical Dilemma */}
              <div className="text-xs text-amber-900 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/40 p-3 rounded-xl border border-amber-200 dark:border-amber-900/50 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-amber-800 dark:text-amber-300">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>The GP Dilemma / Common Oversight:</span>
                </div>
                <p className="text-[11px] leading-relaxed">{item.keyDilemma}</p>
              </div>

              {/* CPG Rationale */}
              <div className="text-xs text-emerald-900 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-950/40 p-3 rounded-xl border border-emerald-200 dark:border-emerald-900/50 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300">
                  <BookOpen className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>MOH CPG Action & Clinical Reasoning:</span>
                </div>
                <pre className="text-[11px] font-sans whitespace-pre-wrap leading-relaxed text-emerald-950 dark:text-emerald-200">
                  {item.cpgTakeaway}
                </pre>
              </div>
            </div>

            {/* Load Button */}
            <div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 dark:text-slate-500">
                BP {item.profile.sbp}/{item.profile.dbp} • HbA1c {item.profile.hba1c}% • LDL {item.profile.ldl} • eGFR {item.profile.egfr}
              </span>
              <button
                onClick={() => onSelectCase(item)}
                className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition active:scale-95"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Simulate & Calculate</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
