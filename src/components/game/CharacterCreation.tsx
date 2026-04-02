import React, { useState } from 'react';
import type { ContentPack, Origin, PathDef, GameAction } from '../../engine/types';

interface CharacterCreationProps {
  content: ContentPack;
  dispatch: React.Dispatch<GameAction>;
}

export default function CharacterCreation({ content, dispatch }: CharacterCreationProps) {
  const [name, setName] = useState('');
  const [selectedOrigin, setSelectedOrigin] = useState<Origin | null>(null);
  const [selectedPath, setSelectedPath] = useState<PathDef | null>(null);
  const [step, setStep] = useState<'name' | 'origin' | 'path' | 'confirm'>('name');

  const handleCreate = () => {
    if (!name || !selectedOrigin || !selectedPath) return;
    dispatch({
      type: 'CREATE_CHARACTER',
      payload: { name, origin: selectedOrigin, path: selectedPath },
    });
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Dragonsloft</h1>
          <p className="text-gray-500">Cultivation begins with a single breath</p>
        </div>

        {/* Name Step */}
        {step === 'name' && (
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 animate-fade-in">
            <h2 className="text-xl font-bold text-gray-200 mb-4">What is your name?</h2>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter your name..."
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
              autoFocus
              onKeyDown={e => {
                if (e.key === 'Enter' && name.trim()) setStep('origin');
              }}
            />
            <button
              onClick={() => name.trim() && setStep('origin')}
              disabled={!name.trim()}
              className="mt-4 w-full py-3 bg-purple-900/30 border border-purple-700 rounded-lg text-purple-300 hover:bg-purple-900/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              Continue
            </button>
          </div>
        )}

        {/* Origin Step */}
        {step === 'origin' && (
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 animate-fade-in">
            <h2 className="text-xl font-bold text-gray-200 mb-1">Choose your Origin</h2>
            <p className="text-sm text-gray-500 mb-4">Where you began shapes what you may become.</p>
            <div className="space-y-3">
              {content.origins.map(origin => (
                <button
                  key={origin.id}
                  onClick={() => {
                    setSelectedOrigin(origin);
                    setStep('path');
                  }}
                  className={`w-full text-left p-4 rounded-lg border transition-all hover:border-purple-500 hover:bg-gray-800 ${
                    selectedOrigin?.id === origin.id
                      ? 'bg-gray-800 border-purple-600'
                      : 'bg-gray-800/30 border-gray-700'
                  }`}
                >
                  <div className="text-lg font-bold text-white">{origin.name}</div>
                  <p className="text-sm text-gray-400 mt-1">{origin.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {origin.affinities.map(aff => (
                      <span key={aff} className="px-1.5 py-0.5 bg-indigo-900/30 rounded text-xs text-indigo-300">
                        {aff}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 mt-2 italic">{origin.lore}</p>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep('name')}
              className="mt-3 text-sm text-gray-500 hover:text-gray-300"
            >
              Back
            </button>
          </div>
        )}

        {/* Path Step */}
        {step === 'path' && (
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 animate-fade-in">
            <h2 className="text-xl font-bold text-gray-200 mb-1">Choose your Path</h2>
            <p className="text-sm text-gray-500 mb-4">The direction of your ascent defines the shape of your power.</p>
            <div className="space-y-3">
              {content.paths.map(path => {
                const framework = content.frameworks.find(f => f.id === path.framework);
                return (
                  <button
                    key={path.id}
                    onClick={() => {
                      setSelectedPath(path);
                      setStep('confirm');
                    }}
                    className={`w-full text-left p-4 rounded-lg border transition-all hover:border-purple-500 hover:bg-gray-800 ${
                      selectedPath?.id === path.id
                        ? 'bg-gray-800 border-purple-600'
                        : 'bg-gray-800/30 border-gray-700'
                    }`}
                  >
                    <div className="text-lg font-bold text-white">{path.name}</div>
                    {framework && (
                      <div className="text-xs text-cyan-400 mt-0.5">Framework: {framework.name}</div>
                    )}
                    <p className="text-sm text-gray-400 mt-1">{path.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {path.affinities.map(aff => (
                        <span key={aff} className="px-1.5 py-0.5 bg-purple-900/30 rounded text-xs text-purple-300">
                          {aff}
                        </span>
                      ))}
                    </div>
                    {path.oppositions.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        <span className="text-xs text-gray-600">Opposes:</span>
                        {path.oppositions.map(opp => (
                          <span key={opp} className="px-1.5 py-0.5 bg-red-900/20 rounded text-xs text-red-400">
                            {opp}
                          </span>
                        ))}
                      </div>
                    )}
                    <p className="text-xs text-gray-600 mt-2 italic">{path.lore}</p>
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setStep('origin')}
              className="mt-3 text-sm text-gray-500 hover:text-gray-300"
            >
              Back
            </button>
          </div>
        )}

        {/* Confirm Step */}
        {step === 'confirm' && selectedOrigin && selectedPath && (
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 animate-fade-in">
            <h2 className="text-xl font-bold text-gray-200 mb-4">Confirm Your Beginning</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Name:</span>
                <span className="text-white font-bold">{name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Origin:</span>
                <span className="text-amber-300">{selectedOrigin.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Path:</span>
                <span className="text-purple-300">{selectedPath.name}</span>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Starting Traits:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedOrigin.startingTraits.map(t => (
                    <span key={t} className="px-1.5 py-0.5 bg-gray-800 rounded text-xs text-gray-300">{t}</span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Starting Methods:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedOrigin.startingMethods.map(m => {
                    const method = content.methods.find(md => md.id === m);
                    return (
                      <span key={m} className="px-1.5 py-0.5 bg-blue-900/30 rounded text-xs text-blue-300">
                        {method?.name ?? m}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Combined Affinities:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {[...new Set([...selectedOrigin.affinities, ...selectedPath.affinities])].map(a => (
                    <span key={a} className="px-1.5 py-0.5 bg-indigo-900/30 rounded text-xs text-indigo-300">{a}</span>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleCreate}
              className="w-full py-3 bg-purple-800 border border-purple-600 rounded-lg text-white font-bold hover:bg-purple-700 transition-all"
            >
              Begin Cultivation
            </button>
            <button
              onClick={() => setStep('path')}
              className="mt-2 w-full text-sm text-gray-500 hover:text-gray-300"
            >
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
