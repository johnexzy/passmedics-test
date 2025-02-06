import { ClinicalCase } from "@/types/clinical-case";

export const clinicalCases: ClinicalCase[] = [
  {
    id: "CASE001",
    title: "Acute Chest Pain",
    category: "Internal Medicine",
    difficulty: "Medium",
    description: "Severe chest pain radiating to left arm for 30 minutes",
    patientInfo: {
      age: 55,
      gender: "male",
      chiefComplaint: "Severe chest pain radiating to left arm for 30 minutes",
      pastMedicalHistory: ["Hypertension", "Type 2 Diabetes"],
    },
    vitalSigns: {
      temperature: "37.2°C",
      heartRate: "110 bpm",
      bloodPressure: "160/95 mmHg",
      respiratoryRate: "20/min",
      oxygenSaturation: "96%",
    },
    stages: [
      {
        question: "The patient appears distressed and is clutching his chest. What would you do first?",
        actions: [
          {
            type: "Examination",
            text: "Check vital signs and establish monitoring",
            isCorrect: true,
            feedback: "Correct! Establishing monitoring is crucial in a potentially cardiac emergency.",
            order: 1
          },
          {
            type: "Treatment",
            text: "Administer 300mg Aspirin",
            isCorrect: true,
            feedback: "Good thinking, but vital signs should be checked first.",
            order: 2
          },
          {
            type: "Investigation",
            text: "Obtain 12-lead ECG",
            isCorrect: true,
            feedback: "Important step, but should follow initial assessment.",
            order: 3
          },
          {
            type: "Examination",
            text: "Take detailed history",
            isCorrect: true,
            feedback: "Important, but not the first priority in an emergency.",
            order: 4
          }
        ],
        correctActionIds: ["1", "2", "3", "4"]
      }
    ]
  },
  {
    id: "CASE002",
    title: "Pediatric Respiratory Distress",
    category: "Pediatrics",
    difficulty: "Hard",
    description: "Difficulty breathing and wheezing for 6 hours",
    patientInfo: {
      age: 4,
      gender: "male",
      chiefComplaint: "Difficulty breathing and wheezing for 6 hours",
      pastMedicalHistory: ["Asthma"],
    },
    vitalSigns: {
      temperature: "37.8°C",
      heartRate: "130 bpm",
      respiratoryRate: "35/min",
      oxygenSaturation: "92%",
    },
    stages: [
      {
        question: "The child is showing signs of respiratory distress. What is your initial approach?",
        actions: [
          {
            type: "Examination",
            text: "Assess work of breathing and vital signs",
            isCorrect: true,
            feedback: "Correct! Initial assessment is crucial in pediatric respiratory distress.",
            order: 1
          },
          {
            type: "Treatment",
            text: "Give nebulized salbutamol",
            isCorrect: true,
            feedback: "Important intervention but should follow initial assessment.",
            order: 2
          },
          {
            type: "Investigation",
            text: "Order chest X-ray",
            isCorrect: false,
            feedback: "Not immediately necessary before starting treatment in acute asthma.",
          },
          {
            type: "Treatment",
            text: "Start IV antibiotics",
            isCorrect: false,
            feedback: "Not indicated without evidence of bacterial infection.",
          }
        ],
        correctActionIds: ["1", "2"]
      }
    ]
  }
]; 