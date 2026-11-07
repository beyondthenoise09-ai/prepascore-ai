export enum Board {
  CBSE = 'CBSE',
  ICSE = 'ICSE',
  CHSE = 'CHSE',
  BSE = 'BSE',
  JEE = 'JEE Main',
  NEET = 'NEET'
}

export enum Subject {
  PHYSICS = 'Physics',
  CHEMISTRY = 'Chemistry',
  MATHS = 'Mathematics',
  BIOLOGY = 'Biology',
  ENGLISH = 'English'
}

export enum ChapterStatus {
  NOT_STARTED = 'Not Started',
  PRACTICED = 'Practiced',
  WEAK = 'Weak',
  STRONG = 'Strong'
}

export interface StudentProfile {
  name: string;
  className: string;
  board: Board;
  subjects: Subject[];
  syllabus: SyllabusItem[];
}

export interface SyllabusItem {
  subject: Subject;
  chapterName: string;
  status: ChapterStatus;
  progress: number; // 0-100
}

export interface MCQQuestion {
  id: number;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface MCQFeedbackItem {
  questionId: number;
  questionNumber: number;
  questionText: string;
  userAnswerText: string;
  correctAnswerText: string;
  explanation: string;
  examTip: string;
}

export interface MCQResult {
  score: number;
  total: number;
  correctAnswers: number;
  wrongAnswers: number;
  accuracy: number;
  speed: 'Fast' | 'Average' | 'Slow';
  avgTimePerQuestion: number;
  weakConcepts: string[];
  strongConcepts: string[];
  mistakeTypes: string[]; 
  improvementAdvice: string[];
  detailedFeedback: MCQFeedbackItem[];
}

// New types for Subjective Test
export interface SubjectiveQuestion {
  id: number;
  question: string;
  maxMarks: number;
}

export interface QuestionEvaluation {
  questionId: number;
  question: string;
  marksAwarded: number;
  maxMarks: number;
  feedback: string;
  modelAnswer: string;
  isZeroMarks: boolean; // To highlight 0 marks case
}

export interface SubjectiveResult {
  totalScore: number;
  totalMaxMarks: number;
  evaluations: QuestionEvaluation[];
  overallFeedback: string;
}

export type TestMode = 'MCQ' | 'SHORT' | 'LONG';