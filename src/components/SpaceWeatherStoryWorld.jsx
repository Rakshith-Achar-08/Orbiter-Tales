import React, { useState, useEffect } from 'react';

function SpaceWeatherStoryWorld() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isNarrationOn, setIsNarrationOn] = useState(true);
  const [currentStory, setCurrentStory] = useState('');
  const [ambientSound, setAmbientSound] = useState(false);

  const characters = [
    {
      id: 'avi',
      name: 'Avi the Pilot',
      icon: '✈️',
      role: 'Commercial Airline Pilot',
      location: 'Over the Atlantic',
      currentSituation: 'Navigating through solar storm',
      story: 'Avi is flying from New York to London when a solar storm disrupts radio communications. She must rely on backup systems and coordinate with air traffic control.',
      reactions: {
        calm: 'Radio communications are clear, smooth flight ahead.',
        moderate: 'Minor radio interference, switching to backup frequency.',
        severe: 'Heavy radio static, using emergency protocols and visual navigation.'
      }
    },
    {
      id: 'rhea',
      name: 'Rhea the Farmer',
      icon: '🚜',
      role: 'Precision Agriculture Farmer',
      location: 'Iowa, USA',
      currentSituation: 'GPS-guided planting season',
      story: 'Rhea uses GPS-guided tractors for precision planting. A solar storm affects GPS accuracy, forcing her to adapt her farming operations.',
      reactions: {
        calm: 'GPS accuracy is perfect, planting continues smoothly.',
        moderate: 'GPS accuracy reduced by 5 meters, adjusting planting patterns.',
        severe: 'GPS unreliable, switching to manual guidance and backup systems.'
      }
    },
    {
      id: 'luna',
      name: 'Luna the Astronaut',
      icon: '👩‍🚀',
      role: 'ISS Mission Specialist',
      location: 'International Space Station',
      currentSituation: 'Spacewalk preparation',
      story: 'Luna is preparing for a spacewalk to repair the station\'s solar panels when increased solar radiation forces mission planners to delay the EVA.',
      reactions: {
        calm: 'Radiation levels normal, spacewalk scheduled as planned.',
        moderate: 'Elevated radiation, spacewalk delayed by 6 hours.',
        severe: 'High radiation levels, spacewalk cancelled, seeking shelter in station core.'
      }
    },
    {
      id: 'leo',
      name: 'Leo the Grid Engineer',
      icon: '⚡',
      role: 'Power Grid Operations Manager',
      location: 'Control Center, Toronto',
      currentSituation: 'Grid stability monitoring',
      story: 'Leo monitors the electrical grid during a geomagnetic storm. He must balance power loads and prevent blackouts across the region.',
      reactions: {
        calm: 'Grid operating normally, all systems stable.',
        moderate: 'Minor fluctuations detected, implementing load balancing protocols.',
        severe: 'Major grid instability, emergency procedures activated, coordinating with regional utilities.'
      }
    }
  ];

  const spaceWeatherConditions = [
    { level: 'calm', label: 'Quiet', color: 'text-green-400', description: 'Normal space weather conditions' },
    { level: 'moderate', label: 'Active', color: 'text-yellow-400', description: 'Increased solar activity' },
    { level: 'severe', label: 'Storm', color: 'text-red-400', description: 'Severe space weather event' }
  ];

  const [currentCondition, setCurrentCondition] = useState('moderate');

  useEffect(() => {
    // Simulate changing space weather conditions
    const interval = setInterval(() => {
      const conditions = ['calm', 'moderate', 'severe'];
      const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
      setCurrentCondition(randomCondition);
    }, 15000); // Change every 15 seconds

    return () => clearInterval(interval);
  }, []);

  const currentConditionData = spaceWeatherConditions.find(c => c.level === currentCondition);

  const generateCharacterStory = (character) => {
    const reaction = character.reactions[currentCondition];
    return `${character.story} ${reaction}`;
  };

  const speakText = (text) => {
    if (isNarrationOn && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      speechSynthesis.speak(utterance);
    }
  };

  const playAmbientSound = () => {
    if (ambientSound) {
      // In a real implementation, you would play actual audio files
      console.log('Playing ambient space sounds...');
    }
  };

  useEffect(() => {
    playAmbientSound();
  }, [ambientSound]);

  return (
    <div className="glass-card rounded-2xl shadow-xl p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-white space-glow">🌍 Space Weather StoryWorld</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => setIsNarrationOn(!isNarrationOn)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
              isNarrationOn 
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white pulse-glow' 
                : 'bg-gradient-to-r from-gray-500 to-gray-600 text-gray-300'
            }`}
          >
            {isNarrationOn ? '🔊 Narration On' : '🔇 Narration Off'}
          </button>
          <button
            onClick={() => setAmbientSound(!ambientSound)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
              ambientSound 
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white pulse-glow' 
                : 'bg-gradient-to-r from-gray-500 to-gray-600 text-gray-300'
            }`}
          >
            {ambientSound ? '🎵 Sound On' : '🔇 Sound Off'}
          </button>
        </div>
      </div>

      {/* Current Space Weather Status */}
      <div className="glass-card rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white space-glow mb-2">Current Space Weather</h3>
            <p className={`text-lg font-semibold ${currentConditionData.color}`}>
              {currentConditionData.label} Conditions
            </p>
            <p className="text-gray-300 text-sm">{currentConditionData.description}</p>
          </div>
          <div className="text-6xl animate-pulse">
            {currentCondition === 'calm' && '☀️'}
            {currentCondition === 'moderate' && '⚡'}
            {currentCondition === 'severe' && '🌩️'}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Character Selection */}
        <div>
          <h3 className="text-xl font-bold text-white space-glow mb-6">Choose Your Perspective</h3>
          <div className="space-y-4">
            {characters.map((character) => (
              <button
                key={character.id}
                onClick={() => {
                  setSelectedCharacter(character);
                  const story = generateCharacterStory(character);
                  setCurrentStory(story);
                  speakText(story);
                }}
                className={`w-full p-4 rounded-xl transition-all duration-300 ${
                  selectedCharacter?.id === character.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white transform scale-105 pulse-glow'
                    : 'glass-card hover:bg-white hover:bg-opacity-10 text-gray-300'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{character.icon}</div>
                  <div className="text-left">
                    <h4 className="font-bold text-lg">{character.name}</h4>
                    <p className="text-sm opacity-80">{character.role}</p>
                    <p className="text-xs opacity-60">{character.location}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Character Story */}
        <div>
          <h3 className="text-xl font-bold text-white space-glow mb-6">Character Story</h3>
          {selectedCharacter ? (
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="text-4xl">{selectedCharacter.icon}</div>
                <div>
                  <h4 className="text-xl font-bold text-white space-glow">{selectedCharacter.name}</h4>
                  <p className="text-gray-300">{selectedCharacter.role}</p>
                  <p className="text-sm text-gray-400">{selectedCharacter.location}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <h5 className="font-semibold text-yellow-300 mb-2">Current Situation:</h5>
                <p className="text-gray-300 text-sm">{selectedCharacter.currentSituation}</p>
              </div>

              <div className="mb-4">
                <h5 className="font-semibold text-blue-300 mb-2">Story:</h5>
                <p className="text-gray-300 leading-relaxed">{currentStory}</p>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    const story = generateCharacterStory(selectedCharacter);
                    setCurrentStory(story);
                    speakText(story);
                  }}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  🔄 Update Story
                </button>
                <button
                  onClick={() => speakText(currentStory)}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  🔊 Read Aloud
                </button>
              </div>
            </div>
          ) : (
            <div className="glass-card rounded-xl p-8 text-center">
              <div className="text-6xl mb-4">👥</div>
              <h4 className="text-xl font-bold text-white space-glow mb-2">Select a Character</h4>
              <p className="text-gray-300">
                Choose a character to experience how space weather affects their daily life and work.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* NASA Mission Integration */}
      <div className="mt-8 glass-card rounded-xl p-6">
        <h3 className="text-lg font-bold text-white space-glow mb-4">🚀 NASA Mission Integration</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-3">🛰️</div>
            <h4 className="font-bold text-white mb-2">International Space Station</h4>
            <p className="text-sm text-gray-300">
              Real-time radiation monitoring and crew safety protocols during solar events.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🌙</div>
            <h4 className="font-bold text-white mb-2">Artemis Program</h4>
            <p className="text-sm text-gray-300">
              Lunar mission planning with space weather considerations for deep space travel.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">☀️</div>
            <h4 className="font-bold text-white mb-2">Parker Solar Probe</h4>
            <p className="text-sm text-gray-300">
              Direct solar observations providing real-time data for space weather predictions.
            </p>
          </div>
        </div>
      </div>

      {/* Ambient Sound Controls */}
      {ambientSound && (
        <div className="mt-6 glass-card rounded-xl p-4">
          <div className="flex items-center space-x-4">
            <div className="text-2xl">🎵</div>
            <div>
              <h4 className="font-semibold text-white">Ambient Space Sounds</h4>
              <p className="text-sm text-gray-300">Playing: Solar wind hum, radio static, cosmic background</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SpaceWeatherStoryWorld;
