import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Sparkles, X, Share2, Send, QrCode, ArrowRight } from 'lucide-react';
import { Friend } from '../../types';

interface SplitSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  splitData: { total: number; perPerson: number; friendCount: number } | null;
  selectedFriends: Friend[];
}

export const SplitSuccessModal: React.FC<SplitSuccessModalProps> = ({
  isOpen,
  onClose,
  splitData,
  selectedFriends,
}) => {
  if (!isOpen || !splitData) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 25 }}
          className="bg-white rounded-[28px] max-w-sm w-full p-6 text-center shadow-2xl relative border border-neutral-100 overflow-hidden"
        >
          {/* Confetti / Glow background */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#8BC53F]/20 rounded-full blur-2xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-500 cursor-pointer"
          >
            <X size={16} />
          </button>

          {/* Animated Success Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 15, stiffness: 250, delay: 0.1 }}
            className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#72a42e] to-[#8BC53F] text-white mx-auto flex items-center justify-center shadow-[0_8px_20px_rgba(139,197,63,0.4)] mb-4"
          >
            <Check size={32} strokeWidth={3} />
          </motion.div>

          <h3 className="text-2xl font-black text-neutral-900 tracking-tight">
            Split Dispatched!
          </h3>
          <p className="text-xs text-neutral-500 mt-1 max-w-xs mx-auto">
            Payment requests of <strong className="text-neutral-900">${splitData.perPerson.toFixed(2)}</strong> sent to {splitData.friendCount} squad members.
          </p>

          {/* Friends Avatar Pill */}
          <div className="flex items-center justify-center -space-x-2 my-4">
            <div className="w-9 h-9 rounded-full ring-2 ring-white overflow-hidden shadow-xs">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                alt="You"
                className="w-full h-full object-cover"
              />
            </div>
            {selectedFriends.slice(0, 4).map((friend) => (
              <div key={friend.id} className="w-9 h-9 rounded-full ring-2 ring-white overflow-hidden shadow-xs">
                <img
                  src={friend.avatar}
                  alt={friend.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Instant Payment Request Links */}
          <div className="bg-neutral-50 rounded-2xl p-3.5 border border-neutral-200/80 text-left space-y-2 mb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
              Direct Settlement Channels
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-bold text-neutral-700">
              <div className="bg-white p-2 rounded-xl border border-neutral-200/80 flex items-center gap-2 shadow-xs">
                <span className="text-blue-500 font-black">Venmo</span>
                <span className="text-[10px] text-neutral-400 ml-auto">Ready</span>
              </div>
              <div className="bg-white p-2 rounded-xl border border-neutral-200/80 flex items-center gap-2 shadow-xs">
                <span className="text-emerald-500 font-black">Cash App</span>
                <span className="text-[10px] text-neutral-400 ml-auto">Ready</span>
              </div>
            </div>
          </div>

          {/* Primary CTA */}
          <button
            onClick={onClose}
            className="w-full py-3.5 bg-[#8BC53F] hover:bg-[#7db635] text-white rounded-[22px] font-bold text-sm shadow-[0_8px_20px_rgba(139,197,63,0.35)] transition-all cursor-pointer"
          >
            Done
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
