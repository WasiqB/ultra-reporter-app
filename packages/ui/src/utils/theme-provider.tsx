'use client';

import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes';

export const ThemeProvider = ({
  children,
  ...props
}: ThemeProviderProps): JSX.Element => {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};
