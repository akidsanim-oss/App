import React from 'react';
import { motion } from 'motion/react';
import { PiggyBankIllustration } from '../3d/PiggyBankIllustration';
import { ArrowRight, Sparkles } from 'lucide-react';

interface OnboardingScreenProps {
  onGetStarted: () => void;
  onLogIn: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  onGetStarted,
  onLogIn,
}) => {
  return (
    <div className="min-h-full bg-white flex flex-col justify-between p-6 pt-10 pb-8 text-center relative overflow-hidden">
      {/* Top Graphic Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-2 text-center pt-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-40 h-40 bg-[#F0F9E8] rounded-full flex items-center justify-center mb-8 shadow-inner relative group"
        >
          <div className="w-24 h-24 bg-[#8BC53F] rounded-3xl rotate-12 flex items-center justify-center shadow-lg shadow-[#8BC53F44] transition-transform group-hover:rotate-6">
            <span className="text-white text-5xl font-bold -rotate-12 group-hover:-rotate-6 transition-transform">$</span>
          </div>
        </motion.div>

        {/* Headlines */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="space-y-3"
        >
          <h1 className="text-[32px] leading-tight font-black text-[#121212]">
            Finance for the<br />modern squad.
          </h1>
          <p className="text-[#6C757D] text-sm px-4 leading-relaxed">
            Split bills, track shared expenses, and manage your group budget in one click.
          </p>
        </motion.div>
      </div>

      {/* Action Buttons & Footer */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="px-2 pt-6"
      >
        {/* Full-width Lime Green Get Started Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          onClick={onGetStarted}
          className="w-full py-4 bg-[#8BC53F] hover:bg-[#7db635] text-white font-bold text-base rounded-[20px] shadow-lg shadow-[#8BC53F44] flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span>Get Started</span>
          <ArrowRight size={18} strokeWidth={2.5} />
        </motion.button>

        {/* Footer */}
        <p className="text-center mt-4 text-xs text-[#6C757D]">
          Already have an account?{' '}
          <button
            onClick={onLogIn}
            className="text-[#121212] font-bold hover:text-[#8BC53F] transition-colors cursor-pointer"
          >
            Log In
          </button>
        </p>
      </motion.div>
    </div>
  );
};
