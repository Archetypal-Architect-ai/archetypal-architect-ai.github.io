import React from 'react';
import type { GameState, ContentPack, SceneDef, Choice, Condition, CharacterState, WorldState } from '../../engine/types';
import { checkCondition } from '../../engine/world';

interface SceneViewProps {
  state: GameState;
  content: ContentPack;
  onChoice: (sceneId: string, choiceId: string) => void;
  onNavigate: (targetScene: string) => void;
  onMeditate: (focus: 'stability' | 'essence' | 'coherence') => void;
}

export default function SceneView({ state, content, onChoice, onNavigate, onMeditate }: SceneViewProps) {
  const scene = content.scenes.find(s => s.id === state.world.currentScene);
  const region = content.regions.find(r => r.id === state.world.currentRegion);

  if (!scene) {
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 text-center text-gray-400">
        Scene not found: {state.world.currentScene}
      </div>
    );
  }

  const availableChoices = scene.choices.filter(choice => {
    if (choice.visible === false) {
      return choice.conditions.every(c => checkCondition(c, state.character, state.world, content));
    }
    return true;
  });

  const exits = scene.exits.filter(exit =>
    exit.conditions.every(c => checkCondition(c, state.character, state.world, content))
  );

  return (
    <div className="space-y-4">
      {/* Location Header */}
      <div className="bg-gray-900/80 border border-gray-700 rounded-lg p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h2 className="text-xl font-bold text-white">{scene.name}</h2>
            {region && <span className="text-xs text-gray-500">{region.name}</span>}
          </div>
          <div className="text-right text-xs text-gray-500">
            <div>Day {state.world.day}</div>
            <div className="capitalize">{state.world.season}</div>
          </div>
        </div>

        {/* Scene Description */}
        <p className="text-gray-300 leading-relaxed">{scene.description}</p>

        {/* Scene Tags (debug) */}
        {state.debug && scene.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {scene.tags.map(tag => (
              <span key={tag} className="px-1 py-0.5 bg-gray-800 rounded text-[10px] text-gray-500">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Narrative Buffer */}
      {state.narrativeBuffer.length > 0 && (
        <div className="bg-gray-800/50 border border-amber-900/30 rounded-lg p-4">
          {state.narrativeBuffer.map((text, i) => (
            <p key={i} className="text-amber-200/80 text-sm italic mb-1 last:mb-0">
              {text}
            </p>
          ))}
        </div>
      )}

      {/* Choices */}
      <div className="space-y-2">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Actions</h3>
        {availableChoices.map(choice => {
          const meetsConditions = choice.conditions.every(c =>
            checkCondition(c, state.character, state.world, content)
          );
          return (
            <button
              key={choice.id}
              onClick={() => meetsConditions && onChoice(scene.id, choice.id)}
              disabled={!meetsConditions}
              className={`w-full text-left p-3 rounded-lg border transition-all ${
                meetsConditions
                  ? 'bg-gray-800/50 border-gray-600 hover:border-purple-500 hover:bg-gray-800 cursor-pointer'
                  : 'bg-gray-900/30 border-gray-800 cursor-not-allowed opacity-50'
              }`}
            >
              <span className={meetsConditions ? 'text-gray-200' : 'text-gray-600'}>
                {choice.text}
              </span>
              {!meetsConditions && state.debug && (
                <div className="mt-1 text-[10px] text-red-400">
                  Requires: {choice.conditions.map(c => `${c.type}:${c.target ?? c.value}`).join(', ')}
                </div>
              )}
              {state.debug && choice.tags.length > 0 && (
                <div className="mt-1 flex flex-wrap gap-1">
                  {choice.tags.map(tag => (
                    <span key={tag} className="px-1 py-0.5 bg-gray-800 rounded text-[10px] text-gray-500">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </button>
          );
        })}

        {/* Meditation */}
        <div className="pt-2 border-t border-gray-800">
          <h4 className="text-xs text-gray-500 mb-1">Meditate</h4>
          <div className="flex gap-2">
            {(['stability', 'essence', 'coherence'] as const).map(focus => (
              <button
                key={focus}
                onClick={() => onMeditate(focus)}
                className="flex-1 px-2 py-1.5 bg-gray-800/50 border border-gray-700 rounded text-xs text-gray-400 hover:text-white hover:border-green-600 transition-all capitalize"
              >
                {focus}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Exits */}
      {exits.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Travel</h3>
          {exits.map(exit => (
            <button
              key={exit.targetScene}
              onClick={() => onNavigate(exit.targetScene)}
              className="w-full text-left p-3 rounded-lg border border-gray-700 bg-gray-800/30 hover:border-cyan-600 hover:bg-gray-800/50 transition-all"
            >
              <span className="text-cyan-300">{exit.text}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
