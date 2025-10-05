import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function GamePage() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(false);
  const [gameMode, setGameMode] = useState('click'); // 'click', 'timed', 'memory', 'reaction', 'sequence'
  const [highScore, setHighScore] = useState(0);
  const [sunnyPosition, setSunnyPosition] = useState({ x: 50, y: 50 });
  const [showSunny, setShowSunny] = useState(false);
  // Reaction Time state
  const [reactionState, setReactionState] = useState('idle'); // 'idle' | 'waiting' | 'go' | 'tooSoon'
  const [reactionMs, setReactionMs] = useState(null);
  const reactionStartRef = useRef(0);
  const reactionTimeoutRef = useRef(null);
  // Sequence (Simon) state
  const [sequence, setSequence] = useState([]); // array of 0..3
  const [userIndex, setUserIndex] = useState(0);
  const [isShowingSequence, setIsShowingSequence] = useState(false);
  const [activePad, setActivePad] = useState(null); // 0..3 when flashing

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

  // Reaction Time: start waiting and then show 'GO' after random delay
  const startReaction = () => {
    setReactionState('waiting');
    setReactionMs(null);
    if (reactionTimeoutRef.current) clearTimeout(reactionTimeoutRef.current);
    const delay = Math.floor(Math.random() * 2000) + 1200; // 1.2s - 3.2s
    reactionTimeoutRef.current = setTimeout(() => {
      setReactionState('go');
      reactionStartRef.current = performance.now();
    }, delay);
  };

  const handleReactionClick = () => {
    if (reactionState === 'waiting') {
      // Clicked too early
      if (reactionTimeoutRef.current) clearTimeout(reactionTimeoutRef.current);
      setReactionState('tooSoon');
      setReactionMs(null);
    } else if (reactionState === 'go') {
      const elapsed = Math.floor(performance.now() - reactionStartRef.current);
      setReactionMs(elapsed);
      setReactionState('idle');
      setHighScore(prev => (prev === 0 ? elapsed : Math.min(prev, elapsed))); // lower is better here
    }
  };

  // Sequence (Simon): helpers
  const pads = [
    { id: 0, color: 'bg-red-400', glow: 'shadow-red-400' },
    { id: 1, color: 'bg-green-400', glow: 'shadow-green-400' },
    { id: 2, color: 'bg-blue-400', glow: 'shadow-blue-400' },
    { id: 3, color: 'bg-yellow-400', glow: 'shadow-yellow-400' }
  ];

  const addToSequence = () => {
    const next = Math.floor(Math.random() * 4);
    setSequence(prev => [...prev, next]);
    setUserIndex(0);
  };

  const playSequence = async (seq) => {
    setIsShowingSequence(true);
    for (let i = 0; i < seq.length; i++) {
      setActivePad(seq[i]);
      // brief flash
      await new Promise(res => setTimeout(res, 450));
      setActivePad(null);
      await new Promise(res => setTimeout(res, 180));
    }
    setIsShowingSequence(false);
  };

  const startSequence = async () => {
    setScore(0);
    setSequence([]);
    addToSequence();
  };

  useEffect(() => {
    if (sequence.length > 0) {
      (async () => {
        await playSequence(sequence);
      })();
    }
  }, [sequence]);

  const handlePadClick = (padId) => {
    if (isShowingSequence || sequence.length === 0) return;
    const expected = sequence[userIndex];
    if (padId === expected) {
      setUserIndex(userIndex + 1);
      setActivePad(padId);
      setTimeout(() => setActivePad(null), 150);
      if (userIndex + 1 === sequence.length) {
        // completed round
        setScore(prev => prev + 1);
        if (score + 1 > highScore) setHighScore(score + 1);
        setTimeout(() => addToSequence(), 400);
      }
    } else {
      // wrong input, reset
      setSequence([]);
      setUserIndex(0);
    }
  };

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
            <div className="grid md:grid-cols-5 gap-4">
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

              <button
                onClick={() => setGameMode('reaction')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  gameMode === 'reaction' 
                    ? 'border-green-400 bg-green-100' 
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <div className="text-3xl mb-2">⚡</div>
                <h3 className="font-bold">Reaction Time</h3>
                <p className="text-sm text-gray-600">Tap as soon as the screen says GO!</p>
              </button>

              <button
                onClick={() => setGameMode('sequence')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  gameMode === 'sequence' 
                    ? 'border-green-400 bg-green-100' 
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <div className="text-3xl mb-2">🎼</div>
                <h3 className="font-bold">Sequence</h3>
                <p className="text-sm text-gray-600">Repeat the glowing pattern; it grows each round.</p>
              </button>
            </div>
          </div>

          {/* Game Area */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <div className="text-2xl font-bold text-green-700">Score: {score}</div>
              <div className="text-2xl font-bold text-green-700">
                {gameMode === 'reaction' ? 'Best: ' : 'High Score: '} {highScore}
                {gameMode === 'reaction' && ' ms'}
              </div>
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

              {gameMode === 'reaction' && (
                <div>
                  <p className="text-lg mb-6">
                    {reactionState === 'idle' && 'Press Start, then tap the board as soon as it says GO!'}
                    {reactionState === 'waiting' && 'Wait for it...'}
                    {reactionState === 'go' && 'GO! Tap now!'}
                    {reactionState === 'tooSoon' && 'Too soon! Try again.'}
                  </p>
                  <div
                    onClick={handleReactionClick}
                    className={`h-64 rounded-lg flex items-center justify-center text-3xl font-extrabold text-white transition-colors cursor-pointer 
                      ${reactionState === 'go' ? 'bg-green-500 animate-pulse' : reactionState === 'waiting' ? 'bg-yellow-500' : reactionState === 'tooSoon' ? 'bg-red-500' : 'bg-blue-500'}`}
                  >
                    {reactionState === 'go' ? 'GO!' : reactionState === 'waiting' ? '...' : reactionState === 'tooSoon' ? 'Too soon!' : 'Ready?'}
                  </div>
                  <div className="mt-4 flex items-center gap-4 justify-center">
                    <button
                      onClick={startReaction}
                      className="bg-green-400 px-6 py-3 rounded-lg text-lg font-bold hover:bg-green-500 text-white"
                    >
                      ▶️ Start
                    </button>
                    {reactionMs !== null && (
                      <div className="text-xl font-bold text-gray-700">Your time: {reactionMs} ms</div>
                    )}
                  </div>
                </div>
              )}

              {gameMode === 'sequence' && (
                <div>
                  <p className="text-lg mb-6">Watch the pattern, then repeat it. It gets longer each round!</p>
                  <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                    {pads.map(p => (
                      <button
                        key={p.id}
                        onClick={() => handlePadClick(p.id)}
                        className={`h-28 rounded-xl shadow-lg ${p.color} ${activePad === p.id ? 'ring-4 ring-white' : ''} ${isShowingSequence ? 'opacity-80' : 'opacity-100'} transition`}
                        disabled={isShowingSequence}
                      />
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-4 justify-center">
                    <button
                      onClick={startSequence}
                      className="bg-purple-400 px-6 py-3 rounded-lg text-lg font-bold hover:bg-purple-500 text-white"
                      disabled={isShowingSequence}
                    >
                      ▶️ Start / Next Round
                    </button>
                    {sequence.length > 0 && (
                      <div className="text-xl font-bold text-gray-700">Round: {sequence.length}</div>
                    )}
                  </div>
                </div>
              )}

              {(gameActive && gameMode !== 'sequence' && gameMode !== 'reaction') && (
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
