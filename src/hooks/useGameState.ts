// ============================================================================
// Game State Hook — React Integration
// ============================================================================

import { useReducer, useCallback, useRef, useEffect } from 'react';
import type { GameState, GameAction, ContentPack } from '../engine/types';
import { gameReducer, createInitialState } from '../engine/state';
import { calculateCoherence } from '../engine/coherence';
import { autoSave, loadAutoSave } from '../engine/save';

const CONTENT_PACK_ID = 'ashenmoor-v1';

export function useGameState(content: ContentPack) {
  const contentRef = useRef(content);
  contentRef.current = content;

  const wrappedReducer = useCallback(
    (state: GameState, action: GameAction): GameState => {
      const newState = gameReducer(state, action, contentRef.current);

      // Recalculate coherence after state changes
      if (action.type !== 'TOGGLE_DEBUG' && action.type !== 'DISMISS_NARRATIVE') {
        const report = calculateCoherence(newState.character, contentRef.current);
        return { ...newState, coherence: report.score };
      }

      return newState;
    },
    []
  );

  const [state, dispatch] = useReducer(wrappedReducer, null, () => {
    // Try to load autosave
    const save = loadAutoSave();
    if (save && save.contentPackId === CONTENT_PACK_ID) {
      return save.gameState;
    }
    return createInitialState();
  });

  // Autosave on significant state changes
  const turnRef = useRef(state.turnCount);
  useEffect(() => {
    if (state.turnCount !== turnRef.current && state.phase !== 'character_creation') {
      turnRef.current = state.turnCount;
      autoSave(state, CONTENT_PACK_ID);
    }
  }, [state.turnCount, state.phase, state]);

  const getCoherenceReport = useCallback(() => {
    return calculateCoherence(state.character, contentRef.current);
  }, [state.character]);

  return { state, dispatch, getCoherenceReport };
}
