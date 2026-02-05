import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { ExampleNavbar } from '@/components/ExampleNavbar';

type Props = {
  params: { locale: string };
};

export default function HomePage({ params: { locale } }: Props) {
  // Enable static rendering
  setRequestLocale(locale);

  const t = useTranslations('welcome');

  return (
    <>
      <ExampleNavbar />
      <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-background text-foreground">
        <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm">
          <h1 className="text-4xl font-bold text-center mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-center text-gray-600 dark:text-gray-400">
            {t('subtitle')}
          </p>
          <div className="mt-8 text-center">
            <p className="text-lg">
              This example navbar demonstrates the language and theme toggle buttons. You can customize or replace it with your own navigation.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
