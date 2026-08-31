import React from 'react';
import { motion } from 'motion/react';

export const CreditCard3D: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <motion.div
      animate={{
        rotateY: [-5, 5, -5],
        rotateX: [3, -3, 3],
        y: [-2, 2, -2],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{ perspective: 1000 }}
      className={`relative w-44 h-28 ${className} select-none`}
    >
      {/* 3D Metallic Card Body */}
      <div className="w-full h-full rounded-2xl bg-gradient-to-tr from-[#0a0a0a] via-[#1a1a1a] to-[#2e2e2e] p-3 shadow-2xl border border-white/20 relative overflow-hidden flex flex-col justify-between transform rotate-12 hover:rotate-6 transition-transform duration-300">
        {/* Metallic Holo Sheen */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 pointer-events-none" />
        
        {/* Top row: Chip & Contactless */}
        <div className="flex items-center justify-between">
          {/* Gold EMV Chip */}
          <div className="w-7 h-5 rounded-[4px] bg-gradient-to-br from-[#ffd700] via-[#e6b800] to-[#b38600] border border-[#ffec80] p-[2px] flex items-center justify-center shadow-sm">
            <div className="w-full h-full border border-black/20 rounded-[2px] grid grid-cols-2 grid-rows-2 opacity-60" />
          </div>
          
          {/* Lime Green Logo / Platinum Badge */}
          <div className="flex items-center gap-1 bg-[#8BC53F]/20 px-2 py-0.5 rounded-full border border-[#8BC53F]/40">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8BC53F]" />
            <span className="text-[9px] font-bold tracking-wider text-[#8BC53F] uppercase">PLATINUM</span>
          </div>
        </div>

        {/* Card Number preview */}
        <div className="text-[10px] font-mono tracking-widest text-neutral-400">
          •••• •••• •••• 8942
        </div>

        {/* Bottom row: Cardholder and Exp */}
        <div className="flex items-center justify-between text-[8px] text-neutral-300 font-medium">
          <span className="uppercase tracking-wider">ALEX RIVERA</span>
          <span className="text-neutral-400">08/29</span>
        </div>
      </div>
    </motion.div>
  );
};
