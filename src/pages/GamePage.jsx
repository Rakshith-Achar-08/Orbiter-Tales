import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function GamePage() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(false);
  const [gameMode, setGameMode] = useState('click'); // 'click', 'timed', 'memory'
  const [highScore, setHighScore] = useState(0);
  const [sunnyPosition, setSunnyPosition] = useState({ x: 50, y: 50 });
  const [showSunny, setShowSunny] = useState(false);

  useEffect(() => {
    let timer;
    if (gameActive && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      setGameActive(false);
      if (score > highScore) {
        setHighScore(score);
      }
    }
    return () => clearTimeout(timer);
  }, [gameActive, timeLeft, score, highScore]);

  useEffect(() => {
    if (gameMode === 'memory' && gameActive) {
      const interval = setInterval(() => {
        setSunnyPosition({
          x: Math.random() * 80 + 10,
          y: Math.random() * 60 + 20
        });
        setShowSunny(true);
        setTimeout(() => setShowSunny(false), 1000);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [gameMode, gameActive]);

  const handleClick = () => {
    if (gameMode === 'click') {
      setScore(score + 1);
    }
  };

  const handleSunnyClick = () => {
    if (gameMode === 'memory' && showSunny) {
      setScore(score + 1);
      setShowSunny(false);
    }
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameActive(true);
  };

  const resetGame = () => {
    setGameActive(false);
    setScore(0);
    setTimeLeft(30);
    setShowSunny(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex-grow p-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-white space-glow">🎮 Sunny's Adventure Games</h1>
          
          {/* Game Mode Selection */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-green-700">Choose Your Game Mode</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <button
                onClick={() => setGameMode('click')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  gameMode === 'click' 
                    ? 'border-green-400 bg-green-100' 
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <div className="text-3xl mb-2">🖱️</div>
                <h3 className="font-bold">Click Game</h3>
                <p className="text-sm text-gray-600">Click Sunny as fast as you can!</p>
              </button>
              
              <button
                onClick={() => setGameMode('timed')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  gameMode === 'timed' 
                    ? 'border-green-400 bg-green-100' 
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <div className="text-3xl mb-2">⏱️</div>
                <h3 className="font-bold">Timed Challenge</h3>
                <p className="text-sm text-gray-600">Score as much as possible in 30 seconds!</p>
              </button>
              
              <button
                onClick={() => setGameMode('memory')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  gameMode === 'memory' 
                    ? 'border-green-400 bg-green-100' 
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <div className="text-3xl mb-2">🧠</div>
                <h3 className="font-bold">Memory Game</h3>
                <p className="text-sm text-gray-600">Catch Sunny when he appears!</p>
              </button>
            </div>
          </div>

          {/* Game Area */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <div className="text-2xl font-bold text-green-700">Score: {score}</div>
              <div className="text-2xl font-bold text-green-700">High Score: {highScore}</div>
              {gameMode === 'timed' && (
                <div className="text-2xl font-bold text-red-600">Time: {timeLeft}s</div>
              )}
            </div>

            {/* Game Content */}
            <div className="text-center">
              {gameMode === 'click' && (
                <div>
                  <p className="text-lg mb-6">Click Sunny to earn points!</p>
                  <button
                    onClick={handleClick}
                    className="bg-yellow-400 px-8 py-4 rounded-full text-2xl font-bold hover:bg-yellow-500 transition-colors shadow-lg"
                  >
                    ☀️ Catch Sunny
                  </button>
                </div>
              )}

              {gameMode === 'timed' && (
                <div>
                  <p className="text-lg mb-6">
                    {gameActive ? 'Click Sunny as fast as you can!' : 'Click Start to begin the timed challenge!'}
                  </p>
                  {!gameActive ? (
                    <button
                      onClick={startGame}
                      className="bg-green-400 px-8 py-4 rounded-lg text-xl font-bold hover:bg-green-500 transition-colors"
                    >
                      🚀 Start Game
                    </button>
                  ) : (
                    <button
                      onClick={handleClick}
                      className="bg-yellow-400 px-8 py-4 rounded-full text-2xl font-bold hover:bg-yellow-500 transition-colors shadow-lg animate-bounce"
                    >
                      ☀️ Catch Sunny
                    </button>
                  )}
                </div>
              )}

              {gameMode === 'memory' && (
                <div>
                  <p className="text-lg mb-6">
                    {gameActive ? 'Click Sunny when he appears!' : 'Click Start to begin the memory game!'}
                  </p>
                  {!gameActive ? (
                    <button
                      onClick={startGame}
                      className="bg-green-400 px-8 py-4 rounded-lg text-xl font-bold hover:bg-green-500 transition-colors"
                    >
                      🚀 Start Game
                    </button>
                  ) : (
                    <div className="relative h-64 bg-gradient-to-b from-blue-400 to-purple-600 rounded-lg overflow-hidden">
                      {showSunny && (
                        <button
                          onClick={handleSunnyClick}
                          className="absolute bg-yellow-400 px-4 py-2 rounded-full text-xl font-bold hover:bg-yellow-500 transition-all animate-pulse"
                          style={{
                            left: `${sunnyPosition.x}%`,
                            top: `${sunnyPosition.y}%`,
                            transform: 'translate(-50%, -50%)'
                          }}
                        >
                          ☀️
                        </button>
                      )}
                      <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white font-bold">
                        {showSunny ? 'Click Sunny!' : 'Watch for Sunny...'}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {gameActive && (
                <button
                  onClick={resetGame}
                  className="mt-4 bg-red-400 px-6 py-2 rounded-lg text-lg font-semibold hover:bg-red-500 transition-colors"
                >
                  ⏹️ Stop Game
                </button>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center space-x-4">
            <Link
              to="/aurora"
              className="bg-purple-400 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-purple-500 text-white transition-colors"
            >
              🌌 Explore Auroras
            </Link>
            <Link
              to="/learn"
              className="bg-blue-400 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-500 text-white transition-colors"
            >
              📚 Learn More
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default GamePage;
