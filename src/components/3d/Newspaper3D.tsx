import React from 'react';
import { motion } from 'motion/react';

export const Newspaper3D: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotateZ: -2 }}
      className={`relative w-12 h-12 flex items-center justify-center ${className}`}
    >
      {/* 3D Folded Newspaper Graphic */}
      <svg viewBox="0 0 64 64" className="w-full h-full filter drop-shadow-md overflow-visible" fill="none">
        <defs>
          <linearGradient id="newsGrad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>
          <linearGradient id="foldGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>
        </defs>

        {/* Back page shadow/layer */}
        <rect x="14" y="6" width="38" height="48" rx="6" fill="#D1D5DB" transform="rotate(6 33 30)" />
        
        {/* Main front newspaper page */}
        <rect x="8" y="10" width="42" height="46" rx="6" fill="url(#newsGrad)" stroke="#CBD5E1" strokeWidth="1.5" />
        
        {/* Newspaper Top Header Bar (Lime Green) */}
        <rect x="14" y="16" width="30" height="4" rx="2" fill="#8BC53F" />
        
        {/* Newspaper Mini Photo Thumbnail */}
        <rect x="14" y="24" width="12" height="12" rx="3" fill="#E2E8F0" stroke="#8BC53F" strokeWidth="1" />
        <circle cx="20" cy="30" r="3" fill="#8BC53F" opacity="0.6" />

        {/* Text lines */}
        <rect x="29" y="24" width="15" height="2.5" rx="1.25" fill="#64748B" />
        <rect x="29" y="29" width="15" height="2.5" rx="1.25" fill="#94A3B8" />
        <rect x="29" y="34" width="11" height="2.5" rx="1.25" fill="#94A3B8" />

        <rect x="14" y="40" width="30" height="2" rx="1" fill="#94A3B8" />
        <rect x="14" y="44" width="22" height="2" rx="1" fill="#CBD5E1" />
        <rect x="14" y="48" width="26" height="2" rx="1" fill="#CBD5E1" />
      </svg>
    </motion.div>
  );
};
