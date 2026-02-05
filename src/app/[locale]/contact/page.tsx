// src/app/[locale]/contact/page.tsx

import { ContactView } from "@/components/views/contact-view";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ContactPage" });

  return {
    title: t("title"),
  };
}

export default function ContactPage() {
  return <ContactView />;
}
