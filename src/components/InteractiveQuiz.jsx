import React, { useState } from 'react';

function InteractiveQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      id: 1,
      question: "What happens when Sunny affects GPS satellites?",
      options: [
        "They work better",
        "They lose signal and tractors go off course",
        "They become invisible",
        "They start singing"
      ],
      correct: 1,
      explanation: "Solar flares can disrupt GPS signals, causing navigation problems for farmers and other users!"
    },
    {
      id: 2,
      question: "How do pilots handle radio interference from solar flares?",
      options: [
        "They stop flying",
        "They use backup radio systems",
        "They fly faster",
        "They turn off all electronics"
      ],
      correct: 1,
      explanation: "Smart pilots have backup communication systems to handle solar flare interference!"
    },
    {
      id: 3,
      question: "What do astronauts do when solar radiation increases?",
      options: [
        "They go outside to see the aurora",
        "They move to shielded areas of the ISS",
        "They call for help",
        "They take more photos"
      ],
      correct: 1,
      explanation: "NASA scientists keep astronauts safe by having them move to radiation-shielded areas!"
    },
    {
      id: 4,
      question: "What beautiful phenomenon do solar flares create on Earth?",
      options: [
        "Rainbows",
        "Auroras (Northern/Southern Lights)",
        "Lightning",
        "Tornadoes"
      ],
      correct: 1,
      explanation: "Solar particles create the beautiful auroras that light up the sky in green, purple, and pink!"
    },
    {
      id: 5,
      question: "What is the main lesson Sunny learned?",
      options: [
        "Solar flares are always bad",
        "With science and teamwork, we can handle space weather",
        "We should avoid space",
        "Only astronauts matter"
      ],
      correct: 1,
      explanation: "Sunny learned that space weather affects everyone, but with science and preparation, we can all stay safe!"
    }
  ];

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerIndex
    });
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correct) {
        correct++;
      }
    });
    setScore(correct);
    return correct;
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScore();
      setShowResults(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  if (showResults) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="glass-card rounded-2xl shadow-xl p-8 text-center">
        <h2 className="text-3xl font-bold text-white space-glow mb-6">
          🎉 Quiz Complete!
        </h2>
        
        <div className="mb-6">
          <div className="text-6xl mb-4">
            {percentage >= 80 ? '🌟' : percentage >= 60 ? '👍' : '📚'}
          </div>
          <h3 className="text-2xl font-bold text-white space-glow mb-2">
            Your Score: {score}/{questions.length} ({percentage}%)
          </h3>
          <p className="text-xl text-gray-300 space-glow">
            {percentage >= 80 
              ? "Excellent! You're a space weather expert!" 
              : percentage >= 60 
                ? "Good job! You understand space weather well!" 
                : "Keep learning! Space weather is fascinating!"}
          </p>
        </div>

        <div className="space-y-4 mb-6">
          {questions.map((question, index) => (
            <div key={question.id} className="glass-card rounded-xl p-4 text-left">
              <h4 className="font-semibold text-white space-glow mb-2">
                Question {index + 1}: {question.question}
              </h4>
              <p className="text-gray-300 space-glow">
                <span className="font-semibold">Your answer:</span> {question.options[selectedAnswers[question.id]]}
              </p>
              <p className="text-gray-300 space-glow">
                <span className="font-semibold">Correct answer:</span> {question.options[question.correct]}
              </p>
              <p className="text-yellow-300 space-glow mt-2">
                💡 {question.explanation}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={resetQuiz}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 pulse-glow"
          >
            🔄 Try Again
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const hasAnswered = selectedAnswers[currentQ.id] !== undefined;

  return (
    <div className="glass-card rounded-2xl shadow-xl p-8">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white space-glow mb-2">
          🧠 Test Your Space Weather Knowledge!
        </h2>
        <p className="text-gray-300 space-glow">
          Question {currentQuestion + 1} of {questions.length}
        </p>
        <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-bold text-white space-glow mb-4">
          {currentQ.question}
        </h3>
        
        <div className="space-y-3">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(currentQ.id, index)}
              className={`w-full p-4 rounded-lg text-left transition-all duration-300 ${
                selectedAnswers[currentQ.id] === index
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white transform scale-105 pulse-glow'
                  : 'bg-white bg-opacity-10 hover:bg-white hover:bg-opacity-20 text-gray-300 hover:text-white'
              }`}
            >
              <span className="font-semibold mr-2">{String.fromCharCode(65 + index)}.</span>
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={prevQuestion}
          disabled={currentQuestion === 0}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
            currentQuestion === 0 
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white transform hover:scale-105'
          }`}
        >
          ← Previous
        </button>

        <button
          onClick={nextQuestion}
          disabled={!hasAnswered}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
            !hasAnswered
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white transform hover:scale-105'
          }`}
        >
          {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next →'}
        </button>
      </div>
    </div>
  );
}

export default InteractiveQuiz;
