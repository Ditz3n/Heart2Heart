// src/components/animations/PulsingHeart.tsx
"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function PulsingHeart() {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("PulsingHeart");

  const handleClick = () => {
    router.push(`/${locale}/product`);
  };

  return (
    <motion.button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative cursor-pointer focus:outline-none group"
      whileTap={{ scale: 0.95 }}
      aria-label={t("text")}
    >
      {/* Outer glow */}
      <motion.div
        className="absolute inset-0 rounded-full bg-primary/20 blur-3xl"
        animate={{
          scale: isHovered ? 1 : [1, 1.2, 1],
          opacity: isHovered ? 0.3 : [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 1.5,
          repeat: isHovered ? 0 : Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Heart container */}
      <motion.div
        className="relative w-64 h-64 lg:w-80 lg:h-80 flex items-center justify-center"
        animate={{
          scale: isHovered ? 1 : [1, 1.06, 1, 1.03, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: isHovered ? 0 : Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Background heart shape */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Heart
            className="w-full h-full text-primary dark:text-white drop-shadow-lg transition-all duration-300"
            fill="currentColor"
            strokeWidth={0}
          />
        </div>

        {/* Text inside heart - properly centered */}
        <div className="relative z-10 flex items-center justify-center text-center px-12 pb-4">
          <p className="text-primary-foreground text-lg lg:text-xl font-semibold leading-tight drop-shadow-sm">
            {t("text")}
          </p>
        </div>
      </motion.div>

      {/* Click hint */}
      <motion.p
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {t("clickHint")}
      </motion.p>
    </motion.button>
  );
}
