# PassMedics - Medical Quiz Platform

PassMedics is a modern, interactive medical quiz platform designed to help medical students test and improve their knowledge through adaptive quizzes and clinical cases.

## 🌟 Features

### Quiz Experience
- Adaptive Questions
- Real-time Progress Tracking
- Topic-based Learning
- Difficulty Levels
- Detailed Explanations
- Time Management
- Interactive UI

### Results Analysis
- Overall Performance
- Topic Analysis
- Detailed Review
- Performance Indicators
- Flashcard Integration

### Clinical Case Simulator
- **Interactive Case Studies**: Practice with realistic patient scenarios
- **Step-by-Step Approach**: Work through cases stage by stage
- **Action Sequencing**: Select and order clinical actions (examinations, treatments, investigations)
- **Real-time Feedback**: Get immediate feedback on your clinical decisions
- **Progress Tracking**: Monitor your performance with stage-by-stage scoring
- **Retry Functionality**: Practice stages multiple times to improve your approach

## 🚀 Getting Started

1. **Prerequisites**
   - Node.js (v14 or higher)
   - npm or yarn

2. **Installation**
   ```bash
   git clone <repository-url>
   cd passmedics
   npm install
   # or
   yarn install
   ```

3. **Development**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Build**
   ```bash
   npm run build
   # or
   yarn build
   ```

## 📚 Documentation

For detailed technical documentation, including:
- System Architecture
- Data Flow
- State Management
- Feature Modules
- Performance Optimization
- Error Handling

Please refer to [technical-documentation.md](./technical-documentation.md)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🏗️ Technical Architecture

### Frontend Framework
- Next.js 15 (React Framework)
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

For detailed information about application flow, routing, and page structure, please refer to the [technical documentation](./technical-documentation.md#application-flow).

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

## 📋 Using the Clinical Case Simulator

1. **Starting a Case**
   - Browse available cases on the Clinical Cases page
   - Select a case to begin
   - Review patient information and vital signs

2. **Working Through Stages**
   - Read the stage question carefully
   - Select clinical actions in your preferred order
   - Actions can be deselected if needed
   - Click "Finish Stage" when ready to check your answers
   - Review feedback and retry if needed
   - Proceed to next stage when complete

3. **Completing Cases**
   - Track your progress through the progress bar
   - Monitor your score for each stage
   - Review final results including:
     - Overall score
     - Time taken
     - Stage-by-stage performance

## 📧 Author

This project is a test project written by [@johnexzy](https://github.com/johnexzy).


