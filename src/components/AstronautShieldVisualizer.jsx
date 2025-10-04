import React, { useState, useEffect } from 'react';

function AstronautShieldVisualizer() {
  const [selectedMission, setSelectedMission] = useState('ISS');
  const [stormIntensity, setStormIntensity] = useState(3);
  const [exposureLevel, setExposureLevel] = useState('Low');
  const [shieldingLevel, setShieldingLevel] = useState('Standard');

  const missions = [
    {
      id: 'ISS',
      name: 'International Space Station',
      icon: '🛰️',
      baseRadiation: 0.5,
      shielding: 'Standard',
      description: 'Protected by Earth\'s magnetosphere'
    },
    {
      id: 'Moon',
      name: 'Lunar Mission',
      icon: '🌙',
      baseRadiation: 1.2,
      shielding: 'Enhanced',
      description: 'Beyond Earth\'s magnetic field'
    },
    {
      id: 'Mars',
      name: 'Mars Mission',
      icon: '🔴',
      baseRadiation: 0.8,
      shielding: 'Advanced',
      description: 'Deep space radiation exposure'
    }
  ];

  const stormLevels = [
    { value: 1, label: 'Quiet', color: 'text-green-400', description: 'Normal space weather' },
    { value: 3, label: 'Minor Storm', color: 'text-yellow-400', description: 'Increased solar activity' },
    { value: 5, label: 'Moderate Storm', color: 'text-orange-400', description: 'Significant radiation increase' },
    { value: 7, label: 'Severe Storm', color: 'text-red-400', description: 'Dangerous radiation levels' },
    { value: 9, label: 'Extreme Storm', color: 'text-purple-400', description: 'Critical radiation exposure' }
  ];

  const shieldingTypes = [
    { id: 'Standard', name: 'Standard Shielding', effectiveness: 0.3, description: 'Basic spacecraft protection' },
    { id: 'Enhanced', name: 'Enhanced Shielding', effectiveness: 0.6, description: 'Improved radiation protection' },
    { id: 'Advanced', name: 'Advanced Shielding', effectiveness: 0.8, description: 'Heavy-duty radiation shielding' },
    { id: 'Emergency', name: 'Emergency Shelter', effectiveness: 0.95, description: 'Maximum protection available' }
  ];

  useEffect(() => {
    const selectedMissionData = missions.find(m => m.id === selectedMission);
    const stormMultiplier = stormIntensity / 3; // Normalize to 1.0 for storm level 3
    const baseExposure = selectedMissionData.baseRadiation * stormMultiplier;
    const shieldingEffect = shieldingTypes.find(s => s.id === shieldingLevel).effectiveness;
    const finalExposure = baseExposure * (1 - shieldingEffect);

    if (finalExposure < 0.5) setExposureLevel('Low');
    else if (finalExposure < 1.0) setExposureLevel('Moderate');
    else if (finalExposure < 2.0) setExposureLevel('High');
    else setExposureLevel('Critical');
  }, [selectedMission, stormIntensity, shieldingLevel]);

  const getExposureColor = (level) => {
    switch (level) {
      case 'Low': return 'text-green-400';
      case 'Moderate': return 'text-yellow-400';
      case 'High': return 'text-orange-400';
      case 'Critical': return 'text-red-400';
      default: return 'text-blue-400';
    }
  };

  const getExposureIcon = (level) => {
    switch (level) {
      case 'Low': return '✅';
      case 'Moderate': return '⚠️';
      case 'High': return '🚨';
      case 'Critical': return '☢️';
      default: return '📊';
    }
  };

  const selectedMissionData = missions.find(m => m.id === selectedMission);
  const currentStorm = stormLevels.find(s => s.value === stormIntensity);

  return (
    <div className="glass-card rounded-2xl shadow-xl p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white space-glow mb-4">
          🛰️ Astronaut Shield Visualizer
        </h2>
        <p className="text-gray-300 space-glow">
          Simulate radiation exposure for different space missions
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Mission Selection */}
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-white space-glow mb-4">Select Mission</h3>
            <div className="grid gap-3">
              {missions.map((mission) => (
                <button
                  key={mission.id}
                  onClick={() => setSelectedMission(mission.id)}
                  className={`p-4 rounded-xl transition-all duration-300 ${
                    selectedMission === mission.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white transform scale-105 pulse-glow'
                      : 'glass-card hover:bg-white hover:bg-opacity-10 text-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{mission.icon}</span>
                    <div className="text-left">
                      <h4 className="font-semibold">{mission.name}</h4>
                      <p className="text-sm opacity-80">{mission.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Storm Intensity Slider */}
          <div>
            <h3 className="text-xl font-bold text-white space-glow mb-4">Solar Storm Intensity</h3>
            <div className="space-y-4">
              <input
                type="range"
                min="1"
                max="9"
                value={stormIntensity}
                onChange={(e) => setStormIntensity(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-gray-400">
                <span>Quiet (1)</span>
                <span>Extreme (9)</span>
              </div>
              <div className={`text-center p-3 rounded-lg ${currentStorm.color} bg-opacity-20`}>
                <p className="font-semibold">{currentStorm.label}</p>
                <p className="text-sm opacity-80">{currentStorm.description}</p>
              </div>
            </div>
          </div>

          {/* Shielding Selection */}
          <div>
            <h3 className="text-xl font-bold text-white space-glow mb-4">Shielding Type</h3>
            <div className="space-y-2">
              {shieldingTypes.map((shield) => (
                <button
                  key={shield.id}
                  onClick={() => setShieldingLevel(shield.id)}
                  className={`w-full p-3 rounded-lg text-left transition-all duration-300 ${
                    shieldingLevel === shield.id
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                      : 'glass-card hover:bg-white hover:bg-opacity-10 text-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold">{shield.name}</h4>
                      <p className="text-sm opacity-80">{shield.description}</p>
                    </div>
                    <span className="text-sm font-bold">
                      {Math.round(shield.effectiveness * 100)}% protection
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Visualization */}
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-white space-glow mb-4">Radiation Exposure Analysis</h3>
            
            {/* Current Mission Status */}
            <div className="glass-card rounded-xl p-6 mb-6">
              <div className="text-center">
                <div className="text-4xl mb-3">{selectedMissionData.icon}</div>
                <h4 className="text-xl font-bold text-white space-glow mb-2">{selectedMissionData.name}</h4>
                <p className="text-gray-300 mb-4">{selectedMissionData.description}</p>
                
                {/* Exposure Level Display */}
                <div className={`text-center p-4 rounded-lg ${getExposureColor(exposureLevel)} bg-opacity-20`}>
                  <div className="text-3xl mb-2">{getExposureIcon(exposureLevel)}</div>
                  <h5 className="text-xl font-bold">Exposure Level: {exposureLevel}</h5>
                  <p className="text-sm opacity-80 mt-2">
                    {exposureLevel === 'Low' && 'Safe for normal operations'}
                    {exposureLevel === 'Moderate' && 'Monitor closely, limit EVA time'}
                    {exposureLevel === 'High' && 'Seek shelter, avoid unnecessary exposure'}
                    {exposureLevel === 'Critical' && 'EMERGENCY: Seek maximum protection immediately'}
                  </p>
                </div>
              </div>
            </div>

            {/* Protection Effectiveness */}
            <div className="glass-card rounded-xl p-6">
              <h4 className="text-lg font-bold text-white space-glow mb-4">Protection Analysis</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Base Radiation:</span>
                  <span className="text-white font-semibold">{selectedMissionData.baseRadiation.toFixed(1)} mSv/day</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Storm Multiplier:</span>
                  <span className="text-white font-semibold">×{(stormIntensity / 3).toFixed(1)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Shielding Protection:</span>
                  <span className="text-green-400 font-semibold">
                    {Math.round(shieldingTypes.find(s => s.id === shieldingLevel).effectiveness * 100)}%
                  </span>
                </div>
                <div className="border-t border-gray-600 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold">Final Exposure:</span>
                    <span className={`font-bold ${getExposureColor(exposureLevel)}`}>
                      {exposureLevel}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Safety Recommendations */}
      <div className="mt-8 glass-card rounded-xl p-6">
        <h3 className="text-lg font-bold text-white space-glow mb-4">🛡️ Safety Recommendations</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-yellow-300 mb-2">Immediate Actions:</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              {exposureLevel === 'Critical' && <li>• Move to emergency radiation shelter</li>}
              {exposureLevel === 'High' && <li>• Limit time outside shielded areas</li>}
              {exposureLevel === 'Moderate' && <li>• Monitor radiation levels continuously</li>}
              {exposureLevel === 'Low' && <li>• Continue normal operations</li>}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-blue-300 mb-2">Mission Planning:</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Schedule EVAs during low radiation periods</li>
              <li>• Maintain emergency shelter accessibility</li>
              <li>• Monitor space weather forecasts</li>
              <li>• Coordinate with ground control</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AstronautShieldVisualizer;
