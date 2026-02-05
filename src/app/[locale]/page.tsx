// src/app/[locale]/page.tsx

import { HomeView } from "@/components/views/home-view";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "MainPage" });

  return {
    title: `Heart2Heart - ${t("slogan")}`,
  };
}

export default function HomePage() {
  return <HomeView />;
}
