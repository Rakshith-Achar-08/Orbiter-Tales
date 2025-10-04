import React, { useState, useEffect } from 'react';

function SpaceWeatherAlert() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alertLevel, setAlertLevel] = useState('normal');

  // Simulate real-time space weather data (in a real app, you'd connect to NASA APIs)
  useEffect(() => {
    const fetchSpaceWeatherData = () => {
      // Simulate different space weather conditions
      const conditions = [
        {
          level: 'normal',
          title: 'Normal Space Weather',
          description: 'Solar activity is at normal levels. No significant impacts expected.',
          color: 'from-green-400 to-emerald-500',
          icon: '🌤️',
          impacts: ['Clear satellite communications', 'Normal GPS accuracy', 'No aurora activity expected']
        },
        {
          level: 'minor',
          title: 'Minor Solar Storm',
          description: 'Minor solar activity detected. Some high-latitude impacts possible.',
          color: 'from-yellow-400 to-orange-500',
          icon: '🌦️',
          impacts: ['Possible aurora at high latitudes', 'Minor GPS accuracy issues', 'Slight radio interference']
        },
        {
          level: 'moderate',
          title: 'Moderate Solar Storm',
          description: 'Moderate solar storm in progress. Several impacts expected.',
          color: 'from-orange-400 to-red-500',
          icon: '⛈️',
          impacts: ['Aurora visible at mid-latitudes', 'GPS navigation degraded', 'Radio blackouts possible']
        },
        {
          level: 'severe',
          title: 'Severe Solar Storm',
          description: 'Severe solar storm active! Significant impacts expected worldwide.',
          color: 'from-red-500 to-red-700',
          icon: '🌪️',
          impacts: ['Aurora visible worldwide', 'GPS navigation severely degraded', 'Widespread radio blackouts', 'Power grid stress']
        }
      ];

      // Randomly select a condition for demo purposes
      const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
      setWeatherData(randomCondition);
      setAlertLevel(randomCondition.level);
      setLoading(false);
    };

    fetchSpaceWeatherData();
    
    // Update every 30 seconds to simulate real-time data
    const interval = setInterval(fetchSpaceWeatherData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-100 rounded-xl p-6 animate-pulse">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
      </div>
    );
  }

  const getAlertBadge = (level) => {
    const badges = {
      normal: { text: 'NORMAL', color: 'bg-green-500' },
      minor: { text: 'MINOR', color: 'bg-yellow-500' },
      moderate: { text: 'MODERATE', color: 'bg-orange-500' },
      severe: { text: 'SEVERE', color: 'bg-red-500' }
    };
    return badges[level] || badges.normal;
  };

  return (
    <div className={`bg-gradient-to-r ${weatherData.color} rounded-xl shadow-lg p-6 text-white mb-6`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-3xl">{weatherData.icon}</div>
          <div>
            <h3 className="text-xl font-bold">{weatherData.title}</h3>
            <p className="text-sm opacity-90">Real-time Space Weather Alert</p>
          </div>
        </div>
        <div className={`${getAlertBadge(alertLevel).color} text-white px-3 py-1 rounded-full text-sm font-bold`}>
          {getAlertBadge(alertLevel).text}
        </div>
      </div>

      <p className="text-lg mb-4 opacity-95">
        {weatherData.description}
      </p>

      <div className="bg-white bg-opacity-20 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Expected Impacts:</h4>
        <ul className="space-y-1">
          {weatherData.impacts.map((impact, index) => (
            <li key={index} className="flex items-start text-sm">
              <span className="mr-2">•</span>
              {impact}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 text-xs opacity-75">
        <p>Data source: NASA Space Weather Prediction Center</p>
        <p>Last updated: {new Date().toLocaleTimeString()}</p>
      </div>
    </div>
  );
}

export default SpaceWeatherAlert;
