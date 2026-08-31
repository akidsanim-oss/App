import React from 'react';
import { motion } from 'motion/react';

export const PiggyBankIllustration: React.FC = () => {
  return (
    <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
      {/* Soft Ambient Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#8BC53F]/20 to-transparent rounded-full blur-3xl -z-10" />

      {/* Floating 3D Coin 1 (Left top) */}
      <motion.div
        animate={{
          y: [-8, 8, -8],
          rotate: [-6, 6, -6],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-1 left-4 w-12 h-12 rounded-full z-10 filter drop-shadow-md"
        style={{ perspective: 600 }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#689b27] via-[#8BC53F] to-[#bbf371] p-[3px] shadow-lg flex items-center justify-center border-2 border-white/60">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-[#8BC53F] to-[#6d9e2b] flex items-center justify-center text-white font-black text-sm shadow-inner">
            $
          </div>
        </div>
      </motion.div>

      {/* Floating 3D Coin 2 (Right top) */}
      <motion.div
        animate={{
          y: [10, -10, 10],
          rotate: [12, -8, 12],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
        className="absolute top-4 -right-2 w-14 h-14 rounded-full z-10 filter drop-shadow-md"
      >
        <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#5d8b24] via-[#8BC53F] to-[#c7ff80] p-[3px] shadow-xl flex items-center justify-center border-2 border-white/80">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-[#96d445] to-[#659727] flex items-center justify-center text-white font-black text-base shadow-inner">
            $
          </div>
        </div>
      </motion.div>

      {/* Floating 3D Coin 3 (Small bottom right) */}
      <motion.div
        animate={{
          y: [-6, 6, -6],
          rotate: [-15, 10, -15],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="absolute bottom-6 right-2 w-9 h-9 rounded-full z-10 filter drop-shadow-sm"
      >
        <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#8BC53F] to-[#d8ffa6] p-[2px] shadow-md flex items-center justify-center border border-white/80">
          <div className="w-full h-full rounded-full bg-[#8BC53F] flex items-center justify-center text-white font-bold text-xs">
            $
          </div>
        </div>
      </motion.div>

      {/* Main Glass Piggy Bank SVG Illustration with 3D Depth */}
      <motion.div
        animate={{
          y: [-4, 4, -4],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative z-0"
      >
        <svg
          viewBox="0 0 200 180"
          className="w-56 h-52 filter drop-shadow-2xl overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Defs for 3D Gradients & Filters */}
          <defs>
            {/* Glass body gradient */}
            <linearGradient id="glassBody" x1="20" y1="20" x2="180" y2="170" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
              <stop offset="35%" stopColor="#EBF7D9" stopOpacity="0.4" />
              <stop offset="70%" stopColor="#8BC53F" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#558021" stopOpacity="0.5" />
            </linearGradient>

            {/* Glass highlight rim */}
            <linearGradient id="glassRim" x1="30" y1="10" x2="170" y2="160" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#8BC53F" stopOpacity="0.6" />
            </linearGradient>

            {/* Lime Coin Gradients */}
            <linearGradient id="coinGrad1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#bfff6a" />
              <stop offset="50%" stopColor="#8BC53F" />
              <stop offset="100%" stopColor="#5a8820" />
            </linearGradient>

            <linearGradient id="coinGrad2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#d4ff8f" />
              <stop offset="60%" stopColor="#8BC53F" />
              <stop offset="100%" stopColor="#4e7918" />
            </linearGradient>

            {/* Inner Glass Specular */}
            <radialGradient id="innerGlow" cx="40%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#8BC53F" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#2c4d08" stopOpacity="0.4" />
            </radialGradient>

            {/* Drop Shadow */}
            <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#000000" floodOpacity="0.1" />
            </filter>
          </defs>

          {/* Cast Shadow underneath */}
          <ellipse cx="100" cy="168" rx="65" ry="10" fill="#000000" fillOpacity="0.08" />
          <ellipse cx="100" cy="168" rx="40" ry="6" fill="#8BC53F" fillOpacity="0.25" />

          {/* Piggy Legs Back */}
          <rect x="52" y="130" width="22" height="28" rx="11" fill="#75a532" opacity="0.6" />
          <rect x="126" y="130" width="22" height="28" rx="11" fill="#75a532" opacity="0.6" />

          {/* Piggy Tail Curl */}
          <path
            d="M32 95 C 18 90, 15 75, 25 72 C 32 70, 35 80, 24 82"
            stroke="#8BC53F"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
            opacity="0.8"
          />

          {/* Piggy Ear Back */}
          <path d="M142 42 C 142 22, 160 26, 162 48 Z" fill="#75a532" opacity="0.5" />

          {/* Internal Stacked Lime Coins Visible Inside Glass Body */}
          <g transform="translate(68, 88)">
            {/* Bottom layer coins */}
            <ellipse cx="22" cy="38" rx="18" ry="9" fill="url(#coinGrad1)" stroke="#d9ffa8" strokeWidth="1.5" />
            <ellipse cx="44" cy="36" rx="17" ry="8.5" fill="url(#coinGrad2)" stroke="#d9ffa8" strokeWidth="1.5" />
            <ellipse cx="32" cy="26" rx="19" ry="9.5" fill="url(#coinGrad1)" stroke="#ffffff" strokeWidth="1.5" />
            <ellipse cx="16" cy="18" rx="16" ry="8" fill="url(#coinGrad2)" stroke="#d9ffa8" strokeWidth="1.5" />
            <ellipse cx="40" cy="16" rx="18" ry="9" fill="url(#coinGrad1)" stroke="#ffffff" strokeWidth="1.5" />
            <ellipse cx="28" cy="6" rx="17" ry="8.5" fill="url(#coinGrad2)" stroke="#ffffff" strokeWidth="1.5" />
          </g>

          {/* Piggy Main Body (Translucent Glass Orb) */}
          <ellipse
            cx="96"
            cy="98"
            rx="64"
            ry="54"
            fill="url(#glassBody)"
            stroke="url(#glassRim)"
            strokeWidth="3.5"
            filter="url(#softShadow)"
          />

          {/* Inner Light Reflection Sphere */}
          <ellipse cx="96" cy="98" rx="60" ry="50" fill="url(#innerGlow)" opacity="0.75" />

          {/* Piggy Ear Front */}
          <path
            d="M125 46 C 122 18, 146 22, 146 52 Z"
            fill="#a1de4d"
            stroke="#ffffff"
            strokeWidth="2"
            opacity="0.9"
          />

          {/* Piggy Snout */}
          <ellipse
            cx="160"
            cy="102"
            rx="18"
            ry="14"
            fill="url(#coinGrad1)"
            stroke="#ffffff"
            strokeWidth="2.5"
          />
          {/* Nostrils */}
          <ellipse cx="156" cy="102" rx="3.5" ry="5" fill="#4d721a" />
          <ellipse cx="166" cy="102" rx="3.5" ry="5" fill="#4d721a" />

          {/* Piggy Eye (Cute minimalist glossy dot) */}
          <circle cx="132" cy="82" r="6" fill="#121212" />
          <circle cx="134" cy="80" r="2.2" fill="#ffffff" />

          {/* Top Coin Slot */}
          <ellipse cx="94" cy="46" rx="18" ry="4.5" fill="#2d470d" opacity="0.7" />
          <rect x="80" y="44" width="28" height="4" rx="2" fill="#1a2d06" />

          {/* Coin Entering Slot (Top) */}
          <g transform="translate(86, 26)">
            <ellipse cx="8" cy="12" rx="12" ry="6" fill="url(#coinGrad1)" stroke="#ffffff" strokeWidth="1.5" />
            <text x="8" y="15" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="900" fontFamily="sans-serif">$</text>
          </g>

          {/* Piggy Legs Front */}
          <rect x="68" y="138" width="20" height="24" rx="10" fill="url(#coinGrad1)" stroke="#ffffff" strokeWidth="2" />
          <rect x="114" y="138" width="20" height="24" rx="10" fill="url(#coinGrad1)" stroke="#ffffff" strokeWidth="2" />

          {/* Glossy High-Spec Highlight Reflection (Curved Glass Sheen) */}
          <path
            d="M 52 76 C 58 58, 85 52, 120 56 C 105 62, 70 66, 52 76 Z"
            fill="#ffffff"
            opacity="0.65"
          />
          <ellipse cx="62" cy="102" rx="6" ry="18" transform="rotate(-25 62 102)" fill="#ffffff" opacity="0.35" />
        </svg>
      </motion.div>
    </div>
  );
};
