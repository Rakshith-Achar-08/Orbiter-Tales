// src/components/AuroraVisualizer.jsx
import React from "react";

function AuroraVisualizer() {
  return (
    <div className="relative w-full h-64 bg-black overflow-hidden rounded-lg shadow-md">
      {/* Aurora Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-purple-400 to-blue-500 opacity-60 animate-pulse blur-2xl"></div>
      <p className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white text-lg font-bold">
        🌌 Aurora Simulation
      </p>
    </div>
  );
}

export default AuroraVisualizer;
