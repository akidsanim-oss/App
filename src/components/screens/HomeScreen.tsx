import React, { useState } from 'react';
import { motion } from 'motion/react';
import { DollarBadge3D } from '../3d/DollarBadge3D';
import { Newspaper3D } from '../3d/Newspaper3D';
import { ArrowUpRight, ArrowDownLeft, Users, Receipt, ChevronRight, Bell, Sparkles } from 'lucide-react';
import { Bill } from '../../types';

interface HomeScreenProps {
  onNavigateToSplit: () => void;
  onNavigateToIncome: () => void;
  onOpenNews: () => void;
  onSelectBill: (bill: Bill) => void;
  recentBills: Bill[];
  totalBalance: number;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigateToSplit,
  onNavigateToIncome,
  onOpenNews,
  onSelectBill,
  recentBills,
  totalBalance,
}) => {
  const [selectedDay, setSelectedDay] = useState<number>(4); // Friday default

  // Weekly earning dynamics data (M, T, W, T, F, S, S)
  const weeklyData = [
    { day: 'M', height: '40%', active: false, amount: '$120' },
    { day: 'T', height: '60%', active: false, amount: '$180' },
    { day: 'W', height: '90%', active: true, amount: '$290' },
    { day: 'T', height: '50%', active: false, amount: '$150' },
    { day: 'F', height: '100%', active: true, amount: '$380' },
    { day: 'S', height: '30%', active: false, amount: '$90' },
    { day: 'S', height: '45%', active: false, amount: '$140' },
  ];

  return (
    <div className="min-h-full bg-white pb-20 pt-4 px-6 space-y-5">
      {/* Header */}
      <header className="flex justify-between items-center pt-1">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-[#6C757D] font-bold">
            Good morning, Alex
          </p>
          <h2 className="text-xl font-bold text-[#121212]">Overview</h2>
        </div>

        <div className="flex items-center gap-2">
          {/* Notification bell */}
          <button
            onClick={onOpenNews}
            className="w-9 h-9 rounded-full bg-[#F8F9FA] hover:bg-[#E9ECEF] border border-[#E9ECEF] flex items-center justify-center text-[#6C757D] transition-colors cursor-pointer relative"
            aria-label="Notifications"
          >
            <Bell size={16} strokeWidth={2.4} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#8BC53F] rounded-full ring-2 ring-white" />
          </button>

          {/* Profile Avatar */}
          <div className="w-10 h-10 rounded-full bg-[#8BC53F44] border-2 border-[#8BC53F] overflow-hidden flex items-center justify-center cursor-pointer shadow-xs">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
              alt="Alex"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </header>

      {/* Hero Balance Card (#121212) */}
      <motion.section
        aria-label="Account balance overview"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-[#121212] rounded-[24px] p-5 text-white relative overflow-hidden shadow-xl"
      >
        <p className="text-xs text-[#A0A0A0]">Total Balance</p>
        <h3 className="text-2xl font-bold mt-1">
          ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </h3>

        {/* 3D Floating Dollar Badge */}
        <div className="absolute -top-2 -right-2 w-16 h-16 bg-[#8BC53F] rounded-full flex items-center justify-center rotate-12 opacity-90 shadow-lg">
          <span className="text-2xl">💸</span>
        </div>

        {/* Quick balance info */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#A0A0A0]">
          <span>Owed to you: <strong className="text-white">+$640.00</strong></span>
          <span className="text-[#8BC53F] font-bold">2 splits pending</span>
        </div>
      </motion.section>

      {/* Earning Dynamics */}
      <motion.section
        aria-label="Earning Dynamics"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="space-y-3"
      >
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold text-[#121212]">Earning Dynamics</p>
          <button
            onClick={onNavigateToIncome}
            className="text-[11px] font-bold text-[#8BC53F] hover:underline cursor-pointer flex items-center gap-0.5"
          >
            <span>Details</span>
            <ChevronRight size={13} />
          </button>
        </div>

        <div className="flex items-end justify-between h-20 gap-1 px-1">
          {weeklyData.map((bar, index) => {
            const isSelected = selectedDay === index;
            const isBarActive = isSelected || bar.active;
            return (
              <div
                key={bar.day + index}
                onClick={() => setSelectedDay(index)}
                className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end cursor-pointer group"
              >
                <div
                  style={{ height: bar.height }}
                  className={`w-3.5 rounded-full transition-all duration-300 ${
                    isBarActive
                      ? 'bg-[#8BC53F] shadow-sm shadow-[#8BC53F66]'
                      : 'bg-[#E9ECEF] group-hover:bg-[#CED4DA]'
                  }`}
                />
                <span className="text-[10px] font-bold text-[#6C757D]">
                  {bar.day}
                </span>
              </div>
            );
          })}
        </div>
      </motion.section>

      {/* Trending in Savings Card */}
      <motion.section
        aria-label="Trending in savings news"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        onClick={onOpenNews}
        className="bg-[#F8F9FA] p-4 rounded-[20px] flex items-center gap-3 border border-[#E9ECEF] cursor-pointer hover:bg-[#F1F3F5] transition-colors group"
      >
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm border border-[#E9ECEF] shrink-0">
          📰
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-bold text-[#121212] truncate group-hover:text-[#6c9c2c] transition-colors">
            How to save $500/mo on rent
          </p>
          <p className="text-[10px] text-[#6C757D]">Trending in Savings</p>
        </div>
        <ChevronRight size={16} className="text-[#CED4DA] group-hover:text-[#121212] transition-colors shrink-0" />
      </motion.section>

      {/* Recent Squad Bills */}
      <section aria-label="Recent squad bills" className="space-y-2.5 pt-1">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold text-[#121212]">Recent Activity</p>
          <button
            onClick={onNavigateToSplit}
            className="text-[11px] font-bold text-[#8BC53F] hover:underline cursor-pointer"
          >
            Split New +
          </button>
        </div>

        <div className="space-y-2">
          {recentBills.slice(0, 2).map((bill) => (
            <div
              key={bill.id}
              onClick={() => onSelectBill(bill)}
              className="bg-white border border-[#E9ECEF] rounded-[18px] p-3 flex items-center justify-between cursor-pointer hover:border-[#8BC53F] transition-colors shadow-xs"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-[#F0F9E8] text-[#8BC53F] flex items-center justify-center font-bold text-xs shrink-0">
                  <Receipt size={16} strokeWidth={2.4} />
                </div>
                <div className="truncate">
                  <h4 className="text-xs font-bold text-[#121212] truncate">{bill.title}</h4>
                  <p className="text-[10px] text-[#6C757D]">{bill.date}</p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="text-xs font-black text-[#121212]">
                  ${bill.amount.toFixed(2)}
                </div>
                <div className="text-[10px] font-bold text-[#8BC53F]">
                  ${(bill.amount / (bill.splitWithIds.length + 1)).toFixed(2)}/ea
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
