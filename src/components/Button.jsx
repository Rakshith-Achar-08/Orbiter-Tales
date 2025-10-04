// src/components/Button.jsx
import React from "react";
import { Link } from "react-router-dom";

function Button({ text, color = "bg-yellow-400", to = "/" }) {
  return (
    <Link
      to={to}
      className={`${color} px-6 py-3 rounded-lg text-lg font-semibold text-white shadow hover:opacity-80 transition`}
    >
      {text}
    </Link>
  );
}

export default Button;
