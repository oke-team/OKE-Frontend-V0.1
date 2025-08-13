'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PeriodSelectorGlass } from '@/components/ui/PeriodSelectorGlass';
import { usePathname } from 'next/navigation';

export const MobilePeriodBar: React.FC = () => {
  const pathname = usePathname();
  
  // Only show on accounting pages and mobile
  const [isMobile, setIsMobile] = React.useState(false);
  
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  if (!pathname?.includes('/accounting') || !isMobile) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-16 left-0 right-0 z-30 md:hidden"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(229, 229, 229, 0.2)',
        padding: '0.5rem 1rem',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <PeriodSelectorGlass compact={true} />
    </motion.div>
  );
};