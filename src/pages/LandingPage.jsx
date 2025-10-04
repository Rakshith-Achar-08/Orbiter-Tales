import React, { useState } from "react";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SunnyAnimation from "../components/SunnyAnimation";
import InteractiveFacts from "../components/InteractiveFacts";
import CharacterSelector from "../components/CharacterSelector";
import SpaceWeatherAlert from "../components/SpaceWeatherAlert";
import ProfessionGames from "../components/ProfessionGames";
import SolarImpactDashboard from "../components/SolarImpactDashboard";
import AstronautShieldVisualizer from "../components/AstronautShieldVisualizer";
import GeoShieldEarthMap from "../components/GeoShieldEarthMap";
import SpaceWeatherStoryWorld from "../components/SpaceWeatherStoryWorld";
import R2O2RTracker from "../components/R2O2RTracker";

function LandingPage() {
  const [activeTab, setActiveTab] = useState('welcome');
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const tabs = [
    { id: 'welcome', label: '🏠 Welcome', icon: '🏠' },
    { id: 'characters', label: '👥 Characters', icon: '👥' },
    { id: 'facts', label: '🌟 Facts', icon: '🌟' },
    { id: 'games', label: '🎮 Games', icon: '🎮' },
    { id: 'dashboard', label: '🌞 Solar Dashboard', icon: '🌞' }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow">
        {/* Tab Navigation */}
        <div className="flex justify-center mt-8 mb-6 relative z-10">
          <div className="glass-card rounded-xl shadow-lg p-2 flex space-x-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105 pulse-glow'
                    : 'text-white hover:text-yellow-300 hover:bg-white hover:bg-opacity-20 space-glow'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="px-4 pb-8 relative z-10">
          {activeTab === 'welcome' && (
            <div className="flex flex-col items-center justify-center max-w-4xl mx-auto">
              <div className="glass-card rounded-2xl shadow-xl p-8 text-center">
                <SunnyAnimation />
                <h1 className="text-5xl font-bold mb-6 text-white space-glow">
                  Sunny's Adventure
                </h1>

                <p className="mb-8 text-xl text-gray-300 leading-relaxed space-glow">
                  Hi! I'm <span className="font-bold text-yellow-300">Sunny</span>, a Solar Flare! 🌞<br />
                  Come travel with me to Earth and discover the amazing world of space weather!
                </p>

                {/* Real-time Space Weather Alert */}
                <div className="mb-8">
                  <SpaceWeatherAlert />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <Button text="📖 Story" color="bg-yellow-400 hover:bg-yellow-500" to="/story" />
                  <Button text="🎮 Play Game" color="bg-green-400 hover:bg-green-500" to="/game" />
                  <Button text="🌌 Explore Auroras" color="bg-purple-400 hover:bg-purple-500" to="/aurora" />
                  <Button text="📚 Learn" color="bg-blue-400 hover:bg-blue-500" to="/learn" />
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-l-4 border-blue-400">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">🚀 Ready for an Adventure?</h3>
                  <p className="text-gray-600">
                    Explore different characters, learn amazing facts, and play interactive games! 
                    Each section shows how space weather affects people around the world.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'characters' && (
            <div className="max-w-6xl mx-auto">
              <CharacterSelector 
                onCharacterSelect={setSelectedCharacter}
                selectedCharacter={selectedCharacter}
              />
            </div>
          )}

          {activeTab === 'facts' && (
            <div className="max-w-6xl mx-auto">
              <InteractiveFacts />
            </div>
          )}

          {activeTab === 'games' && (
            <div className="max-w-6xl mx-auto">
              <ProfessionGames selectedCharacter={selectedCharacter} />
            </div>
          )}

          {activeTab === 'dashboard' && (
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-white space-glow mb-4">
                  🌞 Solar Impact Dashboard
                </h1>
                <p className="text-xl text-gray-300 space-glow mb-6">
                  NASA Space Weather Visualization & Impact Analysis
                </p>
              </div>
              
              {/* Dashboard Components */}
              <div className="space-y-8">
                <SolarImpactDashboard />
                <AstronautShieldVisualizer />
                <GeoShieldEarthMap />
                <SpaceWeatherStoryWorld />
                <R2O2RTracker />
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default LandingPage;
