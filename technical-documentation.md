# PassMedics - Technical Documentation

## System Architecture

### Tech Stack
- **Frontend Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: React Context API with TypeScript reducers
- **UI Components**: Custom components built with Radix UI primitives
- **Animations**: Framer Motion for card flips and transitions

## Core Components

### 1. State Management

#### FlashcardContext
```typescript
interface Flashcard {
  id: string;
  front: string;
  back: string;
  lastReviewed?: Date;
  nextReview?: Date;
  repetitions: number;
  easeFactor: number;
}

interface Deck {
  id: string;
  name: string;
  description: string;
  cards: Flashcard[];
  createdAt: Date;
  lastStudied?: Date;
}
```
- Manages flashcard decks and cards
- Implements spaced repetition algorithm
- Handles persistence to localStorage with date serialization/deserialization

#### QuizContext
```typescript
interface QuizState {
  questions: QuizQuestion[];
  answers: Answer[];
  currentQuestionIndex: number;
  isComplete: boolean;
}
```
- Manages quiz state and progression
- Handles answer tracking and scoring
- Implements quiz completion logic

#### HistoryContext
```typescript
interface AttemptResult {
  id: string;
  type: 'quiz' | 'clinical-case';
  title: string;
  score: number;
  accuracy: number;
  timeSpent: number;
  timestamp: Date;
  details?: {
    category?: string;
    difficulty?: string;
    totalQuestions?: number;
    correctAnswers?: number;
  };
}
```
- Tracks user performance history
- Stores quiz and clinical case attempts
- Provides analytics and progress tracking

## Data Flow Architecture

### 1. Unidirectional Data Flow
The application implements a unidirectional data flow pattern:
```
Action → Reducer → State Update → UI Update
```

#### Action Dispatching
```typescript
// Example action dispatch
dispatch({
  type: 'ADD_CARD',
  payload: {
    deckId: string,
    card: CardData
  }
});
```

#### State Updates
- All state updates are handled through reducers
- Reducers are pure functions
- State immutability is maintained

### 2. Context Provider Hierarchy
```
ThemeProvider
└── HistoryProvider
    └── QuizProvider
        └── FlashcardProvider
            └── Application Components
```

### 3. State Persistence Strategies

#### LocalStorage Implementation
```typescript
// Save state
useEffect(() => {
  if (state !== initialState) {
    const stateToSave = serializeState(state);
    localStorage.setItem('key', JSON.stringify(stateToSave));
  }
}, [state]);

// Load state
const loadState = () => {
  const savedState = localStorage.getItem('key');
  if (savedState) {
    return deserializeState(JSON.parse(savedState));
  }
  return initialState;
};
```

#### Date Handling
```typescript
// Serialization
const serializeDate = (date: Date) => date.toISOString();

// Deserialization
const deserializeDate = (dateString: string) => new Date(dateString);
```

### 4. State Synchronization

#### Cross-Tab Synchronization
```typescript
window.addEventListener('storage', (e) => {
  if (e.key === 'flashcardState') {
    const newState = JSON.parse(e.newValue);
    dispatch({ type: 'LOAD_STATE', payload: newState });
  }
});
```

#### Error Recovery
```typescript
try {
  const parsedState = JSON.parse(savedState);
  return deserializeState(parsedState);
} catch (error) {
  console.error('State recovery failed:', error);
  return initialState;
}
```

## Feature Modules

### 1. Flashcards Module
- **Components**:
  - `Flashcard`: Interactive card with flip animation
  - `DeckView`: Deck management interface
  - `StudySession`: Spaced repetition implementation
- **Features**:
  - Create/edit/delete decks
  - Add/edit/delete cards
  - Study mode with spaced repetition
  - Progress tracking

### 2. Quiz Module
- **Components**:
  - `QuizExperience`: Main quiz interface
  - `QuizResults`: Detailed performance analysis
- **Features**:
  - Timed questions
  - Multiple choice answers
  - Progress tracking
  - Detailed explanations
  - Performance analytics

