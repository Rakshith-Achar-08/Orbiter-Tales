import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AuroraVisualizer from "../components/AururaVisualizer";
import auroraData from "../data/aururas.json";

function AuroraPage() {
  const [selectedAurora, setSelectedAurora] = useState(auroraData[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleAuroraSelect = (aurora) => {
    setSelectedAurora(aurora);
  };

  const toggleAnimation = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex-grow p-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-white space-glow">🌌 Explore Auroras</h1>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Aurora Information */}
            <div className="glass-card rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-white space-glow">Aurora Types</h2>
              <div className="space-y-3">
                {auroraData.map((aurora) => (
                  <button
                    key={aurora.id}
                    onClick={() => handleAuroraSelect(aurora)}
                    className={`w-full p-4 rounded-lg text-left transition-all ${
                      selectedAurora.id === aurora.id
                        ? 'bg-purple-200 border-2 border-purple-400'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    <h3 className="font-bold text-lg">{aurora.name}</h3>
                    <p className="text-gray-600">{aurora.location}</p>
                  </button>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                <h3 className="font-bold mb-2">Selected: {selectedAurora.name}</h3>
                <p className="text-sm text-gray-700">
                  {selectedAurora.name} appears in the {selectedAurora.location.toLowerCase()} 
                  and is caused by charged particles from the Sun interacting with Earth's magnetic field.
                </p>
              </div>
            </div>

            {/* Aurora Visualizer */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-purple-700">Interactive Aurora</h2>
              <AuroraVisualizer />
              <button
                onClick={toggleAnimation}
                className={`w-full mt-4 px-6 py-3 rounded-lg font-semibold transition-colors ${
                  isPlaying 
                    ? 'bg-red-400 hover:bg-red-500 text-white' 
                    : 'bg-green-400 hover:bg-green-500 text-white'
                }`}
              >
                {isPlaying ? '⏸️ Pause Animation' : '▶️ Play Animation'}
              </button>
            </div>
          </div>

          {/* Educational Content */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-purple-700">How Auroras Form</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-2">☀️</div>
                <h3 className="font-bold mb-2">Solar Wind</h3>
                <p className="text-sm text-gray-600">Charged particles stream from the Sun</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🧲</div>
                <h3 className="font-bold mb-2">Magnetic Field</h3>
                <p className="text-sm text-gray-600">Earth's magnetic field guides particles</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">💫</div>
                <h3 className="font-bold mb-2">Light Show</h3>
                <p className="text-sm text-gray-600">Particles create beautiful auroras</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center space-x-4">
            <Link
              to="/learn"
              className="bg-blue-400 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-500 text-white transition-colors"
            >
              📚 Learn More
            </Link>
            <Link
              to="/game"
              className="bg-green-400 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-500 text-white transition-colors"
            >
              🎮 Play Game
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default AuroraPage;
