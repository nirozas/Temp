import React, { useEffect } from 'react';
import { useGameStore } from '../store/useGameStore';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';
import { sounds } from '../utils/sounds';

const ResolutionScreen: React.FC = () => {
  const { lastTurnResult, nextTurn, updatePosition, teams, currentTeamIndex, selectedDifficulty } = useGameStore();

  const currentTeam = teams[currentTeamIndex];
  const success = lastTurnResult === 'SUCCESS';
  
  let steps = 0;
  if (success) {
    if (selectedDifficulty === 'Easy') steps = 1;
    else if (selectedDifficulty === 'Medium') steps = 2;
    else if (selectedDifficulty === 'Hard') steps = 3;
  }

  useEffect(() => {
    if (success) sounds.success();
    else sounds.fail();

    const timer = setTimeout(() => {
      if (success) {
        updatePosition(currentTeam.id, steps);
      }
      // Wait for movement animation then next turn
      setTimeout(() => {
         if (!useGameStore.getState().winner) {
           nextTurn();
         }
      }, 1500);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-slate-900/90 backdrop-blur-xl">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <motion.div
           animate={{ 
             scale: [1, 1.2, 1],
             rotate: success ? [0, 10, -10, 0] : [0, 5, -5, 0]
           }}
           transition={{ duration: 0.5, repeat: 3 }}
           className="flex justify-center mb-8"
        >
          {success ? (
            <CheckCircle2 size={160} className="text-emerald-500 drop-shadow-[0_0_30px_rgba(16,185,129,0.5)]" />
          ) : (
            <XCircle size={160} className="text-rose-500 drop-shadow-[0_0_30px_rgba(244,63,94,0.5)]" />
          )}
        </motion.div>

        <h2 className={`text-6xl font-black mb-4 ${success ? 'text-emerald-400' : 'text-rose-400'}`}>
          {success ? 'WELL DONE!' : "TIME'S UP!"}
        </h2>
        
        <p className="text-2xl text-slate-300 font-bold mb-8">
          {success 
            ? `${currentTeam.name} earned ${steps} ${steps === 1 ? 'step' : 'steps'}!` 
            : `${currentTeam.name} stays on square ${currentTeam.position + 1}.`}
        </p>

        {success && (
          <div className="flex justify-center gap-4">
            {Array.from({ length: steps }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.2 }}
                className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
              >
                +{i + 1}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ResolutionScreen;
