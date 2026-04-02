import React, { useState } from 'react';
import type { GameState, ContentPack, CoherenceReport } from '../../engine/types';

interface DebugPanelProps {
  state: GameState;
  content: ContentPack;
  coherenceReport: CoherenceReport;
}

export default function DebugPanel({ state, content, coherenceReport }: DebugPanelProps) {
  const [tab, setTab] = useState<'state' | 'coherence' | 'world' | 'tags'>('state');

  if (!state.debug) return null;

  return (
    <div className="bg-gray-950 border border-yellow-700/50 rounded-lg p-3 text-xs font-mono">
      <h3 className="text-yellow-400 font-bold mb-2">DEBUG PANEL</h3>

      <div className="flex gap-1 mb-2">
        {(['state', 'coherence', 'world', 'tags'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-2 py-0.5 rounded ${
              tab === t ? 'bg-yellow-900/50 text-yellow-300' : 'bg-gray-800 text-gray-500 hover:text-gray-300'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="max-h-64 overflow-y-auto">
        {tab === 'state' && (
          <div className="space-y-1 text-gray-400">
            <div>Phase: <span className="text-white">{state.phase}</span></div>
            <div>Turn: <span className="text-white">{state.turnCount}</span></div>
            <div>Rank: <span className="text-white">{state.character.rank}</span></div>
            <div>Path: <span className="text-white">{state.character.pathId ?? 'none'}</span></div>
            <div>Path Depth: <span className="text-white">{state.character.pathDepth}</span></div>
            <div>Body: <span className="text-white">{state.character.bodyState}</span></div>
            <div>Seed: <span className="text-white">{state.seed}</span></div>
            <div className="mt-2">Resources:</div>
            {Object.entries(state.character.resources).map(([k, v]) => {
              if (k === 'materials' || typeof v !== 'number') return null;
              return <div key={k} className="ml-2">{k}: <span className="text-white">{v}</span></div>;
            })}
            {Object.entries(state.character.optionalResources).map(([k, v]) => (
              v !== undefined && <div key={k} className="ml-2 text-purple-400">{k}: <span className="text-white">{v}</span></div>
            ))}
            <div className="mt-2">Methods ({Object.keys(state.character.methods).length}):</div>
            {Object.entries(state.character.methods).map(([id, info]) => (
              <div key={id} className="ml-2">{id}: mastery {info.mastery}</div>
            ))}
            <div className="mt-2">Inventory ({state.character.inventory.length}):</div>
            {state.character.inventory.map(slot => (
              <div key={slot.itemId} className="ml-2">{slot.itemId} x{slot.quantity}</div>
            ))}
          </div>
        )}

        {tab === 'coherence' && (
          <div className="space-y-2 text-gray-400">
            <div>Score: <span className="text-white">{coherenceReport.score}</span></div>
            {coherenceReport.synergies.length > 0 && (
              <div>
                <div className="text-green-400">Synergies:</div>
                {coherenceReport.synergies.map((s, i) => (
                  <div key={i} className="ml-2 text-green-300">
                    {s.source} + {s.target}: +{s.bonus} ({s.reason})
                  </div>
                ))}
              </div>
            )}
            {coherenceReport.conflicts.length > 0 && (
              <div>
                <div className="text-red-400">Conflicts:</div>
                {coherenceReport.conflicts.map((c, i) => (
                  <div key={i} className="ml-2 text-red-300">
                    {c.source} vs {c.target}: -{c.penalty} ({c.reason})
                  </div>
                ))}
              </div>
            )}
            {coherenceReport.suggestions.length > 0 && (
              <div>
                <div className="text-yellow-400">Suggestions:</div>
                {coherenceReport.suggestions.map((s, i) => (
                  <div key={i} className="ml-2">{s}</div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'world' && (
          <div className="space-y-1 text-gray-400">
            <div>Region: <span className="text-white">{state.world.currentRegion}</span></div>
            <div>Scene: <span className="text-white">{state.world.currentScene}</span></div>
            <div>Day: <span className="text-white">{state.world.day}</span></div>
            <div>Season: <span className="text-white">{state.world.season}</span></div>
            <div className="mt-2">Faction Standings:</div>
            {Object.entries(state.world.factionStandings).map(([id, val]) => (
              <div key={id} className="ml-2">{id}: <span className="text-white">{val}</span></div>
            ))}
            <div className="mt-2">Flags ({Object.keys(state.world.flags).length}):</div>
            {Object.entries(state.world.flags).map(([k, v]) => (
              <div key={k} className="ml-2">{k}: <span className="text-white">{String(v)}</span></div>
            ))}
            <div className="mt-2">Unlocked Regions:</div>
            {state.world.unlockedRegions.map(r => (
              <div key={r} className="ml-2">{r}</div>
            ))}
            <div className="mt-2">Timers ({state.world.timers.length}):</div>
            {state.world.timers.map(t => (
              <div key={t.id} className="ml-2">{t.label}: expires day {t.expiresOnDay}</div>
            ))}
          </div>
        )}

        {tab === 'tags' && (
          <div className="space-y-2 text-gray-400">
            <div>Character Tags:</div>
            <div className="flex flex-wrap gap-1 ml-2">
              {state.character.tags.map(t => (
                <span key={t} className="px-1 py-0.5 bg-gray-800 rounded text-gray-300">{t}</span>
              ))}
            </div>
            <div>Traits:</div>
            <div className="flex flex-wrap gap-1 ml-2">
              {state.character.traits.map(t => (
                <span key={t} className="px-1 py-0.5 bg-indigo-900/30 rounded text-indigo-300">{t}</span>
              ))}
            </div>
            <div>Affinities:</div>
            <div className="flex flex-wrap gap-1 ml-2">
              {state.character.affinities.map(a => (
                <span key={a} className="px-1 py-0.5 bg-purple-900/30 rounded text-purple-300">{a}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
