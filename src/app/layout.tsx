import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Providers from '@/components/providers/Providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'WebGeniusCraft - Creative Web Development Solutions',
  description: 'Professional web development services offering custom solutions, modern designs, and innovative technologies.',
  keywords: 'web development, web design, frontend development, backend development, full-stack development',
  openGraph: {
    title: 'WebGeniusCraft - Creative Web Development Solutions',
    description: 'Professional web development services offering custom solutions, modern designs, and innovative technologies.',
    images: ['/og-image.jpg'], // Add your OG image path
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WebGeniusCraft - Creative Web Development Solutions',
    description: 'Professional web development services offering custom solutions, modern designs, and innovative technologies.',
  },
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: 'WebGeniusCraft Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#4F46E5', // Indigo color to match the logo
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" />
      </head>
      <body className={`${inter.variable} font-sans bg-black text-white min-h-screen`}>
        <Providers>
          <Header />
          <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
