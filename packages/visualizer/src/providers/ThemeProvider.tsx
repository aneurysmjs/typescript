'use client';

import type { ThemeProviderProps } from 'next-themes';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type FC, useEffect, useState } from 'react';

const ThemeProvider: FC<ThemeProviderProps> = ({ children, ...props }) => {
  const [mounted, setMounted] = useState(false);

  /**
   * @see https://stackoverflow.com/a/79229249/5378393
   */
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>; // Render children without ThemeProvider during SSR
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};

export default ThemeProvider;
