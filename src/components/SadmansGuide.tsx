import React, { useState } from 'react';
import { ShieldAlert, Printer, Globe, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export const SadmansGuide: React.FC = () => {
  const [lang, setLang] = useState<'both' | 'en' | 'bm'>('both');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-600" />
            SADMANS Sick-Day Management Protocol
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Preventing Euglycemic DKA, Lactic Acidosis, and Acute Kidney Injury During Acute Dehydration or Illness.
          </p>
        </div>

        <div className="flex items-center gap-2 no-print">
          <div className="flex items-center bg-slate-100 dark:bg-slate-700 p-1 rounded-xl text-xs">
            <button
              onClick={() => setLang('both')}
              className={`px-2.5 py-1 rounded-lg transition ${
                lang === 'both' ? 'bg-white dark:bg-slate-900 font-bold shadow-xs' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Both EN/BM
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 rounded-lg transition ${
                lang === 'en' ? 'bg-white dark:bg-slate-900 font-bold shadow-xs' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLang('bm')}
              className={`px-2.5 py-1 rounded-lg transition ${
                lang === 'bm' ? 'bg-white dark:bg-slate-900 font-bold shadow-xs' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              B. Melayu
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="px-3 py-1.5 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-xs transition"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Patient Leaflet</span>
          </button>
        </div>
      </div>

      {/* Rationale Bar for Doctors */}
      <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 rounded-2xl p-4 text-xs text-amber-950 dark:text-amber-200 space-y-1">
        <div className="font-bold flex items-center gap-2 text-amber-900 dark:text-amber-300">
          <Info className="w-4 h-4 flex-shrink-0" />
          <span>Doctor's Clinical Rationale: Why SADMANS is Vital in Primary Care</span>
        </div>
        <p className="text-[11px] leading-relaxed">
          During acute febrile illness, severe gastroenteritis, or decreased oral intake, renal perfusion falls. Continuing RAAS blockers (ACEi/ARB) eliminates the efferent arteriolar compensatory mechanism, precipitating acute tubular necrosis (ATN). Metformin accumulates causing fatal lactic acidosis. SGLT2 inhibitors trigger carbohydrate starvation and lipolysis, causing <b>Euglycemic Ketoacidosis</b> (blood glucose can be normal &lt; 14 mmol/L while serum ketones &gt; 3.0 mmol/L).
        </p>
      </div>

      {/* Bilingual Leaflets */}
      <div className={`grid gap-6 ${lang === 'both' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 max-w-3xl mx-auto'}`}>
        {/* ENGLISH LEAFLET */}
        {(lang === 'both' || lang === 'en') && (
          <div className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-xs space-y-4 print-page">
            <div className="border-b border-slate-100 dark:border-slate-700 pb-3 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Patient Sick-Day Rules (English)
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  For patients taking Diabetes, Blood Pressure, or Kidney medications
                </p>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                Patient Copy
              </span>
            </div>

            <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-xl text-rose-950 dark:text-rose-200 text-xs">
              <span className="font-bold block mb-1">
                WHEN SICK (High Fever, Vomiting, Diarrhea, Unable to drink fluids):
              </span>
              <p className="text-[11px]">
                You must <b>temporarily stop</b> taking the following medications until you are eating and drinking normally for at least 24 to 48 hours.
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                Temporarily Withhold These Medications ("SADMANS"):
              </h4>
              <ul className="space-y-1.5 text-slate-700 dark:text-slate-300 text-[11px]">
                <li className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                  <b>S - Sulfonylureas:</b> Gliclazide, Glimepiride, Glibenclamide <i>(prevents severe low blood sugar while not eating)</i>.
                </li>
                <li className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                  <b>A - ACE-Inhibitors:</b> Perindopril, Ramipril, Enalapril <i>(prevents sudden kidney failure)</i>.
                </li>
                <li className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                  <b>D - Diuretics:</b> Furosemide, Indapamide, Hydrochlorothiazide <i>(prevents dangerous dehydration)</i>.
                </li>
                <li className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                  <b>M - Metformin:</b> Glucophage <i>(prevents serious acid buildup in the blood)</i>.
                </li>
                <li className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                  <b>A - ARBs:</b> Telmisartan, Losartan, Valsartan <i>(protects kidney function during dehydration)</i>.
                </li>
                <li className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                  <b>N - NSAIDs:</b> Ponstan, Ibuprofen, Voltaren, Celebrex <i>(painkillers that damage kidneys when dehydrated)</i>.
                </li>
                <li className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-900 font-medium">
                  <b>S - SGLT2 Inhibitors:</b> Forxiga (Dapagliflozin), Jardiance (Empagliflozin) - <b className="text-rose-600">MUST STOP IMMEDIATELY</b> to avoid dangerous Ketoacidosis.
                </li>
              </ul>
            </div>

            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 rounded-xl text-xs space-y-1">
              <span className="font-bold text-emerald-950 dark:text-emerald-200 block">
                What You Must Do:
              </span>
              <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-emerald-900 dark:text-emerald-300">
                <li>Sip fluids frequently (aim for 1 cup of water, clear broth, or ORS every hour).</li>
                <li>Check your fingerprick blood sugar every 4 to 6 hours.</li>
                <li>Never stop your Basal Insulin completely (discuss reduced sick dose with clinic).</li>
                <li>Seek immediate medical help if vomiting for &gt; 24h, breathless, or drowsy.</li>
              </ul>
            </div>
          </div>
        )}

        {/* BAHASA MELAYU LEAFLET */}
        {(lang === 'both' || lang === 'bm') && (
          <div className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-xs space-y-4 print-page">
            <div className="border-b border-slate-100 dark:border-slate-700 pb-3 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Panduan Peraturan Hari Sakit (Bahasa Melayu)
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Untuk pesakit Kencing Manis, Darah Tinggi, atau Buah Pinggang
                </p>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                Salinan Pesakit
              </span>
            </div>

            <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-xl text-rose-950 dark:text-rose-200 text-xs">
              <span className="font-bold block mb-1">
                APABILA SAKIT (Demam Tinggi, Muntah-Muntah, Cirit-Birit, Kurang Minum Air):
              </span>
              <p className="text-[11px]">
                Anda perlu <b>berhenti mengambil ubat-ubatan berikut buat sementara waktu</b> sehingga anda pulih sepenuhnya dan boleh makan serta minum seperti biasa (selama 24 hingga 48 jam).
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                Hentikan Sementara Ubat-Ubatan Ini ("SADMANS"):
              </h4>
              <ul className="space-y-1.5 text-slate-700 dark:text-slate-300 text-[11px]">
                <li className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                  <b>S - Sulfonilurea:</b> Gliclazide, Glimepiride, Glibenclamide <i>(elak paras gula jatuh bahaya semasa tidak lalu makan)</i>.
                </li>
                <li className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                  <b>A - Perencat ACE:</b> Perindopril, Ramipril, Enalapril <i>(elak kerosakan buah pinggang mendadak)</i>.
                </li>
                <li className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                  <b>D - Diuretik (Ubat Lawas Kencing):</b> Furosemide, Indapamide <i>(elak dehidrasi/kekeringan air bahaya)</i>.
                </li>
                <li className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                  <b>M - Metformin:</b> Glucophage <i>(elak pengumpulan asid laktik berbahaya dalam darah)</i>.
                </li>
                <li className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                  <b>A - ARB:</b> Telmisartan, Losartan, Valsartan <i>(melindungi fungsi buah pinggang semasa kering air)</i>.
                </li>
                <li className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                  <b>N - NSAID (Ubat Tahan Sakit):</b> Ponstan, Ibuprofen, Voltaren, Celebrex <i>(merosakkan buah pinggang jika badan kurang air)</i>.
                </li>
                <li className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-900 font-medium">
                  <b>S - Perencat SGLT2:</b> Forxiga (Dapagliflozin), Jardiance (Empagliflozin) - <b className="text-rose-600">WAJIB HENTI SEGERA</b> bagi mengelakkan komplikasi Ketoasidosis.
                </li>
              </ul>
            </div>

            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 rounded-xl text-xs space-y-1">
              <span className="font-bold text-emerald-950 dark:text-emerald-200 block">
                Tindakan Yang Perlu Anda Ambil:
              </span>
              <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-emerald-900 dark:text-emerald-300">
                <li>Minum air secara kerap (sasarkan 1 cawan air kosong, sup jernih, atau air garam ORS setiap 1 jam).</li>
                <li>Periksa paras gula darah setiap 4 hingga 6 jam di rumah.</li>
                <li>Jangan hentikan Insulin Basal sepenuhnya tanpa nasihat doktor.</li>
                <li>Segera ke Klinik Kesihatan atau Hospital jika muntah berlarutan melebihi 24 jam atau sesak nafas.</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
