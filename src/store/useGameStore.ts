import { create } from 'zustand';
import type { GameState, Team, Word, Difficulty, GamePhase } from '../types/game';

interface GameStore extends GameState {
  setTeams: (teams: Team[]) => void;
  setPhase: (phase: GamePhase) => void;
  nextTurn: () => void;
  setDifficulty: (difficulty: Difficulty) => void;
  setWord: (word: Word) => void;
  setRefImages: (images: string[]) => void;
  updatePosition: (teamId: string, steps: number) => void;
  completeTurn: (success: boolean) => void;
  resetGame: () => void;
  addTimePenalty: (seconds: number) => void;
}

export const useGameStore = create<GameStore>((set) => ({
  teams: [],
  currentTeamIndex: 0,
  phase: 'SETUP',
  selectedDifficulty: null,
  selectedCategory: null,
  currentWord: null,
  winner: null,
  lastTurnResult: null,
  timePenalty: 0,
  refImages: [],

  setTeams: (teams) => set({ teams }),
  setPhase: (phase) => set({ phase }),
  addTimePenalty: (seconds) => set(state => ({ timePenalty: state.timePenalty + seconds })),
  setDifficulty: (difficulty) => set({ selectedDifficulty: difficulty }),
  setWord: (word) => set({ currentWord: word }),
  setRefImages: (images) => set({ refImages: images }),

  updatePosition: (teamId, steps) => set((state) => {
    const newTeams = state.teams.map(team => {
      if (team.id === teamId) {
        const newPos = Math.min(team.position + steps, 30);
        return { ...team, position: newPos };
      }
      return team;
    });
    
    const winner = newTeams.find(t => t.position >= 30) || null;
    
    return { 
      teams: newTeams,
      winner,
      phase: winner ? 'WINNER' : state.phase
    };
  }),

  completeTurn: (success) => set((state) => {
    const currentTeam = state.teams[state.currentTeamIndex];
    let steps = 0;
    if (success && state.selectedDifficulty) {
      if (state.selectedDifficulty === 'Easy') steps = 1;
      else if (state.selectedDifficulty === 'Medium') steps = 2;
      else if (state.selectedDifficulty === 'Hard') steps = 3;
    }

    return {
      lastTurnResult: success ? 'SUCCESS' : 'FAIL',
      phase: 'RESOLUTION',
      // We don't advance the turn index yet, we do it after resolution animation
    };
  }),

  nextTurn: () => set((state) => {
    const nextIndex = (state.currentTeamIndex + 1) % state.teams.length;
    return {
      currentTeamIndex: nextIndex,
      phase: 'BOARD',
      selectedDifficulty: null,
      selectedCategory: null,
      currentWord: null,
      lastTurnResult: null,
      timePenalty: 0,
      refImages: [],
    };
  }),

  resetGame: () => set({
    teams: [],
    currentTeamIndex: 0,
    phase: 'SETUP',
    selectedDifficulty: null,
    selectedCategory: null,
    currentWord: null,
    winner: null,
    lastTurnResult: null
  })
}));
