import React from 'react';
import { Layers, Moon, Sun, FileDown, Sliders, GitBranch, FlaskConical, Activity, ShieldAlert, Users } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onExportPdf: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  darkMode,
  onToggleDarkMode,
  onExportPdf,
}) => {
  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Branding & Subtitle */}
        <div className="flex items-center gap-3">
          <div className="bg-emerald-700 text-white p-2.5 rounded-xl shadow-md flex items-center justify-center">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-lg md:text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Malaysian NCD Triple-Target Master
              </h1>
              <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">
                MOH CPGs 2026
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              T2DM (6th Ed) • Hypertension (6th Ed, 2026) • Dyslipidemia (6th Ed, 2023)
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 no-print w-full md:w-auto justify-end">
          <button
            onClick={onToggleDarkMode}
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 shadow-xs hover:bg-slate-50 dark:hover:bg-slate-700 transition"
            title="Toggle Light/Dark Theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            <span>{darkMode ? 'Light' : 'Dark'}</span>
          </button>

          <button
            onClick={onExportPdf}
            className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition active:scale-95"
            title="Export Consultation Summary Sheet"
          >
            <FileDown className="w-4 h-4" />
            <span>Export Consult Sheet</span>
          </button>
        </div>
      </div>

      {/* Desktop Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 pb-2 pt-1 hidden md:flex items-center gap-1 overflow-x-auto text-xs font-medium border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={() => onTabChange('calculator')}
          className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
            currentTab === 'calculator'
              ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-200 dark:border-emerald-800'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Sliders className="w-4 h-4 text-emerald-600" />
          Triple-Target & AI Consult
        </button>

        <button
          onClick={() => onTabChange('cases')}
          className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
            currentTab === 'cases'
              ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 font-bold border border-blue-200 dark:border-blue-800'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Users className="w-4 h-4 text-blue-600" />
          GP Case Simulator (5 Presets)
        </button>

        <button
          onClick={() => onTabChange('pathway')}
          className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
            currentTab === 'pathway'
              ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-200 dark:border-emerald-800'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <GitBranch className="w-4 h-4 text-emerald-600" />
          CPG Pathways & Drug Matrix
        </button>

        <button
          onClick={() => onTabChange('labs')}
          className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
            currentTab === 'labs'
              ? 'bg-sky-50 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 font-bold border border-sky-200 dark:border-sky-800'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <FlaskConical className="w-4 h-4 text-sky-600" />
          Lab Ranges & Red Flags
        </button>

        <button
          onClick={() => onTabChange('ecg')}
          className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
            currentTab === 'ecg'
              ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 font-bold border border-rose-200 dark:border-rose-800'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Activity className="w-4 h-4 text-rose-600" />
          Bedside ECG Reference
        </button>

        <button
          onClick={() => onTabChange('sadmans')}
          className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
            currentTab === 'sadmans'
              ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold border border-amber-200 dark:border-amber-800'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <ShieldAlert className="w-4 h-4 text-amber-600" />
          SADMANS Sick-Day Leaflet
        </button>
      </div>
    </header>
  );
};
