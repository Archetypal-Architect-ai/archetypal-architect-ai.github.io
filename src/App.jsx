import React from 'react';
import { useTheme } from './hooks/useTheme';
import Header from './components/Header';
import Hero from './components/Hero';
import ContentGrid from './components/ContentGrid';
import Footer from './components/Footer';

function App() {
  const { isDark, toggleTheme, activePersona, setActivePersona } = useTheme();

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
        
        <ContentGrid 
          activePersona={activePersona}
        />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
