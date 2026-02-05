// src/app/[locale]/product/page.tsx

import { ProductView } from "@/components/views/product-view";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ProductPage" });

  return {
    title: t("title"),
  };
}

export default function ProductPage() {
  return <ProductView />;
}
