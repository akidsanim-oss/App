import React from 'react';
import { Home, BarChart2, Plus, Calendar, Menu } from 'lucide-react';
import { motion } from 'motion/react';
import { ScreenType } from '../types';

interface BottomNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onAddClick: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  onNavigate,
  onAddClick,
}) => {
  return (
    <nav aria-label="Bottom Navigation" className="sticky bottom-0 left-0 right-0 z-40 bg-white border-t border-[#F1F3F5] h-16 px-4 flex items-center justify-around select-none">
      {/* Home Tab */}
      <button
        onClick={() => onNavigate('home')}
        className="flex-1 flex flex-col items-center justify-center py-1 transition-colors cursor-pointer group"
        aria-label="Home Dashboard"
      >
        <Home
          size={22}
          strokeWidth={2.4}
          className={`transition-colors duration-200 ${
            currentScreen === 'home' ? 'text-[#8BC53F]' : 'text-[#CED4DA] group-hover:text-[#6C757D]'
          }`}
        />
        <span
          className={`text-[10px] font-bold mt-0.5 transition-colors ${
            currentScreen === 'home' ? 'text-[#8BC53F]' : 'text-[#CED4DA]'
          }`}
        >
          Home
        </span>
      </button>

      {/* Stats / Income Tab */}
      <button
        onClick={() => onNavigate('income')}
        className="flex-1 flex flex-col items-center justify-center py-1 transition-colors cursor-pointer group"
        aria-label="Income & Analytics"
      >
        <BarChart2
          size={22}
          strokeWidth={2.4}
          className={`transition-colors duration-200 ${
            currentScreen === 'income' ? 'text-[#8BC53F]' : 'text-[#CED4DA] group-hover:text-[#6C757D]'
          }`}
        />
        <span
          className={`text-[10px] font-bold mt-0.5 transition-colors ${
            currentScreen === 'income' ? 'text-[#8BC53F]' : 'text-[#CED4DA]'
          }`}
        >
          Stats
        </span>
      </button>

      {/* Elevated Center Add Button (Lime Green #8BC53F) */}
      <div className="flex-1 flex items-center justify-center -mt-8">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => {
            onNavigate('split');
            onAddClick();
          }}
          className="w-11 h-11 rounded-full bg-[#8BC53F] text-white flex items-center justify-center shadow-lg shadow-[#8BC53F44] border-4 border-white active:shadow-sm transition-shadow focus:outline-none cursor-pointer"
          aria-label="Split new bill"
        >
          <Plus size={24} strokeWidth={3} className="text-white" />
        </motion.button>
      </div>

      {/* Calendar Tab */}
      <button
        onClick={() => onNavigate('calendar')}
        className="flex-1 flex flex-col items-center justify-center py-1 transition-colors cursor-pointer group"
        aria-label="Scheduled Splits & Calendar"
      >
        <Calendar
          size={22}
          strokeWidth={2.4}
          className={`transition-colors duration-200 ${
            currentScreen === 'calendar' ? 'text-[#8BC53F]' : 'text-[#CED4DA] group-hover:text-[#6C757D]'
          }`}
        />
        <span
          className={`text-[10px] font-bold mt-0.5 transition-colors ${
            currentScreen === 'calendar' ? 'text-[#8BC53F]' : 'text-[#CED4DA]'
          }`}
        >
          Calendar
        </span>
      </button>

      {/* Menu Tab */}
      <button
        onClick={() => onNavigate('menu')}
        className="flex-1 flex flex-col items-center justify-center py-1 transition-colors cursor-pointer group"
        aria-label="Squads & Menu"
      >
        <Menu
          size={22}
          strokeWidth={2.4}
          className={`transition-colors duration-200 ${
            currentScreen === 'menu' ? 'text-[#8BC53F]' : 'text-[#CED4DA] group-hover:text-[#6C757D]'
          }`}
        />
        <span
          className={`text-[10px] font-bold mt-0.5 transition-colors ${
            currentScreen === 'menu' ? 'text-[#8BC53F]' : 'text-[#CED4DA]'
          }`}
        >
          Menu
        </span>
      </button>
    </nav>
  );
};
