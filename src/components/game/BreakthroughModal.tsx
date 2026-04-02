import React from 'react';
import type { GameState, ContentPack, GameAction, BreakthroughDef } from '../../engine/types';
import { RANK_NAMES } from '../../engine/types';
import { checkCondition } from '../../engine/world';

interface BreakthroughModalProps {
  state: GameState;
  content: ContentPack;
  dispatch: React.Dispatch<GameAction>;
  onClose: () => void;
}

export default function BreakthroughModal({ state, content, dispatch, onClose }: BreakthroughModalProps) {
  const available = content.breakthroughs.filter(bt => {
    if (bt.targetRank !== state.character.rank + 1) return false;
    return bt.conditions.every(c => checkCondition(c, state.character, state.world, content)) ||
      bt.conditions.some(c => c.type === 'has_path' && c.target === state.character.pathId);
  });

  // Also show generic breakthroughs
  const generic = content.breakthroughs.filter(bt =>
    bt.targetRank === state.character.rank + 1 &&
    !bt.conditions.some(c => c.type === 'has_path')
  );

  const allBreakthroughs = [...new Map([...available, ...generic].map(b => [b.id, b])).values()];

  const meetsAllConditions = (bt: BreakthroughDef) =>
    bt.conditions.every(c => checkCondition(c, state.character, state.world, content));

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="max-w-lg w-full bg-gray-900 border border-purple-700/50 rounded-xl p-6 max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-white mb-1">Breakthrough</h2>
        <p className="text-sm text-gray-400 mb-4">
          Advance from {RANK_NAMES[state.character.rank as keyof typeof RANK_NAMES]} to the next stage.
        </p>

        {state.lastBreakthroughResult && (
          <div className={`mb-4 p-3 rounded-lg border ${
            state.lastBreakthroughResult === 'success'
              ? 'bg-green-900/20 border-green-700/50 text-green-300'
              : state.lastBreakthroughResult === 'forced'
              ? 'bg-yellow-900/20 border-yellow-700/50 text-yellow-300'
              : 'bg-red-900/20 border-red-700/50 text-red-300'
          }`}>
            {state.lastBreakthroughResult === 'success' && 'Breakthrough successful! Your cultivation advances.'}
            {state.lastBreakthroughResult === 'forced' && 'Forced breakthrough! You advanced, but at a cost.'}
            {state.lastBreakthroughResult === 'failure' && 'Breakthrough failed. Your foundation was insufficient.'}
          </div>
        )}

        {allBreakthroughs.length === 0 ? (
          <div className="text-gray-500 text-center py-4">
            No breakthroughs available at your current stage.
          </div>
        ) : (
          <div className="space-y-3">
            {allBreakthroughs.map(bt => {
              const meetsAll = meetsAllConditions(bt);
              const meetsCoherence = state.coherence >= bt.minCoherence;
              return (
                <div key={bt.id} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-purple-300">{bt.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">{bt.description}</p>

                  <div className="mt-3 space-y-1 text-xs">
                    <div className={`flex justify-between ${meetsCoherence ? 'text-green-400' : 'text-red-400'}`}>
                      <span>Coherence Required</span>
                      <span>{state.coherence}/{bt.minCoherence}</span>
                    </div>
                    {Object.entries(bt.resourceCost).map(([key, cost]) => {
                      if (!cost) return null;
                      const current = (state.character.resources as Record<string, number>)[key] ?? 0;
                      const enough = current >= (cost as number);
                      return (
                        <div key={key} className={`flex justify-between ${enough ? 'text-green-400' : 'text-red-400'}`}>
                          <span className="capitalize">{key} Cost</span>
                          <span>{current}/{cost as number}</span>
                        </div>
                      );
                    })}
                  </div>

                  {bt.riskFactors.length > 0 && (
                    <div className="mt-2 text-xs text-yellow-400">
                      <span>Risks:</span>
                      {bt.riskFactors.map((rf, i) => (
                        <div key={i} className="ml-2 text-yellow-300">{rf.description}</div>
                      ))}
                    </div>
                  )}

                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => dispatch({ type: 'ATTEMPT_BREAKTHROUGH', payload: { breakthroughId: bt.id } })}
                      disabled={!meetsAll || !meetsCoherence}
                      className={`flex-1 py-2 rounded-lg border font-bold transition-all ${
                        meetsAll && meetsCoherence
                          ? 'bg-purple-800/50 border-purple-600 text-purple-200 hover:bg-purple-800 cursor-pointer'
                          : 'bg-gray-900 border-gray-800 text-gray-600 cursor-not-allowed'
                      }`}
                    >
                      Attempt
                    </button>
                    {!meetsAll && (
                      <button
                        onClick={() => dispatch({ type: 'ATTEMPT_BREAKTHROUGH', payload: { breakthroughId: bt.id, force: true } })}
                        className="flex-1 py-2 rounded-lg border bg-red-900/30 border-red-700/50 text-red-300 hover:bg-red-900/50 transition-all"
                      >
                        Force (Risky)
                      </button>
                    )}
                  </div>

                  <p className="text-xs text-gray-600 mt-2 italic">{bt.lore}</p>
                </div>
              );
            })}
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-4 w-full py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-400 hover:text-white transition-all"
        >
          Close
        </button>
      </div>
    </div>
  );
}