### 3. Clinical Cases Module
- **Components**:
  - `CaseSimulator`: Interactive case study
  - `CaseResults`: Case analysis and feedback
- **Features**:
  - Realistic medical scenarios
  - Decision-based progression
  - Detailed feedback
  - Performance tracking

## State Management Patterns

### 1. Context Composition
```typescript
interface ContextState<T> {
  state: T;
  dispatch: React.Dispatch<Action>;
}

const createContextProvider = <T,>(
  reducer: Reducer<T>,
  initialState: T,
  persistKey?: string
) => {
  return ({ children }: { children: ReactNode }) => {
    // Implementation
  };
};
```

### 2. Action Creators
```typescript
const createAction = <T extends string, P>(
  type: T,
  payload: P
): { type: T; payload: P } => ({
  type,
  payload,
});
```

### 3. Reducer Patterns
```typescript
type Reducer<S, A> = (state: S, action: A) => S;

const createReducer = <S, A>(handlers: Record<string, Reducer<S, A>>) =>
  (state: S, action: A) => {
    return handlers[action.type]?.(state, action) ?? state;
  };
```

## Data Models

### 1. Quiz Question Schema
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

### 2. Clinical Case Schema
```typescript
interface ClinicalCase {
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
```

## Performance Optimization Strategies

### 1. State Updates
- Batch updates using `useReducer`
- Memoize expensive calculations
- Implement proper dependency arrays in hooks

### 2. Component Optimization
```typescript
const MemoizedComponent = React.memo(({ prop }: Props) => {
  // Implementation
}, (prevProps, nextProps) => {
  // Custom comparison logic
});
```

### 3. Data Loading
- Implement lazy loading
- Use suspense boundaries
- Handle loading states gracefully

## Error Handling and Recovery

### 1. Error Boundaries
```typescript
class ErrorBoundary extends React.Component {
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error
  }
}
```

### 2. State Recovery
- Implement fallback states
- Provide recovery mechanisms
- Handle edge cases gracefully

## Future Enhancements

1. **Authentication System**
   - User accounts
   - Progress syncing
   - Social features

2. **Backend Integration**
   - API endpoints for data persistence
   - User data management
   - Analytics tracking

3. **Advanced Features**
   - AI-powered question generation
   - Peer comparison
   - Custom study paths
   - Enhanced analytics

4. **Performance Monitoring**
   - Usage analytics
   - Error tracking
   - Performance metrics

## Development Guidelines

### 1. Code Organization
- Feature-based directory structure
- Clear separation of concerns
- Consistent naming conventions

### 2. State Management
- Use appropriate context scope
- Implement proper type safety
- Follow immutability patterns

### 3. Testing Strategy
- Unit tests for utilities
- Integration tests for features
- E2E tests for critical paths

### 4. Performance Considerations
- Regular performance audits
- Bundle size optimization
- Runtime performance monitoring

## UI/UX Features

### Design System
- Custom color scheme with CSS variables
```typescript
// Example color tokens
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  --primary: 0 0% 9%;
  --primary-foreground: 0 0% 98%;
  --secondary: 0 0% 96.1%;
  --secondary-foreground: 0 0% 9%;
  --muted: 0 0% 96.1%;
  --muted-foreground: 0 0% 45.1%;
  --chart-1: 12 76% 61%;
  --chart-2: 173 58% 39%;
}
```
- Responsive breakpoints system
- Interactive states (hover, focus, active)
- Dark/light mode support
- Consistent spacing and typography

### Component Design Principles
- Accessibility-first approach
- Consistent interaction patterns
- Visual feedback for all interactions
- Loading and error states
- Responsive behavior

### Animation System
- Page transitions
- Component animations
- Micro-interactions
- Performance-optimized animations

## Application Flow

### Page Structure and Routing

1. **Home Page** (`app/page.tsx`)
   - Platform introduction
   - Features overview
   - Navigation to all main sections

