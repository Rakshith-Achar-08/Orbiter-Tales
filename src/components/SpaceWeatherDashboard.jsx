import React, { useState, useEffect } from 'react';

function SpaceWeatherDashboard() {
  const [weatherData, setWeatherData] = useState({
    solarActivity: 'Calm',
    auroraActivity: 'Low',
    radioBlackouts: 'None',
    geomagneticStorm: 'Quiet',
    sunspotCount: 45,
    solarWindSpeed: 380
  });

  const [sunnyMood, setSunnyMood] = useState('😊');

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setWeatherData(prev => ({
        ...prev,
        sunspotCount: prev.sunspotCount + Math.floor(Math.random() * 3) - 1,
        solarWindSpeed: prev.solarWindSpeed + Math.floor(Math.random() * 20) - 10
      }));

      // Update Sunny's mood based on activity
      const activity = Math.random();
      if (activity > 0.8) {
        setSunnyMood('🌩️');
      } else if (activity > 0.6) {
        setSunnyMood('⚡');
      } else if (activity > 0.4) {
        setSunnyMood('😊');
      } else {
        setSunnyMood('😴');
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getActivityColor = (activity) => {
    switch (activity) {
      case 'Calm': return 'text-green-400';
      case 'Moderate': return 'text-yellow-400';
      case 'High': return 'text-orange-400';
      case 'Extreme': return 'text-red-400';
      default: return 'text-blue-400';
    }
  };

  const getActivityIcon = (activity) => {
    switch (activity) {
      case 'Calm': return '🌤️';
      case 'Moderate': return '⛅';
      case 'High': return '🌩️';
      case 'Extreme': return '⚡';
      default: return '🌞';
    }
  };

  return (
    <div className="glass-card rounded-2xl shadow-xl p-8">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white space-glow mb-4">
          🌞 Today's Space Weather
        </h2>
        <div className="flex items-center justify-center space-x-4">
          <span className="text-4xl">{sunnyMood}</span>
          <div>
            <p className="text-xl text-white space-glow">Sunny's Mood</p>
            <p className="text-sm text-gray-300">
              {sunnyMood === '😴' && 'Taking a nap...'}
              {sunnyMood === '😊' && 'Feeling calm and peaceful!'}
              {sunnyMood === '⚡' && 'Getting a bit energetic!'}
              {sunnyMood === '🌩️' && 'Having a stormy day!'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Solar Activity */}
        <div className="glass-card rounded-xl p-4 text-center">
          <div className="text-3xl mb-2">☀️</div>
          <h3 className="font-bold text-white space-glow mb-1">Solar Activity</h3>
          <p className={`text-lg font-semibold ${getActivityColor(weatherData.solarActivity)}`}>
            {getActivityIcon(weatherData.solarActivity)} {weatherData.solarActivity}
          </p>
        </div>

        {/* Aurora Activity */}
        <div className="glass-card rounded-xl p-4 text-center">
          <div className="text-3xl mb-2">🌌</div>
          <h3 className="font-bold text-white space-glow mb-1">Aurora Activity</h3>
          <p className={`text-lg font-semibold ${getActivityColor(weatherData.auroraActivity)}`}>
            🌌 {weatherData.auroraActivity}
          </p>
        </div>

        {/* Radio Blackouts */}
        <div className="glass-card rounded-xl p-4 text-center">
          <div className="text-3xl mb-2">📡</div>
          <h3 className="font-bold text-white space-glow mb-1">Radio Blackouts</h3>
          <p className={`text-lg font-semibold ${getActivityColor(weatherData.radioBlackouts)}`}>
            📡 {weatherData.radioBlackouts}
          </p>
        </div>

        {/* Geomagnetic Storm */}
        <div className="glass-card rounded-xl p-4 text-center">
          <div className="text-3xl mb-2">🧲</div>
          <h3 className="font-bold text-white space-glow mb-1">Geomagnetic Storm</h3>
          <p className={`text-lg font-semibold ${getActivityColor(weatherData.geomagneticStorm)}`}>
            🧲 {weatherData.geomagneticStorm}
          </p>
        </div>

        {/* Sunspot Count */}
        <div className="glass-card rounded-xl p-4 text-center">
          <div className="text-3xl mb-2">🔍</div>
          <h3 className="font-bold text-white space-glow mb-1">Sunspot Count</h3>
          <p className="text-lg font-semibold text-blue-400">
            🔍 {weatherData.sunspotCount}
          </p>
        </div>

        {/* Solar Wind Speed */}
        <div className="glass-card rounded-xl p-4 text-center">
          <div className="text-3xl mb-2">💨</div>
          <h3 className="font-bold text-white space-glow mb-1">Solar Wind Speed</h3>
          <p className="text-lg font-semibold text-purple-400">
            💨 {weatherData.solarWindSpeed} km/s
          </p>
        </div>
      </div>

      {/* Impact on Earth */}
      <div className="glass-card rounded-xl p-6">
        <h3 className="text-xl font-bold text-white space-glow mb-4 text-center">
          🌍 Impact on Earth Today
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl mb-2">🚜</div>
            <p className="text-gray-300 space-glow">Farmers: GPS working normally</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">✈️</div>
            <p className="text-gray-300 space-glow">Pilots: Radio signals clear</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">👩‍🚀</div>
            <p className="text-gray-300 space-glow">Astronauts: Safe in ISS</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">⚡</div>
            <p className="text-gray-300 space-glow">Power Grid: Stable</p>
          </div>
        </div>
      </div>

      <div className="text-center mt-6">
        <p className="text-sm text-gray-400">
          Data updates every 3 seconds • Powered by NASA & NOAA
        </p>
      </div>
    </div>
  );
}

export default SpaceWeatherDashboard;
