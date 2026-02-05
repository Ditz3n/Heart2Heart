"use client";

import { Button } from "@/components/ui/button";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import Image from "next/image";
import {
  ComponentProps,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { HamburgerMenu } from "./hamburger-menu";

// --- Flags Components ---
const DanishFlag = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 32 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="32" height="24" fill="#C8102E" />
    <rect x="10" width="4" height="24" fill="#FFFFFF" />
    <rect y="10" width="32" height="4" fill="#FFFFFF" />
  </svg>
);

const BritishFlag = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 32 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="32" height="24" fill="#012169" />
    <path d="M0 0L32 24M32 0L0 24" stroke="#FFFFFF" strokeWidth="4" />
    <path d="M0 0L32 24M32 0L0 24" stroke="#C8102E" strokeWidth="2" />
    <rect x="13" width="6" height="24" fill="#FFFFFF" />
    <rect y="9" width="32" height="6" fill="#FFFFFF" />
    <rect x="14" width="4" height="24" fill="#C8102E" />
    <rect y="10" width="32" height="4" fill="#C8102E" />
  </svg>
);

// --- NavLink Component ---
interface NavLinkProps extends Omit<ComponentProps<typeof Link>, "href"> {
  href: string;
  activeClassName?: string;
  isActive: boolean;
}

function NavLink({
  href,
  activeClassName,
  isActive,
  className,
  children,
  ...props
}: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(className, isActive && activeClassName)}
      {...props}
    >
      {children}
    </Link>
  );
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mobileMenuScrollable, setMobileMenuScrollable] = useState(false);
  const [, startTransition] = useTransition();

  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Header");
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Handle Scroll Locking, Animation timing, and Layout Shift
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      // 1. Add padding to body
      document.body.style.paddingRight = `${scrollbarWidth}px`;

      // 2. Capture current refs to variables to use in cleanup (Fixes lint error)
      const headerElement = headerRef.current;
      const menuElement = menuRef.current;

      // 3. Apply padding to elements
      if (headerElement) {
        headerElement.style.paddingRight = `${scrollbarWidth}px`;
      }
      if (menuElement) {
        menuElement.style.paddingRight = `${scrollbarWidth}px`;
      }

      // 4. Lock scroll
      document.body.style.overflow = "hidden";

      const timeout = setTimeout(() => {
        setMobileMenuScrollable(true);
      }, 300);

      return () => {
        clearTimeout(timeout);
        // Reset styles
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";

        // Use the captured variables for cleanup
        if (headerElement) {
          headerElement.style.paddingRight = "";
        }
        if (menuElement) {
          menuElement.style.paddingRight = "";
        }

        setMobileMenuScrollable(false);
      };
    }
  }, [isOpen]);

  const getPathWithoutLocale = (path: string) => {
    const pathSegments = path.split("/").filter(Boolean);
    if (pathSegments[0] === locale) {
      return "/" + pathSegments.slice(1).join("/");
    }
    return path;
  };

  const currentPath = getPathWithoutLocale(pathname);

  const navLinks = [
    { href: `/`, label: t("home") },
    { href: `/stories`, label: t("stories") },
    { href: `/product`, label: t("product") },
    { href: `/contact`, label: t("contact") },
  ];

  const isActive = (href: string) => {
    if (href === "/" && currentPath === "/") return true;
    if (href !== "/" && currentPath.startsWith(href)) return true;
    return false;
  };

  const toggleLanguage = () => {
    const newLocale = locale === "da" ? "en" : "da";
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 bg-background lg:bg-background/80 lg:backdrop-blur-xl border-b border-border/50 h-16 lg:h-20 transition-[padding] duration-200"
      >
        <div className="lg:container lg:mx-auto px-4 lg:px-8 h-full">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center h-full">
            {/* Mobile Logo - Left */}
            <div className="flex items-center lg:hidden col-start-1">
              <Link
                href="/"
                className="inline-flex items-center"
                onClick={() => setIsOpen(false)}
              >
                <Image
                  src="/images/sofina-logo-pink.svg"
                  alt="Sofina"
                  width={100}
                  height={40}
                  className="h-10 w-auto object-contain dark:hidden"
                  priority
                />
                <Image
                  src="/images/sofina-logo-white.svg"
                  alt="Sofina"
                  width={100}
                  height={40}
                  className="h-10 w-auto object-contain hidden dark:block"
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center justify-center gap-0 col-start-2 justify-self-center">
              {navLinks.slice(0, 2).map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  isActive={isActive(link.href)}
                  className="w-28 text-center"
                >
                  <Button
                    variant="nav"
                    className={cn(
                      "cursor-pointer w-full",
                      isActive(link.href) ? "text-primary" : "",
                    )}
                  >
                    {link.label}
                  </Button>
                </NavLink>
              ))}

              {/* Spacer for the absolutely centered logo */}
              <div className="w-28 lg:w-36 shrink-0" />

              {/* Center Logo (Desktop) - absolutely centered */}
              <Link href="/" className="absolute left-1/2 -translate-x-1/2">
                <Image
                  src="/images/sofina-logo-pink.svg"
                  alt="Sofina"
                  width={120}
                  height={48}
                  className="h-10 lg:h-12 w-auto object-contain dark:hidden"
                  priority
                />
                <Image
                  src="/images/sofina-logo-white.svg"
                  alt="Sofina"
                  width={120}
                  height={48}
                  className="h-10 lg:h-12 w-auto object-contain hidden dark:block"
                  priority
                />
              </Link>

              {navLinks.slice(2).map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  isActive={isActive(link.href)}
                  className="w-28 text-center"
                >
                  <Button
                    variant="nav"
                    className={cn(
                      "cursor-pointer w-full",
                      isActive(link.href) ? "text-primary" : "",
                    )}
                  >
                    {link.label}
                  </Button>
                </NavLink>
              ))}
            </nav>

            {/* Right Side Controls */}
            <div className="flex items-center gap-1 justify-end col-start-3 justify-self-end">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleLanguage}
                className="text-muted-foreground hover:text-primary cursor-pointer"
                aria-label={
                  locale === "da" ? t("switchToEnglish") : t("switchToDanish")
                }
              >
                {locale === "da" ? (
                  <DanishFlag className="h-5 w-5 rounded-sm" />
                ) : (
                  <BritishFlag className="h-5 w-5 rounded-sm" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="text-muted-foreground hover:text-primary cursor-pointer"
              >
                {mounted && theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>

              <div className="lg:hidden z-[60]">
                <HamburgerMenu
                  isOpen={isOpen}
                  onClick={() => setIsOpen(!isOpen)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* --- Mobile Menu Dropdown --- */}
        <div
          ref={menuRef}
          className={cn(
            "lg:hidden fixed top-16 left-0 right-0 bg-background border-b border-border/50 z-50 transition-all duration-300 ease-in-out shadow-xl",
            isOpen
              ? "max-h-[calc(100vh-4rem)] opacity-100"
              : "max-h-0 opacity-0",
            mobileMenuScrollable ? "overflow-auto" : "overflow-hidden",
          )}
        >
          <div className="flex flex-col p-6 space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                isActive={isActive(link.href)}
                className="text-lg font-medium py-3 px-4 rounded-xl transition-colors text-muted-foreground hover:text-primary hover:bg-primary-soft cursor-pointer flex items-center"
                activeClassName="!text-primary bg-primary-soft"
              >
                {link.label}
              </NavLink>
            ))}

            <div className="pt-4 mt-2 border-t border-border">
              <p className="text-xs text-muted-foreground text-center uppercase tracking-widest">
                Sofina
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
          style={{ top: "4rem" }}
        />
      )}
    </>
  );
}
