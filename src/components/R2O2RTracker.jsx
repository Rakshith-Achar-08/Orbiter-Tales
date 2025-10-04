import React, { useState, useEffect } from 'react';

function R2O2RTracker() {
  const [activeNode, setActiveNode] = useState(null);
  const [dataFlow, setDataFlow] = useState(false);
  const [currentPhase, setCurrentPhase] = useState('Research');

  const phases = [
    {
      id: 'research',
      name: 'Research',
      icon: '🔬',
      description: 'Scientific discovery and data collection',
      color: 'from-blue-500 to-cyan-500',
      agencies: ['NASA', 'NSF', 'Universities']
    },
    {
      id: 'operations',
      name: 'Operations',
      icon: '🛰️',
      description: 'Real-time monitoring and data processing',
      color: 'from-green-500 to-emerald-500',
      agencies: ['NOAA', 'NASA', 'ESA']
    },
    {
      id: 'forecast',
      name: 'Forecast',
      icon: '📊',
      description: 'Predictive modeling and alert generation',
      color: 'from-purple-500 to-pink-500',
      agencies: ['NOAA SWPC', 'NASA', 'DoD']
    },
    {
      id: 'response',
      name: 'Response',
      icon: '⚡',
      description: 'Implementation and impact mitigation',
      color: 'from-orange-500 to-red-500',
      agencies: ['FEMA', 'Utilities', 'Aviation']
    }
  ];

  const agencies = [
    {
      id: 'nasa',
      name: 'NASA',
      logo: '🚀',
      role: 'Space Research & Technology',
      description: 'Conducts space weather research, operates satellites, and develops prediction models.',
      funding: '$25.2B',
      keyPrograms: ['Parker Solar Probe', 'Solar Dynamics Observatory', 'Space Weather Research']
    },
    {
      id: 'noaa',
      name: 'NOAA',
      logo: '🌊',
      role: 'Weather & Climate Services',
      description: 'Operates the Space Weather Prediction Center, provides forecasts and alerts.',
      funding: '$6.8B',
      keyPrograms: ['Space Weather Prediction Center', 'GOES Satellites', 'Space Weather Alerts']
    },
    {
      id: 'dod',
      name: 'Department of Defense',
      logo: '🛡️',
      role: 'National Security',
      description: 'Protects military assets and communications from space weather impacts.',
      funding: '$715B',
      keyPrograms: ['Space Force', 'Military Communications', 'Satellite Protection']
    },
    {
      id: 'nsf',
      name: 'NSF',
      logo: '🎓',
      role: 'Scientific Research',
      description: 'Funds basic research in space physics and solar-terrestrial interactions.',
      funding: '$8.5B',
      keyPrograms: ['Atmospheric Sciences', 'Solar Physics', 'Geospace Research']
    }
  ];

  useEffect(() => {
    // Simulate data flow animation
    const interval = setInterval(() => {
      setDataFlow(prev => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Cycle through phases
    const phaseInterval = setInterval(() => {
      setCurrentPhase(prev => {
        const currentIndex = phases.findIndex(p => p.id === prev);
        const nextIndex = (currentIndex + 1) % phases.length;
        return phases[nextIndex].id;
      });
    }, 5000);

    return () => clearInterval(phaseInterval);
  }, []);

  const getPhaseColor = (phaseId) => {
    const phase = phases.find(p => p.id === phaseId);
    return phase ? phase.color : 'from-gray-500 to-gray-600';
  };

  return (
    <div className="glass-card rounded-2xl shadow-xl p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white space-glow mb-4">
          🔄 R2O2R Tracker
        </h2>
        <p className="text-gray-300 space-glow">
          Research → Operations → Forecast → Response
        </p>
        <p className="text-sm text-gray-400 mt-2">
          Real-time tracking of space weather data flow and agency coordination
        </p>
      </div>

      {/* R2O2R Flow Diagram */}
      <div className="glass-card rounded-xl p-8 mb-8">
        <h3 className="text-xl font-bold text-white space-glow mb-6 text-center">
          Data Flow Visualization
        </h3>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {phases.map((phase, index) => (
            <div key={phase.id} className="relative">
              {/* Connection Lines */}
              {index < phases.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 transform -translate-y-1/2 z-0">
                  <div className={`absolute top-0 right-0 w-0 h-0 border-l-4 border-l-cyan-400 border-t-2 border-b-2 border-t-transparent border-b-transparent transform translate-x-full -translate-y-1/2 ${
                    dataFlow ? 'animate-pulse' : ''
                  }`} />
                </div>
              )}
              
              <button
                onClick={() => setActiveNode(phase.id)}
                className={`relative z-10 w-full p-4 rounded-xl transition-all duration-500 transform hover:scale-105 ${
                  currentPhase === phase.id
                    ? `bg-gradient-to-r ${phase.color} text-white pulse-glow`
                    : activeNode === phase.id
                      ? `bg-gradient-to-r ${phase.color} text-white opacity-80`
                      : 'glass-card hover:bg-white hover:bg-opacity-10 text-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">{phase.icon}</div>
                  <h4 className="font-bold text-sm mb-1">{phase.name}</h4>
                  <p className="text-xs opacity-80">{phase.description}</p>
                </div>
              </button>
            </div>
          ))}
        </div>

        {/* Current Phase Indicator */}
        <div className="mt-6 text-center">
          <div className="inline-block glass-card rounded-lg px-4 py-2">
            <span className="text-sm text-gray-300">Currently Active: </span>
            <span className={`font-bold text-lg ${getPhaseColor(currentPhase).split(' ')[1].replace('to-', 'text-')}`}>
              {phases.find(p => p.id === currentPhase)?.name}
            </span>
          </div>
        </div>
      </div>

      {/* Agency Details */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Agency List */}
        <div>
          <h3 className="text-xl font-bold text-white space-glow mb-6">Participating Agencies</h3>
          <div className="space-y-4">
            {agencies.map((agency) => (
              <button
                key={agency.id}
                onClick={() => setActiveNode(agency.id)}
                className={`w-full p-4 rounded-xl transition-all duration-300 ${
                  activeNode === agency.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white transform scale-105 pulse-glow'
                    : 'glass-card hover:bg-white hover:bg-opacity-10 text-gray-300'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{agency.logo}</div>
                  <div className="text-left">
                    <h4 className="font-bold">{agency.name}</h4>
                    <p className="text-sm opacity-80">{agency.role}</p>
                    <p className="text-xs opacity-60">Funding: {agency.funding}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Agency Details */}
        <div>
          <h3 className="text-xl font-bold text-white space-glow mb-6">Agency Information</h3>
          {activeNode && agencies.find(a => a.id === activeNode) ? (
            <div className="glass-card rounded-xl p-6">
              {(() => {
                const agency = agencies.find(a => a.id === activeNode);
                return (
                  <>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="text-4xl">{agency.logo}</div>
                      <div>
                        <h4 className="text-xl font-bold text-white space-glow">{agency.name}</h4>
                        <p className="text-gray-300">{agency.role}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{agency.description}</p>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Annual Funding:</span>
                        <span className="text-white font-semibold">{agency.funding}</span>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-yellow-300 mb-2">Key Programs:</h5>
                        <ul className="text-sm text-gray-300 space-y-1">
                          {agency.keyPrograms.map((program, index) => (
                            <li key={index} className="flex items-center">
                              <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2" />
                              {program}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          ) : activeNode && phases.find(p => p.id === activeNode) ? (
            <div className="glass-card rounded-xl p-6">
              {(() => {
                const phase = phases.find(p => p.id === activeNode);
                return (
                  <>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="text-4xl">{phase.icon}</div>
                      <div>
                        <h4 className="text-xl font-bold text-white space-glow">{phase.name}</h4>
                        <p className="text-gray-300">{phase.description}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-blue-300 mb-2">Participating Agencies:</h5>
                      <div className="flex flex-wrap gap-2">
                        {phase.agencies.map((agency, index) => (
                          <span key={index} className="bg-blue-500 bg-opacity-20 text-blue-300 px-3 py-1 rounded-full text-sm">
                            {agency}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          ) : (
            <div className="glass-card rounded-xl p-8 text-center">
              <div className="text-6xl mb-4">🏛️</div>
              <h4 className="text-xl font-bold text-white space-glow mb-2">Select an Agency or Phase</h4>
              <p className="text-gray-300">
                Click on any agency or phase to learn more about their role in space weather coordination.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Data Flow Statistics */}
      <div className="mt-8 glass-card rounded-xl p-6">
        <h3 className="text-lg font-bold text-white space-glow mb-4">📊 Data Flow Statistics</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-400">24/7</div>
            <div className="text-sm text-gray-300">Continuous Monitoring</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">15min</div>
            <div className="text-sm text-gray-300">Average Alert Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">95%</div>
            <div className="text-sm text-gray-300">Prediction Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400">50+</div>
            <div className="text-sm text-gray-300">Partner Agencies</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default R2O2RTracker;
