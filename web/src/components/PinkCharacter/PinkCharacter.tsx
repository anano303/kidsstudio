"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/hooks/LanguageContext";
import { fetchActiveBanners } from "@/lib/banner-api";
import { Banner } from "@/types/banner";
import "./PinkCharacter.css";
import HeartLoading from "../HeartLoading/HeartLoading";

const PinkCharacter: React.FC = () => {
  const { language } = useLanguage();
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const loadBanners = async () => {
      try {
        const activeBanners = await fetchActiveBanners();
        setBanners(activeBanners);
      } catch (error) {
        console.error("Error loading banners:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBanners();
  }, []);

  // Auto-advance banners every 5 seconds (pause on hover)
  useEffect(() => {
    if (banners.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length, isPaused]);

  const nextBanner = useCallback(() => {
    setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
  }, [banners.length]);

  const prevBanner = useCallback(() => {
    setCurrentBannerIndex(
      (prev) => (prev - 1 + banners.length) % banners.length
    );
  }, [banners.length]);

  const goToBanner = useCallback((index: number) => {
    setCurrentBannerIndex(index);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (banners.length <= 1) return;

      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          prevBanner();
          break;
        case "ArrowRight":
          event.preventDefault();
          nextBanner();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextBanner, prevBanner, banners.length]);

  const currentBanner = banners[currentBannerIndex];

  // If still loading, show a loading state
  if (isLoading) {
    return (
      <div className="pink-character-wrapper">
        <section className="pink-character-section">
          <div className="pink-character-container">
            <div
              style={{
                textAlign: "center",
                color: "#cf0a0a",
                justifySelf: "center !important",
                alignSelf: "center !important",
              }}
            >
              <HeartLoading size="medium" inline={true} />
            </div>
          </div>
        </section>
      </div>
    );
  }

  // If no banners available, show default content
  if (banners.length === 0) {
    return (
      <div className="pink-character-wrapper">
        <section className="pink-character-section">
          <div className="pink-character-container">
            <div className="pink-character-content">
              <motion.h2
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="pink-character-title"
              >
                {language === "en"
                  ? "Grand sales on Pippinika shirts!!!"
                  : "გრანდიოზული ფასდაკლება პიპინიკა მაისურებზე!!!"}
              </motion.h2>

              {/* Mobile image - shown between title and button on mobile */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="shirts-container mobile-image"
              >
                <Image
                  className="shirt-image"
                  src="/ადდ.webp"
                  alt="Gray striped shirt with heart"
                  width={180}
                  height={180}
                  priority
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Link
                  href="/shop?mainCategory=6838b468293d9ff311be5237"
                  className="pink-character-button"
                >
                  {language === "en" ? "შეუკვეთე ახლავე" : "შეუკვეთე ახლავე"}
                </Link>
              </motion.div>
            </div>

            {/* Desktop image - shown on right side for desktop */}
            <div className="pink-character-images">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="shirts-container desktop-image"
              >
                <Image
                  className="shirt-image"
                  src="/ადდ.webp"
                  alt="Gray striped shirt with heart"
                  width={180}
                  height={180}
                  priority
                />
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Render banner carousel
  return (
    <div className="pink-character-wrapper">
      <section
        className="pink-character-section"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="pink-character-container">
          <div className="pink-character-content">
            <AnimatePresence mode="wait">
              <motion.h2
                key={`title-${currentBannerIndex}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="pink-character-title"
              >
                {language === "en"
                  ? currentBanner.titleEn
                  : currentBanner.title}
              </motion.h2>
            </AnimatePresence>

            {/* Mobile image - shown between title and button on mobile */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`mobile-image-${currentBannerIndex}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="shirts-container mobile-image"
              >
                <Image
                  className="shirt-image"
                  src={currentBanner.imageUrl || "/ადდ.webp"}
                  alt={
                    language === "en"
                      ? currentBanner.titleEn
                      : currentBanner.title
                  }
                  width={180}
                  height={180}
                  priority
                />
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`button-${currentBannerIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Link
                  href={currentBanner.buttonLink}
                  className="pink-character-button"
                >
                  {language === "en"
                    ? currentBanner.buttonTextEn
                    : currentBanner.buttonText}
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Desktop image - shown on right side for desktop */}
          <div className="pink-character-images">
            <AnimatePresence mode="wait">
              <motion.div
                key={`desktop-image-${currentBannerIndex}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="shirts-container desktop-image"
              >
                <Image
                  className="shirt-image"
                  src={currentBanner.imageUrl || "/ადდ.webp"}
                  alt={
                    language === "en"
                      ? currentBanner.titleEn
                      : currentBanner.title
                  }
                  width={180}
                  height={180}
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Carousel Controls */}
        {banners.length > 1 && (
          <div className="carousel-controls">
            {/* Navigation Arrows */}
            <button
              onClick={prevBanner}
              className="carousel-arrow carousel-arrow-left"
              aria-label="Previous banner"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              onClick={nextBanner}
              className="carousel-arrow carousel-arrow-right"
              aria-label="Next banner"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Dots Indicator */}
            <div className="carousel-dots">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToBanner(index)}
                  className={`carousel-dot ${
                    index === currentBannerIndex ? "active" : ""
                  }`}
                  aria-label={`Go to banner ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default PinkCharacter;
