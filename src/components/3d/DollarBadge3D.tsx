import React from 'react';
import { motion } from 'motion/react';

interface DollarBadge3DProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const DollarBadge3D: React.FC<DollarBadge3DProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
  }[size];

  return (
    <motion.div
      animate={{
        y: [-4, 4, -4],
        rotateZ: [-2, 4, -2],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={`relative ${sizeClasses} ${className} flex items-center justify-center`}
    >
      {/* Ambient Lime Glow behind badge */}
      <div className="absolute inset-0 bg-[#8BC53F]/40 rounded-full blur-xl animate-pulse" />

      {/* 3D Circular Beveled Badge Container */}
      <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-[#a7e84d] via-[#8BC53F] to-[#5a8621] p-[2.5px] shadow-[0_10px_25px_rgba(139,197,63,0.4)] border border-white/40">
        {/* Inner 3D Surface with bevel & specular light */}
        <div className="w-full h-full rounded-[14px] bg-gradient-to-b from-[#9be040] via-[#8BC53F] to-[#609122] flex items-center justify-center relative overflow-hidden shadow-inner">
          {/* Top gloss highlight */}
          <div className="absolute -top-3 -left-3 right-0 h-8 bg-white/40 rounded-full blur-[1px] rotate-[-20deg] pointer-events-none" />
          
          {/* 3D Dollar Symbol with drop shadow and bevel */}
          <span className="font-black text-white text-xl sm:text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)] select-none">
            $
          </span>

          {/* Micro sparkle dot */}
          <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_6px_#fff]" />
        </div>
      </div>
    </motion.div>
  );
};
