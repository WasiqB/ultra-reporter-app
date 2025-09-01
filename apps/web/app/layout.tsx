import { GoogleAnalytics } from '@next/third-parties/google';
import { FeatureProvider } from '@ultra-reporter/feature-toggle/provider';
import { Footer } from '@ultra-reporter/ui/home/footer';
import { ScrollToTop } from '@ultra-reporter/ui/home/scroll-to-top';
import { ThemeProvider } from '@ultra-reporter/ui/utils/theme-provider';
import { isProd } from '@ultra-reporter/utils/constants';
import type { Metadata } from 'next';

import { Toaster } from '@ultra-reporter/ui/components/sonner';
import {
  AlertTriangleIcon,
  CheckCircleIcon,
  InfoIcon,
  Loader2Icon,
  XCircleIcon,
  XIcon,
} from 'lucide-react';
import './styles/global.css';

export const metadata: Metadata = {
  title: {
    default: 'Ultra Reporter - Beautiful Test Reports in One Click',
    template: '%s | Ultra Reporter',
  },
  description:
    'Convert your TestNG test results into beautiful, comprehensive reports instantly with Ultra Reporter. Visualize your data and improve your testing workflow.',
  keywords: [
    'TestNG',
    'TestNG Reporter',
    'test reports',
    'test visualization',
    'QA tools',
    'software testing',
    'Ultra Reporter',
    'TestNG reports',
    'TestNG visualization',
  ],
  authors: [{ name: 'Wasiq Bhamla' }],
  creator: 'Wasiq Bhamla',
  publisher: 'Wasiq Bhamla',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ultra-reporter.com',
    title: 'Ultra Reporter - Beautiful Test Reports in One Click',
    description:
      'Convert your TestNG test results into beautiful, comprehensive reports instantly with Ultra Reporter. Visualize your data and improve your testing workflow.',
    siteName: 'Ultra Reporter',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ultra Reporter - Beautiful Test Reports in One Click',
    description:
      'Convert your TestNG test results into beautiful, comprehensive reports instantly with Ultra Reporter. Visualize your data and improve your testing workflow.',
    creator: '@WasiqBhamla',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <link rel='icon' href='/favicon.png' sizes='any' type='image/png' />
      </head>
      <FeatureProvider>
        <>
          <body className={'antialiased'}>
            <ThemeProvider
              attribute='class'
              defaultTheme='light'
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <ScrollToTop />
              <Footer />
              <Toaster
                richColors
                position='top-center'
                duration={5000}
                closeButton
                icons={{
                  success: <CheckCircleIcon className='h-4 w-4' />,
                  error: <XCircleIcon className='h-4 w-4' />,
                  warning: <AlertTriangleIcon className='h-4 w-4' />,
                  info: <InfoIcon className='h-4 w-4' />,
                  loading: <Loader2Icon className='h-4 w-4 animate-spin' />,
                  close: <XIcon className='h-4 w-4' />,
                }}
              />
            </ThemeProvider>
          </body>
          {isProd && <GoogleAnalytics gaId='G-CNW9F6PH7P' />}
        </>
      </FeatureProvider>
    </html>
  );
};

export default RootLayout;
