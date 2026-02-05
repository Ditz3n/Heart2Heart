// src/app/[locale]/stories/page.tsx

import { StoriesView } from "@/components/views/stories-view";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "StoriesPage" });

  return {
    title: `Heart2Heart - ${t("title")}`,
  };
}

export default function StoriesPage() {
  return <StoriesView />;
}
