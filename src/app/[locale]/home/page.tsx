// src/app/[locale]/home/page.tsx

import { AnimatedLogo } from "@/components/animations/animated-logo";
import { FadeInView } from "@/components/animations/fade-in-view";
import { PulsingHeart } from "@/components/animations/pulsing-heart";

const MainPage = () => {
  return (
    <div className="min-h-screen gradient-hero flex flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center justify-center gap-8 lg:gap-12 py-20">
        {/* Logo */}
        <FadeInView delay={0.1}>
          <AnimatedLogo />
        </FadeInView>

        {/* Slogan */}
        <FadeInView delay={0.3}>
          <p className="text-xl lg:text-2xl text-muted-foreground text-center max-w-md font-light italic">
            Creating inclusive futures by designing with care
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
};

export default MainPage;
