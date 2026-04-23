export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Team {
  id: string;
  name: string;
  color: string;
  avatar: string;
  position: number; // 0 to 29 (square index)
}

export interface Word {
  text: string;
  category: string;
  difficulty: Difficulty;
}

export type GamePhase = 'SETUP' | 'BOARD' | 'TURN_MODAL' | 'DRAWING' | 'RESOLUTION' | 'WINNER';

export interface GameState {
  teams: Team[];
  currentTeamIndex: number;
  phase: GamePhase;
  selectedDifficulty: Difficulty | null;
  selectedCategory: string | null;
  currentWord: Word | null;
  winner: Team | null;
  lastTurnResult: 'SUCCESS' | 'FAIL' | null;
  timePenalty: number;
  refImages: string[];
}
