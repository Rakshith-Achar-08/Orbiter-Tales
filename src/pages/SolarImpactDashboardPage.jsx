import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SolarImpactDashboard from '../components/SolarImpactDashboard';
import AstronautShieldVisualizer from '../components/AstronautShieldVisualizer';
import GeoShieldEarthMap from '../components/GeoShieldEarthMap';
import SpaceWeatherStoryWorld from '../components/SpaceWeatherStoryWorld';
import R2O2RTracker from '../components/R2O2RTracker';

function SolarImpactDashboardPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [narrationEnabled, setNarrationEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const tabs = [
    { id: 'dashboard', label: 'Solar Impact', icon: '🌞', component: SolarImpactDashboard },
    { id: 'astronaut', label: 'Astronaut Shield', icon: '🛰️', component: AstronautShieldVisualizer },
    { id: 'geoshield', label: 'GeoShield Map', icon: '🌍', component: GeoShieldEarthMap },
    { id: 'storyworld', label: 'StoryWorld', icon: '👥', component: SpaceWeatherStoryWorld },
    { id: 'r2o2r', label: 'R2O2R Tracker', icon: '🔄', component: R2O2RTracker }
  ];

  const [timelinePosition, setTimelinePosition] = useState(0);
  const [auroraIntensity, setAuroraIntensity] = useState(3);

  // Timeline slider for historical/forecasted data
  const timelineEvents = [
    { date: '2024-01-15', event: 'Major Solar Storm', intensity: 8 },
    { date: '2024-02-03', event: 'Aurora Activity Peak', intensity: 6 },
    { date: '2024-03-10', event: 'Quiet Period', intensity: 2 },
    { date: '2024-04-22', event: 'Moderate Activity', intensity: 4 },
    { date: '2024-05-15', event: 'Current Day', intensity: 3 }
  ];

  const currentEvent = timelineEvents[Math.floor(timelinePosition * (timelineEvents.length - 1))];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex-grow p-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-white space-glow mb-4">
              🌞 Solar Impact Dashboard
            </h1>
            <p className="text-xl text-gray-300 space-glow mb-6">
              NASA Space Weather Visualization & Impact Analysis
            </p>
            
            {/* Control Panel */}
            <div className="glass-card rounded-xl p-6 mb-8">
              <div className="flex flex-wrap justify-center items-center gap-4">
                <button
                  onClick={() => setIsLiveMode(!isLiveMode)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    isLiveMode 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white pulse-glow' 
                      : 'bg-gradient-to-r from-gray-500 to-gray-600 text-gray-300'
                  }`}
                >
                  {isLiveMode ? '🟢 Live Data' : '⏸️ Simulation'}
                </button>
                
                <button
                  onClick={() => setNarrationEnabled(!narrationEnabled)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    narrationEnabled 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white pulse-glow' 
                      : 'bg-gradient-to-r from-gray-500 to-gray-600 text-gray-300'
                  }`}
                >
                  {narrationEnabled ? '🔊 TTS On' : '🔇 TTS Off'}
                </button>
                
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    darkMode 
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white' 
                      : 'bg-gradient-to-r from-gray-500 to-gray-600 text-gray-300'
                  }`}
                >
                  {darkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
                </button>
              </div>
            </div>

            {/* Timeline Slider */}
            <div className="glass-card rounded-xl p-6 mb-8">
              <h3 className="text-lg font-bold text-white space-glow mb-4">📅 Space Weather Timeline</h3>
              <div className="space-y-4">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.25"
                  value={timelinePosition}
                  onChange={(e) => setTimelinePosition(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Historical Data</span>
                  <span>Current</span>
                  <span>Forecast</span>
                </div>
                <div className="text-center">
                  <p className="text-white font-semibold">{currentEvent.event}</p>
                  <p className="text-gray-300 text-sm">Intensity: {currentEvent.intensity}/10</p>
                </div>
              </div>
            </div>

            {/* Aurora Visualizer */}
            <div className="glass-card rounded-xl p-6 mb-8">
              <h3 className="text-lg font-bold text-white space-glow mb-4">🌌 Aurora Visualizer</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-4">
                  <span className="text-gray-300">Aurora Intensity:</span>
                  <input
                    type="range"
                    min="1"
                    max="9"
                    value={auroraIntensity}
                    onChange={(e) => setAuroraIntensity(parseInt(e.target.value))}
                    className="w-32 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <span className="text-white font-semibold">{auroraIntensity}/9</span>
                </div>
                <div className="text-center">
                  <div className={`text-4xl mb-2 ${
                    auroraIntensity < 3 ? 'text-green-400' :
                    auroraIntensity < 6 ? 'text-yellow-400' :
                    auroraIntensity < 8 ? 'text-orange-400' : 'text-red-400'
                  }`}>
                    {auroraIntensity < 3 ? '🌌' : auroraIntensity < 6 ? '🌌✨' : auroraIntensity < 8 ? '🌌✨🌟' : '🌌✨🌟💫'}
                  </div>
                  <p className="text-gray-300 text-sm">
                    {auroraIntensity < 3 ? 'Subtle aurora activity' :
                     auroraIntensity < 6 ? 'Moderate aurora display' :
                     auroraIntensity < 8 ? 'Strong aurora activity' : 'Extreme aurora storm'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="glass-card rounded-xl p-2 flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105 pulse-glow'
                      : 'text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Active Component */}
          <div className="mb-8">
            {(() => {
              const activeTabData = tabs.find(tab => tab.id === activeTab);
              const Component = activeTabData.component;
              return <Component />;
            })()}
          </div>

          {/* Accessibility Features */}
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-lg font-bold text-white space-glow mb-4">♿ Accessibility Features</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-2">🔊</div>
                <h4 className="font-semibold text-white mb-1">Text-to-Speech</h4>
                <p className="text-sm text-gray-300">Narration for all content and data</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🔍</div>
                <h4 className="font-semibold text-white mb-1">High Contrast</h4>
                <p className="text-sm text-gray-300">Enhanced visibility for all elements</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">⌨️</div>
                <h4 className="font-semibold text-white mb-1">Keyboard Navigation</h4>
                <p className="text-sm text-gray-300">Full keyboard accessibility support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default SolarImpactDashboardPage;
