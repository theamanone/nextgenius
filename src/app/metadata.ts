import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://webgeniuscraft.vercel.app';

export const defaultMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'WebGeniusCraft',
    template: '%s | WebGeniusCraft'
  },
  description: 'Professional web development and design services',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'WebGeniusCraft',
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'WebGeniusCraft'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WebGeniusCraft',
    description: 'Professional web development and design services',
    images: [`${baseUrl}/og-image.jpg`]
  },
  robots: {
    index: true,
    follow: true
  }
};
