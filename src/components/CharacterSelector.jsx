import React, { useState } from 'react';
import charactersData from '../data/characters.json';

function CharacterSelector({ onCharacterSelect, selectedCharacter }) {
  const [showDetails, setShowDetails] = useState(null);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">👥 Choose Your Space Weather Story</h2>
        <p className="text-lg text-gray-600 mb-6">
          Experience space weather from different perspectives! Each character faces unique challenges when solar storms hit Earth.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {charactersData.map((character) => (
          <div
            key={character.id}
            className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-105 cursor-pointer ${
              selectedCharacter?.id === character.id 
                ? 'ring-4 ring-blue-400 shadow-2xl' 
                : 'hover:shadow-xl'
            }`}
            onClick={() => onCharacterSelect(character)}
          >
            {/* Character Header */}
            <div className={`bg-gradient-to-r ${character.color} p-6 text-white`}>
              <div className="flex items-center space-x-4">
                <div className="text-4xl">{character.icon}</div>
                <div>
                  <h3 className="text-xl font-bold">{character.name}</h3>
                  <p className="text-sm opacity-90">{character.title}</p>
                  <p className="text-xs opacity-75">{character.location}</p>
                </div>
              </div>
            </div>

            {/* Character Details */}
            <div className="p-6">
              <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                {character.description}
              </p>

              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm mb-1">Space Weather Impact:</h4>
                  <p className="text-xs text-gray-600">{character.spaceWeatherImpact}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 text-sm mb-1">Main Challenges:</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {character.challenges.slice(0, 2).map((challenge, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-400 mr-1">•</span>
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDetails(showDetails === character.id ? null : character.id);
                }}
                className="mt-4 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium transition-colors"
              >
                {showDetails === character.id ? 'Hide Details' : 'Show Full Story'}
              </button>

              {showDetails === character.id && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 text-sm mb-2">Full Story:</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {character.story}
                  </p>
                  <div className="mt-3">
                    <h4 className="font-semibold text-gray-800 text-sm mb-1">All Challenges:</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {character.challenges.map((challenge, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-red-400 mr-1">•</span>
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Selection Indicator */}
            {selectedCharacter?.id === character.id && (
              <div className="bg-blue-500 text-white text-center py-2 text-sm font-semibold">
                ✓ Selected Character
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedCharacter && (
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-l-4 border-blue-400">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Ready to explore {selectedCharacter.name}'s story?
          </h3>
          <p className="text-gray-600 mb-4">
            You've selected <strong>{selectedCharacter.name}</strong>, a {selectedCharacter.profession.toLowerCase()}. 
            Experience how space weather affects their daily life and work!
          </p>
          <div className="flex space-x-4">
            <button
              onClick={() => onCharacterSelect(null)}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Change Character
            </button>
            <button
              onClick={() => {/* Navigate to story with selected character */}}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Start {selectedCharacter.name}'s Adventure
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CharacterSelector;
