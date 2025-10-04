// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 glass-card shadow-lg relative z-10">
      {/* Logo / Sunny */}
      <div className="flex items-center space-x-2 text-xl font-bold text-white space-glow">
        <span className="animate-bounce float-animation">☀️</span>
        <span>Sunny's Adventure</span>
      </div>

      {/* Navigation Links */}
      <div className="space-x-4">
        <Link to="/" className="text-white hover:text-yellow-300 transition-colors duration-300 space-glow">Home</Link>
        <Link to="/story" className="text-white hover:text-yellow-300 transition-colors duration-300 space-glow">Story</Link>
        <Link to="/game" className="text-white hover:text-yellow-300 transition-colors duration-300 space-glow">Game</Link>
        <Link to="/aurora" className="text-white hover:text-yellow-300 transition-colors duration-300 space-glow">Aurora</Link>
        <Link to="/facts" className="text-white hover:text-yellow-300 transition-colors duration-300 space-glow">Facts</Link>
        <Link to="/learn" className="text-white hover:text-yellow-300 transition-colors duration-300 space-glow">Learn</Link>
        <Link to="/dashboard" className="text-white hover:text-yellow-300 transition-colors duration-300 space-glow">Dashboard</Link>
      </div>
    </nav>
  );
}

export default Navbar;
