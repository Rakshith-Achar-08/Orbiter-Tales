import React, { useState, useEffect } from 'react';

function ProfessionGames({ selectedCharacter }) {
  const [activeGame, setActiveGame] = useState(null);
  const [gameScore, setGameScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);

  const games = {
    farmer: {
      title: "🌾 Precision Farming Challenge",
      description: "Plant crops in perfect rows while GPS is disrupted by solar storms!",
      instructions: "Click to plant seeds. Solar storms will make your GPS inaccurate - try to plant in straight rows anyway!",
      component: FarmerGame
    },
    pilot: {
      title: "✈️ Navigation Challenge",
      description: "Navigate through radio blackouts and GPS disruptions!",
      instructions: "Use backup navigation methods when radio and GPS fail during solar storms.",
      component: PilotGame
    },
    photographer: {
      title: "📸 Aurora Chase",
      description: "Capture the Northern Lights while managing equipment failures!",
      instructions: "Take photos of auroras while your camera equipment malfunctions during solar activity.",
      component: PhotographerGame
    },
    engineer: {
      title: "⚡ Power Grid Management",
      description: "Keep the power grid stable during geomagnetic storms!",
      instructions: "Monitor and adjust power loads to prevent blackouts during solar storms.",
      component: EngineerGame
    },
    astronaut: {
      title: "👨‍🚀 ISS Radiation Shelter",
      description: "Seek shelter from solar radiation while maintaining station operations!",
      instructions: "Move to radiation shelters when solar storms hit while keeping the ISS running.",
      component: AstronautGame
    }
  };

  const getCharacterGame = () => {
    if (!selectedCharacter) return null;
    
    const profession = selectedCharacter.profession.toLowerCase();
    if (profession.includes('farmer')) return games.farmer;
    if (profession.includes('pilot')) return games.pilot;
    if (profession.includes('photographer')) return games.photographer;
    if (profession.includes('engineer')) return games.engineer;
    if (profession.includes('astronaut')) return games.astronaut;
    
    return games.farmer; // Default game
  };

  const currentGame = getCharacterGame();

  if (!selectedCharacter) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🎮</div>
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Select a Character First!</h3>
        <p className="text-gray-600">Choose a character to unlock their unique space weather challenge game.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">🎮 {selectedCharacter.name}'s Challenge</h2>
        <p className="text-lg text-gray-600 mb-6">
          Experience the challenges {selectedCharacter.name} faces during space weather events!
        </p>
      </div>

      {currentGame && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{currentGame.title}</h3>
            <p className="text-gray-600 mb-4">{currentGame.description}</p>
            <p className="text-sm text-gray-500 bg-gray-100 p-3 rounded-lg">
              {currentGame.instructions}
            </p>
          </div>

          <div className="flex justify-center mb-6">
            <button
              onClick={() => setActiveGame(activeGame ? null : currentGame.component)}
              className={`px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeGame 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
              }`}
            >
              {activeGame ? '⏹️ Stop Game' : '🚀 Start Challenge'}
            </button>
          </div>

          {activeGame && (
            <div className="border-t pt-6">
              <currentGame.component 
                onScoreUpdate={setGameScore}
                gameActive={gameActive}
                setGameActive={setGameActive}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Farmer Game Component
function FarmerGame({ onScoreUpdate, gameActive, setGameActive }) {
  const [seeds, setSeeds] = useState([]);
  const [gpsAccuracy, setGpsAccuracy] = useState(100);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (gameActive) {
      // Simulate GPS degradation during solar storms
      const interval = setInterval(() => {
        setGpsAccuracy(prev => Math.max(20, prev - Math.random() * 10));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [gameActive]);

  const plantSeed = (e) => {
    if (!gameActive) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // GPS accuracy affects planting precision
    const accuracy = gpsAccuracy / 100;
    const offsetX = (Math.random() - 0.5) * (1 - accuracy) * 50;
    const offsetY = (Math.random() - 0.5) * (1 - accuracy) * 50;
    
    setSeeds(prev => [...prev, { x: x + offsetX, y: y + offsetY, id: Date.now() }]);
    setScore(prev => prev + 1);
    onScoreUpdate(score + 1);
  };

  return (
    <div className="text-center">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-semibold">Score: {score}</span>
          <span className="text-lg font-semibold">GPS Accuracy: {Math.round(gpsAccuracy)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${
              gpsAccuracy > 70 ? 'bg-green-500' : gpsAccuracy > 40 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${gpsAccuracy}%` }}
          ></div>
        </div>
      </div>
      
      <div 
        className="relative w-full h-64 bg-gradient-to-b from-green-200 to-green-400 rounded-lg border-2 border-dashed border-gray-400 cursor-crosshair"
        onClick={plantSeed}
      >
        <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-600">
          Click to plant seeds (GPS accuracy affects precision)
        </p>
        {seeds.map(seed => (
          <div
            key={seed.id}
            className="absolute w-3 h-3 bg-brown-600 rounded-full transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: seed.x, top: seed.y }}
          />
        ))}
      </div>
    </div>
  );
}

// Pilot Game Component
function PilotGame({ onScoreUpdate, gameActive, setGameActive }) {
  const [radioStatus, setRadioStatus] = useState('Connected');
  const [gpsStatus, setGpsStatus] = useState('Active');
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (gameActive) {
      const interval = setInterval(() => {
        // Simulate radio blackouts
        if (Math.random() < 0.3) {
          setRadioStatus('Blackout');
          setTimeout(() => setRadioStatus('Connected'), 3000);
        }
        
        // Simulate GPS disruptions
        if (Math.random() < 0.2) {
          setGpsStatus('Degraded');
          setTimeout(() => setGpsStatus('Active'), 2000);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameActive]);

  const handleNavigation = () => {
    if (radioStatus === 'Blackout' || gpsStatus === 'Degraded') {
      setScore(prev => prev + 2); // Bonus for navigating during disruptions
    } else {
      setScore(prev => prev + 1);
    }
    onScoreUpdate(score);
  };

  return (
    <div className="text-center">
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className={`p-4 rounded-lg ${radioStatus === 'Connected' ? 'bg-green-100' : 'bg-red-100'}`}>
          <h4 className="font-semibold">Radio Status</h4>
          <p className={radioStatus === 'Connected' ? 'text-green-600' : 'text-red-600'}>
            {radioStatus}
          </p>
        </div>
        <div className={`p-4 rounded-lg ${gpsStatus === 'Active' ? 'bg-green-100' : 'bg-yellow-100'}`}>
          <h4 className="font-semibold">GPS Status</h4>
          <p className={gpsStatus === 'Active' ? 'text-green-600' : 'text-yellow-600'}>
            {gpsStatus}
          </p>
        </div>
      </div>
      
      <div className="mb-4">
        <h4 className="text-lg font-semibold mb-2">Score: {score}</h4>
        <p className="text-sm text-gray-600">Navigate successfully during disruptions for bonus points!</p>
      </div>
      
      <button
        onClick={handleNavigation}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
      >
        Navigate Route
      </button>
    </div>
  );
}

// Photographer Game Component
function PhotographerGame({ onScoreUpdate, gameActive, setGameActive }) {
  const [auroras, setAuroras] = useState([]);
  const [equipmentStatus, setEquipmentStatus] = useState('Working');
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (gameActive) {
      // Generate auroras
      const interval = setInterval(() => {
        setAuroras(prev => [...prev, { 
          id: Date.now(), 
          x: Math.random() * 300, 
          y: Math.random() * 200,
          intensity: Math.random()
        }]);
      }, 2000);
      
      // Simulate equipment failures
      const equipmentInterval = setInterval(() => {
        if (Math.random() < 0.4) {
          setEquipmentStatus('Malfunctioning');
          setTimeout(() => setEquipmentStatus('Working'), 3000);
        }
      }, 4000);
      
      return () => {
        clearInterval(interval);
        clearInterval(equipmentInterval);
      };
    }
  }, [gameActive]);

  const takePhoto = (aurora) => {
    if (equipmentStatus === 'Working') {
      setScore(prev => prev + Math.round(aurora.intensity * 10));
      setAuroras(prev => prev.filter(a => a.id !== aurora.id));
      onScoreUpdate(score);
    }
  };

  return (
    <div className="text-center">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-semibold">Score: {score}</span>
          <span className={`text-lg font-semibold ${equipmentStatus === 'Working' ? 'text-green-600' : 'text-red-600'}`}>
            Camera: {equipmentStatus}
          </span>
        </div>
      </div>
      
      <div className="relative w-full h-48 bg-gradient-to-b from-purple-900 to-blue-900 rounded-lg overflow-hidden">
        <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-sm">
          Click on auroras to photograph them
        </p>
        {auroras.map(aurora => (
          <div
            key={aurora.id}
            onClick={() => takePhoto(aurora)}
            className="absolute w-8 h-8 bg-green-400 rounded-full cursor-pointer opacity-75 hover:opacity-100 transition-opacity"
            style={{ 
              left: aurora.x, 
              top: aurora.y,
              transform: 'translate(-50%, -50%)',
              boxShadow: `0 0 ${aurora.intensity * 20}px #00ff00`
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Engineer Game Component
function EngineerGame({ onScoreUpdate, gameActive, setGameActive }) {
  const [powerLoad, setPowerLoad] = useState(50);
  const [gridStability, setGridStability] = useState(100);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (gameActive) {
      const interval = setInterval(() => {
        // Simulate geomagnetic storm effects
        const stormEffect = Math.random() * 20;
        setGridStability(prev => Math.max(0, prev - stormEffect));
        
        // Auto-adjust power load to maintain stability
        if (gridStability < 30) {
          setPowerLoad(prev => Math.max(20, prev - 5));
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameActive, gridStability]);

  const adjustPowerLoad = (change) => {
    setPowerLoad(prev => Math.max(0, Math.min(100, prev + change)));
    setScore(prev => prev + 1);
    onScoreUpdate(score);
  };

  return (
    <div className="text-center">
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-4">Power Grid Management</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h5 className="font-semibold mb-2">Power Load: {powerLoad}%</h5>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full transition-all duration-500 bg-blue-500"
                style={{ width: `${powerLoad}%` }}
              ></div>
            </div>
          </div>
          <div>
            <h5 className="font-semibold mb-2">Grid Stability: {Math.round(gridStability)}%</h5>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  gridStability > 70 ? 'bg-green-500' : gridStability > 40 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${gridStability}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <h4 className="text-lg font-semibold">Score: {score}</h4>
        <p className="text-sm text-gray-600">Keep the grid stable during solar storms!</p>
      </div>
      
      <div className="flex space-x-4 justify-center">
        <button
          onClick={() => adjustPowerLoad(-10)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
        >
          Reduce Load
        </button>
        <button
          onClick={() => adjustPowerLoad(10)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
        >
          Increase Load
        </button>
      </div>
    </div>
  );
}

// Astronaut Game Component
function AstronautGame({ onScoreUpdate, gameActive, setGameActive }) {
  const [radiationLevel, setRadiationLevel] = useState(10);
  const [inShelter, setInShelter] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (gameActive) {
      const interval = setInterval(() => {
        // Simulate solar storm radiation
        const stormIntensity = Math.random() * 50;
        setRadiationLevel(prev => Math.min(100, prev + stormIntensity));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [gameActive]);

  const seekShelter = () => {
    setInShelter(true);
    setRadiationLevel(prev => Math.max(5, prev - 30));
    setScore(prev => prev + 2);
    onScoreUpdate(score);
    setTimeout(() => setInShelter(false), 3000);
  };

  return (
    <div className="text-center">
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-4">ISS Radiation Monitoring</h4>
        <div className="mb-4">
          <h5 className="font-semibold mb-2">Radiation Level: {Math.round(radiationLevel)}%</h5>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                radiationLevel < 30 ? 'bg-green-500' : radiationLevel < 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${radiationLevel}%` }}
            ></div>
          </div>
        </div>
        <div className={`p-4 rounded-lg ${inShelter ? 'bg-green-100' : 'bg-gray-100'}`}>
          <h5 className="font-semibold">Status: {inShelter ? 'In Radiation Shelter' : 'Working'}</h5>
        </div>
      </div>
      
      <div className="mb-4">
        <h4 className="text-lg font-semibold">Score: {score}</h4>
        <p className="text-sm text-gray-600">Seek shelter when radiation levels get too high!</p>
      </div>
      
      <button
        onClick={seekShelter}
        disabled={inShelter}
        className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
          inShelter 
            ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
      >
        {inShelter ? 'In Shelter...' : 'Seek Radiation Shelter'}
      </button>
    </div>
  );
}

export default ProfessionGames;
