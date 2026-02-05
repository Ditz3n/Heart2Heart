// src/app/[locale]/not-found.tsx

import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl lg:text-8xl font-serif text-primary mb-4">
          {t("title")}
        </h1>
        <p className="text-xl text-muted-foreground mb-8">{t("message")}</p>
        <Link href="/">
          <Button variant="default" size="lg">
            <Home className="h-5 w-5 mr-2" />
            {t("backHome")}
          </Button>
        </Link>
      </div>
    </div>
  );
}
