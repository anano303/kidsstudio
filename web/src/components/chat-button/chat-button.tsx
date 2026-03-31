"use client";

import React, { useEffect, useState } from "react";
import "./chat-button.css";

const FALLBACK_MESSENGER = "https://m.me/61574139157964";

export default function ChatButton() {
  const [messengerLink, setMessengerLink] = useState(FALLBACK_MESSENGER);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/settings`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.messengerLink) {
          setMessengerLink(data.messengerLink);
        }
      })
      .catch(() => {});
  }, []);

  const handleChatClick = () => {
    window.open(messengerLink, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="chat-button"
      onClick={handleChatClick}
      title="დაგვიკავშირდით მესენჯერში"
    >
      {/* Facebook Messenger icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 28 28"
        fill="#ffffff"
      >
        <path d="M14,2.25C7.54,2.25,2.25,7.16,2.25,13.17c0,3.36,1.67,6.35,4.28,8.28V25.5l3.92-2.15c1.13,0.31,2.33,0.48,3.55,0.48c6.46,0,11.75-4.91,11.75-10.92S20.46,2.25,14,2.25z M15.34,17.5L12.5,14.5l-5.5,3l6-6.5l3,2.84l5.34-2.84L15.34,17.5z" />
      </svg>
    </div>
  );
}
