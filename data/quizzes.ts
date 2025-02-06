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
  {
    id: "EM001",
    category: "Emergency Medicine",
    difficulty: "Hard",
    question: "A 45-year-old man presents with sudden onset chest pain and shortness of breath. His oxygen saturation is 92%. What is the most appropriate initial investigation?",
    options: [
      { id: "A", text: "CT Pulmonary Angiogram" },
      { id: "B", text: "D-dimer" },
      { id: "C", text: "Chest X-ray" },
      { id: "D", text: "Troponin" },
    ],
    correctAnswer: "B",
    explanation: "In suspected pulmonary embolism, D-dimer is the initial investigation. If positive, proceed with CTPA. If negative with low clinical probability, PE can be ruled out.",
  },
  {
    id: "NEURO001",
    category: "Neurology",
    difficulty: "Medium",
    question: "A 60-year-old woman presents with acute onset right-sided weakness and aphasia. Time since symptom onset is 2.5 hours. What is the most appropriate immediate management?",
    options: [
      { id: "A", text: "Aspirin 300mg" },
      { id: "B", text: "CT brain and consider thrombolysis" },
      { id: "C", text: "MRI brain" },
      { id: "D", text: "Carotid ultrasound" },
    ],
    correctAnswer: "B",
    explanation: "In acute stroke within the thrombolysis window (4.5 hours), immediate CT brain is required to rule out hemorrhage, followed by thrombolysis if appropriate.",
  },
  {
    id: "DERM001",
    category: "Dermatology",
    difficulty: "Easy",
    question: "A 25-year-old presents with an itchy, vesicular rash in a dermatomal distribution. What is the most likely diagnosis?",
    options: [
      { id: "A", text: "Herpes Zoster" },
      { id: "B", text: "Contact Dermatitis" },
      { id: "C", text: "Impetigo" },
      { id: "D", text: "Cellulitis" },
    ],
    correctAnswer: "A",
    explanation: "Herpes zoster (shingles) typically presents with a painful/itchy vesicular rash confined to a dermatome, caused by reactivation of varicella-zoster virus.",
  },
  {
    id: "PSYCH001",
    category: "Psychiatry",
    difficulty: "Medium",
    question: "A 30-year-old presents with racing thoughts, decreased need for sleep, and grandiose ideas for 1 week. What is the most likely diagnosis?",
    options: [
      { id: "A", text: "Manic Episode" },
      { id: "B", text: "Generalized Anxiety" },
      { id: "C", text: "Schizophrenia" },
      { id: "D", text: "Depression" },
    ],
    correctAnswer: "A",
    explanation: "These symptoms (elevated mood, decreased need for sleep, grandiosity) are classic features of a manic episode, which may be part of bipolar disorder.",
  },
  {
    id: "CARDIO001",
    category: "Cardiology",
    difficulty: "Hard",
    question: "A patient with atrial fibrillation has a CHA2DS2-VASc score of 3. What is the most appropriate thromboprophylaxis?",
    options: [
      { id: "A", text: "Aspirin" },
      { id: "B", text: "Direct Oral Anticoagulant" },
      { id: "C", text: "No anticoagulation" },
      { id: "D", text: "Clopidogrel" },
    ],
    correctAnswer: "B",
    explanation: "With a CHA2DS2-VASc score ≥2, oral anticoagulation is indicated. DOACs are preferred over warfarin in non-valvular AF due to better safety profile.",
  },
  {
    id: "RESP001",
    category: "Respiratory Medicine",
    difficulty: "Medium",
    question: "A patient with COPD presents with worsening breathlessness and purulent sputum. What is the most appropriate initial management?",
    options: [
      { id: "A", text: "Oral antibiotics and steroids" },
      { id: "B", text: "Nebulized bronchodilators only" },
      { id: "C", text: "IV antibiotics" },
      { id: "D", text: "Chest physiotherapy" },
    ],
    correctAnswer: "A",
    explanation: "In COPD exacerbation with increased breathlessness and purulent sputum, both oral antibiotics and steroids are indicated as first-line treatment.",
  },
  {
    id: "ENDO001",
    category: "Endocrinology",
    difficulty: "Hard",
    question: "A patient with type 2 diabetes has persistent microalbuminuria. Which medication should be initiated?",
    options: [
      { id: "A", text: "ACE inhibitor" },
      { id: "B", text: "Beta blocker" },
      { id: "C", text: "Calcium channel blocker" },
      { id: "D", text: "Thiazide diuretic" },
    ],
    correctAnswer: "A",
    explanation: "ACE inhibitors are first-line treatment for diabetic nephropathy with microalbuminuria due to their renoprotective effects beyond blood pressure control.",
  },
  {
    id: "GASTRO001",
    category: "Gastroenterology",
    difficulty: "Medium",
    question: "A patient presents with acute onset severe epigastric pain radiating to the back. Serum lipase is elevated 4 times upper limit. What is the most appropriate initial management?",
    options: [
      { id: "A", text: "IV fluids and analgesia" },
      { id: "B", text: "Urgent ERCP" },
      { id: "C", text: "Antibiotics" },
      { id: "D", text: "Surgery" },
    ],
    correctAnswer: "A",
    explanation: "In acute pancreatitis, initial management focuses on supportive care with IV fluids and analgesia. Other interventions depend on the underlying cause and complications.",
  }
]; 