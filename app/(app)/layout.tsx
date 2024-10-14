import type { Metadata } from 'next';
import './globals.css';
import { DetailedHTMLProps, HtmlHTMLAttributes } from 'react';
import { Footer } from '@/components/home/footer';
import { GoogleTagManager } from '@next/third-parties/google';
import { ThemeProvider } from '@/components/utils/theme-provider';
import { createFlagsmithInstance } from 'flagsmith/isomorphic';
import FlagsProvider from '@/components/home/flags-provider';
import AnonymousSessionProvider from '@/components/utils/anon-session-provider';

export const metadata: Metadata = {
  title: 'Ultra Reporter',
  description: 'Generate beautiful reports for your test results',
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): Promise<
  DetailedHTMLProps<HtmlHTMLAttributes<HTMLHtmlElement>, HTMLHtmlElement>
> => {
  const flagsmith = createFlagsmithInstance();
  await flagsmith.init({
    environmentID: process.env.NEXT_PUBLIC_FLAGSMITH_ENVIRONMENT_ID,
  });
  const serverState = flagsmith.getState();

  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <link rel='icon' href='/favicon.png' sizes='any' type='image/png' />
      </head>
      <AnonymousSessionProvider>
        <FlagsProvider serverState={serverState}>
          <body className={'antialiased'}>
            <ThemeProvider
              attribute='class'
              defaultTheme='light'
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Footer />
            </ThemeProvider>
          </body>
        </FlagsProvider>
      </AnonymousSessionProvider>
      {process.env.VERCEL_ENV === 'production' && (
        <GoogleTagManager gtmId='G-CNW9F6PH7P' />
      )}
    </html>
  );
};

export default RootLayout;
