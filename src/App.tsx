import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { TripleTargetEngine } from './components/TripleTargetEngine';
import { CaseSimulator } from './components/CaseSimulator';
import { PathwayMatrix } from './components/PathwayMatrix';
import { InvestigationMatrix } from './components/InvestigationMatrix';
import { EcgReference } from './components/EcgReference';
import { SadmansGuide } from './components/SadmansGuide';
import { PatientProfile, PresetCase } from './types/ncd';
import { calculateNcdTriage } from './utils/calculator';
import { jsPDF } from 'jspdf';
import { Sliders, Users, GitBranch, FlaskConical, Activity, ShieldAlert, ArrowUp } from 'lucide-react';

const DEFAULT_PATIENT: PatientProfile = {
  name: '',
  age: 54,
  gender: 'male',
  isSmoker: true,
  isFrail: false,
  sbp: 148,
  dbp: 92,
  hr: 76,
  hasDm: true,
  dmDurationOver10: true,
  hba1c: 8.4,
  tc: 5.8,
  ldl: 3.6,
  hdl: 1.1,
  tg: 2.4,
  egfr: 52,
  uacr: 'a2',
  k: 4.6,
  hasAscvd: true,
  hasRecurrentAscvd: false,
  hasHf: false,
  hasTod: true,
};

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('calculator');
  const [patient, setPatient] = useState<PatientProfile>(DEFAULT_PATIENT);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ncd-theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('ncd-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('ncd-theme', 'light');
    }
  }, [darkMode]);

  const triage = useMemo(() => calculateNcdTriage(patient), [patient]);

  const handleReset = () => {
    setPatient(DEFAULT_PATIENT);
  };

  const handleSelectCase = (preset: PresetCase) => {
    setPatient({ ...preset.profile });
    setCurrentTab('calculator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExportPdf = () => {
    try {
      const doc = new jsPDF({ unit: 'pt', format: 'a4' });
      let y = 45;
      const leftMargin = 45;
      const pageWidth = 505;

      const cleanText = (t: string) =>
        String(t)
          .replace(/[≥]/g, '>=')
          .replace(/[≤]/g, '<=')
          .replace(/[–—]/g, '-')
          .replace(/[•●]/g, '-')
          .replace(/\s+/g, ' ')
          .trim();

      const addHeader = (text: string, size = 14) => {
        y += 10;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(size);
        doc.setTextColor(5, 150, 105); // emerald-600
        doc.text(cleanText(text), leftMargin, y);
        y += size + 4;
      };

      const addParagraph = (text: string, isBold = false, size = 9.5) => {
        doc.setFont('helvetica', isBold ? 'bold' : 'normal');
        doc.setFontSize(size);
        doc.setTextColor(30, 41, 59); // slate-800
        const lines = doc.splitTextToSize(cleanText(text), pageWidth);
        lines.forEach((l: string) => {
          doc.text(l, leftMargin, y);
          y += 13;
        });
        y += 2;
      };

      addHeader('MALAYSIAN NCD TRIPLE-TARGET CONSULTATION SUMMARY', 15);
      addParagraph(
        `MOH Clinical Practice Guidelines: T2DM (6th Ed) | HTN (6th Ed, 2026) | Dyslipidemia (6th Ed, 2023)`,
        true
      );
      addParagraph(
        `Date: ${new Date().toLocaleDateString('en-GB')} | Patient: ${
          patient.name.trim() || 'Adult Primary Care Encounter'
        } | Age: ${patient.age}y | Gender: ${patient.gender.toUpperCase()} | Smoker: ${
          patient.isSmoker ? 'Yes' : 'No'
        }`
      );

      y += 6;
      addHeader('1. CARDIOVASCULAR RISK & INDIVIDUALIZED TARGETS', 11);
      addParagraph(`- Risk Stratification Tier: ${triage.riskTier.toUpperCase()} CARDIOVASCULAR RISK`, true);
      addParagraph(`- Clinical Justification: ${triage.riskTierReason}`);
      addParagraph(
        `- Blood Pressure Goal: ${triage.goalBp} (Current: ${patient.sbp}/${patient.dbp} mmHg - ${triage.gapBp})`,
        true
      );
      addParagraph(
        `- LDL-Cholesterol Goal: ${triage.goalLdl} (Current: ${patient.ldl} mmol/L - ${triage.gapLdl})`,
        true
      );
      addParagraph(
        `- Glycemic Goal (HbA1c): ${triage.goalHba1c} (Current: ${patient.hba1c}% - ${triage.gapHba1c})`,
        true
      );

      y += 6;
      addHeader('2. ORGAN-PROTECTIVE PHARMACOTHERAPY ACTIONS', 11);
      triage.escalationActions.forEach((act) => {
        addParagraph(`* [${act.title}] ${act.description}`);
      });

      if (triage.safetyAlerts.length > 0) {
        y += 6;
        addHeader('3. CRITICAL SAFETY ALERTS & CONTRAINDICATIONS', 11);
        triage.safetyAlerts.forEach((sa) => {
          addParagraph(`! [${sa.title}] ${sa.message}`, true);
        });
      }

      y += 6;
      addHeader('4. SADMANS SICK-DAY PATIENT COUNSELING', 11);
      addParagraph(
        'Withhold Sulfonylureas, ACEi, Diuretics, Metformin, ARBs, NSAIDs, and SGLT2 inhibitors during acute dehydration, severe fever, or gastroenteritis to prevent euglycemic DKA, lactic acidosis, and AKI.',
        true
      );

      y += 10;
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text(
        'Generated by Malaysian NCD Triple-Target Master - Clinical Decision Support for Primary Care Practitioners.',
        leftMargin,
        y
      );

      doc.save(`NCD-Consult-${(patient.name || 'Patient').replace(/\s+/g, '_')}-${new Date()
        .toISOString()
        .slice(0, 10)}.pdf`);
    } catch (e) {
      console.error('Error generating PDF:', e);
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans antialiased transition-colors duration-200">
      {/* Header */}
      <Header
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onExportPdf={handleExportPdf}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 py-5 sm:py-6 flex-1 w-full space-y-6 pb-24 md:pb-8">
        {currentTab === 'calculator' && (
          <TripleTargetEngine
            patient={patient}
            setPatient={setPatient}
            triage={triage}
            onReset={handleReset}
          />
        )}

        {currentTab === 'cases' && <CaseSimulator onSelectCase={handleSelectCase} />}

        {currentTab === 'pathway' && <PathwayMatrix />}

        {currentTab === 'labs' && <InvestigationMatrix />}

        {currentTab === 'ecg' && <EcgReference />}

        {currentTab === 'sadmans' && <SadmansGuide />}
      </main>

      {/* Floating Bottom Results Jump Button (Mobile Only) */}
      {currentTab === 'calculator' && (
        <div className="md:hidden fixed bottom-18 inset-x-0 z-30 flex justify-center px-4 no-print pointer-events-none">
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('ncd-summary-card');
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="pointer-events-auto w-full max-w-sm rounded-2xl px-4 py-2.5 text-xs font-bold text-white shadow-xl flex items-center justify-between bg-emerald-700/95 backdrop-blur-md active:scale-95 transition"
          >
            <span className="truncate pr-2">
              {triage.riskTier} Risk • BP {triage.targetSbp}/{triage.targetDbp} • LDL {triage.targetLdl}
            </span>
            <span className="flex items-center gap-1 text-[11px] font-semibold bg-white/20 px-2 py-0.5 rounded-full flex-shrink-0">
              View Plan <ArrowUp className="w-3 h-3" />
            </span>
          </button>
        </div>
      )}

      {/* Mobile Bottom Dock Navigation Bar */}
      <nav
        id="mobile-nav-bar"
        className="md:hidden fixed inset-x-0 bottom-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 flex items-center justify-around px-2 py-2 no-print"
      >
        <button
          onClick={() => {
            setCurrentTab('calculator');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold flex-1 ${
            currentTab === 'calculator' ? 'text-emerald-700 dark:text-emerald-400 font-bold' : 'text-slate-500'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Targets</span>
        </button>

        <button
          onClick={() => {
            setCurrentTab('cases');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold flex-1 ${
            currentTab === 'cases' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-500'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Cases</span>
        </button>

        <button
          onClick={() => {
            setCurrentTab('pathway');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold flex-1 ${
            currentTab === 'pathway' ? 'text-emerald-700 dark:text-emerald-400 font-bold' : 'text-slate-500'
          }`}
        >
          <GitBranch className="w-4 h-4" />
          <span>Pathways</span>
        </button>

        <button
          onClick={() => {
            setCurrentTab('labs');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold flex-1 ${
            currentTab === 'labs' ? 'text-sky-600 dark:text-sky-400 font-bold' : 'text-slate-500'
          }`}
        >
          <FlaskConical className="w-4 h-4" />
          <span>Labs</span>
        </button>

        <button
          onClick={() => {
            setCurrentTab('ecg');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold flex-1 ${
            currentTab === 'ecg' ? 'text-rose-600 dark:text-rose-400 font-bold' : 'text-slate-500'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>ECG</span>
        </button>

        <button
          onClick={() => {
            setCurrentTab('sadmans');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold flex-1 ${
            currentTab === 'sadmans' ? 'text-amber-600 dark:text-amber-400 font-bold' : 'text-slate-500'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>SADMANS</span>
        </button>
      </nav>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 pb-6 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed text-center sm:text-left no-print">
        Malaysian NCD Triple-Target Master • Synthesizing MOH CPG Management of Type 2 Diabetes Mellitus (6th Ed), CPG Management of Hypertension (6th Ed, 2026), CPG Management of Dyslipidemia (6th Ed, 2023), and CPG Diabetic Kidney Disease. Designed for clinical decision support in Malaysian primary healthcare clinics.
      </footer>
    </div>
  );
}
