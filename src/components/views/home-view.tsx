// src/components/views/home-view.tsx
"use client";

import { FadeInView } from "@/components/animations/fade-in-view";
import { PulsingHeart } from "@/components/animations/pulsing-heart";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

export function HomeView() {
  const t = useTranslations("MainPage");
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen gradient-hero flex flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center justify-center gap-8 lg:gap-12 py-20">
        {/* Logo */}
        <FadeInView delay={0.1}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Image
              src={
                mounted && theme === "dark"
                  ? "/images/sofina-logo-white.svg"
                  : "/images/sofina-logo-pink.svg"
              }
              alt="Sofina"
              width={256}
              height={100}
              className="w-52 lg:w-72 h-auto"
              priority
            />
          </motion.div>
        </FadeInView>

        {/* Slogan */}
        <FadeInView delay={0.3}>
          <p className="text-xl lg:text-2xl text-muted-foreground text-center max-w-md font-light italic">
            {t("slogan")}
          </p>
        </FadeInView>

        {/* Pulsing Heart */}
        <FadeInView delay={0.5}>
          <div className="mt-8 lg:mt-12">
            <PulsingHeart />
          </div>
        </FadeInView>
      </div>
    </div>
  );
}
