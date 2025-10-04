import React, { useState, useEffect } from 'react';

function GeoShieldEarthMap() {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [stormData, setStormData] = useState([]);
  const [viewMode, setViewMode] = useState('2D'); // 2D or 3D
  const [timeOfDay, setTimeOfDay] = useState('day');

  // Simulate real-time storm data
  useEffect(() => {
    const generateStormData = () => {
      const regions = [
        { id: 'north-america', name: 'North America', lat: 45, lon: -100, intensity: Math.random() * 5 },
        { id: 'europe', name: 'Europe', lat: 50, lon: 10, intensity: Math.random() * 4 },
        { id: 'asia', name: 'Asia', lat: 35, lon: 100, intensity: Math.random() * 6 },
        { id: 'australia', name: 'Australia', lat: -25, lon: 135, intensity: Math.random() * 3 },
        { id: 'south-america', name: 'South America', lat: -15, lon: -60, intensity: Math.random() * 4 },
        { id: 'africa', name: 'Africa', lat: 0, lon: 20, intensity: Math.random() * 3 },
        { id: 'arctic', name: 'Arctic', lat: 80, lon: 0, intensity: Math.random() * 7 },
        { id: 'antarctic', name: 'Antarctic', lat: -80, lon: 0, intensity: Math.random() * 6 }
      ];

      return regions.map(region => ({
        ...region,
        effects: generateRegionalEffects(region.intensity),
        lastUpdate: new Date()
      }));
    };

    const generateRegionalEffects = (intensity) => {
      const effects = [];
      if (intensity > 4) {
        effects.push('Power grid instability');
        effects.push('HF radio blackouts');
      }
      if (intensity > 3) {
        effects.push('GPS accuracy reduced');
        effects.push('Satellite communication issues');
      }
      if (intensity > 2) {
        effects.push('Aurora activity');
        effects.push('Minor radio interference');
      }
      return effects;
    };

    setStormData(generateStormData());

    const interval = setInterval(() => {
      setStormData(generateStormData());
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const getIntensityColor = (intensity) => {
    if (intensity < 1) return 'text-green-400 bg-green-500';
    if (intensity < 2) return 'text-green-300 bg-green-400';
    if (intensity < 3) return 'text-yellow-400 bg-yellow-500';
    if (intensity < 4) return 'text-orange-400 bg-orange-500';
    if (intensity < 5) return 'text-red-400 bg-red-500';
    return 'text-red-300 bg-red-600';
  };

  const getIntensityLabel = (intensity) => {
    if (intensity < 1) return 'Quiet';
    if (intensity < 2) return 'Minor';
    if (intensity < 3) return 'Moderate';
    if (intensity < 4) return 'Strong';
    if (intensity < 5) return 'Severe';
    return 'Extreme';
  };

  const predictNextAffectedRegion = () => {
    // Simple ML-like prediction based on current patterns
    const sortedRegions = [...stormData].sort((a, b) => b.intensity - a.intensity);
    const highIntensityRegions = sortedRegions.filter(r => r.intensity > 3);
    
    if (highIntensityRegions.length > 0) {
      const adjacentRegions = {
        'north-america': ['europe', 'asia'],
        'europe': ['north-america', 'asia', 'africa'],
        'asia': ['europe', 'australia'],
        'australia': ['asia', 'antarctic'],
        'arctic': ['north-america', 'europe', 'asia']
      };
      
      const currentHigh = highIntensityRegions[0];
      const possibleNext = adjacentRegions[currentHigh.id] || [];
      
      return possibleNext[Math.floor(Math.random() * possibleNext.length)] || 'Unknown';
    }
    
    return 'No significant activity predicted';
  };

  return (
    <div className="glass-card rounded-2xl shadow-xl p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white space-glow">🌍 GeoShield Earth Map</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => setViewMode(viewMode === '2D' ? '3D' : '2D')}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            {viewMode === '2D' ? '🌐 Switch to 3D' : '🗺️ Switch to 2D'}
          </button>
          <button
            onClick={() => setTimeOfDay(timeOfDay === 'day' ? 'night' : 'day')}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            {timeOfDay === 'day' ? '🌙 Night View' : '☀️ Day View'}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* World Map Visualization */}
        <div className="lg:col-span-2">
          <div className="glass-card rounded-xl p-6 h-96 relative overflow-hidden">
            <div className={`absolute inset-0 transition-all duration-1000 ${
              timeOfDay === 'day' 
                ? 'bg-gradient-to-b from-blue-200 to-blue-400' 
                : 'bg-gradient-to-b from-gray-900 to-black'
            }`}>
              {/* Simplified world map representation */}
              <div className="relative w-full h-full">
                {/* Continents as clickable regions */}
                {stormData.map((region, index) => (
                  <button
                    key={region.id}
                    onClick={() => setSelectedRegion(region)}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full transition-all duration-300 hover:scale-125 ${
                      getIntensityColor(region.intensity)
                    } ${selectedRegion?.id === region.id ? 'ring-4 ring-white' : ''}`}
                    style={{
                      left: `${50 + (region.lon / 180) * 40}%`,
                      top: `${50 - (region.lat / 90) * 40}%`
                    }}
                  >
                    <div className="text-center">
                      <div className="text-lg">{getIntensityLabel(region.intensity)[0]}</div>
                      <div className="text-xs">{Math.round(region.intensity * 10)}</div>
                    </div>
                  </button>
                ))}
                
                {/* Grid lines for reference */}
                <div className="absolute inset-0 opacity-20">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="absolute w-full h-px bg-white" style={{ top: `${i * 12.5}%` }} />
                  ))}
                  {[...Array(13)].map((_, i) => (
                    <div key={i} className="absolute h-full w-px bg-white" style={{ left: `${i * 8.33}%` }} />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Map Legend */}
            <div className="absolute bottom-4 left-4 glass-card rounded-lg p-3">
              <h4 className="text-sm font-bold text-white mb-2">Storm Intensity</h4>
              <div className="space-y-1">
                {['Quiet', 'Minor', 'Moderate', 'Strong', 'Severe', 'Extreme'].map((label, index) => (
                  <div key={label} className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${getIntensityColor(index + 0.5).split(' ')[1]}`} />
                    <span className="text-xs text-gray-300">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Regional Information */}
        <div className="space-y-6">
          {/* Selected Region Details */}
          {selectedRegion ? (
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-lg font-bold text-white space-glow mb-4">
                {selectedRegion.name} Region
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Intensity:</span>
                  <span className={`font-bold ${getIntensityColor(selectedRegion.intensity).split(' ')[0]}`}>
                    {getIntensityLabel(selectedRegion.intensity)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Value:</span>
                  <span className="text-white font-semibold">{selectedRegion.intensity.toFixed(1)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Last Update:</span>
                  <span className="text-white text-sm">{selectedRegion.lastUpdate.toLocaleTimeString()}</span>
                </div>
              </div>
              
              <div className="mt-4">
                <h4 className="font-semibold text-yellow-300 mb-2">Current Effects:</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  {selectedRegion.effects.map((effect, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2" />
                      {effect}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="glass-card rounded-xl p-6 text-center">
              <div className="text-4xl mb-3">🌍</div>
              <h3 className="text-lg font-bold text-white space-glow mb-2">Select a Region</h3>
              <p className="text-gray-300 text-sm">
                Click on any region to view detailed storm information and effects.
              </p>
            </div>
          )}

          {/* Global Storm Summary */}
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-lg font-bold text-white space-glow mb-4">Global Storm Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Active Storms:</span>
                <span className="text-white font-semibold">
                  {stormData.filter(r => r.intensity > 2).length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Highest Intensity:</span>
                <span className="text-red-400 font-semibold">
                  {Math.max(...stormData.map(r => r.intensity)).toFixed(1)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Average Global:</span>
                <span className="text-blue-400 font-semibold">
                  {(stormData.reduce((sum, r) => sum + r.intensity, 0) / stormData.length).toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Prediction */}
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-lg font-bold text-white space-glow mb-4">🧠 ML Prediction</h3>
            <div className="text-center">
              <div className="text-2xl mb-2">🔮</div>
              <p className="text-gray-300 text-sm mb-2">Next affected region:</p>
              <p className="text-yellow-300 font-semibold">{predictNextAffectedRegion()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Effects Examples */}
      <div className="mt-8 glass-card rounded-xl p-6">
        <h3 className="text-lg font-bold text-white space-glow mb-4">🌐 Real-time Global Effects</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl mb-2">⚡</div>
            <h4 className="font-semibold text-white mb-1">Power Grids</h4>
            <p className="text-sm text-gray-300">
              {stormData.filter(r => r.intensity > 4).length} regions experiencing instability
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">📡</div>
            <h4 className="font-semibold text-white mb-1">Radio Communications</h4>
            <p className="text-sm text-gray-300">
              {stormData.filter(r => r.intensity > 3).length} regions with blackouts
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🛰️</div>
            <h4 className="font-semibold text-white mb-1">Satellites</h4>
            <p className="text-sm text-gray-300">
              {stormData.filter(r => r.intensity > 2).length} regions with drag increase
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🌌</div>
            <h4 className="font-semibold text-white mb-1">Aurora Activity</h4>
            <p className="text-sm text-gray-300">
              {stormData.filter(r => r.intensity > 1).length} regions with visible auroras
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeoShieldEarthMap;
