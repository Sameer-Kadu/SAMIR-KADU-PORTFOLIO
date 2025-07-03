'use client';

import { ThemeProvider as NextThemesProvider } from "next-themes";

const themes = {
  minimal: {
    bg: '#ffffff',
    text: '#000000',
  },
  vibrant: {
    bg: '#ff00ff',
    text: '#ffff00',
  },
  neon: {
    bg: '#000000',
    text: '#00ff00',
  },
};

export function ThemeProvider({ children, ...props }: React.PropsWithChildren<any>) {
  return (
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  );
}
