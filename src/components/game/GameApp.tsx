import React, { useState, useMemo } from 'react';
import type { ContentPack, GameAction } from '../../engine/types';
import { useGameState } from '../../hooks/useGameState';
import { calculateCoherence } from '../../engine/coherence';
import CharacterCreation from './CharacterCreation';
import SceneView from './SceneView';
import CharacterSheet from './CharacterSheet';
import ResourcePanel from './ResourceBar';
import InventoryPanel from './InventoryPanel';
import CraftingPanel from './CraftingPanel';
import DebugPanel from './DebugPanel';
import BreakthroughModal from './BreakthroughModal';
import { saveToSlot, loadFromSlot, getSaveSlots, deleteSave } from '../../engine/save';

interface GameAppProps {
  content: ContentPack;
  onExit: () => void;
}

type SideTab = 'character' | 'inventory' | 'crafting';

export default function GameApp({ content, onExit }: GameAppProps) {
  const { state, dispatch, getCoherenceReport } = useGameState(content);
  const [sideTab, setSideTab] = useState<SideTab>('character');
  const [showBreakthrough, setShowBreakthrough] = useState(false);
  const [showSaveMenu, setShowSaveMenu] = useState(false);

  const coherenceReport = useMemo(() => getCoherenceReport(), [getCoherenceReport]);

  // Character creation phase
  if (state.phase === 'character_creation') {
    return <CharacterCreation content={content} dispatch={dispatch} />;
  }

  // Game over
  if (state.phase === 'game_over') {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-400 mb-4">Your cultivation ends here.</h1>
          <button
            onClick={() => dispatch({ type: 'NEW_GAME' })}
            className="px-6 py-3 bg-gray-800 border border-gray-600 rounded-lg text-gray-300 hover:text-white transition-all"
          >
            Begin Anew
          </button>
        </div>
      </div>
    );
  }

  const handleSave = (slot: string) => {
    saveToSlot(slot, state, 'ashenmoor-v1');
    setShowSaveMenu(false);
  };

  const handleLoad = (slot: string) => {
    const data = loadFromSlot(slot);
    if (data) {
      dispatch({ type: 'LOAD_STATE', payload: data.gameState });
      setShowSaveMenu(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Top Bar */}
      <header className="bg-gray-900 border-b border-gray-800 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onExit} className="text-sm text-gray-500 hover:text-gray-300">
            Exit
          </button>
          <h1 className="text-lg font-bold text-gray-200">Dragonsloft</h1>
          <span className="text-xs text-gray-600">
            {state.character.name} — Day {state.world.day}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowBreakthrough(true)}
            className="px-3 py-1 bg-purple-900/30 border border-purple-700/50 rounded text-xs text-purple-300 hover:bg-purple-900/50 transition-all"
          >
            Breakthrough
          </button>
          <button
            onClick={() => setShowSaveMenu(!showSaveMenu)}
            className="px-3 py-1 bg-gray-800 border border-gray-700 rounded text-xs text-gray-400 hover:text-white transition-all"
          >
            Save/Load
          </button>
          <button
            onClick={() => dispatch({ type: 'TOGGLE_DEBUG' })}
            className={`px-3 py-1 rounded text-xs transition-all ${
              state.debug
                ? 'bg-yellow-900/30 border border-yellow-700/50 text-yellow-400'
                : 'bg-gray-800 border border-gray-700 text-gray-500 hover:text-gray-300'
            }`}
          >
            Debug
          </button>
        </div>
      </header>

      {/* Save/Load Menu */}
      {showSaveMenu && (
        <div className="absolute right-4 top-12 z-40 bg-gray-900 border border-gray-700 rounded-lg p-3 shadow-xl w-64">
          <h3 className="text-sm font-bold text-gray-300 mb-2">Save / Load</h3>
          <div className="space-y-1">
            {['Slot 1', 'Slot 2', 'Slot 3'].map(slot => {
              const existing = getSaveSlots().includes(slot);
              return (
                <div key={slot} className="flex items-center gap-1">
                  <span className="text-xs text-gray-400 flex-1">{slot}</span>
                  <button
                    onClick={() => handleSave(slot)}
                    className="px-2 py-0.5 bg-green-900/30 border border-green-700/50 rounded text-[10px] text-green-300 hover:bg-green-900/50"
                  >
                    Save
                  </button>
                  {existing && (
                    <>
                      <button
                        onClick={() => handleLoad(slot)}
                        className="px-2 py-0.5 bg-blue-900/30 border border-blue-700/50 rounded text-[10px] text-blue-300 hover:bg-blue-900/50"
                      >
                        Load
                      </button>
                      <button
                        onClick={() => { deleteSave(slot); setShowSaveMenu(false); }}
                        className="px-2 py-0.5 bg-red-900/30 border border-red-700/50 rounded text-[10px] text-red-300 hover:bg-red-900/50"
                      >
                        Del
                      </button>
                    </>
                  )}
                </div>
              );
            })}
          </div>
          <button
            onClick={() => setShowSaveMenu(false)}
            className="mt-2 w-full text-xs text-gray-500 hover:text-gray-300"
          >
            Close
          </button>
        </div>
      )}

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-4 p-4 max-w-7xl mx-auto">
        {/* Left Sidebar */}
        <aside className="lg:w-72 shrink-0 space-y-3">
          <ResourcePanel character={state.character} />

          {/* Side Tab Switcher */}
          <div className="flex rounded-lg border border-gray-700 overflow-hidden">
            {(['character', 'inventory', 'crafting'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setSideTab(tab)}
                className={`flex-1 px-2 py-1.5 text-xs capitalize transition-all ${
                  sideTab === tab
                    ? 'bg-gray-800 text-white'
                    : 'bg-gray-900 text-gray-500 hover:text-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {sideTab === 'character' && (
            <CharacterSheet character={state.character} coherence={state.coherence} content={content} />
          )}
          {sideTab === 'inventory' && (
            <InventoryPanel character={state.character} content={content} dispatch={dispatch} />
          )}
          {sideTab === 'crafting' && (
            <CraftingPanel
              character={state.character}
              world={state.world}
              content={content}
              dispatch={dispatch}
            />
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <SceneView
            state={state}
            content={content}
            onChoice={(sceneId, choiceId) => {
              dispatch({ type: 'DISMISS_NARRATIVE' });
              dispatch({ type: 'MAKE_CHOICE', payload: { sceneId, choiceId } });
            }}
            onNavigate={(targetScene) => {
              dispatch({ type: 'DISMISS_NARRATIVE' });
              dispatch({ type: 'NAVIGATE', payload: { targetScene } });
            }}
            onMeditate={(focus) => {
              dispatch({ type: 'DISMISS_NARRATIVE' });
              dispatch({ type: 'MEDITATE', payload: { focus } });
            }}
            onRest={(days) => {
              dispatch({ type: 'DISMISS_NARRATIVE' });
              dispatch({ type: 'REST', payload: { days } });
            }}
            onStudy={(topic) => {
              dispatch({ type: 'DISMISS_NARRATIVE' });
              dispatch({ type: 'STUDY', payload: { topic } });
            }}
            onFreeformAction={(text) => {
              dispatch({ type: 'DISMISS_NARRATIVE' });
              dispatch({ type: 'FREEFORM_ACTION', payload: { text } });
            }}
          />

          {/* Debug Panel */}
          {state.debug && (
            <div className="mt-4">
              <DebugPanel state={state} content={content} coherenceReport={coherenceReport} />
            </div>
          )}
        </main>
      </div>

      {/* Breakthrough Modal */}
      {showBreakthrough && (
        <BreakthroughModal
          state={state}
          content={content}
          dispatch={dispatch}
          onClose={() => setShowBreakthrough(false)}
        />
      )}
    </div>
  );
}
