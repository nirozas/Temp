import { useCallback, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Image, Lightbulb, Unlock, ChevronRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import { buildGrid, getCellKey, isWordComplete } from '../utils/gridUtils';
import Confetti from '../components/Confetti';
import FunFactOverlay from '../components/FunFactOverlay';

export default function GameScreen() {
  const {
    currentPuzzle, session, selectedWordId,
    setScreen, setSelectedWord, updateCell, revealLetter, revealWord, completeWord, endPuzzle, completedWordIds,
  } = useStore();

  const [showImageHint, setShowImageHint] = useState<string | null>(null);
  const [shake, setShake] = useState<string | null>(null);
  const [confetti, setConfetti] = useState(false);
  const [puzzleDone, setPuzzleDone] = useState(false);
  const inputRefs = useRef<Record<string, HTMLInputElement>>({});

  const puzzle = currentPuzzle;
  if (!puzzle || !session) return null;

  const grid = useMemo(() => buildGrid(puzzle), [puzzle]);
  const selectedWord = puzzle.words.find(w => w.id === selectedWordId) ?? puzzle.words[0];

  const cellState = useCallback((r: number, c: number) =>
    session.cellStates[getCellKey(r, c)] ?? { userInput: '', revealed: false, correct: false },
  [session.cellStates]);

  const isCellInWord = (r: number, c: number, wordId: string) => {
    const w = puzzle.words.find(x => x.id === wordId);
    if (!w) return false;
    if (w.direction === 'across') return r === w.row && c >= w.col && c < w.col + w.answer.length;
    return c === w.col && r >= w.row && r < w.row + w.answer.length;
  };

  const handleCellInput = (r: number, c: number, val: string) => {
    const key = getCellKey(r, c);
    const letter = val.slice(-1).toUpperCase();
    updateCell(key, letter);

    const cell = grid[r][c];
    const correctLetter = cell.letter;

    if (letter && letter !== correctLetter) {
      setShake(key);
      setTimeout(() => setShake(null), 500);
    }

    if (letter) {
      // advance to next cell
      if (selectedWord) {
        for (let i = 0; i < selectedWord.answer.length; i++) {
          const nr = selectedWord.direction === 'across' ? selectedWord.row : selectedWord.row + i;
          const nc = selectedWord.direction === 'across' ? selectedWord.col + i : selectedWord.col;
          if (nr === r && nc === c && i < selectedWord.answer.length - 1) {
            const nextr = selectedWord.direction === 'across' ? r : r + 1;
            const nextc = selectedWord.direction === 'across' ? c + 1 : c;
            inputRefs.current[getCellKey(nextr, nextc)]?.focus();
            break;
          }
        }
        // check word done
        const testStates = { ...session.cellStates, [key]: { userInput: letter, revealed: false, correct: false } };
        if (isWordComplete(selectedWord.id, puzzle, testStates) && !completedWordIds.includes(selectedWord.id)) {
          setTimeout(() => {
            setConfetti(true);
            setTimeout(() => setConfetti(false), 3000);
            completeWord(selectedWord.id);
            // check puzzle done
            const allDone = puzzle.words.every(w =>
              completedWordIds.includes(w.id) || w.id === selectedWord.id
            );
            if (allDone) {
              endPuzzle();
              setTimeout(() => setPuzzleDone(true), 800);
            }
          }, 100);
        }
      }
    }
  };

  const handleRevealLetter = () => {
    if (!selectedWord) return;
    for (let i = 0; i < selectedWord.answer.length; i++) {
      const r = selectedWord.direction === 'across' ? selectedWord.row : selectedWord.row + i;
      const c = selectedWord.direction === 'across' ? selectedWord.col + i : selectedWord.col;
      const st = cellState(r, c);
      if (!st.revealed && st.userInput !== selectedWord.answer[i]) {
        updateCell(getCellKey(r, c), selectedWord.answer[i]);
        revealLetter(selectedWord.id, i);
        break;
      }
    }
  };

  const handleRevealWord = () => {
    if (!selectedWord) return;
    for (let i = 0; i < selectedWord.answer.length; i++) {
      const r = selectedWord.direction === 'across' ? selectedWord.row : selectedWord.row + i;
      const c = selectedWord.direction === 'across' ? selectedWord.col + i : selectedWord.col;
      updateCell(getCellKey(r, c), selectedWord.answer[i]);
    }
    revealWord(selectedWord.id);
    if (!completedWordIds.includes(selectedWord.id)) {
      setTimeout(() => completeWord(selectedWord.id), 300);
    }
  };

  const cellSize = Math.min(Math.floor((Math.min(window.innerWidth, 420) - 40) / puzzle.gridSize), 44);

  return (
    <div className="bg-app min-h-dvh flex flex-col max-w-md mx-auto">
      <Confetti active={confetti} />
      <FunFactOverlay />

      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-6 pb-3">
        <button onClick={() => setScreen('puzzle-select')}
          className="p-2 rounded-xl" style={{ background: 'var(--c-surface)', color: 'var(--c-text)' }}>
          <ArrowLeft size={18} />
        </button>
        <div className="flex-1">
          <p className="text-muted text-xs font-semibold uppercase tracking-wide">{puzzle.theme}</p>
          <h1 className="font-head text-app font-black text-lg" style={{ fontFamily: 'var(--font-head)' }}>
            {puzzle.title}
          </h1>
        </div>
        <span className="text-2xl">{puzzle.themeEmoji}</span>
      </div>

      {/* Active clue */}
      <motion.div
        key={selectedWordId}
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-4 mb-3 p-3 rounded-2xl"
        style={{ background: 'var(--c-surface)' }}
      >
        <p className="text-muted text-xs font-bold uppercase mb-0.5">
          {selectedWord?.number} {selectedWord?.direction.toUpperCase()}
        </p>
        <p className="text-app font-semibold text-sm">{selectedWord?.clue}</p>
      </motion.div>

      {/* Grid */}
      <div className="flex justify-center px-4 mb-4">
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${puzzle.gridSize}, ${cellSize}px)`, gap: 2 }}>
          {grid.flat().map(cell => {
            if (cell.isBlack) {
              return <div key={`${cell.row}-${cell.col}`}
                style={{ width: cellSize, height: cellSize, background: 'var(--c-bg)', borderRadius: 4 }} />;
            }
            const key = getCellKey(cell.row, cell.col);
            const st = cellState(cell.row, cell.col);
            const inSelected = selectedWord ? isCellInWord(cell.row, cell.col, selectedWord.id) : false;
            const isCorrect = st.userInput.toUpperCase() === cell.letter && st.userInput !== '';
            const isShaking = shake === key;

            return (
              <motion.div
                key={key}
                animate={isShaking ? { x: [-4, 4, -4, 4, 0] } : {}}
                transition={{ duration: 0.35 }}
                style={{ position: 'relative', width: cellSize, height: cellSize }}
              >
                {cell.number && (
                  <span style={{
                    position: 'absolute', top: 1, left: 2, fontSize: 8,
                    color: 'var(--c-muted)', fontWeight: 700, lineHeight: 1, zIndex: 2,
                  }}>{cell.number}</span>
                )}
                <input
                  ref={el => { if (el) inputRefs.current[key] = el; }}
                  value={st.userInput}
                  maxLength={1}
                  onChange={e => handleCellInput(cell.row, cell.col, e.target.value)}
                  onClick={() => {
                    const wordId = cell.wordIds[0];
                    if (wordId) setSelectedWord(wordId);
                  }}
                  style={{
                    width: '100%', height: '100%',
                    textAlign: 'center', textTransform: 'uppercase',
                    fontSize: Math.max(cellSize * 0.45, 14),
                    fontWeight: 900,
                    background: isCorrect ? '#4ade8033' : inSelected ? 'var(--c-accent)22' : 'var(--c-card)',
                    color: isCorrect ? 'var(--c-correct, #4ade80)' : 'var(--c-text)',
                    border: `2px solid ${inSelected ? 'var(--c-accent)' : 'var(--c-surface)'}`,
                    borderRadius: 6,
                    outline: 'none',
                    cursor: 'pointer',
                    caretColor: 'transparent',
                  }}
                  readOnly={st.revealed || completedWordIds.includes(cell.wordIds[0] ?? '')}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Hint controls */}
      <div className="flex gap-2 px-4 mb-4">
        <motion.button
          whileTap={{ scale: 0.93 }}
          onClick={() => setShowImageHint(showImageHint ? null : selectedWord?.imageHint ?? null)}
          className="flex-1 flex items-center justify-center gap-1 py-3 rounded-2xl text-sm font-bold border-2"
          style={{ background: 'var(--c-surface)', borderColor: 'var(--c-card)', color: 'var(--c-text)' }}
        >
          <Image size={16} /> Hint
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.93 }}
          onClick={handleRevealLetter}
          className="flex-1 flex items-center justify-center gap-1 py-3 rounded-2xl text-sm font-bold border-2"
          style={{ background: 'var(--c-surface)', borderColor: 'var(--c-card)', color: 'var(--c-text)' }}
        >
          <Lightbulb size={16} /> Letter (-1⭐)
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.93 }}
          onClick={handleRevealWord}
          className="flex-1 flex items-center justify-center gap-1 py-3 rounded-2xl text-sm font-bold border-2"
          style={{ background: 'var(--c-surface)', borderColor: 'var(--c-card)', color: 'var(--c-text)' }}
        >
          <Unlock size={16} /> Word (-3⭐)
        </motion.button>
      </div>

      <AnimatePresence>
        {showImageHint && (
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="mx-4 mb-4 p-4 rounded-2xl text-center text-5xl"
            style={{ background: 'var(--c-surface)' }}
          >
            {showImageHint}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Clue lists */}
      <div className="flex gap-3 px-4 pb-8 overflow-x-auto">
        {(['across','down'] as const).map(dir => (
          <div key={dir} className="flex-1 min-w-0">
            <p className="text-muted text-xs font-bold uppercase mb-2 tracking-wide">{dir}</p>
            <div className="flex flex-col gap-1">
              {puzzle.words.filter(w => w.direction === dir).map(w => (
                <button
                  key={w.id}
                  onClick={() => setSelectedWord(w.id)}
                  className="text-left px-2 py-1.5 rounded-lg text-xs transition-all"
                  style={{
                    background: selectedWordId === w.id ? 'var(--c-accent)33' : 'transparent',
                    color: completedWordIds.includes(w.id) ? 'var(--c-correct, #4ade80)' : 'var(--c-text)',
                    fontWeight: selectedWordId === w.id ? 700 : 400,
                    borderLeft: selectedWordId === w.id ? '3px solid var(--c-accent)' : '3px solid transparent',
                  }}
                >
                  <span className="font-bold">{w.number}.</span> {w.clue}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Puzzle Complete overlay */}
      <AnimatePresence>
        {puzzleDone && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 px-6"
            style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              style={{ fontSize: 80 }}
            >🏆</motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="font-head text-white text-4xl font-black text-center"
              style={{ fontFamily: 'var(--font-head)' }}
            >
              Puzzle Complete!
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-white/70 text-lg text-center"
            >
              Amazing job! You&apos;re a word wizard! 🌟
            </motion.p>
            <div className="flex gap-3 w-full max-w-xs">
              <motion.button
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => { setPuzzleDone(false); setScreen('puzzle-select'); }}
                className="flex-1 py-4 rounded-2xl font-bold text-white"
                style={{ background: 'linear-gradient(135deg, var(--c-accent), var(--c-accent2))' }}
              >
                Next Puzzle <ChevronRight size={18} className="inline" />
              </motion.button>
              <motion.button
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => { setPuzzleDone(false); setScreen('word-collection'); }}
                className="flex-1 py-4 rounded-2xl font-bold border-2"
                style={{ borderColor: 'var(--c-accent)', color: 'var(--c-accent)' }}
              >
                My Words
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
