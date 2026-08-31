import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Sparkles } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClear: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClear }) => {
  if (!message) return null;

  return (
    <AnimatePresence>
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 max-w-xs w-full px-4 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className="bg-[#121212] text-white px-4 py-3 rounded-full shadow-2xl border border-white/10 flex items-center gap-2.5 text-xs font-bold pointer-events-auto"
        >
          <div className="w-5 h-5 rounded-full bg-[#8BC53F] text-white flex items-center justify-center shrink-0">
            <CheckCircle2 size={13} strokeWidth={3} />
          </div>
          <span className="flex-1 line-clamp-1">{message}</span>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
