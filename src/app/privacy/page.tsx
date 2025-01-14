import { siteConfig } from '@/config/site.config';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const MotionPrivacyContent = dynamic(() => import('@/components/privacy/PrivacyContent'), {
  ssr: false
});

export const metadata: Metadata = {
  title: `Privacy Policy - ${siteConfig.name}`,
  description: `Privacy Policy and data handling practices for ${siteConfig.name} services.`,
}

export default function PrivacyPolicy() {
  return <MotionPrivacyContent />;
}
