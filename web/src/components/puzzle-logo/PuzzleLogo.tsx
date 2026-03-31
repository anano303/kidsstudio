"use client";

import React, { useEffect, useState, useRef } from "react";
import "./PuzzleLogo.css";

interface PuzzleLogoProps {
  size?: number;
}

const PuzzleLogo: React.FC<PuzzleLogoProps> = ({ size = 350 }) => {
  const [assembled, setAssembled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [idle, setIdle] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Small delay to ensure the component is mounted and painted before animation starts
    const timer = setTimeout(() => {
      setVisible(true);
      // After all pieces fly in (~1.2s animation + 0.7s last delay), show center text
      setTimeout(() => setAssembled(true), 2200);
      // After assembly + text pop, start continuous idle animations
      setTimeout(() => setIdle(true), 3200);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={containerRef}
      className="puzzle-logo-container"
      style={{ width: size, height: size }}
    >
      {/* Puzzle pieces that fly in and assemble */}
      <div className="puzzle-wrapper">
        {/* Piece 1: Top-left - "G" letter block */}
        <div className={`puzzle-piece piece-1 ${visible ? "animate" : ""} ${idle ? "idle" : ""}`}>
          <svg viewBox="0 0 120 120" className="piece-svg">
            <rect x="5" y="5" width="110" height="110" rx="16" fill="#FF6B9D" />
            <text
              x="60"
              y="82"
              textAnchor="middle"
              fontFamily="'Fredoka One', 'Comic Sans MS', sans-serif"
              fontSize="72"
              fontWeight="bold"
              fill="white"
            >
              G
            </text>
          </svg>
        </div>

        {/* Piece 2: Top-right - Star with hanger */}
        <div className={`puzzle-piece piece-2 ${visible ? "animate" : ""} ${idle ? "idle" : ""}`}>
          <svg viewBox="0 0 120 120" className="piece-svg">
            <rect x="5" y="5" width="110" height="110" rx="16" fill="#4ECDC4" />
            <g transform="translate(30, 20)">
              <path
                d="M30 0 C30 0 30 8 30 8 L22 8 L22 60 L38 60 L38 8 L30 8"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M15 12 L22 12 L22 55 L38 55 L38 12 L45 12 L45 8 L15 8 Z"
                fill="white"
                opacity="0.9"
              />
              <polygon
                points="30,25 33,33 41,33 35,37 37,44 30,40 23,44 25,37 19,33 27,33"
                fill="#FFD93D"
              />
            </g>
          </svg>
        </div>

        {/* Piece 3: Bottom-left - "K" letter block */}
        <div className={`puzzle-piece piece-3 ${visible ? "animate" : ""} ${idle ? "idle" : ""}`}>
          <svg viewBox="0 0 120 120" className="piece-svg">
            <rect x="5" y="5" width="110" height="110" rx="16" fill="#FFD93D" />
            <text
              x="60"
              y="82"
              textAnchor="middle"
              fontFamily="'Fredoka One', 'Comic Sans MS', sans-serif"
              fontSize="72"
              fontWeight="bold"
              fill="#2D2D2D"
            >
              K
            </text>
          </svg>
        </div>

        {/* Piece 4: Bottom-right - Baby shoe */}
        <div className={`puzzle-piece piece-4 ${visible ? "animate" : ""} ${idle ? "idle" : ""}`}>
          <svg viewBox="0 0 120 120" className="piece-svg">
            <rect x="5" y="5" width="110" height="110" rx="16" fill="#A78BFA" />
            <g transform="translate(22, 30)">
              <path
                d="M10 50 C10 50 5 35 15 20 C25 5 45 5 55 15 C65 25 70 35 75 40 C80 45 75 55 65 55 L10 55 Z"
                fill="white"
                opacity="0.9"
              />
              <circle cx="35" cy="30" r="4" fill="#A78BFA" />
              <circle cx="48" cy="25" r="4" fill="#A78BFA" />
              <circle cx="58" cy="32" r="3.5" fill="#A78BFA" />
            </g>
          </svg>
        </div>

        {/* Center text that appears after assembly */}
        <div className={`puzzle-center-text ${assembled ? "show" : ""}`}>
          <svg viewBox="0 0 260 80" className="center-text-svg">
            <text
              x="130"
              y="38"
              textAnchor="middle"
              fontFamily="'Fredoka One', 'Comic Sans MS', 'Arial Rounded MT Bold', sans-serif"
              fontSize="36"
              fontWeight="bold"
              fill="#2D2D2D"
              letterSpacing="2"
            >
              GalaKids
            </text>
            <text
              x="130"
              y="62"
              textAnchor="middle"
              fontFamily="'Arial Rounded MT Bold', sans-serif"
              fontSize="12"
              fill="#888"
              letterSpacing="3"
            >
              CHILDREN&apos;S FASHION
            </text>
          </svg>
        </div>
      </div>

      {/* Decorative sparkles */}
      <div className={`sparkles ${assembled ? "show" : ""}`}>
        <span className="sparkle s1">✦</span>
        <span className="sparkle s2">★</span>
        <span className="sparkle s3">✦</span>
        <span className="sparkle s4">★</span>
        <span className="sparkle s5">✦</span>
        <span className="sparkle s6">★</span>
      </div>
    </div>
  );
};

export default PuzzleLogo;
