import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star } from 'lucide-react';
import { useGameStore } from '../store/useGameStore';

// Node positions for a winding snake path (x%, y% in a tall 3:4 container)
const NODES: { x: number; y: number }[] = [
  // Row 0 – bottom (left→right)
  { x: 15, y: 90 }, { x: 30, y: 87 }, { x: 45, y: 89 }, { x: 60, y: 87 }, { x: 75, y: 90 }, { x: 85, y: 85 },
  // Row 1 (right→left)
  { x: 82, y: 74 }, { x: 68, y: 71 }, { x: 53, y: 73 }, { x: 38, y: 71 }, { x: 23, y: 73 }, { x: 13, y: 67 },
  // Row 2 (left→right)
  { x: 16, y: 56 }, { x: 31, y: 53 }, { x: 46, y: 55 }, { x: 61, y: 53 }, { x: 76, y: 55 }, { x: 84, y: 49 },
  // Row 3 (right→left)
  { x: 80, y: 38 }, { x: 65, y: 35 }, { x: 50, y: 37 }, { x: 35, y: 35 }, { x: 20, y: 37 }, { x: 12, y: 31 },
  // Row 4 – top (left→right)
  { x: 16, y: 20 }, { x: 31, y: 17 }, { x: 46, y: 19 }, { x: 61, y: 17 }, { x: 76, y: 15 }, { x: 88, y: 10 },
];

const ZONE_COLORS = [
  { bg: '#22c55e', border: '#16a34a', glow: '#4ade80' }, // 0-5  Doodle Woods
  { bg: '#f97316', border: '#c2410c', glow: '#fb923c' }, // 6-11 Animal Alley
  { bg: '#3b82f6', border: '#1d4ed8', glow: '#60a5fa' }, // 12-17 Paintbrush Peak
  { bg: '#a855f7', border: '#7e22ce', glow: '#c084fc' }, // 18-23 Sketchyton
  { bg: '#eab308', border: '#a16207', glow: '#fde047' }, // 24-29 Victory Valley
];

const ZONE_LABELS = ['🌳 Doodle Woods', '🦊 Animal Alley', '🎨 Paintbrush Peak', '🏘️ Sketchyton', '🏆 Victory Valley'];

const DECORATIONS = [
  { e: '🌳', x: 2, y: 82, s: 2.8 }, { e: '🌲', x: 90, y: 80, s: 2.4 },
  { e: '🌸', x: 5, y: 60, s: 1.6 }, { e: '🦋', x: 88, y: 58, s: 1.4 },
  { e: '🐻', x: 4, y: 45, s: 2.0 }, { e: '🦊', x: 91, y: 42, s: 1.8 },
  { e: '⛰️', x: 6, y: 28, s: 2.4 }, { e: '🏡', x: 88, y: 26, s: 2.0 },
  { e: '☁️', x: 10, y: 8,  s: 2.8 }, { e: '☁️', x: 55, y: 4,  s: 2.2 },
  { e: '☁️', x: 78, y: 7,  s: 2.0 }, { e: '🌈', x: 42, y: 6,  s: 2.4 },
  { e: '🌺', x: 3, y: 94, s: 1.4 }, { e: '🌼', x: 92, y: 94, s: 1.4 },
  { e: '⭐', x: 70, y: 24, s: 1.2 }, { e: '💫', x: 25, y: 22, s: 1.2 },
];

function buildSvgPath(nodes: { x: number; y: number }[]) {
  if (nodes.length < 2) return '';
  let d = `M ${nodes[0].x} ${nodes[0].y}`;
  for (let i = 1; i < nodes.length; i++) {
    const p = nodes[i - 1], c = nodes[i];
    const mx = (p.x + c.x) / 2;
    d += ` Q ${mx} ${p.y} ${c.x} ${c.y}`;
  }
  return d;
}

