import React, { useState, useEffect, useRef } from 'react';
import './StoryPage.css';

const StoryPage = () => {
  const [currentPanel, setCurrentPanel] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [flaryPosition, setFlaryPosition] = useState({ x: 0, y: 0 });
  const [auroraIntensity, setAuroraIntensity] = useState(0);
  const [realTimeData, setRealTimeData] = useState(null);
  const [dialogueStep, setDialogueStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [typedText, setTypedText] = useState('');
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // Enhanced story panels with scientific accuracy
  const storyPanels = [
    {
      id: 0,
      title: "The Sun's Magnetic Storm",
      content: "Meet Flary, an X-class solar flare born from twisted magnetic fields on the Sun! These magnetic fields get contorted and stretched until they snap and reconnect, releasing enormous energy - as much as a billion hydrogen bombs!",
      flaryPos: { x: 15, y: 50 },
      auroraIntensity: 0,
      flareClass: "X",
      speed: 0
    },
    {
      id: 1,
      title: "The Speed of Light Journey",
      content: "Flary's energy travels at the speed of light - 186,000 miles per second! This means it reaches Earth in just 8 minutes, bringing intense radiation across the electromagnetic spectrum from X-rays to radio waves.",
      flaryPos: { x: 35, y: 50 },
      auroraIntensity: 0,
      flareClass: "X",
      speed: 50
    },
    {
      id: 2,
      title: "Radiation Storm Begins",
      content: "Flary accelerates charged particles - electrons and protons - into space at incredible speeds! The fastest particles can travel 93 million miles from Sun to Earth in just 30 minutes, creating a radiation storm.",
      flaryPos: { x: 55, y: 50 },
      auroraIntensity: 20,
      flareClass: "X",
      speed: 75
    },
    {
      id: 3,
      title: "Coronal Mass Ejection",
      content: "An enormous cloud of electrically charged plasma erupts from the Sun - a Coronal Mass Ejection! This CME can blast billions of tons of material into space, traveling at millions of miles per hour.",
      flaryPos: { x: 75, y: 50 },
      auroraIntensity: 40,
      flareClass: "X",
      speed: 90
    },
    {
      id: 4,
      title: "Earth's Magnetic Shield",
      content: "The solar storm approaches Earth's magnetic field! When CMEs interact with Earth's magnetosphere, they can trigger geomagnetic storms that affect our technology and create beautiful auroras.",
      flaryPos: { x: 85, y: 50 },
      auroraIntensity: 60,
      flareClass: "X",
      speed: 95
    },
    {
      id: 5,
      title: "Aurora Creation",
      content: "Charged particles from Flary follow Earth's magnetic field lines to the poles, where they collide with atoms in our atmosphere, creating the aurora borealis and australis - nature's own light show!",
      flaryPos: { x: 90, y: 50 },
      auroraIntensity: 85,
      flareClass: "X",
      speed: 100
    },
    {
      id: 6,
      title: "Technology Impact",
      content: "Anna, a pilot, experiences the effects! Solar storms can disrupt radio communications, affect GPS signals, and even cause power grid fluctuations. But they also create the most beautiful auroras!",
      flaryPos: { x: 95, y: 50 },
      auroraIntensity: 100,
      flareClass: "X",
      speed: 100
    },
    {
      id: 7,
      title: "The 11-Year Solar Cycle",
      content: "This is part of the Sun's 11-year activity cycle! During solar maximum, we see more sunspots, solar flares, and CMEs. The cycle continues, with NASA's fleet of spacecraft monitoring every event.",
      flaryPos: { x: 100, y: 50 },
      auroraIntensity: 70,
      flareClass: "X",
      speed: 80
    }
  ];

  // Dialogue script between two characters
  const dialogue = [
    {
      speaker: 'Flary',
      avatar: '🌟',
      text: "I'm Flary! I bring light and charged particles from the Sun.",
      choices: [
        { label: 'Tell me about auroras!', effect: { auroraDelta: 15, next: 1 } },
        { label: 'Will this affect planes?', effect: { auroraDelta: 5, next: 2 } }
      ]
    },
    {
      speaker: 'Anna',
      avatar: '✈️',
      text: 'Auroras glow brighter when solar storms intensify near the poles!',
      choices: [
        { label: 'Make it brighter ✨', effect: { auroraDelta: 20, next: 3 } },
        { label: 'Calm skies please 🌙', effect: { auroraDelta: -10, next: 3 } }
      ]
    },
    {
      speaker: 'Anna',
      avatar: '✈️',
      text: 'Pilots may switch radio frequencies and reroute polar flights.',
      choices: [
        { label: 'Boost the storm 💥', effect: { auroraDelta: 25, next: 3 } },
        { label: 'Reduce activity 🧘', effect: { auroraDelta: -15, next: 3 } }
      ]
    },
    {
      speaker: 'Flary',
      avatar: '🌟',
      text: 'Great choice! Ready to continue the journey across panels?',
      choices: [
        { label: 'Auto-play ▶️', effect: { autoplay: true, next: 4 } },
        { label: 'Manual explore ⏸️', effect: { autoplay: false, next: 4 } }
      ]
    },
    {
      speaker: 'Anna',
      avatar: '✈️',
      text: 'Use the numbered buttons below to hop through key moments!',
      choices: []
    }
  ];

  // Typewriter effect for dialogue
  useEffect(() => {
    const current = dialogue[dialogueStep];
    if (!current) return;
    setIsTyping(true);
    setTypedText('');
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setTypedText(current.text.slice(0, i));
      if (i >= current.text.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 20);
    return () => clearInterval(interval);
  }, [dialogueStep]);

  const handleChoice = (choice) => {
    if (typeof choice?.effect?.auroraDelta === 'number') {
      setAuroraIntensity(prev => Math.max(0, Math.min(100, prev + choice.effect.auroraDelta)));
    }
    if (typeof choice?.effect?.autoplay === 'boolean') {
      setIsPlaying(choice.effect.autoplay);
    }
    if (typeof choice?.effect?.next === 'number') {
      setDialogueStep(choice.effect.next);
    }
  };

  // Fetch real-time space weather data
  useEffect(() => {
    const fetchSpaceWeatherData = async () => {
      try {
        // NASA DONKI API for solar events
        const donkiResponse = await fetch('https://api.nasa.gov/DONKI/FLR?api_key=DEMO_KEY');
        const donkiData = await donkiResponse.json();
        
        // NOAA Space Weather Prediction Center
        const noaaResponse = await fetch('https://services.swpc.noaa.gov/json/planetary_k_index_1m.json');
        const noaaData = await noaaResponse.json();
        
        setRealTimeData({
          solarFlares: donkiData,
          geomagneticIndex: noaaData
        });
      } catch (error) {
        console.log('Using demo data for space weather');
        setRealTimeData({
          solarFlares: [{ beginTime: new Date().toISOString(), classType: 'M1.5' }],
          geomagneticIndex: [{ kp: 3.2 }]
        });
      }
    };

    fetchSpaceWeatherData();
  }, []);

  // Galaxy animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const stars = [];
    const numStars = 200;

    // Create stars
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random()
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw moving stars
      stars.forEach(star => {
        star.x += star.speed;
        if (star.x > canvas.width) star.x = 0;
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });

      // Draw aurora effect
      if (auroraIntensity > 0) {
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, `rgba(0, 255, 100, ${auroraIntensity / 100})`);
        gradient.addColorStop(0.5, `rgba(255, 0, 150, ${auroraIntensity / 200})`);
        gradient.addColorStop(1, `rgba(0, 100, 255, ${auroraIntensity / 300})`);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [auroraIntensity]);

  // Auto-play story
  useEffect(() => {
    if (isPlaying && currentPanel < storyPanels.length - 1) {
      const timer = setTimeout(() => {
        setCurrentPanel(prev => prev + 1);
        setFlaryPosition(storyPanels[currentPanel + 1].flaryPos);
        setAuroraIntensity(storyPanels[currentPanel + 1].auroraIntensity);
      }, 3000);

      return () => clearTimeout(timer);
    } else if (currentPanel === storyPanels.length - 1) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentPanel, storyPanels]);

  const handlePanelClick = (panelIndex) => {
    setCurrentPanel(panelIndex);
    setFlaryPosition(storyPanels[panelIndex].flaryPos);
    setAuroraIntensity(storyPanels[panelIndex].auroraIntensity);
  };

  const startStory = () => {
    setCurrentPanel(0);
    setFlaryPosition(storyPanels[0].flaryPos);
    setAuroraIntensity(storyPanels[0].auroraIntensity);
    setIsPlaying(true);
  };

  const resetStory = () => {
    setIsPlaying(false);
    setCurrentPanel(0);
    setFlaryPosition(storyPanels[0].flaryPos);
    setAuroraIntensity(storyPanels[0].auroraIntensity);
  };

  return (
    <div className="story-page">
      {/* Galaxy Background Canvas */}
      <canvas 
        ref={canvasRef}
        className="galaxy-canvas"
        width={window.innerWidth}
        height={window.innerHeight}
      />

      {/* Story Container */}
      <div className="story-container">
        {/* Two-character Dialogue UI */}
        <div className="dialogue-wrapper">
          <div className="dialogue-card glass">
            <div className="dialogue-header">
              <div className="speaker">
                <span className="avatar">{dialogue[dialogueStep]?.avatar}</span>
                <span className="name">{dialogue[dialogueStep]?.speaker}</span>
              </div>
              <div className="intensity">Aurora: {auroraIntensity}%</div>
            </div>
            <div className={`dialogue-text ${isTyping ? 'typing' : ''}`}>
              {typedText}
            </div>
            <div className="dialogue-choices">
              {(dialogue[dialogueStep]?.choices || []).length === 0 ? (
                <button
                  className="choice-btn"
                  onClick={() => setDialogueStep(Math.min(dialogueStep + 1, dialogue.length - 1))}
                >
                  Continue
                </button>
              ) : (
                (dialogue[dialogueStep]?.choices || []).map((c, idx) => (
                  <button key={idx} className="choice-btn" onClick={() => handleChoice(c)}>
                    {c.label}
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
        {/* Navigation */}
        <div className="story-nav">
          <button onClick={startStory} className="play-btn">
            {isPlaying ? 'Playing...' : '▶️ Play Story'}
          </button>
          <button onClick={resetStory} className="reset-btn">
            🔄 Reset
          </button>
          </div>

        {/* Panel Navigation */}
        <div className="panel-nav">
          {storyPanels.map((panel, index) => (
            <button
              key={panel.id}
              className={`panel-btn ${currentPanel === index ? 'active' : ''}`}
              onClick={() => handlePanelClick(index)}
            >
              {index + 1}
            </button>
          ))}
            </div>

        {/* Current Panel Content */}
        <div className="panel-content">
          <h2 className="panel-title">{storyPanels[currentPanel].title}</h2>
          <p className="panel-text">{storyPanels[currentPanel].content}</p>
            </div>

            {/* Interactive Elements */}
        <div className="interactive-elements">
          {/* Flary Avatar */}
          <div 
            className="flary-avatar"
            style={{
              left: `${flaryPosition.x}%`,
              top: `${flaryPosition.y}%`,
              transform: `scale(${1 + auroraIntensity / 100})`
            }}
            onClick={() => {
              // Trigger Flary's voice
              if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(
                  "Hi kids! I'm Flary, a solar flare from the Sun! I travel millions of miles to Earth, and along the way, I meet satellites and create beautiful auroras. Let's go on an adventure together!"
                );
                utterance.rate = 0.8;
                utterance.pitch = 1.2;
                speechSynthesis.speak(utterance);
              }
            }}
          >
            🌟
              </div>

          {/* Anna Avatar */}
          <div 
            className="anna-avatar"
            onClick={() => {
              if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(
                  "Hello! I'm Anna, a young pilot. Today, I will fly through the skies while learning about solar flares, CMEs, and auroras. Sometimes, space weather can make my instruments glitch, but it's also magical!"
                );
                utterance.rate = 0.9;
                utterance.pitch = 1.1;
                speechSynthesis.speak(utterance);
              }
            }}
          >
            ✈️
          </div>

          {/* Satellites */}
          <div className="satellites">
            <div className="satellite" style={{ left: '30%', top: '20%' }}>🛰️</div>
            <div className="satellite" style={{ left: '50%', top: '30%' }}>🛰️</div>
            <div className="satellite" style={{ left: '70%', top: '25%' }}>🛰️</div>
              </div>

          {/* Global Kids */}
          <div className="global-kids">
            <div className="kid" style={{ left: '10%', top: '80%' }}>👧</div>
            <div className="kid" style={{ left: '30%', top: '85%' }}>👦</div>
            <div className="kid" style={{ left: '60%', top: '82%' }}>👧</div>
            <div className="kid" style={{ left: '80%', top: '88%' }}>👦</div>
            </div>
          </div>

        {/* Real-time Data Display */}
        {realTimeData && (
          <div className="real-time-data">
            <h3>Live Space Weather</h3>
            <div className="data-item">
              <span>Solar Flares: {realTimeData.solarFlares.length} detected</span>
            </div>
            <div className="data-item">
              <span>Geomagnetic Index: Kp {realTimeData.geomagneticIndex[0]?.kp || 'N/A'}</span>
              </div>
            <div className="data-item">
              <span>Aurora Intensity: {auroraIntensity}%</span>
              </div>
            </div>
          )}

        {/* Interactive Pop-ups */}
        <div className="pop-ups">
          <div className="pop-up" id="solar-fact">
            <h4>Did you know?</h4>
            <p>Solar flares can travel from the Sun to Earth in 8 minutes to several days!</p>
              </div>
          <div className="pop-up" id="aurora-fact">
            <h4>Aurora Magic!</h4>
            <p>Auroras happen when charged particles from the Sun hit Earth's atmosphere.</p>
            </div>
          <div className="pop-up" id="storm-fact">
            <h4>Space Weather Impact!</h4>
            <p>Geomagnetic storms can disrupt GPS signals, radios, and even power grids!</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default StoryPage;
