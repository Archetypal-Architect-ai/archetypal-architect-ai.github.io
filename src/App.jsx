import React, { useState, lazy, Suspense } from 'react';
import { useTheme } from './hooks/useTheme';
import Header from './components/Header';
import Hero from './components/Hero';
import ContentGrid from './components/ContentGrid';
import Footer from './components/Footer';

const GameApp = lazy(() => import('./components/game/GameApp'));

function App() {
  const { isDark, toggleTheme, activePersona, setActivePersona } = useTheme();
  const [mode, setMode] = useState('hub'); // 'hub' or 'game'
  const [contentPack, setContentPack] = useState(null);

  const launchGame = async () => {
    const { ashenmoorContentPack } = await import('./content/index');
    setContentPack(ashenmoorContentPack);
    setMode('game');
  };

  if (mode === 'game' && contentPack) {
    return (
      <Suspense fallback={
        <div className="min-h-screen bg-gray-950 flex items-center justify-center text-gray-400">
          Loading Dragonsloft...
        </div>
      }>
        <GameApp content={contentPack} onExit={() => setMode('hub')} />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header
        isDark={isDark}
        toggleTheme={toggleTheme}
        activePersona={activePersona}
        setActivePersona={setActivePersona}
      />

      <main>
        <Hero
          activePersona={activePersona}
          setActivePersona={setActivePersona}
        />

        {/* Game Launch Section */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-gray-900 to-purple-950 border border-purple-800/30 rounded-2xl p-8 shadow-2xl">
              <h2 className="text-3xl font-bold text-white mb-3">Dragonsloft</h2>
              <p className="text-gray-400 mb-2 text-lg">A Cultivation RPG Engine</p>
              <p className="text-gray-500 mb-6 max-w-xl mx-auto">
                Dark paths. Blood oaths. Bone architecture. Shadow pilgrimages.
                Choose your origin, walk your path, and become something the world remembers.
              </p>
              <button
                onClick={launchGame}
                className="px-8 py-3 bg-purple-800 hover:bg-purple-700 border border-purple-600 text-white font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-purple-900/50"
              >
                Begin Cultivation
              </button>
              <p className="text-gray-600 text-xs mt-3">Vertical Slice: The Ashenmoor</p>
            </div>
          </div>
        </section>

        <ContentGrid
          activePersona={activePersona}
        />
      </main>

      <Footer />
    </div>
  );
}

export default App;
