import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Receipt, Sparkles, Download, Share2 } from 'lucide-react';
import { Bill } from '../../types';

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  bill: Bill;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  isOpen,
  onClose,
  bill,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="bg-white rounded-[28px] max-w-sm w-full overflow-hidden shadow-2xl relative border border-neutral-100 max-h-[85vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-5 pb-3 border-b border-neutral-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#8BC53F]/20 text-[#699c27] flex items-center justify-center">
                <Receipt size={18} strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-900 leading-none">
                  Itemized Receipt
                </h3>
                <p className="text-[11px] text-neutral-400 mt-0.5">Marcello&apos;s Italian Trattoria</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-500 cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Receipt Body with Paper effect */}
          <div className="p-5 overflow-y-auto space-y-4 text-xs">
            <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200/70 font-mono space-y-2.5">
              <div className="text-center pb-2 border-b border-dashed border-neutral-300">
                <p className="font-bold text-sm text-neutral-900 uppercase">MARCELLO&apos;S TRATTORIA</p>
                <p className="text-[10px] text-neutral-400">TABLE 12 • 4 GUESTS • SERVER: MARCO</p>
                <p className="text-[10px] text-neutral-400">AUG 31, 2026 • 8:42 PM</p>
              </div>

              {/* Items List */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-neutral-800">
                  <span>2x Margherita D.O.P Pizza</span>
                  <span className="font-bold">$38.00</span>
                </div>
                <div className="flex justify-between text-neutral-800">
                  <span>1x Truffle Tagliolini</span>
                  <span className="font-bold">$28.00</span>
                </div>
                <div className="flex justify-between text-neutral-800">
                  <span>1x Grilled Branzino</span>
                  <span className="font-bold">$34.00</span>
                </div>
                <div className="flex justify-between text-neutral-800">
                  <span>4x Aperol Spritz Cocktails</span>
                  <span className="font-bold">$52.00</span>
                </div>
                <div className="flex justify-between text-neutral-800">
                  <span>2x Classic Tiramisu</span>
                  <span className="font-bold">$18.00</span>
                </div>
              </div>

              {/* Subtotal & Taxes */}
              <div className="pt-2 border-t border-dashed border-neutral-300 space-y-1 text-[11px] text-neutral-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>$170.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sales Tax (8.25%)</span>
                  <span>$14.00</span>
                </div>
                <div className="flex justify-between font-bold text-neutral-900 text-xs pt-1">
                  <span>Total Amount</span>
                  <span className="text-[#659725] text-sm">${bill.amount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Split Breakdown */}
            <div className="bg-[#8BC53F]/10 rounded-2xl p-3.5 border border-[#8BC53F]/20 flex items-center justify-between">
              <div>
                <p className="font-bold text-neutral-900 text-xs">Equal 4-Way Split</p>
                <p className="text-[11px] text-neutral-500">Includes all items + tax</p>
              </div>
              <div className="text-right">
                <span className="text-base font-black text-[#629422]">
                  ${(bill.amount / 4).toFixed(2)}
                </span>
                <span className="text-[10px] text-neutral-400 block">per person</span>
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="p-4 border-t border-neutral-100 flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-[#8BC53F] hover:bg-[#7db635] text-white rounded-[20px] font-bold text-sm transition-all shadow-xs cursor-pointer text-center"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
