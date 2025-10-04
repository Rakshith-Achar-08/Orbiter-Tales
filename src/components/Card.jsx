// src/components/Card.jsx
import React from "react";

function Card({ title, description, icon }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition max-w-sm text-center">
      <div className="text-4xl mb-3">{icon}</div>
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default Card;
