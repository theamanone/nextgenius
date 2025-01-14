import { motion } from 'framer-motion';

import dynamic from 'next/dynamic';

const WebDevelopmentContent = dynamic(() => import('@/components/services/WebDevelopmentContent'), {
  ssr: false
});

export default function WebDevelopment() {
  return <WebDevelopmentContent />;
}
