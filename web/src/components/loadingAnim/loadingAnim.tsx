"use client";

import React, { useEffect, useState } from "react";
import "./loadingAnim.css";

interface LoadingAnimProps {
  text?: string;
}

export default function LoadingAnim({ text = "იტვირთება" }: LoadingAnimProps) {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev === "...") return "";
        return prev + ".";
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-container">
      <div className="heart-beat">
        <svg
          className="loading-image"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>
      <div className="loading-text">
        {text}
        <span className="dots">{dots}</span>
      </div>
    </div>
  );
}
