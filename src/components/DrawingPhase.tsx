import { useRef, useState, useEffect } from 'react';
import type { PointerEvent } from 'react';
import { useGameStore } from '../store/useGameStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Eraser, Pencil, RotateCcw, CheckCircle, Clock, Lightbulb, X } from 'lucide-react';

const DrawingPhase = () => {
  const { currentWord, teams, currentTeamIndex, completeTurn, timePenalty, refImages } = useGameStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#ffffff');
  const [lineWidth] = useState(5);
  const [mode, setMode] = useState<'pen' | 'eraser'>('pen');
  const [timeLeft, setTimeLeft] = useState(Math.max(10, 60 - timePenalty));
  const [showRef, setShowRef] = useState(false);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [showReveal, setShowReveal] = useState(false);
  const [guessSuccess, setGuessSuccess] = useState(false);

  const handleCompleteTurn = (success: boolean) => {
    if (showReveal) return;
    setGuessSuccess(success);
    setShowReveal(true);
    setTimeout(() => {
      completeTurn(success);
    }, 3000);
  };

  const currentTeam = teams[currentTeamIndex];

  // Timer logic
  useEffect(() => {
    if (showReveal) return;
    if (timeLeft <= 0) {
      handleCompleteTurn(false);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, showReveal, completeTurn]);

  // Canvas initialization & dynamic resizing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Use ResizeObserver to ensure internal resolution always matches the flexbox layout size
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        if (width === 0 || height === 0) continue;

        // Save existing drawing
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width || 1;
        tempCanvas.height = canvas.height || 1;
        const tempCtx = tempCanvas.getContext('2d');
        if (tempCtx && canvas.width > 0 && canvas.height > 0) {
          tempCtx.drawImage(canvas, 0, 0);
        }

        // Update internal resolution
        canvas.width = width;
        canvas.height = height;

        // Restore context settings
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;

        // Restore drawing, stretching to fit the new size
        if (tempCtx && canvas.width > 0) {
          ctx.drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height, 0, 0, width, height);
        }
      }
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    return () => resizeObserver.disconnect();
  }, [color, lineWidth]);

  const startDrawing = (e: PointerEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    draw(e);
  };

  const stopDrawing = (e?: PointerEvent<HTMLCanvasElement>) => {
    setIsDrawing(false);
    if (e && e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.getContext('2d')?.beginPath();
    }
  };

  const draw = (e: PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    
    // Calculate scaling to perfectly map CSS pixels to the internal canvas resolution
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    // High precision scaled coordinates
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    // Optional: Could scale lineWidth by e.pressure for stylus, 
    // but fixed width is usually better for this type of game.
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = mode === 'pen' ? color : '#1e293b'; // slate-800 background
    
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <div className="h-screen w-full bg-slate-900 flex flex-col p-4 md:p-8 overflow-hidden touch-none">
      {/* Top Header */}
      <div className="flex justify-between items-center bg-slate-800 p-4 rounded-3xl mb-4 border border-white/10 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl" style={{ backgroundColor: currentTeam.color }}>
            {currentTeam.avatar}
          </div>
          <div>
            <h3 className="font-black text-white">{currentTeam.name} is drawing...</h3>
          </div>
        </div>

        <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl border-2 transition-colors ${timeLeft < 10 ? 'bg-red-500/20 border-red-500 text-red-500 animate-pulse' : 'bg-slate-700 border-white/10 text-white'}`}>
          <Clock size={24} className={timeLeft < 10 ? 'animate-bounce' : ''} />
          <span className="text-3xl font-black tabular-nums">{timeLeft}s</span>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex gap-4 md:gap-8 overflow-hidden">
        {/* Left Toolbar */}
        <div className="w-20 bg-slate-800 rounded-3xl flex flex-col items-center py-6 gap-6 border border-white/10 shadow-xl">
          <button 
            onClick={() => setMode('pen')}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${mode === 'pen' ? 'bg-indigo-500 text-white scale-110 shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            <Pencil />
          </button>
          <button 
            onClick={() => setMode('eraser')}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${mode === 'eraser' ? 'bg-indigo-500 text-white scale-110 shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            <Eraser />
          </button>
          <div className="w-8 h-px bg-white/10" />
          <div className="flex flex-col gap-3">
            {['#ffffff', '#ff4d4d', '#3ae374', '#7d5fff', '#ffaf40', '#18dcff'].map(c => (
              <button
                key={c}
                onClick={() => { setColor(c); setMode('pen'); }}
                className={`w-8 h-8 rounded-full transition-transform hover:scale-125 ${color === c && mode === 'pen' ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-800 scale-110' : ''}`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
          <div className="w-8 h-px bg-white/10" />
          <button 
            onClick={clearCanvas}
            className="w-12 h-12 rounded-xl flex items-center justify-center text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-all"
          >
            <RotateCcw />
          </button>
          
          {refImages.length > 0 && (
            <>
              <div className="w-8 h-px bg-white/10" />
              <button 
                onClick={() => setShowRef(true)}
                className="w-12 h-12 rounded-xl flex flex-col items-center justify-center bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 transition-all shadow-lg border border-yellow-500/20"
              >
                <Lightbulb size={24} />
                <span className="text-[8px] font-black mt-0.5">HINT</span>
              </button>
            </>
          )}
        </div>

        {/* Canvas */}
        <div className="flex-1 bg-slate-800 rounded-[40px] relative border-4 border-slate-700 shadow-2xl overflow-hidden cursor-crosshair">
          {/* Category label */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
            <div className="bg-slate-900/80 backdrop-blur-sm border border-white/10 px-4 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
              <span className="text-slate-400 text-xs font-black uppercase tracking-widest">Category:</span>
              <span className="text-white text-xs font-black uppercase tracking-widest">{currentWord?.category}</span>
            </div>
          </div>
          <canvas
            ref={canvasRef}
            onPointerDown={startDrawing}
            onPointerUp={stopDrawing}
            onPointerMove={draw}
            onPointerCancel={stopDrawing}
            className="w-full h-full touch-none"
            style={{ touchAction: 'none' }}
          />
          
          <div className="absolute bottom-8 left-0 right-0 flex justify-center pointer-events-none">
            <div className="flex gap-4 pointer-events-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCompleteTurn(true)}
                className="px-10 py-5 bg-emerald-500 text-white rounded-2xl font-black text-2xl shadow-2xl flex items-center gap-3 border-b-4 border-emerald-700"
              >
                <CheckCircle size={32} />
                GOT IT!
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCompleteTurn(false)}
                className="px-10 py-5 bg-rose-500 text-white rounded-2xl font-black text-2xl shadow-2xl flex items-center gap-3 border-b-4 border-rose-700"
              >
                <Clock size={32} />
                TIME'S UP
              </motion.button>
            </div>
          </div>
        </div>

      </div>
      
      {/* Word Reveal Overlay */}
      <AnimatePresence>
        {showReveal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-slate-900/95 backdrop-blur-md flex flex-col items-center justify-center p-8"
          >
            <motion.div key="reveal" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center text-center">
              <p className={`uppercase text-xl font-black tracking-widest mb-6 ${guessSuccess ? 'text-emerald-400' : 'text-rose-400'}`}>
                {guessSuccess ? '🎉 THEY GUESSED IT! 🎉' : "⏰ TIME'S UP! ⏰"}
              </p>
              <p className="text-indigo-400 uppercase text-xs font-black tracking-widest mb-2">The word was...</p>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                <p className="text-6xl font-black text-white mb-3">{currentWord?.text}</p>
              </motion.div>
              <p className="text-slate-400 text-xl">{currentWord?.category}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reference Image Modal */}
      <AnimatePresence>
        {showRef && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-md p-8"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-slate-800 border-4 border-slate-700 rounded-[40px] p-8 max-w-4xl w-full relative shadow-2xl"
            >
              <button 
                onClick={() => setShowRef(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors"
              >
                <X size={32} />
              </button>
              
              <div className="text-center mb-8">
                <p className="text-yellow-500 font-black text-xs uppercase tracking-[0.3em] mb-2">Inspiration Mode</p>
                <h2 className="text-4xl font-black text-white">Reference for: {currentWord?.text}</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {refImages.map((src, i) => (
                  <motion.div 
                    key={i}
                    onClick={() => setExpandedImage(src)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center p-4 aspect-square border-8 border-slate-700 cursor-pointer hover:border-indigo-400 hover:scale-105 transition-all"
                  >
                    <img src={src} alt="Reference" className="max-w-full max-h-full object-contain pointer-events-none" />
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-10 flex justify-center">
                <button 
                  onClick={() => setShowRef(false)}
                  className="px-12 py-4 bg-indigo-500 hover:bg-indigo-400 text-white rounded-2xl font-black text-xl transition-all shadow-xl active:scale-95"
                >
                  GOT IT, BACK TO DRAWING!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Image Overlay */}
      <AnimatePresence>
        {expandedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setExpandedImage(null)}
          >
            <button 
              onClick={() => setExpandedImage(null)}
              className="absolute top-8 right-8 text-white hover:text-indigo-400 transition-colors bg-slate-800/50 p-2 rounded-full"
            >
              <X size={40} />
            </button>
            <motion.img 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={expandedImage} 
              alt="Expanded reference" 
              className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DrawingPhase;
