import { useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import { Plus, Trash2, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const COLORS = ['#ff4d4d', '#3ae374', '#7d5fff', '#ffaf40', '#18dcff', '#cd84f1'];

const SetupScreen = () => {
  const { setTeams, setPhase } = useGameStore();
  const [teamList, setTeamList] = useState([
    { id: '1', name: 'Team One', color: COLORS[0], avatar: '🐯', position: 0 },
    { id: '2', name: 'Team Two', color: COLORS[1], avatar: '🐨', position: 0 },
  ]);

  const addTeam = () => {
    if (teamList.length < 4) {
      const id = (teamList.length + 1).toString();
      setTeamList([...teamList, { 
        id, 
        name: `Team ${id}`, 
        color: COLORS[teamList.length], 
        avatar: ['🦁', '🐙', '🐼', '🦊'][teamList.length],
        position: 0 
      }]);
    }
  };

  const removeTeam = (id: string) => {
    if (teamList.length > 2) {
      setTeamList(teamList.filter(t => t.id !== id));
    }
  };

  const updateTeam = (id: string, updates: any) => {
    setTeamList(teamList.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const handleStart = () => {
    setTeams(teamList);
    setPhase('BOARD');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <motion.div 
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-2 drop-shadow-lg">
          What Did I Draw?
        </h1>
        <p className="text-indigo-200 text-xl font-medium">The Ultimate Family Drawing Challenge</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl mb-12">
        <AnimatePresence>
          {teamList.map((team, index) => (
            <motion.div
              key={team.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-xl flex flex-col items-center"
              style={{ borderTop: `6px solid ${team.color}` }}
            >
              <div className="text-5xl mb-4 bg-white/10 p-4 rounded-full w-24 h-24 flex items-center justify-center border-2 border-white/10">
                {team.avatar}
              </div>
              <input
                type="text"
                value={team.name}
                onChange={(e) => updateTeam(team.id, { name: e.target.value })}
                className="bg-transparent border-b-2 border-white/20 text-center text-xl font-bold mb-4 focus:border-white outline-none w-full py-1 text-white"
                placeholder="Team Name"
              />
              <div className="flex gap-2 mb-6">
                {COLORS.map(c => (
                  <button
                    key={c}
                    onClick={() => updateTeam(team.id, { color: c })}
                    className={`w-6 h-6 rounded-full transition-transform hover:scale-125 ${team.color === c ? 'ring-2 ring-white ring-offset-2 ring-offset-purple-900 scale-110' : ''}`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
              {teamList.length > 2 && (
                <button
                  onClick={() => removeTeam(team.id)}
                  className="mt-auto text-pink-400 hover:text-pink-300 transition-colors flex items-center gap-2"
                >
                  <Trash2 size={18} />
                  <span className="text-sm">Remove</span>
                </button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {teamList.length < 4 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addTeam}
            className="bg-white/5 border-2 border-dashed border-white/20 rounded-3xl p-6 flex flex-col items-center justify-center hover:bg-white/10 transition-colors group h-full cursor-pointer"
          >
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4 group-hover:bg-white/20 transition-colors">
              <Plus size={32} className="text-white/60" />
            </div>
            <span className="text-white/60 font-bold">Add Team</span>
          </motion.button>
        )}
      </div>

      <motion.button
        whileHover={{ scale: 1.1, backgroundColor: '#3ae374' }}
        whileTap={{ scale: 0.9 }}
        onClick={handleStart}
        className="px-12 py-5 bg-emerald-500 text-white rounded-full font-black text-2xl shadow-2xl flex items-center gap-4 group"
      >
        <Play fill="currentColor" />
        START GAME
      </motion.button>
    </div>
  );
};

export default SetupScreen;
