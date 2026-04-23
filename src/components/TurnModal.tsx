import { useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import { CATEGORIES, getRandomWord } from '../data/words';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, RefreshCw, Image, X, AlertTriangle } from 'lucide-react';
import type { Difficulty } from '../types/game';

const TurnModal = () => {
  const { setPhase, setDifficulty, setWord, addTimePenalty, currentTeamIndex, teams, refImages, setRefImages } = useGameStore();
  const [step, setStep] = useState(1);
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [difficulty, setDifficultyState] = useState<Difficulty | null>(null);
  const [revealWord, setRevealWord] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [imageShown, setImageShown] = useState(false);
  const [rerollCount, setRerollCount] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  const currentWord = useGameStore.getState().currentWord;
  const currentTeam = teams[currentTeamIndex];

  const handleCategorySelect = (cat: string) => {
    setSelectedCat(cat);
    setStep(2);
  };

  const handleDifficultySelect = (diff: Difficulty) => {
    setDifficultyState(diff);
    if (selectedCat) {
      const word = getRandomWord(selectedCat, diff);
      setWord(word);
      setDifficulty(diff);
      setStep(3);
    }
  };

  const handleReroll = () => {
    if (selectedCat && difficulty) {
      const word = getRandomWord(selectedCat, difficulty);
      setWord(word);
      addTimePenalty(10);
      setRerollCount(c => c + 1);
      setRefImages([]);
      setImageShown(false);
    }
  };

  const fetchReferenceImages = async () => {
    const word = useGameStore.getState().currentWord;
    if (!word) return;
    setLoadingImage(true);
    const results: string[] = [];
    try {
      // Try SVG first (simplified line drawings)
      const svgQuery = encodeURIComponent(`"${word.text}" drawing OR sketch -logo -text -word -letter -font -sign -photo -photograph -picture`);
      const svgUrl = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${svgQuery}+filetype:svg&gsrnamespace=6&prop=imageinfo&iiprop=url&iiurlwidth=300&format=json&origin=*&gsrlimit=8`;
      const svgRes = await fetch(svgUrl);
      const svgData = await svgRes.json();
      const svgPages = svgData.query?.pages;
      if (svgPages) {
        for (const page of Object.values(svgPages) as any[]) {
          const src: string = page?.imageinfo?.[0]?.thumburl || '';
          if (src && !src.includes('Flag') && !src.includes('flag')) results.push(src);
          if (results.length >= 3) break;
        }
      }
      // Fill remaining slots with bitmap drawings
      if (results.length < 3) {
        const bmpQuery = encodeURIComponent(`"${word.text}" sketch OR drawing -logo -text -word -letter -font -sign -photo -photograph -picture`);
        const bmpUrl = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${bmpQuery}+filetype:bitmap&gsrnamespace=6&prop=imageinfo&iiprop=url&iiurlwidth=300&format=json&origin=*&gsrlimit=8`;
        const bmpRes = await fetch(bmpUrl);
        const bmpData = await bmpRes.json();
        const bmpPages = bmpData.query?.pages;
        if (bmpPages) {
          for (const page of Object.values(bmpPages) as any[]) {
            const src: string = page?.imageinfo?.[0]?.thumburl || '';
            if (src && !results.includes(src)) results.push(src);
            if (results.length >= 3) break;
          }
        }
      }
    } catch { /* silent fail */ }
    setRefImages(results);
    setLoadingImage(false);
    
    // Only apply the time penalty if we actually found images
    if (results.length > 0 && !imageShown) { 
      addTimePenalty(20); 
      setImageShown(true); 
    }
    
    setShowImageModal(true);
  };


  return (
    <div className="bg-slate-800 p-8 rounded-[40px] border-4 border-slate-700 shadow-2xl max-w-xl w-full mx-4 relative">
      <AnimatePresence mode="wait">

        {/* Step 1 – Category */}
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="flex flex-col items-center text-center">
            <div className="text-5xl mb-3">{currentTeam.avatar}</div>
            <h2 className="text-3xl font-black mb-1 text-white">{currentTeam.name}'s turn!</h2>
            <p className="text-slate-400 mb-5 text-sm">Choose a category</p>
            <div className="grid grid-cols-2 gap-3 w-full">
              {[
                { cat: 'Animals', icon: '🐾' },
                { cat: 'Objects', icon: '🪑' },
                { cat: 'Emotions', icon: '😂' },
                { cat: 'Sentences', icon: '💬' },
                { cat: 'Places', icon: '🌍' },
                { cat: 'Food', icon: '🍕' },
                { cat: 'Actions', icon: '🏃' },
                { cat: 'Random', icon: '🎲' },
              ].map(({ cat, icon }) => (
                <button key={cat} onClick={() => handleCategorySelect(cat)}
                  className="bg-slate-700 hover:bg-indigo-600 p-4 rounded-2xl border-b-4 border-black/20 font-bold text-sm flex flex-col items-center gap-2 active:scale-95 text-white transition-all">
                  <span className="text-2xl">{icon}</span>
                  <span className="leading-tight">{cat}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2 – Difficulty */}
        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="flex flex-col items-center text-center">
            <h2 className="text-3xl font-black mb-1 text-white">Difficulty</h2>
            <p className="text-slate-400 mb-6 text-sm">Higher = more steps on the board!</p>
            <div className="flex flex-col gap-4 w-full">
              {(['Easy', 'Medium', 'Hard'] as Difficulty[]).map((diff, i) => (
                <button key={diff} onClick={() => handleDifficultySelect(diff)}
                  className={`p-5 rounded-3xl border-b-4 border-black/20 font-black text-2xl flex justify-between items-center active:scale-95 transition-all
                    ${diff === 'Easy' ? 'bg-emerald-500 hover:bg-emerald-400' : ''}
                    ${diff === 'Medium' ? 'bg-amber-500 hover:bg-amber-400' : ''}
                    ${diff === 'Hard' ? 'bg-rose-500 hover:bg-rose-400' : ''}`}>
                  <span className="flex items-center gap-3">
                    {Array.from({ length: i + 1 }).map((_, j) => <Check key={j} strokeWidth={4} size={20} />)}
                    {diff}
                  </span>
                  <span className="text-white/50 text-base">{i + 1} {i === 0 ? 'step' : 'steps'}</span>
                </button>
              ))}
            </div>
            <button onClick={() => setStep(1)} className="mt-5 text-slate-500 hover:text-white transition-colors text-sm underline">Go Back</button>
          </motion.div>
        )}

        {/* Step 3 – Word Reveal */}
        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center">
            <div className="text-red-400 font-bold mb-3 flex items-center gap-2 uppercase tracking-widest text-xs">
              👁️ Drawer only — keep it secret!
            </div>
            <h2 className="text-3xl font-black text-white mb-5">Your Word</h2>

            {/* Word box */}
            <div className="w-full bg-slate-900/60 p-8 rounded-3xl border-2 border-dashed border-slate-700 mb-5 min-h-[120px] flex items-center justify-center">
              {!revealWord ? (
                <button onClick={() => setRevealWord(true)}
                  className="px-8 py-4 bg-indigo-500 hover:bg-indigo-400 rounded-2xl font-black text-xl shadow-lg transition-all active:scale-95">
                  REVEAL WORD
                </button>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <p className="text-indigo-400 uppercase text-xs font-black tracking-widest">Your word is:</p>
                  <p className="text-4xl font-black text-white">{currentWord?.text}</p>
                  <p className="text-slate-500 text-xs">{currentWord?.category}</p>
                </div>
              )}
            </div>

            {/* Penalty Actions */}
            {revealWord && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="w-full flex gap-3 mb-5">
                {/* Reroll */}
                <button onClick={handleReroll}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 rounded-2xl font-bold text-sm transition-all active:scale-95">
                  <RefreshCw size={16} />
                  <span>New Word</span>
                  <span className="bg-amber-500/30 px-2 py-0.5 rounded-full text-xs font-black">−10s</span>
                </button>
                {/* Reference Image */}
                <button onClick={fetchReferenceImages} disabled={loadingImage}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/40 text-blue-300 rounded-2xl font-bold text-sm transition-all active:scale-95 disabled:opacity-50">
                  <Image size={16} />
                  <span>{loadingImage ? 'Loading…' : 'See Reference'}</span>
                  {!imageShown && <span className="bg-blue-500/30 px-2 py-0.5 rounded-full text-xs font-black">−20s</span>}
                  {imageShown && <span className="bg-slate-600 px-2 py-0.5 rounded-full text-xs font-black">free</span>}
                </button>
              </motion.div>
            )}

            {/* Penalties summary */}
            {rerollCount > 0 || imageShown ? (
              <div className="w-full flex items-center gap-2 mb-4 px-3 py-2 bg-rose-500/10 border border-rose-500/20 rounded-xl">
                <AlertTriangle size={14} className="text-rose-400" />
                <span className="text-rose-300 text-xs font-bold">
                  Timer penalty: −{rerollCount * 10 + (imageShown ? 20 : 0)}s when drawing starts
                </span>
              </div>
            ) : null}

            <button onClick={() => setPhase('DRAWING')} disabled={!revealWord}
              className={`w-full py-5 rounded-2xl font-black text-2xl shadow-xl transition-all
                ${revealWord ? 'bg-emerald-500 hover:bg-emerald-400 text-white cursor-pointer active:scale-95' : 'bg-slate-700 text-slate-500 cursor-not-allowed opacity-50'}`}>
              I'M READY! 🎨
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reference Image Modal */}
      <AnimatePresence>
        {showImageModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/95 backdrop-blur rounded-[40px] flex flex-col items-center justify-center p-8 z-50">
            <button onClick={() => setShowImageModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors">
              <X size={24} />
            </button>
            <p className="text-indigo-400 uppercase text-xs font-black tracking-widest mb-4">Reference: {currentWord?.text}</p>
            {refImages.length > 0 ? (
              <div className="grid grid-cols-3 gap-3 w-full">
                {refImages.map((src, i) => (
                  <div key={i} 
                    onClick={() => setExpandedImage(src)}
                    className="bg-slate-800 rounded-xl overflow-hidden border border-white/10 flex items-center justify-center cursor-pointer hover:border-indigo-400 hover:scale-105 transition-all" style={{minHeight:120}}>
                    <img src={src} alt={`${currentWord?.text} ${i+1}`}
                      className="w-full h-32 object-contain p-1 pointer-events-none"
                      onError={e => { (e.target as HTMLImageElement).style.display='none'; }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-40 h-40 bg-slate-800 rounded-2xl flex flex-col items-center justify-center gap-3 border-2 border-dashed border-slate-600">
                <span className="text-5xl">🖼️</span>
                <p className="text-slate-400 text-sm text-center">No drawings found.<br/>Use your imagination!</p>
              </div>
            )}
            <button onClick={() => setShowImageModal(false)}
              className="mt-6 px-8 py-3 bg-slate-700 hover:bg-slate-600 rounded-2xl font-bold text-white transition-all">
              Got it!
            </button>
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

export default TurnModal;
