"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface MapScreenProps {
  variant?: 1 | 2 | 3;
}

export function MapScreen({ variant = 1 }: MapScreenProps) {
  const t = useTranslations("MapScreen");

  const getVariantText = () => {
    switch (variant) {
      case 1:
        return {
          name: t("screen1Name"),
          distance: t("screen1Distance"),
          walkTime: t("screen1WalkTime"),
          bikeTime: t("screen1BikeTime"),
          carTime: t("screen1CarTime"),
        };
      case 2:
        return {
          name: t("screen2Name"),
          distance: t("screen2Distance"),
          walkTime: t("screen2WalkTime"),
          bikeTime: t("screen2BikeTime"),
          carTime: t("screen2CarTime"),
        };
      case 3:
        return {
          name: t("screen3Name"),
          distance: t("screen3Distance"),
          walkTime: t("screen3WalkTime"),
          bikeTime: t("screen3BikeTime"),
          carTime: t("screen3CarTime"),
        };
      default:
        return {
          name: t("screen1Name"),
          distance: t("screen1Distance"),
          walkTime: t("screen1WalkTime"),
          bikeTime: t("screen1BikeTime"),
          carTime: t("screen1CarTime"),
        };
    }
  };

  const { name, distance, walkTime, bikeTime, carTime } = getVariantText();

  return (
    <div className="relative w-full h-full bg-white flex flex-col">
      {/* Header with white background */}
      <motion.div
        className="relative bg-white pt-12 pb-4 px-6 shadow-sm z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center justify-between">
          <button className="text-[#FF69B4]" aria-label="Back">
            <ArrowLeft className="w-8 h-8" strokeWidth={2.5} />
          </button>
          <button className="text-[#FF69B4]" aria-label="Menu">
            <Menu className="w-8 h-8" strokeWidth={2.5} />
          </button>
        </div>
      </motion.div>

      {/* Map View - Using the uploaded image */}
      <motion.div
        className="relative flex-1 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Image
          src="/images/app-screen-2.png"
          alt="Map view"
          fill
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Location Info Card */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl px-6 pt-6 pb-8"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.4, type: "spring" }}
      >
        {/* Pink Heart Icon with Name */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-[#FF69B4] rounded-full flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
              <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-black">{name}</h3>
        </div>

        {/* Distance Info */}
        <p className="text-base font-semibold text-black mb-4">{distance}</p>

        {/* Travel Times */}
        <div className="space-y-3">
          {/* Walking */}
          <div className="flex items-center gap-3">
            <svg
              className="w-6 h-6 text-[#FF69B4]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M14.12,10H19V8.2H15.38L13.38,4.87C13.08,4.37 12.54,4.03 11.92,4.03C11.74,4.03 11.58,4.06 11.42,4.11L6,5.8V11H7.8V7.33L9.91,6.67L6,22H7.8L10.67,13.89L13,17V22H14.8V15.59L12.31,11.05L13.04,8.18M14,3.8C15,3.8 15.8,3 15.8,2C15.8,1 15,0.2 14,0.2C13,0.2 12.2,1 12.2,2C12.2,3 13,3.8 14,3.8Z" />
            </svg>
            <span className="text-base text-black">{walkTime}</span>
          </div>

          {/* Biking */}
          <div className="flex items-center gap-3">
            <svg
              className="w-6 h-6 text-[#FF69B4]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M5,20.5A3.5,3.5 0 0,1 1.5,17A3.5,3.5 0 0,1 5,13.5A3.5,3.5 0 0,1 8.5,17A3.5,3.5 0 0,1 5,20.5M5,12A5,5 0 0,0 0,17A5,5 0 0,0 5,22A5,5 0 0,0 10,17A5,5 0 0,0 5,12M14.8,10H19V8.2H15.8L14.2,4.5C13.9,4 13.4,3.7 12.8,3.7C12.6,3.7 12.5,3.7 12.3,3.8L7.5,5.4V9H9.3V6.6L11.3,6L12.5,8.5L9,11.5V17H10.8V12.6L13,10.8L13.8,12.7C14.4,16 17,18.3 20.2,18.3V16.5C17.6,16.5 15.4,14.7 14.8,12.3L14.8,10M19,20.5A3.5,3.5 0 0,1 15.5,17A3.5,3.5 0 0,1 19,13.5A3.5,3.5 0 0,1 22.5,17A3.5,3.5 0 0,1 19,20.5M19,12A5,5 0 0,0 14,17A5,5 0 0,0 19,22A5,5 0 0,0 24,17A5,5 0 0,0 19,12M16,4.8C17,4.8 17.8,4 17.8,3C17.8,2 17,1.2 16,1.2C15,1.2 14.2,2 14.2,3C14.2,4 15,4.8 16,4.8Z" />
            </svg>
            <span className="text-base text-black">{bikeTime}</span>
          </div>

          {/* Driving */}
          <div className="flex items-center gap-3">
            <svg
              className="w-6 h-6 text-[#FF69B4]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M18.92,6.01C18.72,5.42 18.16,5 17.5,5H6.5C5.84,5 5.29,5.42 5.08,6.01L3,12V20A1,1 0 0,0 4,21H5A1,1 0 0,0 6,20V19H18V20A1,1 0 0,0 19,21H20A1,1 0 0,0 21,20V12L18.92,6.01M6.5,16A1.5,1.5 0 0,1 5,14.5A1.5,1.5 0 0,1 6.5,13A1.5,1.5 0 0,1 8,14.5A1.5,1.5 0 0,1 6.5,16M17.5,16A1.5,1.5 0 0,1 16,14.5A1.5,1.5 0 0,1 17.5,13A1.5,1.5 0 0,1 19,14.5A1.5,1.5 0 0,1 17.5,16M5,11L6.5,6.5H17.5L19,11H5Z" />
            </svg>
            <span className="text-base text-black">{carTime}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
