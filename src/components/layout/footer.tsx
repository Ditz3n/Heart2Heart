// src/components/layout/footer.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Instagram, Linkedin, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

import { useIsMobileOS } from "@/lib/hooks/use-mobile-os";

const sponsors = [
  {
    name: "Mikrolegat",
    logo: "/images/mikrolegat.png",
    href: "https://mikrolegat.ffefonden.dk/",
  },
  {
    name: "Aarhus University",
    logo: "/images/aarhus-university.png",
    href: "https://www.au.dk/",
  },
  {
    name: "Innovationsfonden",
    logo: "/images/innovationsfonden.png",
    href: "https://innovationsfonden.dk/da",
  },
  {
    name: "Fonden for Entreprenørskab",
    logo: "/images/fonden-entreprenorskab.png",
    href: "https://ffefonden.dk/",
  },
];

const socialLinks = [
  {
    name: "Instagram",
    href: "https://instagram.com/heart2heart_dk",
    icon: Instagram,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/sofina",
    icon: Linkedin,
  },
  {
    name: "Email",
    href: "mailto:Kontakt@sofina.dk",
    icon: Mail,
  },
];

export function Footer() {
  const t = useTranslations("Footer");
  const isMobileOS = useIsMobileOS();

  return (
    <footer
      className="bg-card border-t border-border/50"
      style={{
        paddingBottom: isMobileOS
          ? "max(env(safe-area-inset-bottom, 0px), 2.5rem)"
          : undefined,
      }}
    >
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        {/* Backed By Section */}
        <div className="mb-12">
          <p className="text-center text-sm text-muted-foreground mb-6 font-medium uppercase tracking-wider">
            {t("supportedBy")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
            {sponsors.map((sponsor) => (
              <Link
                key={sponsor.name}
                href={sponsor.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="relative h-12 w-32 opacity-80 hover:opacity-100 transition-opacity cursor-pointer dark:brightness-200">
                  <Image
                    src={sponsor.logo}
                    alt={sponsor.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100px, 140px"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="border-t border-border/50 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            {/* Address - Now a link */}
            <div className="text-center lg:text-left">
              <Link
                href="https://www.google.com/maps/place//data=!4m2!3m1!1s0x464c3fe8e66f5c9b:0x6fa86992cbd6eeba?sa=X&ved=1t:8290&ictx=111"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer group"
              >
                <div className="inline text-sm text-muted-foreground group-hover:text-primary transition-colors">
                  {t("address1")}
                  <br />
                  {t("address2")}
                </div>
              </Link>
            </div>

            {/* Social Links - Centered */}
            <div className="flex items-center justify-center gap-3">
              {socialLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-primary hover:bg-primary-soft cursor-pointer"
                  >
                    <link.icon className="h-5 w-5" />
                  </Button>
                </Link>
              ))}
            </div>

            {/* Legal */}
            <div className="text-center lg:text-right">
              <Link
                href="https://www.proff.dk/firma/sofina-holding-aps/aarhus-c/it-drift-og-support/0R53SRI0ZDG"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                CVR: 45617777
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-border/50 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
