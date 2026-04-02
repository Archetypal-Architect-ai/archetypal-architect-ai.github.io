import React, { useState } from 'react';
import type { GameState, ContentPack } from '../../engine/types';
import { checkCondition } from '../../engine/world';

interface SceneViewProps {
  state: GameState;
  content: ContentPack;
  onChoice: (sceneId: string, choiceId: string) => void;
  onNavigate: (targetScene: string) => void;
  onMeditate: (focus: 'stability' | 'essence' | 'coherence' | 'vitality') => void;
  onRest: (days: number) => void;
  onStudy: (topic: string) => void;
  onFreeformAction: (text: string) => void;
}

export default function SceneView({
  state, content, onChoice, onNavigate, onMeditate, onRest, onStudy, onFreeformAction
}: SceneViewProps) {
  const [freeformText, setFreeformText] = useState('');
  const [studyTopic, setStudyTopic] = useState('');
  const [showStudy, setShowStudy] = useState(false);

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

  const handleFreeformSubmit = () => {
    if (freeformText.trim()) {
      onFreeformAction(freeformText.trim());
      setFreeformText('');
    }
  };

  const handleStudySubmit = () => {
    if (studyTopic.trim()) {
      onStudy(studyTopic.trim());
      setStudyTopic('');
      setShowStudy(false);
    }
  };

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
        <p className="text-gray-300 leading-relaxed">{scene.description}</p>
        {state.debug && scene.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {scene.tags.map(tag => (
              <span key={tag} className="px-1 py-0.5 bg-gray-800 rounded text-[10px] text-gray-500">{tag}</span>
            ))}
          </div>
        )}
      </div>

      {/* Narrative Buffer */}
      {state.narrativeBuffer.length > 0 && (
        <div className="bg-gray-800/50 border border-amber-900/30 rounded-lg p-4">
          {state.narrativeBuffer.map((text, i) => (
            <p key={i} className="text-amber-200/80 text-sm italic mb-1 last:mb-0">{text}</p>
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
              <span className={meetsConditions ? 'text-gray-200' : 'text-gray-600'}>{choice.text}</span>
              {!meetsConditions && state.debug && (
                <div className="mt-1 text-[10px] text-red-400">
                  Requires: {choice.conditions.map(c => `${c.type}:${c.target ?? c.value}`).join(', ')}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Freeform Action Input */}
      <div className="bg-gray-900/60 border border-gray-700 rounded-lg p-3">
        <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-2">What do you do?</h4>
        <div className="flex gap-2">
          <input
            type="text"
            value={freeformText}
            onChange={e => setFreeformText(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleFreeformSubmit(); }}
            placeholder="Describe your action... (heal, search, train, gather, hide...)"
            className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-sm text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
          />
          <button
            onClick={handleFreeformSubmit}
            disabled={!freeformText.trim()}
            className="px-4 py-2 bg-purple-900/40 border border-purple-700/50 rounded-lg text-sm text-purple-300 hover:bg-purple-900/60 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            Act
          </button>
        </div>
        <p className="text-[10px] text-gray-600 mt-1">Try: heal, search, train, study [topic], gather, hide, talk</p>
      </div>

      {/* Rest & Recovery */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-900/60 border border-gray-700 rounded-lg p-3">
          <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-2">Meditate</h4>
          <div className="grid grid-cols-2 gap-1">
            {(['vitality', 'essence', 'stability', 'coherence'] as const).map(focus => (
              <button
                key={focus}
                onClick={() => onMeditate(focus)}
                className="px-2 py-1.5 bg-gray-800/50 border border-gray-700 rounded text-xs text-gray-400 hover:text-white hover:border-green-600 transition-all capitalize"
              >
                {focus === 'vitality' ? 'Heal' : focus}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-gray-600 mt-1">Costs 1 day. Restores the chosen resource.</p>
        </div>

        <div className="bg-gray-900/60 border border-gray-700 rounded-lg p-3">
          <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-2">Rest & Study</h4>
          <div className="space-y-1">
            <button
              onClick={() => onRest(1)}
              className="w-full px-2 py-1.5 bg-gray-800/50 border border-gray-700 rounded text-xs text-gray-400 hover:text-white hover:border-blue-600 transition-all"
            >
              Rest 1 Day (recover all)
            </button>
            <button
              onClick={() => onRest(3)}
              className="w-full px-2 py-1.5 bg-gray-800/50 border border-gray-700 rounded text-xs text-gray-400 hover:text-white hover:border-blue-600 transition-all"
            >
              Rest 3 Days (full recovery)
            </button>
            <button
              onClick={() => setShowStudy(!showStudy)}
              className="w-full px-2 py-1.5 bg-gray-800/50 border border-gray-700 rounded text-xs text-amber-400 hover:text-white hover:border-amber-600 transition-all"
            >
              Study a Topic
            </button>
          </div>
        </div>
      </div>

      {/* Study Panel */}
      {showStudy && (
        <div className="bg-gray-900/80 border border-amber-700/30 rounded-lg p-3">
          <h4 className="text-xs text-amber-400 uppercase tracking-wider mb-2">Study</h4>
          <p className="text-xs text-gray-400 mb-2">
            Study a topic to learn new methods or deepen mastery. Try: blood, bone, shadow, death, oath, spirit, relic, combat, healing, or the name of a method you know.
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={studyTopic}
              onChange={e => setStudyTopic(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleStudySubmit(); }}
              placeholder="What do you study?"
              className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-sm text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none"
            />
            <button
              onClick={handleStudySubmit}
              disabled={!studyTopic.trim()}
              className="px-4 py-2 bg-amber-900/40 border border-amber-700/50 rounded-lg text-sm text-amber-300 hover:bg-amber-900/60 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              Study
            </button>
          </div>
          <div className="mt-2 text-[10px] text-gray-600">
            <span className="text-gray-500">Known methods:</span>{' '}
            {Object.keys(state.character.methods).map(id => {
              const def = content.methods.find(m => m.id === id);
              return def?.name ?? id;
            }).join(', ') || 'None'}
          </div>
        </div>
      )}

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
