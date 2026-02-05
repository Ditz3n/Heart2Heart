// src/app/not-found.tsx

import "@/app/globals.css";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen gradient-hero flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-6xl lg:text-8xl font-serif text-primary mb-4">
              404
            </h1>
            <p className="text-xl text-muted-foreground mb-8">Page not found</p>
            <Link href="/en">
              <Button variant="default" size="lg">
                <Home className="h-5 w-5 mr-2" />
                Back to home
              </Button>
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
