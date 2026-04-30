import { easyPuzzles } from './puzzles-easy';
import { mediumPuzzles } from './puzzles-medium';
import { hardPuzzles } from './puzzles-hard';
import type { Puzzle, AgeGroup } from '../types';

export const allPuzzles: Puzzle[] = [...easyPuzzles, ...mediumPuzzles, ...hardPuzzles];

export function getPuzzlesForAgeGroup(ageGroup: AgeGroup): Puzzle[] {
  return allPuzzles.filter(p => p.ageGroup === ageGroup);
}



export const THEMES = [
  'Animals', 'Space', 'Food', 'Beach', 'Christmas', 'Thanksgiving',
  'Muslim Holidays', 'Seasons', 'Geography', 'Colors', 'Science', 'Mythology'
];

export const THEME_ICONS: Record<string, string> = {
  Animals: '🐾', Space: '🚀', Food: '🍓', Beach: '🏖️',
  Christmas: '🎄', Thanksgiving: '🦃', 'Muslim Holidays': '🌙',
  Seasons: '🌈', Geography: '🌍', Colors: '🎨', Science: '🔬', Mythology: '⚡',
};
