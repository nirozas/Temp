import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useStore } from './store/useStore';
import { AGE_THEMES } from './config/themes';

import SplashScreen from './screens/SplashScreen';
import OnboardingName from './screens/OnboardingName';
import OnboardingAge from './screens/OnboardingAge';
import OnboardingWelcome from './screens/OnboardingWelcome';
import Dashboard from './screens/Dashboard';
import PuzzleSelect from './screens/PuzzleSelect';
import GameScreen from './screens/GameScreen';
import WordCollection from './screens/WordCollection';
import SettingsScreen from './screens/SettingsScreen';

const PAGE_VARIANTS = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -12 },
};

export default function App() {
  const { screen, player } = useStore();

  // Apply age-group theme class to <html>
  useEffect(() => {
    const html = document.documentElement;
    // remove old themes
    Object.values(AGE_THEMES).forEach(t => html.classList.remove(t.cls));
    if (player) {
      const theme = AGE_THEMES[player.ageGroup] ?? AGE_THEMES['9-11'];
      html.classList.add(theme.cls);
    }
  }, [player]);

  const SCREENS: Record<string, React.ReactNode> = {
    'splash':              <SplashScreen />,
    'onboarding-name':     <OnboardingName />,
    'onboarding-age':      <OnboardingAge />,
    'onboarding-welcome':  <OnboardingWelcome />,
    'dashboard':           <Dashboard />,
    'puzzle-select':       <PuzzleSelect />,
    'game':                <GameScreen />,
    'word-collection':     <WordCollection />,
    'settings':            <SettingsScreen />,
  };

  return (
    <div className="bg-app min-h-dvh text-app overflow-x-hidden" style={{ fontFamily: 'var(--font-head, Nunito, sans-serif)' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          variants={PAGE_VARIANTS}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.22 }}
        >
          {SCREENS[screen] ?? <SplashScreen />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
