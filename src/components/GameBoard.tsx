
import { useGameStore } from '../store/useGameStore';
import { motion } from 'framer-motion';
import { PlayCircle } from 'lucide-react';
import AdventureMap from './AdventureMap';
import { sounds } from '../utils/sounds';

const ZONES = [
  { label: '🌳 Doodle Woods',    steps: '1–6',   color: '#22c55e' },
  { label: '🦊 Animal Alley',    steps: '7–12',  color: '#f97316' },
  { label: '🎨 Paintbrush Peak', steps: '13–18', color: '#3b82f6' },
  { label: '🏘️ Sketchyton City', steps: '19–24', color: '#a855f7' },
  { label: '🏆 Victory Valley',  steps: '25–30', color: '#eab308' },
];

const GameBoard = () => {
  const { teams, currentTeamIndex, setPhase } = useGameStore();
  const currentTeam = teams[currentTeamIndex];

  return (
    /**
     * Outer: full viewport, no overflow, dark bg.
     * Mobile (default): column layout — controls on top, map below.
     * Desktop (lg+):    row layout — controls left 42%, map right 58%.
     */
    <div className="h-[100dvh] w-screen bg-[#0f172a] flex flex-col lg:flex-row overflow-hidden select-none">

      {/* ── LEFT / TOP: Controls panel ───────────────────────────────── */}
      <div className="
        w-full lg:w-[42%]
        h-[45dvh] lg:h-full
        flex flex-col gap-2 lg:gap-3
        p-3 lg:p-5
        overflow-y-auto
        shrink-0
      ">

        {/* Active Team Card */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-2xl lg:rounded-3xl p-3 lg:p-5 backdrop-blur-xl shadow-xl shrink-0"
        >
          <div className="flex items-center gap-3 mb-3 lg:mb-5">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-12 h-12 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl flex items-center justify-center text-3xl lg:text-4xl shadow-xl border-4 border-white/20 relative shrink-0"
              style={{ backgroundColor: currentTeam.color }}
            >
              {currentTeam.avatar}
              <div className="absolute -bottom-1.5 -right-1.5 bg-emerald-500 text-white text-[8px] lg:text-[10px] font-black px-1.5 py-0.5 rounded-md shadow-lg leading-tight">
                YOUR TURN
              </div>
            </motion.div>
            <div className="min-w-0">
              <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest mb-0.5">Now Playing</p>
              <h2 className="text-xl lg:text-3xl font-black text-white leading-tight truncate">{currentTeam.name}</h2>
              <p className="text-slate-400 text-xs lg:text-sm">
                Square <span className="text-white font-bold">{currentTeam.position + 1}</span> of 30
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => { sounds.click(); setPhase('TURN_MODAL'); }}
            className="w-full py-3 lg:py-4 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-xl lg:rounded-2xl font-black text-lg lg:text-xl text-white shadow-[0_8px_30px_-8px_rgba(255,77,77,0.5)] flex items-center justify-center gap-2 border-b-4 border-black/20"
          >
            <PlayCircle size={22} />
            START TURN
          </motion.button>
        </motion.div>

        {/* Standings */}
        <div className="bg-white/5 border border-white/10 rounded-2xl lg:rounded-3xl p-3 lg:p-4 backdrop-blur-xl shadow-xl shrink-0">
          <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest mb-2 lg:mb-3">🏁 Standings</p>
          <div className="flex flex-col gap-2">
            {[...teams]
              .map((t, i) => ({ ...t, idx: i }))
              .sort((a, b) => b.position - a.position)
              .map((team, rank) => (
                <motion.div
                  key={team.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: rank * 0.06 }}
                  className={`flex items-center gap-2 p-2 lg:p-2.5 rounded-xl border transition-all ${
                    team.idx === currentTeamIndex
                      ? 'bg-white/10 border-white/30 shadow'
                      : 'bg-slate-800/30 border-transparent'
                  }`}
                >
                  <div className="text-slate-400 font-black text-xs w-4 text-center shrink-0">#{rank + 1}</div>
                  <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-lg flex items-center justify-center text-lg shrink-0 shadow"
                    style={{ backgroundColor: team.color }}>
                    {team.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-bold truncate text-xs lg:text-sm">{team.name}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className="h-1.5 flex-1 bg-slate-700 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: team.color }}
                          animate={{ width: `${(team.position / 29) * 100}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                        />
                      </div>
                      <span className="text-slate-400 text-[9px] font-black shrink-0">Sq {team.position + 1}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>

        {/* Zone legend — hidden on small phones, shown md+ */}
        <div className="hidden sm:block bg-white/5 border border-white/10 rounded-2xl lg:rounded-3xl p-3 lg:p-4 backdrop-blur-xl shadow-xl shrink-0">
          <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest mb-2">🗺️ Zones</p>
          <div className="grid grid-cols-1 gap-1">
            {ZONES.map(z => (
              <div key={z.label} className="flex items-center justify-between px-2.5 py-1 rounded-lg"
                style={{ background: z.color + '22', border: `1px solid ${z.color}44` }}>
                <span className="text-white text-[11px] font-bold">{z.label}</span>
                <span className="text-slate-400 text-[9px] font-black">Steps {z.steps}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT / BOTTOM: Adventure Map ────────────────────────────── */}
      {/*
        Mobile:  takes remaining height below the controls panel.
        Desktop: takes 58% width, full height, map centered inside.
      */}
      <div className="
        flex-1 lg:w-[58%]
        flex items-center justify-center
        p-2 lg:p-5
        overflow-hidden
        min-h-0
      ">
        {/*
          The map has aspect-ratio 3/4 (portrait).
          Constrain by whichever dimension is smaller to prevent overflow.
          On desktop: height is the constraint → max-h-full, auto width.
          On mobile:  height is the constraint → h-full, auto width.
        */}
        <div className="h-full max-h-full" style={{ aspectRatio: '3/4' }}>
          <AdventureMap />
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
