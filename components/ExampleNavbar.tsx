'use client';

import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';
import { useTranslations } from 'next-intl';

export function ExampleNavbar() {
  const t = useTranslations('navigation');

  return (
    <nav className="w-full border-b border-gray-200 dark:border-gray-800 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex space-x-8">
            <a href="#" className="text-foreground hover:text-gray-600 dark:hover:text-gray-400">
              {t('home')}
            </a>
            <a href="#" className="text-foreground hover:text-gray-600 dark:hover:text-gray-400">
              {t('about')}
            </a>
            <a href="#" className="text-foreground hover:text-gray-600 dark:hover:text-gray-400">
              {t('contact')}
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
