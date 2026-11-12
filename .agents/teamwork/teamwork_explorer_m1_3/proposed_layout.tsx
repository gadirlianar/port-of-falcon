import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, JetBrains_Mono, Inter } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const viewport: Viewport = {
  themeColor: '#020617',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'Anar Gadirli // Port of Falcon — Systems Engineering & Explainable AI',
  description:
    'Production portfolio and mission-critical telemetry command center of Anar Gadirli. Highlighting Tier III Data Center operations at AzInTelecom, Explainable AI (SHAP/LIME) benchmark research, and systems engineering with a high-tech Falcon aesthetic.',
  keywords: [
    'Anar Gadirli',
    'Port of Falcon',
    'AzInTelecom',
    'Data Center Operations',
    'Tier III Data Center',
    'Explainable AI',
    'TreeSHAP',
    'LIME',
    'Systems Engineer',
    'Baku Azerbaijan',
    'Optical Attenuation',
    'Telemetry',
  ],
  authors: [{ name: 'Anar Gadirli', url: 'https://github.com/gadirlianar' }],
  creator: 'Anar Gadirli',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://anargadirli.dev',
    title: 'Anar Gadirli // Port of Falcon',
    description:
      'You met me in the Falcon era of my life — where every challenge becomes altitude. Systems Engineering & Explainable AI.',
    siteName: 'Port of Falcon',
    images: [
      {
        url: '/assets/anar-falcon-avatar.jpg',
        width: 1024,
        height: 1024,
        alt: 'Anar Gadirli — Port of Falcon',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anar Gadirli // Port of Falcon',
    description:
      'Tier III Data Center Operations (AzInTelecom) & Explainable AI (SHAP/LIME) Research.',
    creator: '@gadirlianar',
    images: ['/assets/anar-falcon-avatar.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark scroll-smooth ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${inter.variable}`}
    >
      <body className="bg-[#020617] text-[#F8FAFC] antialiased selection:bg-cyan-500/30 selection:text-cyan-200 min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
