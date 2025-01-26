'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

const ThemeSwitcher = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const isDarkMode = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDarkMode ? 'light' : 'dark')}
      className="rounded-full p-[11px] hover:bg-muted"
    >
      {isDarkMode ? (
        <Sun className="size-[18px]" strokeWidth={1} />
      ) : (
        <Moon className="size-[18px]" strokeWidth={1} />
      )}
    </button>
  );
};

export default ThemeSwitcher;
