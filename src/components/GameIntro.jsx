// src/components/GameIntro.jsx
import React from "react";
import Button from "./Button";

function GameIntro() {
  return (
    <div className="text-center bg-gradient-to-b from-yellow-100 to-orange-200 p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">🎮 Space Weather Game</h2>
      <p className="mb-4">
        Help Sunny the Solar Flare travel safely to Earth while avoiding space
        obstacles! Along the way, learn how solar storms affect our planet.
      </p>
      <Button text="Start Game" color="bg-green-500" to="/game" />
    </div>
  );
}

export default GameIntro;
