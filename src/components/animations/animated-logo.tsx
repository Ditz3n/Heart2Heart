"use client";

import { motion } from "framer-motion";

export function AnimatedLogo() {
  return (
    <>
      <motion.img
        src="/images/sofina-logo-pink.svg"
        alt="Sofina"
        className="w-48 lg:w-64 h-auto dark:hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      <motion.img
        src="/images/sofina-logo-white.svg"
        alt="Sofina"
        className="w-48 lg:w-64 h-auto hidden dark:block"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </>
  );
}
