import React, { useState, useEffect, useRef } from "react";
import factsData from "../data/facts.json";
import ThreeJSun from "./ThreeJSun";

function InteractiveFacts() {
  const [visibleFacts, setVisibleFacts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const factsRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  // Shuffle facts for variety
  const shuffledFacts = React.useMemo(() => {
    return [...factsData].sort(() => Math.random() - 0.5);
  }, []);

  useEffect(() => {
    let lastScrollTop = 0;
    
    const handleScroll = () => {
      const factsContainer = factsRef.current;
      if (!factsContainer) return;
      
      const currentScrollTop = factsContainer.scrollTop;
      
      // Check if user scrolled down (not up) and scrolled more than 50px
      if (currentScrollTop > lastScrollTop && currentScrollTop > 50 && !isScrolling && currentIndex < shuffledFacts.length) {
        setIsScrolling(true);
        
        // Clear existing timeout
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        
        // Add new fact after scroll
        scrollTimeoutRef.current = setTimeout(() => {
          if (currentIndex < shuffledFacts.length) {
            setVisibleFacts(prev => [...prev, shuffledFacts[currentIndex]]);
            setCurrentIndex(prev => prev + 1);
          }
          setIsScrolling(false);
        }, 300);
      }
      
      lastScrollTop = currentScrollTop;
    };

    const factsContainer = factsRef.current;
    if (factsContainer) {
      factsContainer.addEventListener('scroll', handleScroll);
      return () => {
        factsContainer.removeEventListener('scroll', handleScroll);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }
  }, [isScrolling, currentIndex, shuffledFacts]);

  // Auto-reveal first fact on mount
  useEffect(() => {
    if (visibleFacts.length === 0 && shuffledFacts.length > 0) {
      const timer = setTimeout(() => {
        setVisibleFacts([shuffledFacts[0]]);
        setCurrentIndex(1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [shuffledFacts, visibleFacts.length]);

  const getCategoryIcon = (category) => {
    const icons = {
      energy: '⚡',
      aurora: '🌌',
      impact: '💥',
      magnetic: '🧲',
      speed: '🚀',
      history: '📜',
      space: '🛰️',
      classification: '📊',
      iss: '🏠',
      visibility: '👁️',
      technology: '🔬',
      temperature: '🌡️',
      navigation: '🧭',
      sounds: '🔊',
      mass: '⚖️',
      communication: '📡',
      comparison: '⚖️',
      patterns: '🌀'
    };
    return icons[category] || '⭐';
  };

  const getCategoryColor = (category) => {
    const colors = {
      energy: 'from-yellow-400 to-orange-500',
      aurora: 'from-purple-400 to-pink-500',
      impact: 'from-red-400 to-red-600',
      magnetic: 'from-blue-400 to-indigo-500',
      speed: 'from-green-400 to-emerald-500',
      history: 'from-amber-400 to-yellow-500',
      space: 'from-indigo-400 to-purple-500',
      classification: 'from-gray-400 to-gray-600',
      iss: 'from-cyan-400 to-blue-500',
      visibility: 'from-pink-400 to-rose-500',
      technology: 'from-teal-400 to-cyan-500',
      temperature: 'from-orange-400 to-red-500',
      navigation: 'from-sky-400 to-blue-500',
      sounds: 'from-violet-400 to-purple-500',
      mass: 'from-slate-400 to-gray-500',
      communication: 'from-emerald-400 to-green-500',
      comparison: 'from-rose-400 to-pink-500',
      patterns: 'from-fuchsia-400 to-purple-500'
    };
    return colors[category] || 'from-gray-400 to-gray-500';
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-12 relative">
        
        {/* Main title with sun icon */}
        <div className="flex justify-center items-center mb-6">
          <span className="text-5xl mr-4 float-animation">☀️</span>
          <h1 className="text-5xl font-bold text-white space-glow">Amazing Space Facts</h1>
        </div>
        
        {/* Description */}
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto space-glow">
          Scroll down to discover incredible facts about space weather and solar phenomena!
        </p>
        
        {/* Fact counter */}
        <div className="flex justify-center items-center space-x-6 text-lg">
          <span className="flex items-center">
            <span className="w-4 h-4 bg-green-400 rounded-full mr-3 animate-pulse pulse-glow"></span>
            <span className="text-white font-medium space-glow">{visibleFacts.length} facts revealed</span>
          </span>
          <span className="flex items-center">
            <span className="w-4 h-4 bg-blue-400 rounded-full mr-3 pulse-glow"></span>
            <span className="text-white font-medium space-glow">{shuffledFacts.length - visibleFacts.length} more to discover</span>
          </span>
        </div>
      </div>

      {/* Scrollable Facts Container */}
      <div className="relative">
        
        <div 
          ref={factsRef}
          className="h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 space-y-4 p-6 glass-card rounded-xl shadow-lg"
          style={{ scrollBehavior: 'smooth' }}
        >
          {visibleFacts.length === 0 && (
            <div className="text-center py-16">
              <div className="flex justify-center mb-8">
                <div className="scale-75">
                  <ThreeJSun />
                </div>
              </div>
              <p className="text-2xl font-bold text-white mb-4 space-glow">Start scrolling to reveal amazing facts!</p>
              <p className="text-lg text-gray-300 mb-6 space-glow">Watch the 3D Sun rotate as you discover space weather secrets!</p>
              <div className="flex justify-center mb-6">
                <div className="animate-bounce">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </div>
              <button
                onClick={() => {
                  if (currentIndex < shuffledFacts.length) {
                    setVisibleFacts([shuffledFacts[currentIndex]]);
                    setCurrentIndex(prev => prev + 1);
                  }
                }}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 pulse-glow"
              >
                🚀 Start Discovering Facts
              </button>
            </div>
          )}

        {visibleFacts.map((fact, index) => (
          <div
            key={fact.id}
            className={`transform transition-all duration-700 ease-out ${
              index === visibleFacts.length - 1 
                ? 'animate-fadeInUp scale-100 opacity-100' 
                : 'scale-95 opacity-90'
            }`}
            style={{
              animationDelay: `${index * 0.1}s`
            }}
          >
            <div className={`bg-gradient-to-r ${getCategoryColor(fact.category)} p-6 rounded-xl shadow-lg text-white transform hover:scale-105 transition-transform duration-300`}>
              <div className="flex items-start space-x-4">
                <div className="text-3xl flex-shrink-0">
                  {getCategoryIcon(fact.category)}
                </div>
                <div className="flex-grow">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-semibold bg-white bg-opacity-20 px-2 py-1 rounded-full">
                      {fact.category.toUpperCase()}
                    </span>
                    <span className="text-sm font-semibold bg-white bg-opacity-20 px-2 py-1 rounded-full">
                      #{index + 1}
                    </span>
                  </div>
                  <p className="text-lg font-medium leading-relaxed">
                    {fact.fact}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Next Fact Button */}
        {visibleFacts.length > 0 && currentIndex < shuffledFacts.length && (
          <div className="text-center py-6">
            <button
              onClick={() => {
                if (currentIndex < shuffledFacts.length) {
                  setVisibleFacts(prev => [...prev, shuffledFacts[currentIndex]]);
                  setCurrentIndex(prev => prev + 1);
                }
              }}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
            >
              ⭐ Discover Next Fact
            </button>
            <p className="text-sm text-gray-300 mt-2 space-glow">Or scroll down to reveal more facts automatically!</p>
          </div>
        )}

        {currentIndex >= shuffledFacts.length && (
          <div className="text-center py-8">
            <div className="flex justify-center mb-6">
              <ThreeJSun />
            </div>
            <div className="text-4xl mb-4">🎉</div>
            <p className="text-xl font-semibold text-white mb-2 space-glow">Congratulations!</p>
            <p className="text-gray-300 mb-4 space-glow">You've discovered all {shuffledFacts.length} amazing space facts!</p>
            <p className="text-sm text-gray-400 mb-6 space-glow">You're now a space weather expert! 🌟</p>
            <button
              onClick={() => {
                setVisibleFacts([]);
                setCurrentIndex(0);
                // Scroll to top
                if (factsRef.current) {
                  factsRef.current.scrollTop = 0;
                }
              }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
            >
              🔄 Discover More Facts
            </button>
          </div>
        )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-8">
        <div className="flex justify-between text-sm text-gray-300 mb-2">
          <span className="font-medium space-glow">Discovery Progress</span>
          <span className="font-medium space-glow">{Math.round((visibleFacts.length / shuffledFacts.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3 shadow-inner">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500 ease-out shadow-sm pulse-glow"
            style={{ width: `${(visibleFacts.length / shuffledFacts.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default InteractiveFacts;