const AdventureMap: React.FC = () => {
  const { teams, currentTeamIndex } = useGameStore();
  const maxPos = Math.max(...teams.map(t => t.position), 0);
  const pathD = buildSvgPath(NODES);

  return (
    <div
      className="relative w-full h-full overflow-hidden rounded-3xl border-4 border-white/10 shadow-2xl"
      style={{ background: 'linear-gradient(180deg,#a8d8f0 0%,#c8e8a0 40%,#5aaa5a 100%)' }}
    >
      {/* Sky gradient */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg,#87ceeb 0%,#d4f0a0 38%,transparent 50%)' }} />
      {/* Ground grass */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none" style={{ background: 'linear-gradient(0deg,#3d8b37 0%,#5aaa5a 60%,transparent 100%)' }} />
      {/* Soft hills */}
      {[{ x: '10%', w: '35%', h: '18%', b: '30%', c: '#4a9a44' }, { x: '55%', w: '40%', h: '15%', b: '45%', c: '#56a850' }, { x: '20%', w: '30%', h: '12%', b: '60%', c: '#60b85a' }].map((h, i) => (
        <div key={i} className="absolute pointer-events-none rounded-[50%]" style={{ left: h.x, width: h.w, height: h.h, bottom: h.b, background: h.c, opacity: 0.5 }} />
      ))}

      {/* Floating decorations */}
      {DECORATIONS.map((d, i) => (
        <motion.div key={i} className="absolute pointer-events-none select-none z-10"
          style={{ left: `${d.x}%`, top: `${d.y}%`, fontSize: `${d.s}rem`, lineHeight: 1 }}
          animate={{ y: [0, -6, 0], rotate: [-4, 4, -4] }}
          transition={{ duration: 3 + i * 0.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
        >{d.e}</motion.div>
      ))}

      {/* Zone label banners */}
      {ZONE_LABELS.map((label, zi) => {
        const midNode = NODES[zi * 6 + 3];
        return (
          <div key={zi} className="absolute z-10 pointer-events-none"
            style={{ left: `${midNode.x}%`, top: `${midNode.y + 5}%`, transform: 'translateX(-50%)' }}>
            <div className="px-2 py-0.5 rounded-full text-white font-black text-[0.5rem] uppercase tracking-widest whitespace-nowrap shadow-lg"
              style={{ background: ZONE_COLORS[zi].bg + 'cc' }}>
              {label}
            </div>
          </div>
        );
      })}

      {/* SVG rope path */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none z-10">
        <path d={pathD} fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="3.5" strokeLinecap="round" />
        <path d={pathD} fill="none" stroke="white" strokeWidth="2.8" strokeLinecap="round" />
        <motion.path d={pathD} fill="none" stroke="rgba(255,180,0,0.7)" strokeWidth="1.4"
          strokeDasharray="3 5" strokeLinecap="round"
          animate={{ strokeDashoffset: [0, -50] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
      </svg>

      {/* Star connectors between nodes */}
      {NODES.slice(0, -1).map((n, i) => {
        const next = NODES[i + 1];
        const mx = (n.x + next.x) / 2;
        const my = (n.y + next.y) / 2;
        return (
          <motion.div key={`star-${i}`} className="absolute z-20 pointer-events-none text-yellow-300"
            style={{ left: `${mx}%`, top: `${my}%`, transform: 'translate(-50%,-50%)', fontSize: '0.7rem' }}
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
          >✦</motion.div>
        );
      })}

      {/* Nodes */}
      {NODES.map((pos, i) => {
        const zoneIdx = Math.min(Math.floor(i / 6), 4);
        const zone = ZONE_COLORS[zoneIdx];
        const isStart = i === 0;
        const isFinish = i === 29;
        const isMilestone = i % 6 === 0 && !isStart;
        const isReached = maxPos >= i;
        const isNext = i === maxPos + 1;

        const size = isStart || isFinish ? 62 : isMilestone ? 56 : 48;
        return (
          <motion.div key={i} className="absolute z-30 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: i * 0.02, stiffness: 280, damping: 22 }}
          >
            {/* Pulse for next step */}
            {isNext && (
              <motion.div className="absolute rounded-full"
                style={{ inset: -8, background: zone.glow, filter: 'blur(10px)' }}
                animate={{ opacity: [0.7, 0.1, 0.7], scale: [1, 1.5, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
            )}
            {isFinish && (
              <motion.div className="absolute rounded-full"
                style={{ inset: -10, background: '#fde047', filter: 'blur(14px)' }}
                animate={{ opacity: [0.8, 0.2, 0.8], scale: [1, 1.6, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}

            <motion.div whileHover={{ scale: 1.15, y: -4 }}
              className="relative flex items-center justify-center rounded-full text-white font-black select-none cursor-default"
              style={{
                width: size, height: size,
                background: isStart ? 'linear-gradient(135deg,#6366f1,#8b5cf6)'
                  : isFinish ? 'linear-gradient(135deg,#f59e0b,#fbbf24)'
                  : isReached ? `linear-gradient(135deg,${zone.bg},${zone.border})`
                  : 'linear-gradient(135deg,#1e293b,#334155)',
                border: `4px solid ${isReached || isStart || isFinish ? zone.glow : '#475569'}`,
                boxShadow: isReached || isStart || isFinish
                  ? `0 6px 20px ${zone.glow}88, 0 2px 8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.3)`
                  : '0 4px 12px rgba(0,0,0,0.5)',
                fontSize: isStart || isFinish ? 26 : isMilestone ? 20 : 15,
                filter: !isReached && !isStart && !isFinish ? 'brightness(0.55) saturate(0.5)' : 'none',
              }}
            >
              {/* Shine */}
              <div className="absolute rounded-full pointer-events-none"
                style={{ top: '12%', left: '15%', width: '40%', height: '28%', background: 'rgba(255,255,255,0.35)', filter: 'blur(2px)' }} />
              {isStart && '🚀'}
              {isFinish && <Trophy size={24} className="drop-shadow" />}
              {!isStart && !isFinish && isMilestone && ZONE_LABELS[zoneIdx].split(' ')[0]}
              {!isStart && !isFinish && !isMilestone && (i + 1)}

              {isReached && !isStart && !isFinish && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow text-green-600 font-black" style={{ fontSize: 10 }}>✓</div>
              )}
            </motion.div>
          </motion.div>
        );
      })}

      {/* Team Tokens */}
      {teams.map((team, tIdx) => {
        const pos = NODES[Math.min(team.position, 29)];
        const isActive = tIdx === currentTeamIndex;
        const offsetX = (tIdx - (teams.length - 1) / 2) * 6;
        return (
          <motion.div key={team.id} layoutId={`token-${team.id}`}
            className="absolute z-40 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            transition={{ type: 'spring', stiffness: 180, damping: 22 }}
          >
            {isActive && (
              <motion.div className="absolute rounded-full"
                style={{ inset: -8, background: team.color, filter: 'blur(12px)', opacity: 0.5 }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
            <motion.div
              animate={{ y: [0, -9, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: tIdx * 0.35 }}
              style={{ marginLeft: offsetX }}
            >
              {/* shadow */}
              <motion.div className="absolute left-1/2 -translate-x-1/2 rounded-full bg-black/30"
                style={{ bottom: -5, width: '65%', height: 5 }}
                animate={{ scaleX: [1, 0.65, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: tIdx * 0.35 }}
              />
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl border-[3px] border-white shadow-2xl"
                style={{ backgroundColor: team.color }}>
                {team.avatar}
              </div>
              {isActive && (
                <motion.div className="absolute -top-5 left-1/2 -translate-x-1/2 text-yellow-400"
                  animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                >
                  <Star size={16} className="fill-yellow-400 drop-shadow-lg" />
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        );
      })}

      {/* Corner labels */}
      <div className="absolute top-3 left-3 z-50">
        <div className="bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
          <span className="text-white font-black text-[0.6rem] uppercase tracking-widest">🗺️ Adventure Map</span>
        </div>
      </div>
      <div className="absolute top-3 right-3 z-50">
        <div className="bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
          <span className="text-white font-black text-[0.6rem] uppercase tracking-widest">30 Steps 🏆</span>
        </div>
      </div>
    </div>
  );
};

export default AdventureMap;
