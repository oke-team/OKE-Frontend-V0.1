'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipSimpleProps {
  children: React.ReactNode;
  content: string;
  position?: 'top' | 'bottom';
}

export const TooltipSimple: React.FC<TooltipSimpleProps> = ({
  children,
  content,
  position = 'bottom'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isVisible && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      
      // Calculer la position centrée
      const left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
      const top = position === 'bottom' 
        ? triggerRect.bottom + 8
        : triggerRect.top - tooltipRect.height - 8;
      
      setTooltipStyle({
        position: 'fixed',
        left: `${left}px`,
        top: `${top}px`,
        zIndex: 9999,
      });
    }
  }, [isVisible, position]);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, 400);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-flex"
      >
        {children}
      </div>
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={tooltipRef}
            initial={{ opacity: 0, y: position === 'bottom' ? -4 : 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: position === 'bottom' ? -4 : 4, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            style={{
              ...tooltipStyle,
              pointerEvents: 'none',
            }}
          >
            <div className="relative">
              {/* Contenu du tooltip */}
              <div
                className="px-3 py-2 text-xs font-medium rounded-lg shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, rgba(248, 250, 252, 0.95) 0%, rgba(241, 245, 249, 0.95) 100%)',
                  backdropFilter: 'blur(10px) saturate(150%)',
                  WebkitBackdropFilter: 'blur(10px) saturate(150%)',
                  border: '1px solid rgba(148, 163, 184, 0.15)',
                  color: '#475569',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  maxWidth: '200px',
                  whiteSpace: 'normal',
                  lineHeight: '1.4',
                }}
              >
                {content}
              </div>
              
              {/* Flèche */}
              <div
                className="absolute"
                style={{
                  left: '50%',
                  transform: 'translateX(-50%)',
                  [position === 'bottom' ? 'top' : 'bottom']: '-3px',
                }}
              >
                <div
                  className="w-2 h-2 rotate-45"
                  style={{
                    background: 'rgba(241, 245, 249, 0.95)',
                    border: position === 'bottom'
                      ? '1px solid rgba(148, 163, 184, 0.15)'
                      : undefined,
                    borderTop: position === 'bottom' ? 'none' : '1px solid rgba(148, 163, 184, 0.15)',
                    borderLeft: position === 'bottom' ? 'none' : '1px solid rgba(148, 163, 184, 0.15)',
                    borderRight: position === 'top' ? 'none' : undefined,
                    borderBottom: position === 'top' ? 'none' : undefined,
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};