import React, { useState, useEffect } from 'react';

function SolarImpactDashboard() {
  const [spaceWeatherData, setSpaceWeatherData] = useState({
    solarWindSpeed: 450,
    kpIndex: 3,
    solarFlareActivity: 'Low',
    radiationLevel: 'Normal',
    auroraActivity: 'Moderate'
  });

  const [isLiveData, setIsLiveData] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (isLiveData) {
        setSpaceWeatherData(prev => ({
          solarWindSpeed: Math.max(300, Math.min(800, prev.solarWindSpeed + (Math.random() - 0.5) * 50)),
          kpIndex: Math.max(0, Math.min(9, prev.kpIndex + (Math.random() - 0.5) * 2)),
          solarFlareActivity: ['Low', 'Moderate', 'High'][Math.floor(Math.random() * 3)],
          radiationLevel: ['Normal', 'Elevated', 'High'][Math.floor(Math.random() * 3)],
          auroraActivity: ['Low', 'Moderate', 'High'][Math.floor(Math.random() * 3)]
        }));
        setLastUpdated(new Date());
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isLiveData]);

  const getImpactLevel = (metric, value) => {
    switch (metric) {
      case 'solarWindSpeed':
        if (value < 400) return { level: 'Low', color: 'text-green-400', bg: 'bg-green-500' };
        if (value < 600) return { level: 'Moderate', color: 'text-yellow-400', bg: 'bg-yellow-500' };
        return { level: 'High', color: 'text-red-400', bg: 'bg-red-500' };
      case 'kpIndex':
        if (value < 3) return { level: 'Quiet', color: 'text-green-400', bg: 'bg-green-500' };
        if (value < 5) return { level: 'Minor Storm', color: 'text-yellow-400', bg: 'bg-yellow-500' };
        if (value < 7) return { level: 'Moderate Storm', color: 'text-orange-400', bg: 'bg-orange-500' };
        return { level: 'Severe Storm', color: 'text-red-400', bg: 'red-500' };
      default:
        return { level: 'Normal', color: 'text-blue-400', bg: 'bg-blue-500' };
    }
  };

  const generateSpaceWeatherReport = () => {
    const { solarWindSpeed, kpIndex, solarFlareActivity } = spaceWeatherData;
    const windLevel = solarWindSpeed < 400 ? 'gentle' : solarWindSpeed < 600 ? 'moderate' : 'strong';
    const stormLevel = kpIndex < 3 ? 'calm' : kpIndex < 5 ? 'minor disturbances' : 'active storm conditions';
    
    return `Good ${new Date().getHours() < 12 ? 'morning' : 'afternoon'}, Earthlings! A ${windLevel} solar wind of ${Math.round(solarWindSpeed)} km/s today — pilots, expect ${stormLevel}. Aurora activity is ${spaceWeatherData.auroraActivity.toLowerCase()}.`;
  };

  const impactCards = [
    {
      icon: '🚜',
      title: 'GPS Instability',
      description: 'Farmer navigation systems',
      impact: getImpactLevel('solarWindSpeed', spaceWeatherData.solarWindSpeed),
      details: spaceWeatherData.solarWindSpeed > 500 ? 'GPS accuracy reduced by 10-20 meters' : 'GPS functioning normally'
    },
    {
      icon: '✈️',
      title: 'Radio Disruption',
      description: 'Aviation communications',
      impact: getImpactLevel('kpIndex', spaceWeatherData.kpIndex),
      details: spaceWeatherData.kpIndex > 4 ? 'HF radio blackouts possible' : 'Radio communications clear'
    },
    {
      icon: '⚡',
      title: 'Power Grid',
      description: 'Electrical infrastructure',
      impact: getImpactLevel('kpIndex', spaceWeatherData.kpIndex),
      details: spaceWeatherData.kpIndex > 6 ? 'Power grid fluctuations expected' : 'Grid stability normal'
    },
    {
      icon: '📡',
      title: 'Satellite Drag',
      description: 'Orbital mechanics',
      impact: getImpactLevel('solarWindSpeed', spaceWeatherData.solarWindSpeed),
      details: spaceWeatherData.solarWindSpeed > 600 ? 'Increased atmospheric drag' : 'Normal orbital conditions'
    }
  ];

  return (
    <div className="glass-card rounded-2xl shadow-xl p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white space-glow">🌞 Solar Impact Dashboard</h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsLiveData(!isLiveData)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
              isLiveData 
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white pulse-glow' 
                : 'bg-gradient-to-r from-gray-500 to-gray-600 text-gray-300'
            }`}
          >
            {isLiveData ? '🟢 Live Data' : '⏸️ Simulation'}
          </button>
          <span className="text-sm text-gray-400">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* Real-time Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="glass-card rounded-xl p-4 text-center">
          <div className="text-3xl mb-2">💨</div>
          <h3 className="font-bold text-white space-glow mb-1">Solar Wind Speed</h3>
          <p className="text-2xl font-bold text-cyan-400 space-glow">
            {Math.round(spaceWeatherData.solarWindSpeed)} km/s
          </p>
          <p className="text-sm text-gray-300 mt-1">
            {getImpactLevel('solarWindSpeed', spaceWeatherData.solarWindSpeed).level}
          </p>
        </div>

        <div className="glass-card rounded-xl p-4 text-center">
          <div className="text-3xl mb-2">🧲</div>
          <h3 className="font-bold text-white space-glow mb-1">Kp Index</h3>
          <p className="text-2xl font-bold text-purple-400 space-glow">
            {spaceWeatherData.kpIndex.toFixed(1)}
          </p>
          <p className="text-sm text-gray-300 mt-1">
            {getImpactLevel('kpIndex', spaceWeatherData.kpIndex).level}
          </p>
        </div>

        <div className="glass-card rounded-xl p-4 text-center">
          <div className="text-3xl mb-2">☀️</div>
          <h3 className="font-bold text-white space-glow mb-1">Solar Flares</h3>
          <p className="text-2xl font-bold text-orange-400 space-glow">
            {spaceWeatherData.solarFlareActivity}
          </p>
          <p className="text-sm text-gray-300 mt-1">
            {spaceWeatherData.radiationLevel} Radiation
          </p>
        </div>

        <div className="glass-card rounded-xl p-4 text-center">
          <div className="text-3xl mb-2">🌌</div>
          <h3 className="font-bold text-white space-glow mb-1">Aurora Activity</h3>
          <p className="text-2xl font-bold text-pink-400 space-glow">
            {spaceWeatherData.auroraActivity}
          </p>
          <p className="text-sm text-gray-300 mt-1">
            Visible at high latitudes
          </p>
        </div>
      </div>

      {/* AI-Generated Space Weather Report */}
      <div className="glass-card rounded-xl p-6 mb-8">
        <div className="flex items-center mb-4">
          <div className="text-3xl mr-3">🤖</div>
          <h3 className="text-xl font-bold text-white space-glow">AI Space Weather Report</h3>
        </div>
        <p className="text-gray-300 space-glow leading-relaxed">
          {generateSpaceWeatherReport()}
        </p>
      </div>

      {/* Impact Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {impactCards.map((card, index) => (
          <div key={index} className="glass-card rounded-xl p-4 hover:scale-105 transition-transform duration-300">
            <div className="text-center">
              <div className="text-4xl mb-2">{card.icon}</div>
              <h4 className="font-bold text-white space-glow mb-1">{card.title}</h4>
              <p className="text-sm text-gray-400 mb-3">{card.description}</p>
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${card.impact.bg} text-white mb-2`}>
                {card.impact.level}
              </div>
              <p className="text-xs text-gray-300 space-glow">{card.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SolarImpactDashboard;
