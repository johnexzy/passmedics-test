# PassMedics - Medical Quiz Platform

PassMedics is a modern, interactive medical quiz platform designed to help medical students test and improve their knowledge through adaptive quizzes and clinical cases.

## 🌟 Features

### Quiz Experience
- **Adaptive Questions**: Questions tailored to user performance and learning needs
- **Real-time Progress Tracking**: Visual progress bar and timer for each question
- **Topic-based Learning**: Questions categorized by medical specialties
- **Difficulty Levels**: Questions marked as Easy, Medium, or Hard
- **Detailed Explanations**: Comprehensive explanations for each answer
- **Time Management**: 60-second timer per question to simulate exam conditions
- **Interactive UI**: Clean, accessible interface with clear question and answer display

### Results Analysis
- **Overall Performance**: Visual score representation with circular progress
- **Topic Analysis**: Breakdown of performance by medical categories
- **Detailed Review**: Question-by-question review with correct answers and explanations
- **Performance Indicators**: Color-coded performance metrics (green ≥70%, yellow ≥50%, red <50%)
- **Flashcard Integration**: Option to convert questions to flashcards for further study

## 🏗️ Technical Architecture

### Frontend Framework
- Next.js 14 (React Framework)
- TypeScript for type safety
- Tailwind CSS for styling

### State Management
- React Context API for quiz state management
- Custom hooks for encapsulated logic
- Local state for UI components

### Components Structure
```
components/
  ├── ui/
  │   ├── button.tsx
  │   ├── badge.tsx
  │   └── card.tsx
app/
  ├── quiz/
  │   ├── page.tsx (Quiz Home)
  │   ├── [id]/page.tsx (Quiz Experience)
  │   └── results/page.tsx (Results Page)
context/
  └── QuizContext.tsx
data/
  └── quizzes.ts
```

## 💡 Implementation Details

### Quiz State Management
The application uses a custom Context (`QuizContext.tsx`) to manage the quiz state:
- Questions array
- User answers
- Current question index
- Completion status

Actions available:
- SET_QUESTIONS
- ANSWER_QUESTION
- NEXT_QUESTION
- COMPLETE_QUIZ
- RESET_QUIZ

### Data Structure
Questions are structured with:
```typescript
interface QuizQuestion {
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
```

### Page Flow
1. **Home Page** (`app/page.tsx`)
   - Platform introduction
   - Features overview
   - Navigation to quiz or clinical cases

2. **Quiz Home** (`app/quiz/page.tsx`)
   - Quiz features explanation
   - Start quiz button
   - Clinical cases option

3. **Quiz Experience** (`app/quiz/[id]/page.tsx`)
   - Question display
   - Timer
   - Progress tracking
   - Answer selection
   - Navigation controls

4. **Results Page** (`app/quiz/results/page.tsx`)
   - Overall score
   - Topic performance analysis
   - Detailed question review
   - Options to retry or return home

## 🎨 UI/UX Features

### Design System
- Custom color scheme with CSS variables
- Responsive design for all screen sizes
- Consistent spacing and typography
- Interactive elements with hover and focus states
- Loading and error states for better user experience

### Components
- **Button**: Multiple variants (default, outline, ghost)
- **Badge**: For category and difficulty indicators
- **Card**: For content organization
- **Progress Bar**: For quiz progress
- **Timer**: Visual countdown
- **Charts**: For performance visualization

## 🚀 Getting Started

1. **Prerequisites**
   - Node.js (v14 or higher)
   - npm or yarn

2. **Installation**
   ```bash
   git clone <repository-url>
   cd passmedics
   npm install
   ```

3. **Development**
   ```bash
   npm run dev
   ```

4. **Build**
   ```bash
   npm run build
   ```

## 🔄 Future Improvements

1. **Features**
   - User authentication and profiles
   - Progress tracking across multiple quizzes
   - More interactive clinical cases
   - Spaced repetition system
   - Peer comparison statistics

2. **Technical**
   - API integration for dynamic questions
   - Performance optimization
   - Offline support
   - Analytics integration
   - Testing implementation

