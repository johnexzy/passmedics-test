export interface QuizQuestion {
  id: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  question: string;
  options: {
    id: string;
    text: string;
  }[];
  correctAnswer: string;
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "OBG001",
    category: "Obstetrics and Gynecology",
    difficulty: "Medium",
    question: "A woman presents with pelvic pain and dyspareunia. Laparoscopy shows endometrial implants. What is the most appropriate management?",
    options: [
      { id: "A", text: "Combined Oral Contraceptives" },
      { id: "B", text: "Danazol" },
      { id: "C", text: "Surgery" },
      { id: "D", text: "NSAIDs" },
    ],
    correctAnswer: "A",
    explanation: "Combined oral contraceptives are the first-line treatment for endometriosis, suppressing ovulation and reducing pain symptoms.",
  },
  {
    id: "SURG001",
    category: "Surgery",
    difficulty: "Hard",
    question: "A trauma patient presents with hypotension and distended neck veins. Which of the following is the most likely diagnosis?",
    options: [
      { id: "A", text: "Cardiac Tamponade" },
      { id: "B", text: "Tension Pneumothorax" },
      { id: "C", text: "Hemorrhagic Shock" },
      { id: "D", text: "Neurogenic Shock" },
    ],
    correctAnswer: "B",
    explanation: "The combination of hypotension and distended neck veins in a trauma patient suggests tension pneumothorax, which requires immediate needle decompression.",
  },
  {
    id: "IM001",
    category: "Internal Medicine",
    difficulty: "Medium",
    question: "A patient with liver cirrhosis presents with acute variceal bleeding. What is the most cost-effective preventive measure?",
    options: [
      { id: "A", text: "Propranolol" },
      { id: "B", text: "Endoscopic Band Ligation" },
      { id: "C", text: "Sclerotherapy" },
      { id: "D", text: "TIPS Procedure" },
    ],
    correctAnswer: "A",
    explanation: "Beta-blockers like propranolol are the most cost-effective method for primary prevention of variceal bleeding in cirrhotic patients.",
  },
  {
    id: "PED001",
    category: "Pediatrics",
    difficulty: "Easy",
    question: "A 2-year-old presents with fever and bilateral ear pain. What is the first-line treatment?",
    options: [
      { id: "A", text: "Amoxicillin" },
      { id: "B", text: "Azithromycin" },
      { id: "C", text: "Watchful Waiting" },
      { id: "D", text: "Tympanocentesis" },
    ],
    correctAnswer: "A",
    explanation: "Amoxicillin is the first-line treatment for acute otitis media in children due to its effectiveness against common pathogens and good safety profile.",
  },
  {
    id: "SURG002",
    category: "Surgery",
    difficulty: "Medium",
    question: "A patient presents with acute scrotal pain. Which finding best indicates testicular torsion?",
    options: [
      { id: "A", text: "Absent Cremasteric Reflex" },
      { id: "B", text: "Positive Urinalysis" },
      { id: "C", text: "Fever" },
      { id: "D", text: "Normal Doppler Flow" },
    ],
    correctAnswer: "A",
    explanation: "Absent cremasteric reflex is the most sensitive clinical finding in testicular torsion and should prompt immediate urological consultation.",
  },
  {
    id: "OBG002",
    category: "Obstetrics and Gynecology",
    difficulty: "Hard",
    question: "A pregnant woman at 32 weeks presents with severe preeclampsia. What is the most appropriate management?",
    options: [
      { id: "A", text: "Immediate Delivery" },
      { id: "B", text: "Magnesium Sulfate" },
      { id: "C", text: "Expectant Management" },
      { id: "D", text: "Calcium Supplementation" },
    ],
    correctAnswer: "B",
    explanation: "Magnesium sulfate is the first-line treatment for severe preeclampsia for seizure prophylaxis while preparing for possible delivery.",
  },
  {
    id: "IM002",
    category: "Internal Medicine",
    difficulty: "Hard",
    question: "A patient with type 2 diabetes presents with a foot ulcer. Which finding indicates the highest risk for amputation?",
    options: [
      { id: "A", text: "Osteomyelitis" },
      { id: "B", text: "Peripheral Neuropathy" },
      { id: "C", text: "Superficial Infection" },
      { id: "D", text: "Cellulitis" },
    ],
    correctAnswer: "A",
    explanation: "Osteomyelitis in diabetic foot ulcers has the highest risk for amputation due to bone destruction and poor healing potential.",
  },
  {
    id: "PED002",
    category: "Pediatrics",
    difficulty: "Medium",
    question: "A 6-month-old presents with fever and maculopapular rash. What is the most likely diagnosis?",
    options: [
      { id: "A", text: "Roseola" },
      { id: "B", text: "Measles" },
      { id: "C", text: "Fifth Disease" },
      { id: "D", text: "Scarlet Fever" },
    ],
    correctAnswer: "A",
    explanation: "Roseola typically presents with high fever followed by a maculopapular rash after the fever breaks in infants 6-24 months old.",
  },
]; 