2. **Quiz Flow**
   - **Quiz Home** (`app/quiz/page.tsx`)
     - Quiz features explanation
     - Start quiz button
     - Clinical cases option
   - **Quiz Experience** (`app/quiz/[id]/page.tsx`)
     - Question display
     - Timer
     - Progress tracking
     - Answer selection
     - Navigation controls
   - **Results Page** (`app/quiz/results/page.tsx`)
     - Overall score
     - Topic performance analysis
     - Detailed question review
     - Options to retry or return home

3. **Flashcards Flow**
   - **Flashcards Home** (`app/flashcards/page.tsx`)
     - Deck management
     - Create new deck
     - View all decks
     - Search and filter decks
   - **Deck View** (`app/flashcards/[id]/page.tsx`)
     - Card list
     - Add/edit/delete cards
     - Study statistics
     - Deck settings
   - **Study Session** (`app/flashcards/[id]/study/page.tsx`)
     - Card review interface
     - Spaced repetition controls
     - Progress tracking
     - Performance feedback

4. **Clinical Cases Flow**
   - **Cases Home** (`app/clinical-cases/page.tsx`)
     - Available cases list
     - Case categories
     - Difficulty levels
     - Progress overview
   - **Case Experience** (`app/clinical-cases/[id]/page.tsx`)
     - Patient information
     - Stage progression
     - Decision making
     - Time management
   - **Case Results** (`app/clinical-cases/[id]/results/page.tsx`)
     - Performance analysis
     - Decision review
     - Learning points
     - Suggested improvements

5. **History and Analytics**
   - **History Overview** (`app/history/page.tsx`)
     - Performance timeline
     - Activity tracking
     - Statistics by category
     - Progress trends
   - **Attempt Details** (`app/history/[id]/page.tsx`)
     - Detailed attempt review
     - Score breakdown
     - Time analysis
     - Improvement suggestions

### Navigation Patterns

1. **Primary Navigation**
   - Header navigation bar
   - Quick access to main sections
   - User settings and preferences

2. **Secondary Navigation**
   - Breadcrumb trails
   - Back buttons
   - Context-aware menus

3. **Progress Navigation**
   - Step indicators
   - Progress bars
   - Stage markers

### Clinical Case Simulator

#### State Management
```typescript
interface CaseState {
  selectedActions: SelectedAction[];
  isStageComplete: boolean;
  feedback: Feedback | null;
  stageScores: number[];
  timeLeft: number;
}

interface SelectedAction extends CaseAction {
  selectionOrder: number;
}

interface Feedback {
  type: 'success' | 'error';
  message: string;
}
```

#### Action Flow
1. **Action Selection**
   - Users select actions in their preferred order
   - Each action is assigned a selection order number
   - Actions can be deselected, causing remaining actions to be reordered
   - Selection is disabled when stage is complete

2. **Stage Completion**
   - Users must click "Finish Stage" to check their answers
   - System validates:
     - All correct actions are selected
     - Actions are in the correct order
   - Feedback is provided based on validation
   - Stage score is calculated and stored

3. **Stage Navigation**
   - Users can retry the current stage
   - Progress to next stage only after completion
   - Final results calculated upon case completion

#### Scoring System
```typescript
const calculateStageScore = (selectedActs: CaseAction[], correctActs: CaseAction[]) => {
  const correctlySelected = selectedActs.filter(a => a.isCorrect).length;
  const totalCorrect = correctActs.length;
  return Math.round((correctlySelected / totalCorrect) * 100);
};
```

#### Session Storage
```typescript
// Structure of stored data
interface SessionData {
  userActions: Array<{
    text: string;
    order: number;
    isCorrect: boolean;
  }>[];
  stageScores: number[];
  caseResults: {
    score: number;
    completionTime: number;
    stagesCompleted: number;
  };
}
```

#### UI Components
1. **Progress Tracking**
   - Stage progress indicator
   - Time remaining counter
   - Current stage score display

2. **Action Selection**
   - Visual indicators for selection order
   - Type-specific icons (Examination, Treatment, Investigation)
   - Interactive selection/deselection

3. **Feedback System**
   - Animated feedback messages
   - Success/error states
   - Clear action validation

4. **Navigation Controls**
   - Exit case
   - Finish stage
   - Retry stage
   - Next stage/Complete case 
