# Heart2Heart

A Web Application For a startup named Sofina/Heart2Heart

## Features

- ✅ **Next.js 14** - Latest version with App Router
- ✅ **TypeScript** - Type-safe development
- ✅ **Tailwind CSS** - Utility-first CSS framework
- ✅ **next-intl** - Internationalization with Danish (da) and English (en) support
- ✅ **next-themes** - Dark/Light theme support with system preference detection
- ✅ **Provider Setup** - Both theme and locale providers wrap the entire app

## Getting Started

### Installation

First, install the dependencies:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The app will redirect to the default locale (English). You can access different locales:
- English: [http://localhost:3000/en](http://localhost:3000/en)
- Danish: [http://localhost:3000/da](http://localhost:3000/da)

### Build

Build the application for production:

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Project Structure

```
Heart2Heart/
├── app/
│   ├── [locale]/           # Locale-based routes
│   │   ├── layout.tsx      # Root layout with providers
│   │   └── page.tsx        # Home page
│   ├── providers/          # Provider components
│   │   └── ThemeProvider.tsx
│   └── globals.css         # Global styles
├── components/             # Reusable components
│   ├── ThemeToggle.tsx     # Theme switcher button
│   ├── LanguageToggle.tsx  # Language switcher buttons
│   └── ExampleNavbar.tsx   # Example navigation bar
├── messages/               # Translation files
│   ├── da.json            # Danish translations
│   └── en.json            # English translations
├── i18n.ts                # i18n configuration
└── middleware.ts          # Next.js middleware for locale handling
```

## Usage

### Adding Translations

Add your translation keys to the JSON files in the `messages/` directory:

**messages/en.json**
```json
{
  "mySection": {
    "title": "My Title",
    "description": "My Description"
  }
}
```

**messages/da.json**
```json
{
  "mySection": {
    "title": "Min Titel",
    "description": "Min Beskrivelse"
  }
}
```

### Using Translations in Components

```tsx
import { useTranslations } from 'next-intl';

export function MyComponent() {
  const t = useTranslations('mySection');
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
```

### Using the Theme Toggle

The `ThemeToggle` component is ready to use in your navigation bar:

```tsx
import { ThemeToggle } from '@/components/ThemeToggle';

export function MyNavbar() {
  return (
    <nav>
      {/* Your nav items */}
      <ThemeToggle />
    </nav>
  );
}
```

### Using the Language Toggle

The `LanguageToggle` component allows users to switch between languages:

```tsx
import { LanguageToggle } from '@/components/LanguageToggle';

export function MyNavbar() {
  return (
    <nav>
      {/* Your nav items */}
      <LanguageToggle />
    </nav>
  );
}
```

### Complete Example with Navigation

See `components/ExampleNavbar.tsx` for a complete example of a navigation bar with both theme and language toggles.

## Theming

The app supports light and dark themes using `next-themes`:
- Automatically detects system preference
- Manual toggle available via `ThemeToggle` component
- Uses Tailwind's `dark:` variant for styling
- Theme is persisted in localStorage

### Styling with Theme Support

```tsx
<div className="bg-white dark:bg-gray-900 text-black dark:text-white">
  Content that adapts to theme
</div>
```

## Internationalization

The app uses `next-intl` for internationalization:
- Automatic locale detection from URL
- Middleware handles locale routing
- Supports multiple locales (en, da)
- Easy to add more languages

### Adding a New Language

1. Create a new translation file: `messages/fr.json`
2. Update `i18n.ts`:
```ts
export const locales = ['en', 'da', 'fr'] as const;
```
3. Update middleware matcher in `middleware.ts`:
```ts
matcher: ['/', '/(da|en|fr)/:path*']
```

## Customization

### Change Default Locale

Edit `i18n.ts`:
```ts
export const defaultLocale = 'da' as const; // Change to Danish
```

### Modify Theme Colors

Edit `app/globals.css` to change CSS variables:
```css
:root {
  --background: #ffffff;
  --foreground: #171717;
}
```

Or extend Tailwind config in `tailwind.config.ts`.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [next-themes Documentation](https://github.com/pacocoursey/next-themes)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

