"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface LockscreenNotificationProps {
  variant?: 1 | 2 | 3;
  onNavigateToMap?: () => void;
}

export function LockscreenNotification({
  variant = 1,
  onNavigateToMap,
}: LockscreenNotificationProps) {
  const t = useTranslations("LockscreenNotification");

  // Get variant-specific translations
  const getVariantText = () => {
    switch (variant) {
      case 1:
        return {
          name: t("screen1Name"),
          message: t("screen1Message"),
          time: t("screen1Time"),
        };
      case 2:
        return {
          name: t("screen2Name"),
          message: t("screen2Message"),
          time: t("screen2Time"),
        };
      case 3:
        return {
          name: t("screen3Name"),
          message: t("screen3Message"),
          time: t("screen3Time"),
        };
      default:
        return {
          name: t("screen1Name"),
          message: t("screen1Message"),
          time: t("screen1Time"),
        };
    }
  };

  const { name, message, time } = getVariantText();
  const currentTime = "20:27";

  return (
    <div className="relative w-full h-full bg-white flex flex-col items-center justify-start pt-12 px-6">
      {/* Time Display */}
      <motion.div
        className="mb-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-8xl font-light tracking-tight text-black">
          {currentTime}
        </h1>
      </motion.div>

      {/* Notification Card */}
      <motion.div
        className="w-full max-w-md mb-auto -mt-40"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div
          className="bg-white rounded-3xl border-2 border-[#FF69B4] p-4 shadow-sm cursor-pointer hover:border-[#FF1493] transition-colors"
          onClick={onNavigateToMap}
        >
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div className="shrink-0 w-12 h-12 relative">
              <Image
                src="/images/sofina-logo-pink.svg"
                alt="Sofina"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="font-semibold text-black text-base">{name}</h3>
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {time}
                </span>
              </div>
              <p className="text-sm text-black leading-snug">{message}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
