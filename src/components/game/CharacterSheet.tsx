import React from 'react';
import type { CharacterState, ContentPack, Rank } from '../../engine/types';
import { RANK_NAMES } from '../../engine/types';

interface CharacterSheetProps {
  character: CharacterState;
  coherence: number;
  content: ContentPack;
}

export default function CharacterSheet({ character, coherence, content }: CharacterSheetProps) {
  const path = content.paths.find(p => p.id === character.pathId);
  const framework = content.frameworks.find(f => f.id === character.frameworkId);

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-3">
      <h3 className="text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">Identity</h3>

      <div className="text-lg font-bold text-white">{character.name}</div>
      <div className="text-sm text-gray-400">
        {RANK_NAMES[character.rank]} (Rank {character.rank})
      </div>

      {path && (
        <div className="mt-2">
          <span className="text-xs text-gray-500">Path:</span>
          <div className="text-sm text-purple-300">{path.name}</div>
          <div className="text-xs text-gray-500">Depth: {character.pathDepth}</div>
        </div>
      )}

      {framework && (
        <div className="mt-1">
          <span className="text-xs text-gray-500">Framework:</span>
          <div className="text-sm text-cyan-300">{framework.name}</div>
        </div>
      )}

      <div className="mt-2">
        <span className="text-xs text-gray-500">Body:</span>
        <span className="text-sm text-gray-300 ml-1 capitalize">{character.bodyState}</span>
      </div>

      {/* Coherence */}
      <div className="mt-2">
        <div className="flex justify-between text-xs text-gray-400 mb-0.5">
          <span>Coherence</span>
          <span>{coherence}/100</span>
        </div>
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${coherence}%`,
              backgroundColor: coherence >= 70 ? '#10b981' : coherence >= 40 ? '#eab308' : '#ef4444',
            }}
          />
        </div>
      </div>

      {/* Titles */}
      {Object.keys(character.titles).length > 0 && (
        <div className="mt-3">
          <span className="text-xs text-gray-500 uppercase tracking-wider">Titles</span>
          <div className="mt-1 flex flex-wrap gap-1">
            {Object.entries(character.titles).map(([titleId, info]) => {
              const titleDef = content.titles.find(t => t.id === titleId);
              return (
                <span
                  key={titleId}
                  className="px-2 py-0.5 bg-amber-900/30 border border-amber-700/50 rounded text-xs text-amber-300"
                >
                  {titleDef?.name ?? titleId} {info.rank > 1 ? `(${info.rank})` : ''}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Traits */}
      {character.traits.length > 0 && (
        <div className="mt-3">
          <span className="text-xs text-gray-500 uppercase tracking-wider">Traits</span>
          <div className="mt-1 flex flex-wrap gap-1">
            {character.traits.map(traitId => {
              const traitDef = content.traits.find(t => t.id === traitId);
              return (
                <span
                  key={traitId}
                  className="px-2 py-0.5 bg-gray-800 border border-gray-600 rounded text-xs text-gray-300"
                >
                  {traitDef?.name ?? traitId}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Methods */}
      {Object.keys(character.methods).length > 0 && (
        <div className="mt-3">
          <span className="text-xs text-gray-500 uppercase tracking-wider">Methods</span>
          <div className="mt-1 space-y-1">
            {Object.entries(character.methods).map(([methodId, info]) => {
              const methodDef = content.methods.find(m => m.id === methodId);
              return (
                <div key={methodId} className="flex justify-between text-xs">
                  <span className="text-blue-300">{methodDef?.name ?? methodId}</span>
                  <span className="text-gray-500">Mastery {info.mastery}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Affinities */}
      {character.affinities.length > 0 && (
        <div className="mt-3">
          <span className="text-xs text-gray-500 uppercase tracking-wider">Affinities</span>
          <div className="mt-1 flex flex-wrap gap-1">
            {character.affinities.map(aff => (
              <span key={aff} className="px-1.5 py-0.5 bg-indigo-900/30 rounded text-xs text-indigo-300">
                {aff}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
