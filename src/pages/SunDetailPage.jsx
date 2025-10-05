import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Flame, Wind, Zap, Clock, Thermometer, Atom } from 'lucide-react';

const SunDetailPage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      navigate('/');
    }, 600);
  };

  const sunData = {
    name: "The Sun",
    subtitle: "Our Star",
    diameter: "864,340 miles (1,392,700 km)",
    period: "25-35 days (rotation varies by latitude)",
    composition: "73% Hydrogen, 25% Helium, 2% other elements",
    mass: "Contains 99.86% of the Solar System's mass",
    overview: "The Sun is a G-type main-sequence star that formed approximately 4.6 billion years ago. It generates energy through nuclear fusion in its core, converting hydrogen into helium. The Sun's surface temperature is about 5,500°C (9,932°F), while its core reaches 15 million°C (27 million°F). It's so massive that it could fit 1.3 million Earths inside it!"
  };

  const sections = [
    {
      icon: <Atom className="w-8 h-8" />,
      title: "Nuclear Fusion Process",
      content: "The Sun converts 600 million tons of hydrogen into helium every second through nuclear fusion in its core, releasing enormous amounts of energy. This process has been ongoing for 4.6 billion years and will continue for another 5 billion years.",
      gradient: "from-orange-400 to-red-500"
    },
    {
      icon: <Wind className="w-8 h-8" />,
      title: "Solar Wind",
      content: "The Sun constantly emits a stream of charged particles called solar wind, traveling at speeds of 400-750 km/s. This wind extends far beyond Pluto, creating a protective bubble called the heliosphere that shields our solar system from interstellar radiation.",
      gradient: "from-yellow-400 to-orange-500"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Solar Flares & Sunspots",
      content: "Solar flares are sudden, intense bursts of radiation from the Sun's surface, releasing as much energy as a billion megatons of TNT. Sunspots are cooler, darker regions caused by intense magnetic field disturbances, appearing as dark spots on the Sun's surface.",
      gradient: "from-red-400 to-orange-600"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Life Cycle",
      content: "The Sun is currently in its main sequence phase, steadily burning hydrogen in its core. In about 5 billion years, it will exhaust its hydrogen fuel and expand into a red giant, potentially engulfing Mercury and Venus. Eventually, it will shed its outer layers and become a white dwarf.",
      gradient: "from-amber-400 to-orange-500"
    },
    {
      icon: <Thermometer className="w-8 h-8" />,
      title: "Temperature Zones",
      content: "The Sun's core reaches a staggering 15 million°C (27 million°F), while its visible surface (photosphere) is about 5,500°C (9,932°F). Paradoxically, the corona (outer atmosphere) is much hotter at over 1 million°C, a phenomenon scientists are still studying.",
      gradient: "from-yellow-500 to-red-500"
    }
  ];

  const stats = [
    { label: "Diameter", value: sunData.diameter, icon: "📏" },
    { label: "Rotation Period", value: sunData.period, icon: "🔄" },
    { label: "Composition", value: sunData.composition, icon: "⚛️" },
    { label: "Mass", value: sunData.mass, icon: "⚖️" }
  ];

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-orange-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Main content container */}
      <div className={`relative w-full max-w-6xl max-h-[90vh] mx-4 bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-700 ${isVisible ? 'scale-100 translate-y-0' : 'scale-90 translate-y-10'}`}>
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 z-10 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:rotate-90 group"
        >
          <X className="w-6 h-6 text-orange-600 group-hover:text-red-600" />
        </button>

        {/* Scrollable content */}
        <div className="overflow-y-auto max-h-[90vh] p-8 md:p-12 custom-scrollbar">
          {/* Header */}
          <div className="text-center mb-12">
            <div className={`inline-block mb-6 transform transition-all duration-1000 ${isVisible ? 'scale-100 rotate-0' : 'scale-0 rotate-180'}`}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full blur-2xl opacity-60 animate-pulse"></div>
                <Flame className="relative w-24 h-24 text-orange-500 drop-shadow-2xl" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 via-red-500 to-yellow-600 bg-clip-text text-transparent mb-4">
              {sunData.name}
            </h1>
            <p className="text-2xl text-orange-700 font-semibold mb-6">{sunData.subtitle}</p>
            <div className="max-w-3xl mx-auto text-gray-700 text-lg leading-relaxed">
              {sunData.overview}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 100 + 300}ms` }}
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <h3 className="text-sm font-semibold text-orange-600 uppercase tracking-wide mb-2">
                  {stat.label}
                </h3>
                <p className="text-gray-800 text-sm leading-relaxed">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Detailed Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <div
                key={index}
                className={`bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                style={{ transitionDelay: `${index * 150 + 600}ms` }}
              >
                <div className="flex items-start gap-6">
                  <div className={`flex-shrink-0 p-4 bg-gradient-to-br ${section.gradient} rounded-xl text-white shadow-lg`}>
                    {section.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">{section.title}</h3>
                    <p className="text-gray-700 leading-relaxed text-lg">{section.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="mt-12 text-center">
            <button
              onClick={handleClose}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 hover:from-orange-600 hover:to-red-600"
            >
              Back to Solar System
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #f97316, #ef4444);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #ea580c, #dc2626);
        }
      `}</style>
    </div>
  );
};

export default SunDetailPage;
