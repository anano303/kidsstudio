"use client";

import Image from "next/image";
import { useState } from "react";
import logo from "../../../assets/Images/galakids-logo.svg";
import "./about.css";
import creator1 from "./heart (1).png";
import creator2 from "./heart (2).png";

export default function AboutPage() {
  const [isPressed, setIsPressed] = useState(false);
  const [showParticles, setShowParticles] = useState(false);

  const playBeepSound = () => {
    const audio = new Audio("/beep.wav");
    audio.currentTime = 0;
    audio.play().catch((error) => {
      console.log("Sound play failed:", error);
    });

    // Visual effects
    setIsPressed(true);
    setShowParticles(true);

    // Reset press effect
    setTimeout(() => setIsPressed(false), 200);

    // Reset particles
    setTimeout(() => setShowParticles(false), 1000);
  };

  return (
    <div className="about-container">
      <div className="about-content">
        <div className="about-header">
          <div className="logo-decoration floating-logo">
            <div
              className={`logo-wrapper ${isPressed ? "pressed" : ""}`}
              onClick={playBeepSound}
            >
              <Image
                src={logo}
                width={300}
                height={200}
                alt="GalaKids logo"
                className="about-logo"
              />
              {showParticles && (
                <div className="sound-particles">
                  <span>🎵</span>
                  <span>🎶</span>
                  <span>💖</span>
                  <span>✨</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <h1 className="about-title">
          ჩვენ შესახებ - ანუ რატომ შეიქმნა პიპინიკები
        </h1>

        <div className="about-text">
          <div className="brand-intro">
            <h2>
              GalaKids -
              <span>
                ეს არის ბრენდი, რომელიც სიყვარულით, ხალისითა და ცოტაოდენი მაგიით
                შეიქმნა.
              </span>
            </h2>
          </div>

          <div className="about-section">
            <p>
              ჩვენი ტანსაცმელი გაფორმებულია საპიპინოებით, მაგრამ ეს მხოლოდ
              ვიზუალი არ არის - ისინი რეალურად აპიპინებენ! რადგან გვჯერა, რომ
              რაც აცვია ადამიანს, სწორედ ისაა მისი ხასიათის გაგრძელება.
            </p>
          </div>

          <div className="about-section">
            <p>
              ბრენდი GalaKids შეიქმნა ორი მეგობრის — მსახიობების რუსკა
              მაყაშვილისა და ლაშა ჯუხარაშვილის კოლაბორაციით. რომლებსაც ერთი
              მიზანი აერთიანებთ: შექმნან ტანსაცმელი და აქსესუარები, რომელიც არ
              აწესებს ჩარჩოებს და გაძლევს საშუალებას იყო ისეთი, როგორიც ხარ —
              ხალისიანი, გულწრფელი, თავისუფალი და... პიპინაა
            </p>
          </div>

          <div className="about-section highlight">
            <p>
              ასე დაიბადა პიპინიკების იდეა — ტანსაცმლის, რომელიც არ იმალება, არ
              ჩუმდება და არ ცდილობს, იყოს სხვაზე უკეთესი
            </p>
          </div>

          <div className="about-section">
            <p>
              ისეთი რაღაც უნდოდათ, რასაც ჩაიცვამ, სარკეში გაიღიმებ და იტყვი:
            </p>
            <div className="quote">&ldquo;აუ, რა კარგ ხასიათზე ვარ!&rdquo;</div>
          </div>

          <div className="about-section">
            <p>
              GalaKids არ არის მხოლოდ სტილი — ეს არის განწყობა, რომელიც მოგყვება
              ყოველდღიურად. იქნება ეს ქუჩაში, სახლში, კაფეში თუ სცენაზე, ჩვენი
              ლუქები გეხმარება, თავი იგრძნო კომფორტულად, გამორჩეულად და
              თავდაჯერებულად.
            </p>
          </div>

          <div className="about-section final">
            <p>
              თუ გიყვარს კომფორტი, სიმსუბუქე, ცოტაოდენი სიგიჟე და ბევრი
              სიყვარული
              <strong>ეს ყველაფერი ჩვენ ბრენდშია.</strong>
            </p>
          </div>

          <div className="call-to-action">
            <p>შემოგვიერთდი და ჩაიცვი პიპინიკები შენც! </p>
            <div className="cta-highlight lastCta">მოდი, ერთად დავაპიპინოთ</div>
          </div>
        </div>
        <h3 className="about-title">გაიცანი პიპინიკების შემქმნელები!</h3>

        <div className="creators">
          <Image src={creator1} alt="Creator 1" />
          <Image src={creator2} alt="Creator 2" />
        </div>
      </div>
    </div>
  );
}
