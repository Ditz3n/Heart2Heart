// src/app/page.tsx

import { routing } from "@/i18n/routing";
import { redirect } from "next/navigation";

// This page will never actually be rendered, but it needs to exist to handle the root redirect
export default function RootPage() {
  redirect(`/${routing.defaultLocale}`);
}
