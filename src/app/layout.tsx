import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from '@/components/providers/Providers';
import Footer from '@/components/Footer';
import './globals.css';

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
    images: ['/og-image.jpg'],
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>
          <main className="relative flex min-h-screen flex-col">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
