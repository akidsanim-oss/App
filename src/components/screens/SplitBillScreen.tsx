import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Receipt,
  Copy,
  Share2,
  Repeat,
  Plus,
  Check,
  Sparkles,
  DollarSign,
  ChevronDown,
  Users,
  Info,
} from 'lucide-react';
import { Friend, Bill } from '../../types';

interface SplitBillScreenProps {
  currentBill: Bill;
  friends: Friend[];
  onToggleFriend: (friendId: string) => void;
  onAddNewFriend: () => void;
  onOpenReceipt: () => void;
  onCopySplit: () => void;
  onShareSplit: () => void;
  onRepeatSplit: () => void;
  onSplitIn: (splitData: { total: number; perPerson: number; friendCount: number }) => void;
  onChangeAmount: (newAmount: number) => void;
  onChangeTitle: (newTitle: string) => void;
}

export const SplitBillScreen: React.FC<SplitBillScreenProps> = ({
  currentBill,
  friends,
  onToggleFriend,
  onAddNewFriend,
  onOpenReceipt,
  onCopySplit,
  onShareSplit,
  onRepeatSplit,
  onSplitIn,
  onChangeAmount,
  onChangeTitle,
}) => {
  const [splitMode, setSplitMode] = useState<'equal' | 'custom'>('equal');
  const [isEditingAmount, setIsEditingAmount] = useState(false);
  const [tempAmount, setTempAmount] = useState(currentBill.amount.toString());
  const [tipPercentage, setTipPercentage] = useState<number>(15);

  // Selected friends count (plus user = +1)
  const selectedFriends = friends.filter((f) => f.selected);
  const totalPeople = selectedFriends.length + 1; // including 'You'
  
  // Calculate with tip if desired
  const baseAmount = currentBill.amount;
  const tipAmount = (baseAmount * tipPercentage) / 100;
  const totalWithTip = baseAmount + tipAmount;
  const perPersonShare = totalPeople > 0 ? totalWithTip / totalPeople : 0;

  const handleAmountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(tempAmount);
    if (!isNaN(val) && val > 0) {
      onChangeAmount(val);
    }
    setIsEditingAmount(false);
  };

  // Color accents for avatars
  const avatarBgColors = ['bg-[#FFD43B]', 'bg-[#4dabf7]', 'bg-[#fa5252]', 'bg-[#a78bfa]', 'bg-[#38d9a9]'];

  return (
    <div className="min-h-full bg-white pb-20 pt-4 px-6 space-y-6">
      {/* Screen Title */}
      <h2 className="text-xl font-bold text-center text-[#121212] pt-1">
        Split Bill
      </h2>

      {/* Bill Balance Card */}
      <motion.section
        aria-label="Bill total balance card"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-[24px] p-6 text-center shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-[#F1F3F5] relative overflow-hidden"
      >
        <p className="text-[10px] uppercase font-bold text-[#6C757D] mb-1 tracking-widest">
          {currentBill.title || "Dinner at Marcello's"}
        </p>

        {/* Big Bill Amount */}
        {isEditingAmount ? (
          <form onSubmit={handleAmountSubmit} className="my-1">
            <div className="flex items-center justify-center gap-1">
              <span className="text-3xl font-black text-[#121212]">$</span>
              <input
                type="number"
                step="0.01"
                value={tempAmount}
                onChange={(e) => setTempAmount(e.target.value)}
                autoFocus
                onBlur={handleAmountSubmit}
                className="w-36 text-4xl font-black text-[#121212] tracking-tight text-center focus:outline-none border-b-2 border-[#8BC53F]"
              />
            </div>
            <p className="text-[10px] text-[#6C757D] mt-1">Press enter to save</p>
          </form>
        ) : (
          <div
            onClick={() => {
              setTempAmount(currentBill.amount.toString());
              setIsEditingAmount(true);
            }}
            className="cursor-pointer group inline-block"
            title="Click to edit bill amount"
          >
            <h3 className="text-4xl font-black text-[#121212] tracking-tight my-0.5">
              ${currentBill.amount.toFixed(2)}
            </h3>
            <span className="text-[10px] font-bold text-[#8BC53F] group-hover:underline">
              Tap to edit
            </span>
          </div>
        )}

        <div className="mt-3 pt-2.5 border-t border-[#F1F3F5] flex items-center justify-center gap-1.5 text-xs text-[#6C757D]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8BC53F]" />
          <span>
            <strong className="text-[#121212] font-bold">${perPersonShare.toFixed(2)}</strong> / person ({totalPeople} total)
          </span>
        </div>
      </motion.section>

      {/* Action Row: 4 circular buttons */}
      <motion.section
        aria-label="Bill quick actions"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex justify-between px-1"
      >
        {/* Receipt Button */}
        <div className="flex flex-col items-center gap-1.5">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={onOpenReceipt}
            className="w-12 h-12 rounded-full border border-[#E9ECEF] flex items-center justify-center text-lg bg-white shadow-xs hover:border-[#8BC53F] transition-all cursor-pointer"
            aria-label="View itemized receipt"
          >
            🧾
          </motion.button>
          <span className="text-[9px] font-bold uppercase text-[#6C757D]">Receipt</span>
        </div>

        {/* Copy Button */}
        <div className="flex flex-col items-center gap-1.5">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={onCopySplit}
            className="w-12 h-12 rounded-full border border-[#E9ECEF] flex items-center justify-center text-lg bg-white shadow-xs hover:border-[#8BC53F] transition-all cursor-pointer"
            aria-label="Copy split summary"
          >
            🔗
          </motion.button>
          <span className="text-[9px] font-bold uppercase text-[#6C757D]">Copy</span>
        </div>

        {/* Share Button */}
        <div className="flex flex-col items-center gap-1.5">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={onShareSplit}
            className="w-12 h-12 rounded-full border border-[#E9ECEF] flex items-center justify-center text-lg bg-white shadow-xs hover:border-[#8BC53F] transition-all cursor-pointer"
            aria-label="Share bill with squad"
          >
            📤
          </motion.button>
          <span className="text-[9px] font-bold uppercase text-[#6C757D]">Share</span>
        </div>

        {/* Repeat Button */}
        <div className="flex flex-col items-center gap-1.5">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={onRepeatSplit}
            className="w-12 h-12 rounded-full border border-[#E9ECEF] flex items-center justify-center text-lg bg-white shadow-xs hover:border-[#8BC53F] transition-all cursor-pointer"
            aria-label="Repeat bill or set recurring"
          >
            🔄
          </motion.button>
          <span className="text-[9px] font-bold uppercase text-[#6C757D]">Repeat</span>
        </div>
      </motion.section>

      {/* Split with Section */}
      <motion.section
        aria-label="Friend selector for bill split"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="space-y-2.5"
      >
        <p className="text-sm font-bold text-[#121212]">Split with</p>

        <div className="flex gap-3 overflow-x-auto no-scrollbar py-1">
          {/* [+] Add Circle */}
          <button
            onClick={onAddNewFriend}
            className="w-12 h-12 rounded-full border-2 border-dashed border-[#CED4DA] flex items-center justify-center text-[#CED4DA] hover:border-[#8BC53F] hover:text-[#8BC53F] shrink-0 transition-colors cursor-pointer text-xl font-bold"
            aria-label="Add friend to split"
          >
            +
          </button>

          {/* Host / You */}
          <div className="w-12 h-12 rounded-full border-2 border-[#8BC53F] bg-[#121212] text-white flex items-center justify-center shrink-0 font-bold text-xs shadow-xs relative">
            <span className="text-[11px]">You</span>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#8BC53F] rounded-full flex items-center justify-center text-white text-[9px]">
              ✓
            </div>
          </div>

          {/* Friends List Avatars with Vibrant Theme Palette Tags */}
          {friends.map((friend, idx) => {
            const colorClass = avatarBgColors[idx % avatarBgColors.length];
            return (
              <motion.button
                key={friend.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onToggleFriend(friend.id)}
                className={`w-12 h-12 rounded-full ${colorClass} text-[#121212] font-black text-sm flex items-center justify-center shrink-0 transition-all cursor-pointer relative shadow-xs ${
                  friend.selected ? 'ring-2 ring-[#8BC53F] opacity-100 scale-100' : 'opacity-40 scale-95'
                }`}
                aria-label={`Toggle ${friend.name} in split`}
                title={friend.name}
              >
                {friend.name.charAt(0)}
                {friend.selected && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#8BC53F] rounded-full flex items-center justify-center text-white text-[9px] shadow-xs">
                    ✓
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.section>

      {/* Split In CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="pt-1"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          onClick={() =>
            onSplitIn({
              total: totalWithTip,
              perPerson: perPersonShare,
              friendCount: totalPeople,
            })
          }
          className="w-full py-4 bg-[#8BC53F] hover:bg-[#7db635] text-white font-bold text-base rounded-[20px] shadow-lg shadow-[#8BC53F44] flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span>Split In (${perPersonShare.toFixed(2)})</span>
        </motion.button>
      </motion.div>
    </div>
  );
};
