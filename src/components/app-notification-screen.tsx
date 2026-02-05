"use client";

import { motion, useAnimation } from "framer-motion";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface AppNotificationScreenProps {
  variant?: 1 | 2 | 3;
  onNavigateToMap?: () => void;
}

export function AppNotificationScreen({
  variant = 1,
  onNavigateToMap,
}: AppNotificationScreenProps) {
  const t = useTranslations("AppNotificationScreen");
  const [isBeating, setIsBeating] = useState(false);
  const heartControls = useAnimation();

  // Initialize heart animation on mount
  useEffect(() => {
    heartControls.start({
      scale: 1,
      opacity: 1,
      transition: { duration: 0.6, delay: 0.4, type: "spring", stiffness: 200 },
    });
  }, [heartControls]);

  // Get variant-specific translations
  const getVariantText = () => {
    switch (variant) {
      case 1:
        return {
          name: t("screen1Name"),
          message: t("screen1Message"),
        };
      case 2:
        return {
          name: t("screen2Name"),
          message: t("screen2Message"),
        };
      case 3:
        return {
          name: t("screen3Name"),
          message: t("screen3Message"),
        };
      default:
        return {
          name: t("screen1Name"),
          message: t("screen1Message"),
        };
    }
  };

  const { name, message } = getVariantText();

  // Heartbeat animation function
  const handleVibration = async () => {
    if (isBeating) return; // Prevent multiple clicks

    setIsBeating(true);

    // Reset to initial state first
    heartControls.set({ scale: 1 });

    // Heartbeat animation - multiple pulses
    await heartControls.start({
      scale: [1, 1.15, 1, 1.15, 1, 1.1, 1],
      transition: {
        duration: 1.2,
        times: [0, 0.14, 0.28, 0.42, 0.56, 0.7, 1],
        ease: "easeInOut",
      },
    });

    setIsBeating(false);
  };

  const handleSeeLocation = () => {
    if (onNavigateToMap) {
      onNavigateToMap();
    }
  };

  return (
    <div className="relative w-full h-full bg-white flex flex-col">
      {/* Header with white background and pink button */}
      <motion.div
        className="relative bg-white pt-12 pb-4 px-6 shadow-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <button className="text-[#FF69B4]" aria-label="Menu">
          <Menu className="w-8 h-8" strokeWidth={2.5} />
        </button>
      </motion.div>

      {/* Main Content - fit without scrolling */}
      <div className="flex-1 bg-white px-6 py-2 flex flex-col items-center justify-center">
        {/* Message Text */}
        <motion.div
          className="text-center mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-lg font-semibold text-black leading-relaxed">
            {name} {message}
          </h2>
        </motion.div>

        {/* Glossy Heart - Optimized size with heartbeat control */}
        <motion.div
          className="relative w-32 h-32 mb-3"
          initial={{ scale: 0, opacity: 0 }}
          animate={heartControls}
          transition={
            isBeating
              ? undefined
              : {
                  duration: 0.6,
                  delay: 0.4,
                  type: "spring",
                  stiffness: 200,
                }
          }
        >
          {/* Heart SVG with glossy gradient */}
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full drop-shadow-2xl"
            style={{
              filter: "drop-shadow(0 10px 30px rgba(255, 105, 180, 0.4))",
            }}
          >
            <defs>
              {/* Main gradient for heart */}
              <linearGradient
                id="heartGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  style={{ stopColor: "#FFB6D9", stopOpacity: 1 }}
                />
                <stop
                  offset="50%"
                  style={{ stopColor: "#FF69B4", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#FF1493", stopOpacity: 1 }}
                />
              </linearGradient>

              {/* Glossy highlight */}
              <radialGradient id="glossHighlight" cx="40%" cy="30%">
                <stop
                  offset="0%"
                  style={{ stopColor: "#FFFFFF", stopOpacity: 0.9 }}
                />
                <stop
                  offset="30%"
                  style={{ stopColor: "#FFFFFF", stopOpacity: 0.6 }}
                />
                <stop
                  offset="60%"
                  style={{ stopColor: "#FFB6D9", stopOpacity: 0.2 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#FF69B4", stopOpacity: 0 }}
                />
              </radialGradient>

              {/* Shadow gradient */}
              <linearGradient
                id="shadowGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop
                  offset="70%"
                  style={{ stopColor: "#FF1493", stopOpacity: 0 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#C71585", stopOpacity: 0.4 }}
                />
              </linearGradient>
            </defs>

            {/* Main heart shape */}
            <path
              d="M100,170 C100,170 30,120 30,80 C30,60 45,45 65,45 C80,45 90,55 100,70 C110,55 120,45 135,45 C155,45 170,60 170,80 C170,120 100,170 100,170 Z"
              fill="url(#heartGradient)"
            />

            {/* Glossy highlight overlay */}
            <ellipse
              cx="80"
              cy="70"
              rx="50"
              ry="45"
              fill="url(#glossHighlight)"
              opacity="0.8"
            />

            {/* Secondary smaller highlight */}
            <ellipse
              cx="120"
              cy="85"
              rx="25"
              ry="20"
              fill="#FFFFFF"
              opacity="0.3"
            />

            {/* Bottom shadow for depth */}
            <path
              d="M100,170 C100,170 30,120 30,80 C30,60 45,45 65,45 C80,45 90,55 100,70 C110,55 120,45 135,45 C155,45 170,60 170,80 C170,120 100,170 100,170 Z"
              fill="url(#shadowGradient)"
            />
          </svg>
        </motion.div>

        {/* Action Buttons - Fixed spacing */}
        <motion.div
          className="w-full max-w-xs space-y-2 mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <button
            onClick={handleVibration}
            disabled={isBeating}
            className="w-full py-3 px-6 bg-white text-[#FF69B4] border-2 border-[#FF69B4] rounded-full font-semibold text-base hover:bg-[#FF69B4] hover:text-white transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {t("sendVibration")}
          </button>

          <button
            onClick={handleSeeLocation}
            className="w-full py-3 px-6 bg-white text-[#FF69B4] border-2 border-[#FF69B4] rounded-full font-semibold text-base hover:bg-[#FF69B4] hover:text-white transition-all duration-300 shadow-md cursor-pointer"
          >
            {t("seeLocation")}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
