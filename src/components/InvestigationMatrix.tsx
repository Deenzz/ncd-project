import React, { useState } from 'react';
import { LAB_REFERENCE_DATA, LabReferenceItem } from '../data/clinicalReferences';
import { FlaskConical, AlertTriangle, ArrowUpRight, Search, CheckCircle } from 'lucide-react';

export const InvestigationMatrix: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLabs = LAB_REFERENCE_DATA.filter(
    (l) =>
      l.investigation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.redFlagTrigger.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.gpAction.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-sky-600" />
              Laboratory Ranges, Red Flags & Specialist Referral Matrix
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Malaysian MOH Clinical Practice Guidelines point-of-care reference for blood investigations in primary care.
            </p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search test or red flag..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:outline-sky-600"
            />
          </div>
        </div>
      </div>

      {/* Lab Cards / Table */}
      <div className="space-y-4">
        {filteredLabs.map((lab: LabReferenceItem, index: number) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-xs hover:border-sky-300 dark:hover:border-sky-600 transition space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-700 pb-3">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                {lab.investigation}
              </h3>
              <div className="flex items-center gap-3 text-[11px]">
                <span className="text-slate-500 dark:text-slate-400">
                  Normal: <b className="text-slate-700 dark:text-slate-200">{lab.normalRange}</b>
                </span>
                <span className="bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-semibold px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                  Target: {lab.ncdTargetRange}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
              {/* Red Flag Trigger */}
              <div className="md:col-span-4 p-3 bg-rose-50/80 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 rounded-xl space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-rose-800 dark:text-rose-300 text-xs">
                  <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  <span>Critical Red Flag Trigger</span>
                </div>
                <p className="text-[11px] font-semibold text-rose-950 dark:text-rose-200 leading-relaxed whitespace-pre-line">
                  {lab.redFlagTrigger}
                </p>
              </div>

              {/* GP Action */}
              <div className="md:col-span-4 p-3 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-slate-800 dark:text-slate-200 text-xs">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Primary Care Action &amp; Titration</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  {lab.gpAction}
                </p>
              </div>

              {/* Specialist Referral */}
              <div className="md:col-span-4 p-3 bg-sky-50/70 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-900/60 rounded-xl space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-sky-800 dark:text-sky-300 text-xs">
                  <ArrowUpRight className="w-4 h-4 text-sky-600 flex-shrink-0" />
                  <span>Specialist Referral / Escalation</span>
                </div>
                <p className="text-[11px] text-sky-950 dark:text-sky-200 leading-relaxed">
                  {lab.specialistReferral}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
