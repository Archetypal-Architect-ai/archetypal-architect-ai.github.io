import React, { useState } from 'react';
import type { CharacterState, ContentPack, GameAction } from '../../engine/types';

interface InventoryPanelProps {
  character: CharacterState;
  content: ContentPack;
  dispatch: React.Dispatch<GameAction>;
}

export default function InventoryPanel({ character, content, dispatch }: InventoryPanelProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const getItem = (itemId: string) => content.items.find(i => i.id === itemId);

  const categoryColors: Record<string, string> = {
    relic: 'text-amber-300 border-amber-700/50',
    implement: 'text-blue-300 border-blue-700/50',
    vestment: 'text-green-300 border-green-700/50',
    consumable: 'text-red-300 border-red-700/50',
    material: 'text-gray-300 border-gray-600/50',
  };

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-3">
      <h3 className="text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">Inventory</h3>

      {character.inventory.length === 0 ? (
        <p className="text-xs text-gray-600">Empty</p>
      ) : (
        <div className="space-y-1">
          {character.inventory.map(slot => {
            const item = getItem(slot.itemId);
            if (!item) return null;
            const colorClass = categoryColors[item.category] ?? 'text-gray-300 border-gray-600';
            const isSelected = selected === slot.itemId;

            return (
              <div key={slot.itemId}>
                <button
                  onClick={() => setSelected(isSelected ? null : slot.itemId)}
                  className={`w-full text-left flex justify-between items-center px-2 py-1 rounded border transition-all ${
                    isSelected ? `bg-gray-800 ${colorClass}` : `bg-gray-800/30 border-gray-800 hover:bg-gray-800/60`
                  }`}
                >
                  <span className={`text-xs ${colorClass.split(' ')[0]}`}>
                    {item.name}
                    {slot.quantity > 1 && <span className="text-gray-500 ml-1">x{slot.quantity}</span>}
                  </span>
                  <span className="text-[10px] text-gray-600 capitalize">{item.category}</span>
                </button>

                {isSelected && (
                  <div className="ml-2 mt-1 mb-2 p-2 bg-gray-800/50 rounded text-xs">
                    <p className="text-gray-400 mb-1">{item.description}</p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {item.tags.map(tag => (
                        <span key={tag} className="px-1 py-0.5 bg-gray-700 rounded text-[10px] text-gray-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      {item.category === 'consumable' && (
                        <button
                          onClick={() => dispatch({ type: 'USE_ITEM', payload: { itemId: slot.itemId } })}
                          className="px-2 py-1 bg-red-900/30 border border-red-700/50 rounded text-red-300 hover:bg-red-900/50 transition-all"
                        >
                          Use
                        </button>
                      )}
                      {item.equipSlot && (
                        <button
                          onClick={() => dispatch({ type: 'EQUIP_ITEM', payload: { itemId: slot.itemId, slot: item.equipSlot! } })}
                          className="px-2 py-1 bg-blue-900/30 border border-blue-700/50 rounded text-blue-300 hover:bg-blue-900/50 transition-all"
                        >
                          Equip
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Equipped Items */}
      {Object.entries(character.equipped).some(([, v]) => v) && (
        <div className="mt-3">
          <span className="text-xs text-gray-500 uppercase tracking-wider">Equipped</span>
          <div className="mt-1 space-y-1">
            {Object.entries(character.equipped).map(([slot, itemId]) => {
              if (!itemId) return null;
              const item = getItem(itemId);
              return (
                <div key={slot} className="flex justify-between items-center text-xs">
                  <span className="text-gray-500 capitalize">{slot}:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-amber-300">{item?.name ?? itemId}</span>
                    <button
                      onClick={() => dispatch({ type: 'UNEQUIP_ITEM', payload: { slot } })}
                      className="text-[10px] text-gray-600 hover:text-red-400"
                    >
                      [x]
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
