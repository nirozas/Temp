import React, { useEffect } from 'react';
import { useGameStore } from '../store/useGameStore';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Trophy, RefreshCcw, Star } from 'lucide-react';

const WinnerScreen: React.FC = () => {
  const { winner, resetGame } = useGameStore();

  useEffect(() => {
    if (winner) {
      const duration = 15 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);
    }
  }, [winner]);

  if (!winner) return null;

  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-[#0f172a]">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/20 via-purple-600/20 to-pink-600/20" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + '%', 
              y: Math.random() * 100 + '%',
              scale: Math.random() * 0.5 + 0.5,
              opacity: Math.random() * 0.5 + 0.2
            }}
            animate={{ 
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: Math.random() * 3 + 2, 
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            className="absolute text-yellow-300"
          >
            <Star size={Math.random() * 20 + 10} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      {/* Floating Clouds */}
      <motion.div
        animate={{ x: [-100, 100, -100] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-[10%] left-0 text-9xl opacity-10 grayscale"
      >
        ☁️
      </motion.div>
      <motion.div
        animate={{ x: [100, -100, 100] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute top-[40%] right-0 text-8xl opacity-10 grayscale"
      >
        ☁️
      </motion.div>
      
      <motion.div
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 15 }}
        className="relative z-10 flex flex-col items-center text-center px-8"
      >
        {/* Crown & Avatar */}
        <div className="relative mb-8">
          <motion.div
            animate={{ rotate: [-5, 5, -5], y: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 text-7xl z-20"
          >
            👑
          </motion.div>
          <div 
            className="w-48 h-48 rounded-[3rem] flex items-center justify-center text-8xl shadow-[0_0_50px_rgba(255,255,255,0.3)] border-8 border-white/20 relative z-10"
            style={{ backgroundColor: winner.color }}
          >
            {winner.avatar}
          </div>
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-white/5 rounded-[3rem] -z-10 blur-xl scale-125"
          />
        </div>

        <h3 className="text-yellow-400 font-black uppercase tracking-[0.4em] text-xl mb-2 drop-shadow-lg">CHAMPION!</h3>
        <h1 className="text-7xl md:text-9xl font-black text-white mb-6 drop-shadow-2xl">
          {winner.name}
        </h1>

        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="bg-white/10 backdrop-blur-xl rounded-[2.5rem] p-8 border-2 border-white/20 shadow-2xl mb-12 flex flex-col items-center gap-4"
        >
           <Trophy size={80} className="text-yellow-400 drop-shadow-[0_0_20px_rgba(250,204,21,0.5)]" />
           <div>
             <p className="text-white text-3xl font-black italic tracking-tight">VICTORY!</p>
             <p className="text-indigo-200 font-bold">You've conquered the Adventure Map!</p>
           </div>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetGame}
          className="px-12 py-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-3xl font-black text-3xl shadow-[0_20px_50px_rgba(16,185,129,0.3)] flex items-center gap-4 group border-b-8 border-emerald-700"
        >
          <RefreshCcw className="group-hover:rotate-180 transition-transform duration-700" size={32} />
          PLAY AGAIN
        </motion.button>
      </motion.div>
      
      {/* Floating Emojis */}
      <motion.div
        animate={{ y: [0, -30, 0], x: [0, 20, 0], rotate: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-[15%] text-7xl opacity-20"
      >
        🎨
      </motion.div>
      <motion.div
        animate={{ y: [0, 30, 0], x: [0, -20, 0], rotate: [0, -20, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-20 right-[20%] text-7xl opacity-20"
      >
        ✏️
      </motion.div>
      <motion.div
        animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-1/2 left-[5%] text-8xl"
      >
        ✨
      </motion.div>
    </div>
  );
};

export default WinnerScreen;
