'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useTransition } from 'react';

export function LanguageToggle() {
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const onSelectChange = (newLocale: string) => {
    startTransition(() => {
      // Get the current pathname without the locale prefix
      const pathWithoutLocale = pathname.replace(`/${locale}`, '');
      // Navigate to the same path with the new locale
      router.replace(`/${newLocale}${pathWithoutLocale}`);
    });
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => onSelectChange('en')}
        disabled={isPending}
        className={`px-4 py-2 rounded-md border transition-colors ${
          locale === 'en'
            ? 'bg-blue-500 text-white border-blue-500'
            : 'border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => onSelectChange('da')}
        disabled={isPending}
        className={`px-4 py-2 rounded-md border transition-colors ${
          locale === 'da'
            ? 'bg-blue-500 text-white border-blue-500'
            : 'border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
        aria-label="Switch to Danish"
      >
        DA
      </button>
    </div>
  );
}
