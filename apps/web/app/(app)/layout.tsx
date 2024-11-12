import { GoogleTagManager } from '@next/third-parties/google';
import { Provider as AnalyticsProvider } from '@ultra-reporter/analytics/client';
import '@ultra-reporter/ui/global.css';
import { Footer } from '@ultra-reporter/ui/home/footer';
import { ThemeProvider } from '@ultra-reporter/ui/utils/theme-provider';
import { isProd } from '@ultra-reporter/utils/constants';
import type { Metadata } from 'next';
import { DetailedHTMLProps, HtmlHTMLAttributes } from 'react';

export const metadata: Metadata = {
  title: 'Ultra Reporter',
  description: 'Generate beautiful reports for your test results',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): DetailedHTMLProps<
  HtmlHTMLAttributes<HTMLHtmlElement>,
  HTMLHtmlElement
> => {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <link rel='icon' href='/favicon.png' sizes='any' type='image/png' />
      </head>
      <body className={'antialiased'}>
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Footer />
          <AnalyticsProvider />
        </ThemeProvider>
      </body>
      {isProd && <GoogleTagManager gtmId='G-CNW9F6PH7P' />}
    </html>
  );
};

export default RootLayout;
