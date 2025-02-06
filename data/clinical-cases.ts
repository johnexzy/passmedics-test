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
  },
  {
    id: "CASE003",
    title: "Acute Abdominal Pain",
    category: "Emergency Medicine",
    difficulty: "Medium",
    description: "Severe right lower quadrant pain with nausea for 12 hours",
    patientInfo: {
      age: 22,
      gender: "female",
      chiefComplaint: "Severe right lower quadrant pain with nausea",
      pastMedicalHistory: ["None significant"],
    },
    vitalSigns: {
      temperature: "38.2°C",
      heartRate: "98 bpm",
      bloodPressure: "125/75 mmHg",
      respiratoryRate: "18/min",
    },
    stages: [
      {
        question: "What is your initial approach to this patient?",
        actions: [
          {
            type: "Examination",
            text: "Perform focused abdominal examination",
            isCorrect: true,
            feedback: "Correct! Physical examination is crucial for diagnosing appendicitis.",
            order: 1
          },
          {
            type: "Investigation",
            text: "Order CBC and CRP",
            isCorrect: true,
            feedback: "Good choice. These tests help confirm inflammation.",
            order: 2
          },
          {
            type: "Investigation",
            text: "Request abdominal ultrasound",
            isCorrect: true,
            feedback: "Appropriate imaging choice for young female patient.",
            order: 3
          },
          {
            type: "Treatment",
            text: "Give immediate antibiotics",
            isCorrect: false,
            feedback: "Premature. Diagnosis needs to be confirmed first.",
          }
        ],
        correctActionIds: ["1", "2", "3"]
      }
    ]
  },
  {
    id: "CASE004",
    title: "Postpartum Hemorrhage",
    category: "Obstetrics And Gynecology",
    difficulty: "Hard",
    description: "Excessive bleeding after normal vaginal delivery",
    patientInfo: {
      age: 28,
      gender: "female",
      chiefComplaint: "Heavy bleeding after delivery",
      pastMedicalHistory: ["G2P2", "Previous normal delivery"],
    },
    vitalSigns: {
      temperature: "36.8°C",
      heartRate: "120 bpm",
      bloodPressure: "90/60 mmHg",
      respiratoryRate: "22/min",
    },
    stages: [
      {
        question: "The patient has lost approximately 1L of blood. What are your immediate actions?",
        actions: [
          {
            type: "Treatment",
            text: "Start IV fluids and cross-match blood",
            isCorrect: true,
            feedback: "Critical first step for volume replacement.",
            order: 1
          },
          {
            type: "Treatment",
            text: "Administer oxytocin",
            isCorrect: true,
            feedback: "First-line uterotonic for PPH.",
            order: 2
          },
          {
            type: "Examination",
            text: "Perform uterine massage",
            isCorrect: true,
            feedback: "Important mechanical intervention for uterine atony.",
            order: 3
          },
          {
            type: "Investigation",
            text: "Wait for coagulation results",
            isCorrect: false,
            feedback: "Too passive. Immediate action needed.",
          }
        ],
        correctActionIds: ["1", "2", "3"]
      }
    ]
  },
  {
    id: "CASE005",
    title: "Diabetic Ketoacidosis",
    category: "Internal Medicine",
    difficulty: "Hard",
    description: "Type 1 diabetic with vomiting and altered mental status",
    patientInfo: {
      age: 19,
      gender: "male",
      chiefComplaint: "Vomiting and confusion",
      pastMedicalHistory: ["Type 1 Diabetes", "Previous DKA episode"],
    },
    vitalSigns: {
      temperature: "37.5°C",
      heartRate: "125 bpm",
      bloodPressure: "95/65 mmHg",
      respiratoryRate: "28/min",
      oxygenSaturation: "98%",
    },
    stages: [
      {
        question: "The patient's blood glucose is 32 mmol/L. What is your management priority?",
        actions: [
          {
            type: "Treatment",
            text: "Start IV fluid resuscitation",
            isCorrect: true,
            feedback: "Correct! Fluid resuscitation is the first priority in DKA.",
            order: 1
          },
          {
            type: "Investigation",
            text: "Check blood ketones and gases",
            isCorrect: true,
            feedback: "Essential for diagnosis and monitoring.",
            order: 2
          },
          {
            type: "Treatment",
            text: "Begin insulin infusion",
            isCorrect: true,
            feedback: "Important, but after initial fluid resuscitation.",
            order: 3
          },
          {
            type: "Treatment",
            text: "Give oral glucose",
            isCorrect: false,
            feedback: "Inappropriate. Patient needs IV management.",
          }
        ],
        correctActionIds: ["1", "2", "3"]
      }
    ]
  }
]; 