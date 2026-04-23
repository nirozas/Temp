import { AnimatePresence, motion } from 'framer-motion';
import { useGameStore } from './store/useGameStore';
import SetupScreen from './components/SetupScreen';
import GameBoard from './components/GameBoard';
import TurnModal from './components/TurnModal';
import DrawingPhase from './components/DrawingPhase';
import ResolutionScreen from './components/ResolutionScreen';
import WinnerScreen from './components/WinnerScreen';
import type { GamePhase } from './types/game';

const App = () => {
  const { phase } = useGameStore();

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-hidden font-sans">
      <AnimatePresence mode="wait">
        {phase === 'SETUP' && (
          <motion.div
            key="setup"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="w-full h-full"
          >
            <SetupScreen />
          </motion.div>
        )}

        {(phase === 'BOARD' || phase === 'RESOLUTION') && (
          <motion.div
            key="board"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full h-full"
          >
            <GameBoard />
            {phase === 'RESOLUTION' && <ResolutionScreen />}
          </motion.div>
        )}

        {phase === 'TURN_MODAL' && (
          <motion.div
            key="turn-modal"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          >
            <TurnModal />
          </motion.div>
        )}

        {phase === 'DRAWING' && (
          <motion.div
            key="drawing"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full h-full"
          >
            <DrawingPhase />
          </motion.div>
        )}

        {phase === 'WINNER' && (
          <motion.div
            key="winner"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full"
          >
            <WinnerScreen />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
