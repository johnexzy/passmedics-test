export type ClinicalCaseCategory = 'Internal Medicine' | 'Pediatrics' | 'Emergency Medicine' | 'Obstetrics And Gynecology';
export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface VitalSigns {
  temperature?: string;
  heartRate?: string;
  bloodPressure?: string;
  respiratoryRate?: string;
  oxygenSaturation?: string;
}

export interface PatientInfo {
  age: number;
  gender: 'male' | 'female';
  chiefComplaint: string;
  pastMedicalHistory?: string[];
}

export interface CaseAction {
  type: 'Examination' | 'Treatment' | 'Investigation';
  text: string;
  isCorrect: boolean;
  feedback: string;
  order?: number;
}

export interface ClinicalCase {
  id: string;
  title: string;
  category: ClinicalCaseCategory;
  difficulty: Difficulty;
  description: string;
  patientInfo: PatientInfo;
  vitalSigns: VitalSigns;
  stages: {
    question: string;
    actions: CaseAction[];
    correctActionIds: string[];
  }[];
} 