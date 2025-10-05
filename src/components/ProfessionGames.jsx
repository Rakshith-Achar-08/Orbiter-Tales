import React, { useState, useEffect } from 'react';
import { spaceWeatherService } from '../services/spaceWeatherService';

function ProfessionGames({ selectedCharacter }) {
  const [activeGameId, setActiveGameId] = useState(null);
  const [gameScore, setGameScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [difficulty, setDifficulty] = useState(1);
  const [weatherInfo, setWeatherInfo] = useState({ kp: 3, level: 'unsettled', flare: 'M1.0', flareIntensity: 50 });
  const [highScore, setHighScore] = useState(0);
  const [mode, setMode] = useState('challenge'); // 'challenge' | 'practice'

  // Fetch live space weather and compute difficulty multiplier (1.0 - 3.0)
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await spaceWeatherService.getComprehensiveData();
        const latestKp = Array.isArray(data.geomagneticIndex) && data.geomagneticIndex.length > 0 ? data.geomagneticIndex[0].kp : 3;
        const latestFlare = Array.isArray(data.solarFlares) && data.solarFlares.length > 0 ? data.solarFlares[0] : { classType: 'M1.0', intensity: 60 };
        const flareIntensity = typeof latestFlare.intensity === 'number' ? latestFlare.intensity : 50;
        const kpFactor = Math.min(1.8, 0.6 + (latestKp / 5));
        const flareFactor = Math.min(1.6, 0.6 + (flareIntensity / 100));
        const computed = Math.max(1, Math.min(3, parseFloat((kpFactor * flareFactor).toFixed(2))));
        if (mounted) {
          setDifficulty(computed);
          setWeatherInfo({ kp: latestKp, level: spaceWeatherService.getGeomagneticLevel(latestKp), flare: latestFlare.classType || 'M1.0', flareIntensity });
        }
      } catch (e) {
        // keep defaults on failure
      }
    })();
    return () => { mounted = false; };
  }, []);

  // Countdown timer per run
  useEffect(() => {
    if (!gameActive) return;
    if (mode !== 'challenge') return; // no timer in practice mode
    if (timeRemaining <= 0) {
      setGameActive(false);
      return;
    }
    const t = setTimeout(() => setTimeRemaining(prev => prev - 1), 1000);
    return () => clearTimeout(t);
  }, [gameActive, timeRemaining, mode]);

  const tips = (() => {
    const list = [];
    if (weatherInfo.kp >= 5) list.push('High Kp: expect radio/GPS disruptions; rely on backups.');
    if (weatherInfo.kp <= 2) list.push('Quiet conditions: focus on accuracy and efficiency.');
    if (weatherInfo.flare.startsWith('X') || weatherInfo.flare.startsWith('M')) list.push('Strong flare: prepare for radiation spikes and grid instability.');
    if (difficulty >= 2.5) list.push('Difficulty high: actions give more reward but failures escalate quickly.');
    if (list.length === 0) list.push('Moderate space weather: balanced risk—practice fundamentals.');
    return list;
  })();

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
  const currentGameKey = (() => {
    if (!selectedCharacter) return null;
    const p = selectedCharacter.profession.toLowerCase();
    if (p.includes('farmer')) return 'farmer';
    if (p.includes('pilot')) return 'pilot';
    if (p.includes('photographer')) return 'photographer';
    if (p.includes('engineer')) return 'engineer';
    if (p.includes('astronaut')) return 'astronaut';
    return 'farmer';
  })();

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
        <div className="flex items-center justify-center gap-2 mb-4">
          <button
            onClick={() => setMode('challenge')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${mode === 'challenge' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}
          >Challenge</button>
          <button
            onClick={() => setMode('practice')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${mode === 'practice' ? 'bg-green-600 text-white' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
          >Practice</button>
        </div>
        <div className="inline-flex flex-wrap items-center justify-center gap-3">
          <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">Kp {weatherInfo.kp} · {weatherInfo.level}</span>
          <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-semibold">Flare {weatherInfo.flare}</span>
          <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold">Difficulty ×{difficulty}</span>
        </div>
        <div className="mt-4 max-w-3xl mx-auto p-4 bg-gray-50 border border-gray-200 rounded-xl text-left">
          <h4 className="font-bold text-gray-800 mb-2">Smart Tips</h4>
          <ul className="list-disc pl-6 text-gray-700 text-sm space-y-1">
            {tips.map((t, i) => (<li key={i}>{t}</li>))}
          </ul>
        </div>
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
              onClick={() => {
                if (activeGameId) {
                  setActiveGameId(null);
                  setGameActive(false);
                  setTimeRemaining(60);
                } else {
                  setActiveGameId(currentGameKey);
                  setGameActive(true);
                  setGameScore(0);
                  setTimeRemaining(60);
                  const saved = parseInt(localStorage.getItem(`highScore:${currentGameKey}`) || '0', 10);
                  setHighScore(saved);
                }
              }}
              className={`px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeGameId 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
              }`}
            >
              {activeGameId ? '⏹️ Stop Game' : '🚀 Start Challenge'}
            </button>
          </div>

          {activeGameId && (
            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-gray-700 font-semibold">⏱️ {mode === 'challenge' ? 'Time' : 'Practice'}: <span className={`${timeRemaining <= 10 && mode==='challenge' ? 'text-red-600' : 'text-gray-900'}`}>{mode === 'challenge' ? `${timeRemaining}s` : 'Relaxed'}</span></div>
                <div className="text-gray-700 font-semibold">🏆 High Score: <span className="text-gray-900">{highScore}</span></div>
                <div className="text-gray-700 font-semibold">⭐ Score: <span className="text-gray-900">{gameScore}</span></div>
              </div>
              {(() => {
                const gameDef = games[activeGameId];
                if (!gameDef) return null;
                const ActiveGame = gameDef.component;
                return (
                  <ActiveGame
                    key={activeGameId}
                    onScoreUpdate={(s) => {
                      setGameScore(s);
                      if (s > highScore) {
                        setHighScore(s);
                        localStorage.setItem(`highScore:${activeGameId}`, `${s}`);
                      }
                    }}
                    gameActive={gameActive}
                    setGameActive={setGameActive}
                    timeRemaining={timeRemaining}
                    difficulty={difficulty}
                    mode={mode}
                  />
                );
              })()}
              {mode === 'challenge' && !gameActive && (
                <div className="mt-6 p-4 rounded-lg bg-gray-50 text-center">
                  <h4 className="text-xl font-bold mb-2">Game Over</h4>
                  <p className="text-gray-700">Final Score: {gameScore}</p>
                  <p className="text-gray-500 text-sm">Space weather made it {difficulty >= 2 ? 'tough' : 'manageable'} today!</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Farmer Game Component
function FarmerGame(props) {
  const { onScoreUpdate = () => {}, gameActive = false, setGameActive = () => {}, timeRemaining = 60, difficulty = 1 } = props || {};
  const [seeds, setSeeds] = useState([]);
  const [gpsAccuracy, setGpsAccuracy] = useState(100);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (gameActive) {
      // Simulate GPS degradation during solar storms
      const interval = setInterval(() => {
        setGpsAccuracy(prev => Math.max(20, prev - Math.random() * (8 * difficulty)));
      }, 1600);
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
    const jitter = 50 * difficulty;
    const offsetX = (Math.random() - 0.5) * (1 - accuracy) * jitter;
    const offsetY = (Math.random() - 0.5) * (1 - accuracy) * jitter;
    
    setSeeds(prev => [...prev, { x: x + offsetX, y: y + offsetY, id: Date.now() }]);
    setScore(prev => {
      const next = prev + (accuracy > 0.8 ? 2 : 1);
      onScoreUpdate(next);
      return next;
    });
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
      <p className="mt-3 text-sm text-gray-600">Tip: Higher precision earns bonus points. Solar storms reduce GPS accuracy.</p>
    </div>
  );
}

// Pilot Game Component
function PilotGame(props) {
  const { onScoreUpdate = () => {}, gameActive = false, setGameActive = () => {}, difficulty = 1 } = props || {};
  const [radioStatus, setRadioStatus] = useState('Connected');
  const [gpsStatus, setGpsStatus] = useState('Active');
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (gameActive) {
      const interval = setInterval(() => {
        // Simulate radio blackouts
        if (Math.random() < 0.25 * difficulty) {
          setRadioStatus('Blackout');
          setTimeout(() => setRadioStatus('Connected'), 2000);
        }
        
        // Simulate GPS disruptions
        if (Math.random() < 0.2 * difficulty) {
          setGpsStatus('Degraded');
          setTimeout(() => setGpsStatus('Active'), 1500);
        }
      }, 900);
      return () => clearInterval(interval);
    }
  }, [gameActive]);

  const handleNavigation = () => {
    if (radioStatus === 'Blackout' || gpsStatus === 'Degraded') {
      setScore(prev => prev + (2 * difficulty)); // Bonus for navigating during disruptions
    } else {
      setScore(prev => prev + 1);
    }
    onScoreUpdate(score + 1);
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
function PhotographerGame(props) {
  const { onScoreUpdate = () => {}, gameActive = false, setGameActive = () => {}, difficulty = 1 } = props || {};
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
      }, Math.max(700, 2200 - difficulty * 600));
      
      // Simulate equipment failures
      const equipmentInterval = setInterval(() => {
        if (Math.random() < 0.3 * difficulty) {
          setEquipmentStatus('Malfunctioning');
          setTimeout(() => setEquipmentStatus('Working'), 1800);
        }
      }, 3200);
      
      return () => {
        clearInterval(interval);
        clearInterval(equipmentInterval);
      };
    }
  }, [gameActive]);

  const takePhoto = (aurora) => {
    if (equipmentStatus === 'Working') {
      setScore(prev => prev + Math.round(aurora.intensity * 10 * difficulty));
      setAuroras(prev => prev.filter(a => a.id !== aurora.id));
      onScoreUpdate(score + 1);
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
function EngineerGame(props) {
  const { onScoreUpdate = () => {}, gameActive = false, setGameActive = () => {}, difficulty = 1 } = props || {};
  const [powerLoad, setPowerLoad] = useState(50);
  const [gridStability, setGridStability] = useState(100);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (gameActive) {
      const interval = setInterval(() => {
        // Simulate geomagnetic storm effects
        const stormEffect = Math.random() * (18 * difficulty);
        setGridStability(prev => Math.max(0, prev - stormEffect));
        
        // Auto-adjust power load to maintain stability
        if (gridStability < 30) {
          setPowerLoad(prev => Math.max(20, prev - 5));
        }
      }, 900);
      return () => clearInterval(interval);
    }
  }, [gameActive, gridStability]);

  const adjustPowerLoad = (change) => {
    setPowerLoad(prev => Math.max(0, Math.min(100, prev + change)));
    setScore(prev => prev + 1);
    onScoreUpdate(score + 1);
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
function AstronautGame(props) {
  const { onScoreUpdate = () => {}, gameActive = false, setGameActive = () => {}, difficulty = 1 } = props || {};
  const [radiationLevel, setRadiationLevel] = useState(10);
  const [inShelter, setInShelter] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (gameActive) {
      const interval = setInterval(() => {
        // Simulate solar storm radiation
        const stormIntensity = Math.random() * (40 * difficulty);
        setRadiationLevel(prev => Math.min(100, prev + stormIntensity));
      }, 1600);
      return () => clearInterval(interval);
    }
  }, [gameActive]);

  const seekShelter = () => {
    setInShelter(true);
    setRadiationLevel(prev => Math.max(5, prev - 30));
    setScore(prev => prev + Math.round(2 * difficulty));
    onScoreUpdate(score + 1);
    setTimeout(() => setInShelter(false), 2500);
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
