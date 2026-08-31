import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CreditCard3D } from '../3d/CreditCard3D';
import {
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  Zap,
  ChevronRight,
  Download,
  Calendar,
} from 'lucide-react';

interface IncomeTrackerScreenProps {
  onUpgradeClick: () => void;
  onExportReport: () => void;
}

export const IncomeTrackerScreen: React.FC<IncomeTrackerScreenProps> = ({
  onUpgradeClick,
  onExportReport,
}) => {
  return (
    <div className="min-h-full bg-white pb-20 pt-4 px-6 space-y-4">
      {/* Screen Header */}
      <div className="flex items-center justify-between pt-1">
        <h2 className="text-xl font-bold text-[#121212]">Income Tracker</h2>
        <button
          onClick={onExportReport}
          className="flex items-center gap-1 bg-[#F8F9FA] hover:bg-[#E9ECEF] border border-[#E9ECEF] text-[#6C757D] px-3 py-1 rounded-full text-[11px] font-bold transition-colors cursor-pointer"
        >
          <Download size={12} strokeWidth={2.4} />
          <span>Report</span>
        </button>
      </div>

      {/* Hero Income Card (#121212) */}
      <motion.section
        aria-label="Income overview"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-[#121212] rounded-[24px] p-5 text-white relative overflow-hidden shadow-xl"
      >
        <p className="text-xs text-[#A0A0A0]">Monthly Income</p>
        <h3 className="text-3xl font-bold mt-1">$8,400.00</h3>
        <p className="text-[11px] text-[#8BC53F] font-bold mt-2 flex items-center gap-1">
          <span>↑ 12.5% vs last month</span>
        </p>

        {/* Dynamic Multi-bar Progression Graph */}
        <div className="h-12 w-full mt-4 flex items-end gap-1.5 pt-2">
          <div className="flex-1 bg-[#8BC53F33] h-1/2 rounded-t-sm transition-all hover:bg-[#8BC53F]" />
          <div className="flex-1 bg-[#8BC53F66] h-3/4 rounded-t-sm transition-all hover:bg-[#8BC53F]" />
          <div className="flex-1 bg-[#8BC53F] h-full rounded-t-sm shadow-xs shadow-[#8BC53F]" />
          <div className="flex-1 bg-[#8BC53F33] h-2/3 rounded-t-sm transition-all hover:bg-[#8BC53F]" />
          <div className="flex-1 bg-[#8BC53F66] h-5/6 rounded-t-sm transition-all hover:bg-[#8BC53F]" />
        </div>
      </motion.section>

      {/* Grid: Lost Month & Lost Quarter (#FA5252 Red Accent) */}
      <motion.section
        aria-label="Lost expenses statistics"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="grid grid-cols-2 gap-3"
      >
        <div className="bg-white border border-[#E9ECEF] p-4 rounded-[20px] shadow-xs">
          <p className="text-[9px] uppercase font-bold text-[#6C757D]">Lost Month</p>
          <p className="text-lg font-bold text-[#FA5252] mt-0.5">$120.00</p>
        </div>

        <div className="bg-white border border-[#E9ECEF] p-4 rounded-[20px] shadow-xs">
          <p className="text-[9px] uppercase font-bold text-[#6C757D]">Lost Quarter</p>
          <p className="text-lg font-bold text-[#FA5252] mt-0.5">$450.00</p>
        </div>
      </motion.section>

      {/* Upgrade to Platinum Card (Lime Green #8BC53F) */}
      <motion.section
        aria-label="Upgrade to Platinum card promo"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="bg-[#8BC53F] rounded-[24px] p-5 text-white relative overflow-hidden flex flex-col items-start shadow-lg shadow-[#8BC53F44]"
      >
        <div className="z-10">
          <h4 className="text-sm font-black mb-1 text-white">Upgrade to Platinum</h4>
          <p className="text-[10px] mb-4 opacity-90 text-white">Exclusive cashback & rewards</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onUpgradeClick}
            className="px-4 py-2 bg-[#121212] hover:bg-black text-white text-[10px] font-bold rounded-xl shadow-md cursor-pointer transition-transform"
          >
            Get new card
          </motion.button>
        </div>

        {/* 3D Angled Card Silhouette */}
        <div className="absolute -right-4 top-4 w-28 h-20 bg-[#121212] rounded-xl rotate-[-20deg] shadow-2xl opacity-40 border border-white/20 pointer-events-none" />
      </motion.section>

      {/* Inflow Channel Items */}
      <section aria-label="Income breakdown" className="space-y-2 pt-1">
        <p className="text-xs font-bold text-[#121212]">Inflow Channels</p>
        <div className="p-3 bg-[#F8F9FA] rounded-[18px] flex items-center justify-between border border-[#E9ECEF]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#8BC53F]/20 text-[#8BC53F] flex items-center justify-center font-bold text-xs">
              $
            </div>
            <div>
              <p className="text-xs font-bold text-[#121212]">Direct Salary</p>
              <p className="text-[9px] text-[#6C757D]">Bi-weekly</p>
            </div>
          </div>
          <span className="text-xs font-bold text-[#121212]">+$3,200.00</span>
        </div>
      </section>
    </div>
  );
};
