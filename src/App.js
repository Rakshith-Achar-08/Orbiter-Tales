import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import UniverseBackground from './components/UniverseBackground';

// Import pages
import LandingPage from './pages/LandingPage';
import StoryPage from './pages/StoryPage';
import GamePage from './pages/GamePage';
import AuroraPage from './pages/AururaPage';
import LearnPage from './pages/LearnPage';
import FactsPage from './pages/FactsPage';
import SolarImpactDashboardPage from './pages/SolarImpactDashboardPage';

function App() {
  return (
    <Router>
      <div className="App">
        <UniverseBackground />
        <div className="universe-container">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/story" element={<StoryPage />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/aurora" element={<AuroraPage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/facts" element={<FactsPage />} />
            <Route path="/dashboard" element={<SolarImpactDashboardPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
