"use client";

import { FadeInView } from "@/components/animations/fade-in-view";
import { Button } from "@/components/ui/button";
import { TeamMember } from "@/types/app-types";
import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const team: TeamMember[] = [
  {
    name: "Nina Isis Kinch Bolton",
    email: "nib@sofina.dk",
    image: "/images/nina.png",
  },
  {
    name: "Sofie Fürsterling Mønster",
    email: "sfm@sofina.dk",
    image: "/images/sofiem.png",
  },
  {
    name: "Sofie Lundby Andersen",
    email: "sla@sofina.dk",
    image: "/images/sofiea.png",
  },
];

export function ContactView() {
  const t = useTranslations("ContactPage");

  return (
    <div className="min-h-screen gradient-hero py-12 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <FadeInView>
          <div className="text-center mb-12 lg:mb-16">
            <h1 className="text-4xl lg:text-5xl font-serif text-foreground mb-4">
              {t("title")}
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg mx-auto">
              {t("subtitle")}
            </p>
          </div>
        </FadeInView>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {team.map((member, index) => (
              <FadeInView key={member.email} delay={0.2 + index * 0.1}>
                <div className="glass-card-hover p-6 lg:p-8 text-center min-h-82 flex flex-col justify-between">
                  <div>
                    <div className="w-24 h-24 lg:w-32 lg:h-32 mx-auto mb-6 rounded-full bg-primary-soft flex items-center justify-center overflow-hidden relative">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 96px, 128px"
                      />
                    </div>

                    <div className="space-y-2 mb-6">
                      <p className="text-sm text-primary font-medium uppercase tracking-wider">
                        {t("ceo")}
                      </p>
                      <h3 className="text-lg lg:text-xl font-serif text-foreground">
                        {member.name}
                      </h3>
                    </div>
                  </div>

                  <a href={`mailto:${member.email}`}>
                    <Button
                      variant="outline"
                      className="w-full text-sm cursor-pointer"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      {member.email}
                    </Button>
                  </a>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>

        <FadeInView delay={0.5}>
          <div className="mt-16 lg:mt-24 text-center">
            <div className="glass-card max-w-md mx-auto p-8">
              <h2 className="text-xl lg:text-2xl font-serif text-foreground mb-4">
                {t("generalInquiries")}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t("generalInquiriesDesc")}
              </p>
              <a href="mailto:Kontakt@sofina.dk">
                <Button variant="accent" size="lg" className="cursor-pointer">
                  <Mail className="h-5 w-5 mr-2" />
                  Kontakt@sofina.dk
                </Button>
              </a>
            </div>
          </div>
        </FadeInView>
      </div>
    </div>
  );
}
