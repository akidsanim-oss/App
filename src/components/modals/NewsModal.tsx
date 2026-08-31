import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, TrendingUp, CheckCircle, Bookmark } from 'lucide-react';
import { Newspaper3D } from '../3d/Newspaper3D';

interface NewsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewsModal: React.FC<NewsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white rounded-[28px] max-w-sm w-full p-6 shadow-2xl relative border border-neutral-100 max-h-[85vh] overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-500 cursor-pointer"
          >
            <X size={16} />
          </button>

          <div className="flex items-center gap-3 mb-4">
            <Newspaper3D />
            <div>
              <span className="bg-[#8BC53F]/15 text-[#659725] text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                SAVINGS GUIDE
              </span>
              <p className="text-[11px] text-neutral-400 mt-0.5">3 min read • Bill Splitter Editorial</p>
            </div>
          </div>

          <h2 className="text-xl font-black text-neutral-900 leading-snug">
            How to save $500/mo on rent & shared utilities
          </h2>

          <div className="mt-4 space-y-3 text-xs text-neutral-600 leading-relaxed">
            <p>
              Splitting housing expenses with roommates doesn&apos;t have to cause awkward friction. Here are the top 3 verified strategies used by over 50,000 Bill Splitter squads:
            </p>

            <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-200/80 space-y-1">
              <h4 className="font-bold text-neutral-900 flex items-center gap-1.5">
                <CheckCircle size={14} className="text-[#8BC53F]" />
                1. Split Square Footage Dynamically
              </h4>
              <p className="text-[11px] text-neutral-500">
                Factor in private master baths and balcony access instead of a blind 50/50 split.
              </p>
            </div>

            <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-200/80 space-y-1">
              <h4 className="font-bold text-neutral-900 flex items-center gap-1.5">
                <CheckCircle size={14} className="text-[#8BC53F]" />
                2. Automated Recurring Split Calendar
              </h4>
              <p className="text-[11px] text-neutral-500">
                Eliminate late fees by scheduling Wi-Fi, electricity, and water bills on auto-debit.
              </p>
            </div>

            <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-200/80 space-y-1">
              <h4 className="font-bold text-neutral-900 flex items-center gap-1.5">
                <CheckCircle size={14} className="text-[#8BC53F]" />
                3. The 48-Hour Reimbursement Rule
              </h4>
              <p className="text-[11px] text-neutral-500">
                Squads that settle within 48 hours save an average of $64/month in forgotten grocery IOUs.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-neutral-100">
            <button
              onClick={onClose}
              className="w-full py-3 bg-neutral-900 hover:bg-black text-white rounded-[20px] font-bold text-xs transition-colors cursor-pointer"
            >
              Got it, thanks!
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
