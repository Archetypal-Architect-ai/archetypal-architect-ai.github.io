import React from 'react';
import type { CharacterState } from '../../engine/types';

interface ResourceBarProps {
  label: string;
  current: number;
  max: number;
  color: string;
}

function ResourceBar({ label, current, max, color }: ResourceBarProps) {
  const pct = max > 0 ? Math.round((current / max) * 100) : 0;
  return (
    <div className="mb-1">
      <div className="flex justify-between text-xs text-gray-400 mb-0.5">
        <span>{label}</span>
        <span>{current}/{max}</span>
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

interface ResourcePanelProps {
  character: CharacterState;
}

export default function ResourcePanel({ character }: ResourcePanelProps) {
  const { resources, optionalResources } = character;
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-3">
      <h3 className="text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">Resources</h3>
      <ResourceBar label="Vitality" current={resources.vitality} max={resources.maxVitality} color="#ef4444" />
      <ResourceBar label="Essence" current={resources.essence} max={resources.maxEssence} color="#8b5cf6" />
      <ResourceBar label="Focus" current={resources.focus} max={resources.maxFocus} color="#3b82f6" />
      <ResourceBar label="Stability" current={resources.stability} max={resources.maxStability} color="#10b981" />
      <div className="flex gap-3 mt-2 text-xs text-gray-400">
        <span>Momentum: <span className="text-yellow-400">{resources.momentum}</span></span>
        <span>Rep: <span className="text-cyan-400">{resources.reputation}</span></span>
      </div>
      {optionalResources.corruption !== undefined && optionalResources.corruption > 0 && (
        <div className="mt-1 text-xs">
          <span className="text-purple-400">Corruption: {optionalResources.corruption}</span>
        </div>
      )}
      {optionalResources.sanctity !== undefined && optionalResources.sanctity > 0 && (
        <div className="mt-1 text-xs">
          <span className="text-yellow-300">Sanctity: {optionalResources.sanctity}</span>
        </div>
      )}
      {optionalResources.dread !== undefined && optionalResources.dread > 0 && (
        <div className="mt-1 text-xs">
          <span className="text-red-400">Dread: {optionalResources.dread}</span>
        </div>
      )}
    </div>
  );
}
