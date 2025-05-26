import React from 'react';
import { personas } from '../data/personas';

function Hero({ activePersona, setActivePersona }) {
  const currentPersona = personas.find(p => p.id === activePersona);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        {/* Main Title */}
        <div className="mb-12 animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold text-gray-900 dark:text-white mb-6">
            The Verse
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A multidimensional creative ecosystem where diverse personas explore the boundaries of art, technology, wisdom, and transformation.
          </p>
        </div>

        {/* Persona Avatars Grid */}
        <div className="mb-12 animate-slide-up">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-8">Choose Your Guide</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-4xl mx-auto">
            {personas.map((persona, index) => (
              <div
                key={persona.id}
                className={`group cursor-pointer transition-all duration-300 ${
                  activePersona === persona.id ? 'scale-110' : 'hover:scale-105'
                }`}
                onClick={() => setActivePersona(persona.id)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`relative p-6 rounded-2xl shadow-lg transition-all duration-300 ${
                  activePersona === persona.id 
                    ? `bg-${persona.colors.primary} shadow-2xl` 
                    : 'bg-white dark:bg-gray-800 hover:shadow-xl'
                }`}>
                  <div className="relative mb-4">
                    <img
                      src={persona.avatar}
                      alt={persona.name}
                      className="w-20 h-20 mx-auto rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
                    />
                    {activePersona === persona.id && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                    )}
                  </div>
                  <h3 className={`font-bold text-lg mb-2 ${
                    activePersona === persona.id ? 'text-white' : 'text-gray-900 dark:text-white'
                  }`}>
                    {persona.name}
                  </h3>
                  <p className={`text-sm ${
                    activePersona === persona.id ? 'text-white/90' : 'text-gray-600 dark:text-gray-300'
                  }`}>
                    {persona.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Persona Spotlight */}
        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 max-w-2xl mx-auto animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <img
              src={currentPersona?.avatar}
              alt={currentPersona?.name}
              className="w-16 h-16 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg mr-4"
            />
            <div className="text-left">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{currentPersona?.name}</h3>
              <p className="text-gray-600 dark:text-gray-300">{currentPersona?.title}</p>
            </div>
          </div>
          <blockquote className="text-lg italic text-gray-700 dark:text-gray-300 mb-6">
            "{currentPersona?.ethos}"
          </blockquote>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {currentPersona?.bio}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <button className={`px-8 py-4 bg-${currentPersona?.colors.primary} text-white font-semibold rounded-full hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300`}>
            Explore {currentPersona?.name}
          </button>
          <button className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-full border border-gray-300 dark:border-gray-600 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
            Latest Across The Verse
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
