import type { Metadata } from 'next';
import '@ultra-reporter/ui/global.css';
import { DetailedHTMLProps, HtmlHTMLAttributes } from 'react';
import { GoogleTagManager } from '@next/third-parties/google';
import { ThemeProvider } from '@ultra-reporter/ui/utils/theme-provider';
import { Footer } from '@ultra-reporter/ui/home/footer';

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
        </ThemeProvider>
      </body>
      {process.env.VERCEL_ENV === 'production' && (
        <GoogleTagManager gtmId='G-CNW9F6PH7P' />
      )}
    </html>
  );
};

export default RootLayout;
