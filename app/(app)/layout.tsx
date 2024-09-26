import type { Metadata } from 'next';
// import localFont from 'next/font/local';
import './globals.css';
import { DetailedHTMLProps, HtmlHTMLAttributes } from 'react';
// import { ThemeProvider } from '@/components/theme-provider';

// const geistSans = localFont({
//   src: './fonts/GeistVF.woff',
//   variable: '--font-geist-sans',
//   weight: '100 900',
// });
// const geistMono = localFont({
//   src: './fonts/GeistMonoVF.woff',
//   variable: '--font-geist-mono',
//   weight: '100 900',
// });

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
    <html lang='en'>
      <head>
        <link rel='icon' href='/favicon.png' sizes='any' type='image/png' />
      </head>
      <body className={'bg-gradient-to-b from-blue-200 to-white antialiased'}>
        {/* <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        > */}
        {children}
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
};

export default RootLayout;
