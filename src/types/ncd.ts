export interface PatientProfile {
  id?: string;
  name: string;
  icOrMrn?: string;
  phone?: string;
  age: number;
  gender: 'male' | 'female';
  isSmoker: boolean;
  isFrail: boolean;
  allergies?: string;
  pastMedicalHistory?: string[];
  currentMedications?: string[];
  sbp: number;
  dbp: number;
  hr: number;
  hasDm: boolean;
  dmDurationOver10: boolean;
  hba1c: number;
  tc: number;
  ldl: number;
  hdl: number;
  tg: number;
  egfr: number;
  uacr: 'a1' | 'a2' | 'a3';
  k: number;
  hasAscvd: boolean;
  hasRecurrentAscvd: boolean;
  hasHf: boolean;
  hasTod: boolean;
}

export interface HistoricalVisit {
  id: string;
  date: string;
  sbp: number;
  dbp: number;
  hba1c: number;
  ldl: number;
  egfr: number;
  k: number;
  riskTier: RiskTier;
  goalBp: string;
  goalLdl: string;
  goalHba1c: string;
  medicationsPrescribed: string[];
  clinicalNotes: string;
}

export interface PatientRecord {
  id: string;
  name: string;
  icOrMrn: string;
  phone: string;
  age: number;
  gender: 'male' | 'female';
  registeredDate: string;
  allergies: string;
  comorbidities: string[];
  currentMedications: string[];
  latestProfile: PatientProfile;
  visits: HistoricalVisit[];
}

export type RiskTier = 'Extreme' | 'Very High' | 'High' | 'Moderate' | 'Low';

export interface TriageResult {
  riskTier: RiskTier;
  riskTierBadgeClass: string;
  riskTierReason: string;
  goalBp: string;
  targetSbp: number;
  targetDbp: number;
  gapBp: string;
  isBpOffTarget: boolean;
  goalLdl: string;
  targetLdl: number;
  gapLdl: string;
  isLdlOffTarget: boolean;
  goalHba1c: string;
  targetHba1c: number;
  gapHba1c: string;
  isHba1cOffTarget: boolean;
  escalationActions: EscalationAction[];
  safetyAlerts: SafetyAlert[];
  sadmansActive: boolean;
}

export interface EscalationAction {
  id: string;
  category: 'dm' | 'htn' | 'dlp' | 'organ' | 'urgent';
  title: string;
  description: string;
  cpgReference: string;
  badge?: string;
  level: 'essential' | 'recommended' | 'consider' | 'warning';
  drugClass?: string;
  suggestedDrug?: string;
}

export interface SafetyAlert {
  id: string;
  type: 'danger' | 'warning' | 'info';
  title: string;
  message: string;
}

export interface PresetCase {
  id: string;
  patientName: string;
  ageGender: string;
  title: string;
  clinicalSummary: string;
  keyDilemma: string;
  cpgTakeaway: string;
  profile: PatientProfile;
}

export type InteractionSeverity = 'contraindicated' | 'major' | 'moderate' | 'synergistic';

export interface DrugInteraction {
  id: string;
  drugA: string;
  drugB: string;
  severity: InteractionSeverity;
  title: string;
  mechanism: string;
  clinicalRisk: string;
  actionableAdvice: string;
  cpgOrPharmacologyRef: string;
}

export interface EcgInteractiveCase {
  id: string;
  title: string;
  category: 'ischemia' | 'hypertrophy' | 'arrhythmia' | 'electrolyte' | 'drug';
  badge: string;
  badgeColor: string;
  subtitle: string;
  normalRange: string;
  characteristicPattern: string[];
  waveformType: 'sinus' | 'lvh' | 'stemi' | 'wellens' | 'qwave' | 'afib' | 'hyperk_peaked' | 'hyperk_sine' | 'hypok_u' | 'long_qt';
  redFlags: string[];
  clinicalReasoning: string;
  gpActionPlan: string;
}
