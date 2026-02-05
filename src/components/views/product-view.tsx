"use client";

import { FadeInView } from "@/components/animations/fade-in-view";
import { AppNotificationScreen } from "@/components/app-notification-screen";
import { LockscreenNotification } from "@/components/lockscreen-notification";
import { MapScreen } from "@/components/map-screen";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductFeature } from "@/types/app-types";
import { AnimatePresence, motion } from "framer-motion";
import {
  Battery,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Phone,
  Signal,
  Users,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

export function ProductView() {
  const t = useTranslations("ProductPage");
  const [currentScreen, setCurrentScreen] = useState(0);
  const [direction, setDirection] = useState(1);
  const [pendingDirection, setPendingDirection] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const features: ProductFeature[] = [
    {
      icon: MapPin,
      title: t("shareLocation"),
      description: t("shareLocationDesc"),
    },
    {
      icon: Users,
      title: t("callForHelp"),
      description: t("callForHelpDesc"),
    },
    {
      icon: Phone,
      title: t("alert112"),
      description: t("alert112Desc"),
    },
  ];

  const nextScreen = () => {
    setPendingDirection(1);
    setDirection(1);
    setCurrentScreen((prev) => (prev + 1) % 3);
  };

  const prevScreen = () => {
    setPendingDirection(-1);
    setDirection(-1);
    setCurrentScreen((prev) => (prev - 1 + 3) % 3);
  };

  const navigateToScreen = (screenIndex: number) => {
    const newDirection = screenIndex > currentScreen ? 1 : -1;
    setPendingDirection(newDirection);
    setDirection(newDirection);
    setCurrentScreen(screenIndex);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction * 300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction * -300,
      opacity: 0,
    }),
  };

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success(t("waitlistSuccess"));
    setName("");
    setEmail("");
    setIsSubmitting(false);
  };

  // Render the appropriate screen based on currentScreen index
  // Order: Lockscreen → Map → Heart
  const renderScreen = () => {
    if (currentScreen === 0) {
      return (
        <LockscreenNotification
          variant={1}
          onNavigateToMap={() => navigateToScreen(1)}
        />
      );
    } else if (currentScreen === 1) {
      return <MapScreen variant={1} />;
    } else {
      return (
        <AppNotificationScreen
          variant={1}
          onNavigateToMap={() => navigateToScreen(1)}
        />
      );
    }
  };

  // Get time based on screen
  const getCurrentTime = () => {
    return "20:27";
  };

  // Get status bar color based on screen
  const getStatusBarColor = () => {
    return currentScreen === 0 ? "text-black" : "text-black";
  };

  return (
    <div className="min-h-screen gradient-hero py-12 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <FadeInView>
          <h1 className="text-4xl lg:text-6xl font-serif text-center text-foreground mb-4">
            {t("title")}
          </h1>
        </FadeInView>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mt-12 lg:mt-16">
          <FadeInView delay={0.2}>
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              <div className="relative">
                <div className="relative w-[280px] lg:w-[320px] bg-foreground rounded-[3rem] p-2 shadow-2xl">
                  {/* Global Status Bar - Fixed position */}
                  <div className="absolute top-2.5 left-4 right-4 h-11 z-30 px-4 pt-2">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-sm font-medium ${getStatusBarColor()}`}
                      >
                        {getCurrentTime()}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <Signal
                          className={`w-4 h-4 ${getStatusBarColor()}`}
                          strokeWidth={2.5}
                        />
                        <span
                          className={`text-[11px] font-bold ${getStatusBarColor()}`}
                        >
                          5G
                        </span>
                        <Battery
                          className={`w-5 h-4 ${getStatusBarColor()}`}
                          strokeWidth={2.5}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Global Dynamic Island - positioned correctly below the edge */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black rounded-full z-30 flex items-center w-20 px-4 py-2">
                    <div className="w-1 h-1 rounded-full bg-gray-800 ml-auto"></div>
                  </div>

                  {/* Screen content */}
                  <div className="bg-white rounded-[2.5rem] overflow-hidden aspect-[9/19] relative">
                    <AnimatePresence mode="wait" custom={direction}>
                      <motion.div
                        key={currentScreen}
                        custom={pendingDirection}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="absolute inset-0"
                        transition={{ duration: 0.3 }}
                      >
                        {renderScreen()}
                      </motion.div>
                    </AnimatePresence>

                    {/* Bottom indicator line (for swipe up) */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-black rounded-full"></div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4 mt-6">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={prevScreen}
                    className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground cursor-pointer"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>

                  <div className="flex gap-2">
                    {[0, 1, 2].map((index) => (
                      <button
                        key={index}
                        onClick={() => navigateToScreen(index)}
                        className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                          currentScreen === index
                            ? "bg-primary w-4"
                            : "bg-primary/30"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={nextScreen}
                    className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground cursor-pointer"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="w-48 lg:w-64 relative aspect-square">
                <Image
                  src="/images/keychain.png"
                  alt="Heart2Heart Nøglering"
                  fill
                  className="object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </FadeInView>

          <div className="space-y-8">
            <FadeInView delay={0.3}>
              <div className="glass-card p-6 lg:p-8">
                <p className="text-lg lg:text-xl text-foreground/90 leading-relaxed">
                  {t("intro")}
                </p>
              </div>
            </FadeInView>

            <FadeInView delay={0.4}>
              <h2 className="text-2xl lg:text-3xl font-serif text-foreground">
                {t("howItWorks")}
              </h2>
            </FadeInView>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <FadeInView key={feature.title} delay={0.5 + index * 0.1}>
                  <div className="flex gap-4 p-4 rounded-2xl bg-card/50 hover:bg-card transition-colors">
                    <div className="w-12 h-12 rounded-2xl bg-primary-soft flex items-center justify-center shrink-0">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </FadeInView>
              ))}
            </div>
          </div>
        </div>

        <FadeInView delay={0.7}>
          <div className="mt-16 lg:mt-24 max-w-2xl mx-auto">
            <div className="glass-card p-8 lg:p-12 text-center">
              <h2 className="text-2xl lg:text-3xl font-serif text-foreground mb-4">
                {t("waitlistTitle")}
              </h2>
              <p className="text-muted-foreground mb-8">{t("waitlistDesc")}</p>

              <form onSubmit={handleWaitlist} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    type="text"
                    placeholder={t("namePlaceholder")}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="rounded-2xl border-border/50 bg-background/50 h-12"
                  />
                  <Input
                    type="email"
                    placeholder={t("emailPlaceholder")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-2xl border-border/50 bg-background/50 h-12"
                  />
                </div>

                <Button
                  type="submit"
                  variant="accent"
                  size="lg"
                  className="w-full sm:w-auto cursor-pointer"
                  disabled={isSubmitting || !name.trim() || !email.trim()}
                >
                  {isSubmitting ? t("signingUp") : t("signUpButton")}
                </Button>
              </form>
            </div>
          </div>
        </FadeInView>
      </div>
    </div>
  );
}
