import { BookOpen, Moon, Sun } from 'lucide-react';
import { ThemeMode } from '../hooks/useTheme';

interface HeaderProps {
  fullName: string;
  theme: ThemeMode;
  onToggleTheme: () => void;
}

export function Header({ fullName, theme, onToggleTheme }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-stone-200/80 dark:border-stone-800/80 bg-[#FAF8F5]/90 dark:bg-[#0F1115]/90 backdrop-blur-md">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-amber-600 focus:px-3 focus:py-1.5 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to main content
      </a>

      <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-4 sm:px-6 py-4">
        <a
          href="#top"
          className="inline-flex items-center gap-2 text-stone-900 dark:text-stone-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 rounded-md"
        >
          <BookOpen className="h-5 w-5 shrink-0 text-amber-700 dark:text-amber-400" aria-hidden="true" />
          <span className="font-serif text-base sm:text-lg font-semibold tracking-tight">
            {fullName}
          </span>
        </a>

        <nav aria-label="Primary navigation" className="flex items-center gap-3 sm:gap-5">
          <a
            href="#timeline"
            className="text-xs sm:text-sm font-medium text-stone-700 hover:text-stone-900 dark:text-stone-300 dark:hover:text-stone-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 rounded px-1 py-0.5 transition-colors"
          >
            Timeline
          </a>
          <a
            href="#ask-bekzat"
            className="text-xs sm:text-sm font-medium text-stone-700 hover:text-stone-900 dark:text-stone-300 dark:hover:text-stone-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 rounded px-1 py-0.5 transition-colors"
          >
            Ask Q&amp;A
          </a>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            aria-pressed={theme === 'dark'}
            className="inline-flex items-center gap-1.5 rounded-full border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 px-3 py-1.5 text-xs font-medium text-stone-800 dark:text-stone-200 hover:border-stone-400 dark:hover:border-stone-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 transition-colors"
          >
            {theme === 'light' ? (
              <>
                <Moon className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Dark</span>
              </>
            ) : (
              <>
                <Sun className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
                <span>Light</span>
              </>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
