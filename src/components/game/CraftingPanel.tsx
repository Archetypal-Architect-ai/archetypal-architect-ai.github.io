import React, { useState } from 'react';
import type { CharacterState, ContentPack, GameAction, WorldState } from '../../engine/types';
import { checkCondition } from '../../engine/world';

interface CraftingPanelProps {
  character: CharacterState;
  world: WorldState;
  content: ContentPack;
  dispatch: React.Dispatch<GameAction>;
}

export default function CraftingPanel({ character, world, content, dispatch }: CraftingPanelProps) {
  const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null);

  const availableRecipes = content.recipes.filter(r =>
    r.conditions.every(c => checkCondition(c, character, world, content))
  );

  const canAfford = (recipeId: string) => {
    const recipe = content.recipes.find(r => r.id === recipeId);
    if (!recipe) return false;
    return recipe.inputs.every(input => {
      const slot = character.inventory.find(s => s.itemId === input.itemId);
      return slot && slot.quantity >= input.quantity;
    });
  };

  const getItemName = (itemId: string) => content.items.find(i => i.id === itemId)?.name ?? itemId;

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-3">
      <h3 className="text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">Crafting</h3>

      {availableRecipes.length === 0 ? (
        <p className="text-xs text-gray-600">No recipes available.</p>
      ) : (
        <div className="space-y-2">
          {availableRecipes.map(recipe => {
            const affordable = canAfford(recipe.id);
            const isSelected = selectedRecipe === recipe.id;
            const outputItem = content.items.find(i => i.id === recipe.baseOutput);

            return (
              <div key={recipe.id}>
                <button
                  onClick={() => setSelectedRecipe(isSelected ? null : recipe.id)}
                  className={`w-full text-left p-2 rounded border transition-all ${
                    isSelected
                      ? 'bg-gray-800 border-amber-700/50'
                      : 'bg-gray-800/30 border-gray-800 hover:bg-gray-800/50'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-amber-300">{recipe.name}</span>
                    {!affordable && <span className="text-[10px] text-red-400">Missing materials</span>}
                  </div>
                </button>

                {isSelected && (
                  <div className="ml-2 mt-1 mb-1 p-2 bg-gray-800/50 rounded text-xs">
                    <p className="text-gray-400 mb-2">{recipe.description}</p>

                    <div className="mb-2">
                      <span className="text-gray-500">Requires:</span>
                      {recipe.inputs.map(input => {
                        const has = character.inventory.find(s => s.itemId === input.itemId)?.quantity ?? 0;
                        return (
                          <div key={input.itemId} className="ml-2 flex justify-between">
                            <span className={has >= input.quantity ? 'text-green-400' : 'text-red-400'}>
                              {getItemName(input.itemId)}
                            </span>
                            <span className="text-gray-500">{has}/{input.quantity}</span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mb-2">
                      <span className="text-gray-500">Creates:</span>
                      <span className="text-amber-300 ml-1">{outputItem?.name ?? recipe.baseOutput}</span>
                    </div>

                    {recipe.modifiers.length > 0 && (
                      <div className="mb-2">
                        <span className="text-gray-500">Path bonuses:</span>
                        {recipe.modifiers.map((mod, i) => (
                          <div key={i} className="ml-2 text-purple-300">{mod.description}</div>
                        ))}
                      </div>
                    )}

                    <button
                      onClick={() => affordable && dispatch({ type: 'CRAFT_ITEM', payload: { recipeId: recipe.id } })}
                      disabled={!affordable}
                      className={`mt-1 px-3 py-1 rounded border transition-all ${
                        affordable
                          ? 'bg-amber-900/30 border-amber-700 text-amber-300 hover:bg-amber-900/50 cursor-pointer'
                          : 'bg-gray-900 border-gray-800 text-gray-600 cursor-not-allowed'
                      }`}
                    >
                      Craft
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
