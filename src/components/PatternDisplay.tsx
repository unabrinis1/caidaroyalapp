import React from 'react';
import { Pattern } from '../utils/patterns';

interface PatternDisplayProps {
  patterns: Pattern[];
}

export function PatternDisplay({ patterns }: PatternDisplayProps) {
  if (patterns.length === 0) return null;

  const getPatternColor = (name: string) => {
    switch (name) {
      case 'Trivilín':
        return 'bg-purple-100 text-purple-800';
      case 'Ronda':
        return 'bg-blue-100 text-blue-800';
      case 'Patrulla':
        return 'bg-green-100 text-green-800';
      case 'Registro':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPatternEmoji = (name: string) => {
    switch (name) {
      case 'Trivilín':
        return '🎯';
      case 'Ronda':
        return '🔄';
      case 'Patrulla':
        return '👮';
      case 'Registro':
        return '👑';
      default:
        return '🎴';
    }
  };

  return (
    <div className="mt-3">
      <h4 className="text-sm font-semibold text-gray-700 mb-2">Cantos Detectados:</h4>
      <div className="flex flex-wrap gap-2">
        {patterns.map((pattern, index) => (
          <div
            key={index}
            className={`px-3 py-1.5 rounded-full text-sm font-medium ${getPatternColor(pattern.name)}`}
            title={pattern.description}
          >
            {getPatternEmoji(pattern.name)} {pattern.name} (+{pattern.points} pts)
          </div>
        ))}
      </div>
    </div>
  );
}