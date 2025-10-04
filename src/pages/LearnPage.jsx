import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import factsData from "../data/facts.json";

function LearnPage() {
  const [expandedSection, setExpandedSection] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const learningSections = [
    {
      id: 'solar-flares',
      title: '☀️ Solar Flares',
      content: 'Solar flares are sudden, intense bursts of radiation from the Sun. They occur when magnetic energy built up in the solar atmosphere is suddenly released.',
      details: [
        'Solar flares can release energy equivalent to millions of nuclear bombs',
        'They travel at the speed of light and reach Earth in about 8 minutes',
        'The largest solar flare ever recorded was in 2003 and was classified as X28',
        'Solar flares are rated from A, B, C, M, to X class (weakest to strongest)'
      ]
    },
    {
      id: 'auroras',
      title: '🌌 Auroras',
      content: 'Auroras are beautiful light displays in the sky caused by charged particles from the Sun interacting with Earth\'s magnetic field.',
      details: [
        'Auroras occur when solar wind particles collide with atmospheric gases',
        'Different gases produce different colors: oxygen (green/red), nitrogen (blue/purple)',
        'Aurora Borealis (Northern Lights) and Aurora Australis (Southern Lights)',
        'Best viewing is near the magnetic poles during solar maximum'
      ]
    },
    {
      id: 'space-weather',
      title: '🌍 Space Weather Effects',
      content: 'Space weather can affect technology on Earth and in space, from satellites to power grids.',
      details: [
        'GPS signals can be disrupted by solar storms',
        'Power grids can experience blackouts during geomagnetic storms',
        'Satellites can be damaged by radiation from solar events',
        'Airlines reroute flights during severe space weather to avoid radiation'
      ]
    },
    {
      id: 'protection',
      title: '🛡️ Protection & Monitoring',
      content: 'Scientists monitor space weather to protect technology and astronauts.',
      details: [
        'NASA and NOAA monitor the Sun 24/7',
        'Early warning systems help protect power grids',
        'Astronauts on the ISS have radiation shelters',
        'Space weather forecasts help plan satellite operations'
      ]
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: 'What causes auroras?',
      options: ['Moonlight', 'Charged particles from the Sun', 'City lights', 'Volcanoes'],
      correct: 1
    },
    {
      id: 2,
      question: 'How long does it take for solar flare radiation to reach Earth?',
      options: ['1 minute', '8 minutes', '1 hour', '1 day'],
      correct: 1
    },
    {
      id: 3,
      question: 'What color do oxygen atoms produce in auroras?',
      options: ['Blue', 'Green', 'Purple', 'Yellow'],
      correct: 1
    }
  ];

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const handleQuizAnswer = (questionId, answerIndex) => {
    setQuizAnswers({
      ...quizAnswers,
      [questionId]: answerIndex
    });
  };

  const calculateScore = () => {
    let correct = 0;
    quizQuestions.forEach(question => {
      if (quizAnswers[question.id] === question.correct) {
        correct++;
      }
    });
    return correct;
  };

  const getRandomFact = () => {
    return factsData[Math.floor(Math.random() * factsData.length)];
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex-grow p-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-white space-glow">📚 Learn About Space Weather</h1>
          
          {/* Random Fact */}
          <div className="glass-card border-l-4 border-yellow-400 p-4 mb-8 rounded-r-lg">
            <h2 className="text-xl font-bold mb-2 text-white space-glow">💡 Did You Know?</h2>
            <p className="text-lg text-gray-300 space-glow">{getRandomFact().fact}</p>
          </div>

          {/* Learning Sections */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {learningSections.map((section) => (
              <div key={section.id} className="glass-card rounded-xl shadow-lg overflow-hidden">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full p-6 text-left hover:bg-white hover:bg-opacity-10 transition-colors"
                >
                  <h2 className="text-2xl font-bold mb-2 text-white space-glow">{section.title}</h2>
                  <p className="text-gray-300 space-glow">{section.content}</p>
                  <div className="mt-2 text-yellow-300 space-glow">
                    {expandedSection === section.id ? '▼ Less' : '▶ More'}
                  </div>
                </button>
                
                {expandedSection === section.id && (
                  <div className="px-6 pb-6 border-t border-white border-opacity-20 bg-white bg-opacity-5">
                    <ul className="space-y-2 mt-4">
                      {section.details.map((detail, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-yellow-300 mr-2">•</span>
                          <span className="text-gray-300 space-glow">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Interactive Quiz */}
          <div className="glass-card rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-white space-glow">🧠 Test Your Knowledge</h2>
            <div className="space-y-6">
              {quizQuestions.map((question) => (
                <div key={question.id} className="border-b border-white border-opacity-20 pb-4">
                  <h3 className="text-lg font-semibold mb-3 text-white space-glow">{question.question}</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {question.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuizAnswer(question.id, index)}
                        className={`p-3 rounded-lg text-left transition-colors ${
                          quizAnswers[question.id] === index
                            ? 'bg-blue-500 bg-opacity-50 border-2 border-blue-400 text-white'
                            : 'bg-white bg-opacity-10 hover:bg-white hover:bg-opacity-20 border-2 border-transparent text-gray-300'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <button
                onClick={() => setShowResults(!showResults)}
                className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 rounded-lg text-lg font-semibold hover:from-blue-600 hover:to-purple-600 text-white transition-all duration-300 transform hover:scale-105 pulse-glow"
              >
                {showResults ? 'Hide Results' : 'Show Results'}
              </button>
              
              {showResults && (
                <div className="mt-4 p-4 glass-card rounded-lg">
                  <h3 className="text-xl font-bold mb-2 text-white space-glow">Your Score: {calculateScore()}/{quizQuestions.length}</h3>
                  <p className="text-gray-300 space-glow">
                    {calculateScore() === quizQuestions.length 
                      ? '🎉 Perfect! You\'re a space weather expert!' 
                      : calculateScore() >= quizQuestions.length / 2 
                        ? '👍 Good job! Keep learning!' 
                        : '📚 Keep studying! You\'ll get there!'}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center space-x-4">
            <Link
              to="/"
              className="bg-gradient-to-r from-yellow-500 to-orange-500 px-6 py-3 rounded-lg text-lg font-semibold hover:from-yellow-600 hover:to-orange-600 text-white transition-all duration-300 transform hover:scale-105 pulse-glow"
            >
              🏠 Back to Home
            </Link>
            <Link
              to="/aurora"
              className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-lg text-lg font-semibold hover:from-purple-600 hover:to-pink-600 text-white transition-all duration-300 transform hover:scale-105 pulse-glow"
            >
              🌌 Explore Auroras
            </Link>
            <Link
              to="/game"
              className="bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-3 rounded-lg text-lg font-semibold hover:from-green-600 hover:to-emerald-600 text-white transition-all duration-300 transform hover:scale-105 pulse-glow"
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

export default LearnPage;
