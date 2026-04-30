import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useStore } from '../store/useStore';
import { CATEGORY_GRADIENTS } from '../config/themes';

export default function FunFactOverlay() {
  const { showFunFact, closeFunFact } = useStore();

  return (
    <AnimatePresence>
      {showFunFact && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={`relative w-full max-w-sm rounded-3xl p-6 bg-gradient-to-br ${CATEGORY_GRADIENTS[showFunFact.funFact.category] ?? 'from-indigo-500 to-purple-700'} shadow-2xl`}
            initial={{ scale: 0.5, rotateY: 90, opacity: 0 }}
            animate={{ scale: 1, rotateY: 0, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <button
              onClick={closeFunFact}
              className="absolute top-3 right-3 text-white/80 hover:text-white"
              aria-label="Close"
            >
              <X size={22} />
            </button>

            <motion.div
              className="text-center mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
              style={{ fontSize: 64 }}
            >
              {showFunFact.funFact.emoji}
            </motion.div>

            <motion.h2
              className="text-white font-head text-3xl font-black text-center mb-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {showFunFact.answer}
            </motion.h2>

            <motion.p
              className="text-white/70 text-xs text-center uppercase tracking-widest mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {showFunFact.funFact.category}
            </motion.p>

            <motion.div
              className="bg-white/20 rounded-2xl p-4 mb-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-white font-semibold text-sm leading-relaxed">
                {showFunFact.funFact.funFact}
              </p>
            </motion.div>

            <motion.div
              className="bg-white/10 rounded-2xl p-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
            >
              <p className="text-white/60 text-xs font-bold uppercase mb-1">Did you know?</p>
              <p className="text-white text-sm leading-relaxed">{showFunFact.funFact.didYouKnow}</p>
            </motion.div>

            <motion.button
              onClick={closeFunFact}
              className="mt-4 w-full bg-white/20 hover:bg-white/30 text-white font-bold py-3 rounded-2xl transition-all"
              whileTap={{ scale: 0.96 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Awesome! ⭐
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
