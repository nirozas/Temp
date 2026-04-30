export type AgeGroup = '4-5' | '6-8' | '9-11' | '12-15' | '15-18' | '18+';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type Direction = 'across' | 'down';
export type MascotState = 'idle' | 'happy' | 'thinking' | 'celebrating' | 'encouraging' | 'surprised';
export type Screen =
  | 'splash'
  | 'onboarding-name'
  | 'onboarding-age'
  | 'onboarding-welcome'
  | 'dashboard'
  | 'puzzle-select'
  | 'game'
  | 'word-collection'
  | 'settings';

export interface Player {
  name: string;
  ageGroup: AgeGroup;
  starsTotal: number;
  wordsLearned: string[];
  streakDays: number;
  lastPlayedDate: string;
  completedPuzzleIds: string[];
}

export interface FunFactCard {
  word: string;
  emoji: string;
  funFact: string;
  didYouKnow: string;
  imageDescription: string;
  category: string;
  difficulty: Difficulty;
  deepDiveUrl?: string;
  formula?: string;
  criticalThinking?: string;
}

export interface CrosswordWord {
  id: string;
  number: number;
  direction: Direction;
  answer: string;
  clue: string;
  row: number;
  col: number;
  funFact: FunFactCard;
  imageHint: string;
}

export interface CrosswordCell {
  row: number;
  col: number;
  letter: string;
  isBlack: boolean;
  number?: number;
  wordIds: string[];
  userInput: string;
  revealed: boolean;
  correct: boolean;
}

export interface Puzzle {
  id: string;
  title: string;
  ageGroup: AgeGroup;
  difficulty: Difficulty;
  gridSize: number;
  words: CrosswordWord[];
  theme: string;
  themeEmoji: string;
}

export interface HintUsage {
  wordId: string;
  hintsUsed: number;
}

export interface GameSession {
  puzzleId: string;
  startTime: number;
  endTime?: number;
  hintsUsed: HintUsage[];
  starsEarned: number;
  wordsCompleted: string[];
  cellStates: Record<string, { userInput: string; revealed: boolean; correct: boolean }>;
}
