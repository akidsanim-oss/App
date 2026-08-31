/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScreenType, Friend, Bill } from './types';
import { BottomNav } from './components/BottomNav';
import { OnboardingScreen } from './components/screens/OnboardingScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { SplitBillScreen } from './components/screens/SplitBillScreen';
import { IncomeTrackerScreen } from './components/screens/IncomeTrackerScreen';
import { CalendarScreen } from './components/screens/CalendarScreen';
import { MenuScreen } from './components/screens/MenuScreen';
import { ReceiptModal } from './components/modals/ReceiptModal';
import { SplitSuccessModal } from './components/modals/SplitSuccessModal';
import { AddFriendModal } from './components/modals/AddFriendModal';
import { NewsModal } from './components/modals/NewsModal';
import { Toast } from './components/Toast';
import { Smartphone, Sparkles, Wifi, Battery, RotateCcw } from 'lucide-react';

const INITIAL_FRIENDS: Friend[] = [
  {
    id: 'f1',
    name: 'Sarah',
    username: '@sarahm',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    selected: true,
  },
  {
    id: 'f2',
    name: 'Mike',
    username: '@miker',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    selected: true,
  },
  {
    id: 'f3',
    name: 'Chloe',
    username: '@chloe_k',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    selected: true,
  },
  {
    id: 'f4',
    name: 'David',
    username: '@david_p',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    selected: false,
  },
  {
    id: 'f5',
    name: 'Emma',
    username: '@emmar',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80',
    selected: false,
  },
];

const INITIAL_BILL: Bill = {
  id: 'b1',
  title: "Dinner at Marcello's",
  location: "Marcello's Trattoria",
  category: 'Dining',
  date: 'Today, 8:45 PM',
  amount: 184.0,
  currency: 'USD',
  items: [
    { id: 'i1', name: 'Margherita Pizza (x2)', price: 38.0 },
    { id: 'i2', name: 'Truffle Tagliolini', price: 28.0 },
    { id: 'i3', name: 'Grilled Branzino', price: 34.0 },
    { id: 'i4', name: 'Aperol Cocktails (x4)', price: 52.0 },
    { id: 'i5', name: 'Classic Tiramisu (x2)', price: 18.0 },
    { id: 'i6', name: 'Sales Tax', price: 14.0 },
  ],
  paidBy: 'You',
  splitWithIds: ['f1', 'f2', 'f3'],
  splitType: 'equal',
  status: 'pending',
};

const RECENT_BILLS: Bill[] = [
  INITIAL_BILL,
  {
    id: 'b2',
    title: 'Whole Foods Grocery Haul',
    category: 'Groceries',
    date: 'Yesterday',
    amount: 126.5,
    currency: 'USD',
    items: [],
    paidBy: 'You',
    splitWithIds: ['f1', 'f2'],
    splitType: 'equal',
    status: 'settled',
  },
  {
    id: 'b3',
    title: 'Uber XL - Downtown Return',
    category: 'Transport',
    date: 'Aug 28',
    amount: 48.0,
    currency: 'USD',
    items: [],
    paidBy: 'Mike',
    splitWithIds: ['f1', 'f2', 'f3'],
    splitType: 'equal',
    status: 'settled',
  },
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [friends, setFriends] = useState<Friend[]>(INITIAL_FRIENDS);
  const [currentBill, setCurrentBill] = useState<Bill>(INITIAL_BILL);
  const [totalBalance, setTotalBalance] = useState<number>(4250.5);
  
  // Modals & feedback
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [isAddFriendOpen, setIsAddFriendOpen] = useState(false);
  const [isNewsOpen, setIsNewsOpen] = useState(false);
  const [splitSuccessData, setSplitSuccessData] = useState<{
    total: number;
    perPerson: number;
    friendCount: number;
  } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Friend toggle logic
  const handleToggleFriend = (id: string) => {
    setFriends((prev) =>
      prev.map((f) => (f.id === id ? { ...f, selected: !f.selected } : f))
    );
  };

  // Add new friend
  const handleAddFriend = (name: string, username: string) => {
    const newFriend: Friend = {
      id: `f_${Date.now()}`,
      name,
      username,
      avatar: `https://images.unsplash.com/photo-${1530000000000 + Math.floor(Math.random() * 900000)}?w=150&auto=format&fit=crop&q=80`,
      selected: true,
    };
    setFriends((prev) => [...prev, newFriend]);
    showToast(`Added ${name} to squad!`);
  };

  // Bill Actions
  const handleCopySplit = () => {
    const selectedCount = friends.filter((f) => f.selected).length + 1;
    const share = (currentBill.amount / selectedCount).toFixed(2);
    const text = `Bill Splitter: ${currentBill.title} ($${currentBill.amount.toFixed(2)}) split with ${selectedCount} people = $${share} each.`;
    navigator.clipboard?.writeText?.(text);
    showToast('Split link & summary copied to clipboard!');
  };

  const handleShareSplit = () => {
    showToast('Payment requests broadcasted via SMS / AirDrop!');
  };

  const handleRepeatSplit = () => {
    showToast('Recurring monthly reminder scheduled!');
  };

  const handleSplitIn = (splitData: { total: number; perPerson: number; friendCount: number }) => {
    setSplitSuccessData(splitData);
    setTotalBalance((prev) => prev - splitData.perPerson);
    showToast(`Split Dispatched! $${splitData.perPerson.toFixed(2)} requested from squad.`);
  };

  const handleUpgradeCard = () => {
    showToast('Platinum card application submitted! Zero ATM fees enabled.');
  };

  return (
    <div className="min-h-screen bg-[#E8EDF2] text-[#121212] flex flex-col items-center justify-start py-4 sm:py-8 px-2 sm:px-4 font-sans selection:bg-[#8BC53F] selection:text-white">
      {/* Top Direct Screen Switcher */}
      <header className="w-full max-w-[360px] mb-3.5 flex items-center justify-between px-1 text-[#121212]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-[#8BC53F] flex items-center justify-center text-white font-black text-xs shadow-md shadow-[#8BC53F44]">
            $
          </div>
          <span className="font-extrabold text-sm tracking-tight text-[#121212]">Bill Splitter</span>
        </div>

        {/* Quick jump pills */}
        <div className="flex items-center gap-1 bg-white/90 backdrop-blur-md p-1 rounded-full border border-[#E9ECEF] shadow-xs text-[11px] font-bold">
          <button
            onClick={() => setCurrentScreen('onboarding')}
            className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
              currentScreen === 'onboarding' ? 'bg-[#8BC53F] text-white shadow-xs' : 'text-[#6C757D] hover:text-[#121212]'
            }`}
          >
            1. Intro
          </button>
          <button
            onClick={() => setCurrentScreen('home')}
            className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
              currentScreen === 'home' ? 'bg-[#8BC53F] text-white shadow-xs' : 'text-[#6C757D] hover:text-[#121212]'
            }`}
          >
            2. Home
          </button>
          <button
            onClick={() => setCurrentScreen('split')}
            className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
              currentScreen === 'split' ? 'bg-[#8BC53F] text-white shadow-xs' : 'text-[#6C757D] hover:text-[#121212]'
            }`}
          >
            3. Split
          </button>
          <button
            onClick={() => setCurrentScreen('income')}
            className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
              currentScreen === 'income' ? 'bg-[#8BC53F] text-white shadow-xs' : 'text-[#6C757D] hover:text-[#121212]'
            }`}
          >
            4. Income
          </button>
        </div>
      </header>

      {/* Mobile Device Simulation Container */}
      <main className="w-full max-w-[360px] bg-white rounded-[40px] shadow-2xl border-[8px] border-[#121212] overflow-hidden relative min-h-[720px] max-h-[820px] flex flex-col">
        {/* iOS / Mobile Status Bar Header */}
        <div className="bg-white px-7 pt-3 pb-1 flex items-center justify-between text-xs font-bold text-[#121212] select-none z-30 shrink-0">
          <span>9:41</span>
          {/* Dynamic Island / Speaker Pill */}
          <div className="w-20 h-3.5 bg-[#121212] rounded-full mx-auto" />
          <div className="flex items-center gap-1.5 text-[#121212]">
            <Wifi size={13} strokeWidth={2.8} />
            <Battery size={15} strokeWidth={2.8} />
          </div>
        </div>

        {/* Screen View Area with Fluid Slide Transitions */}
        <div className="flex-1 overflow-y-auto no-scrollbar relative bg-white">
          <AnimatePresence mode="wait">
            {currentScreen === 'onboarding' && (
              <motion.div
                key="onboarding"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.25 }}
                className="h-full"
              >
                <OnboardingScreen
                  onGetStarted={() => setCurrentScreen('home')}
                  onLogIn={() => setCurrentScreen('home')}
                />
              </motion.div>
            )}

            {currentScreen === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.25 }}
                className="h-full"
              >
                <HomeScreen
                  onNavigateToSplit={() => setCurrentScreen('split')}
                  onNavigateToIncome={() => setCurrentScreen('income')}
                  onOpenNews={() => setIsNewsOpen(true)}
                  onSelectBill={(b) => {
                    setCurrentBill(b);
                    setCurrentScreen('split');
                  }}
                  recentBills={RECENT_BILLS}
                  totalBalance={totalBalance}
                />
              </motion.div>
            )}

            {currentScreen === 'split' && (
              <motion.div
                key="split"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.25 }}
                className="h-full"
              >
                <SplitBillScreen
                  currentBill={currentBill}
                  friends={friends}
                  onToggleFriend={handleToggleFriend}
                  onAddNewFriend={() => setIsAddFriendOpen(true)}
                  onOpenReceipt={() => setIsReceiptOpen(true)}
                  onCopySplit={handleCopySplit}
                  onShareSplit={handleShareSplit}
                  onRepeatSplit={handleRepeatSplit}
                  onSplitIn={handleSplitIn}
                  onChangeAmount={(amt) =>
                    setCurrentBill((prev) => ({ ...prev, amount: amt }))
                  }
                  onChangeTitle={(title) =>
                    setCurrentBill((prev) => ({ ...prev, title }))
                  }
                />
              </motion.div>
            )}

            {currentScreen === 'income' && (
              <motion.div
                key="income"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.25 }}
                className="h-full"
              >
                <IncomeTrackerScreen
                  onUpgradeClick={handleUpgradeCard}
                  onExportReport={() =>
                    showToast('Quarterly PDF report generated & downloaded!')
                  }
                />
              </motion.div>
            )}

            {currentScreen === 'calendar' && (
              <motion.div
                key="calendar"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.25 }}
                className="h-full"
              >
                <CalendarScreen
                  onScheduleNew={() => {
                    showToast('New recurring squad split schedule created!');
                  }}
                />
              </motion.div>
            )}

            {currentScreen === 'menu' && (
              <motion.div
                key="menu"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.25 }}
                className="h-full"
              >
                <MenuScreen
                  onRestartOnboarding={() => setCurrentScreen('onboarding')}
                  friends={friends}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Nav Bar (Consistent across all screens, except Onboarding) */}
        {currentScreen !== 'onboarding' && (
          <BottomNav
            currentScreen={currentScreen}
            onNavigate={(screen) => setCurrentScreen(screen)}
            onAddClick={() => setCurrentScreen('split')}
          />
        )}
      </main>

      {/* Global Modals & Notifications */}
      <ReceiptModal
        isOpen={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
        bill={currentBill}
      />

      <SplitSuccessModal
        isOpen={!!splitSuccessData}
        onClose={() => setSplitSuccessData(null)}
        splitData={splitSuccessData}
        selectedFriends={friends.filter((f) => f.selected)}
      />

      <AddFriendModal
        isOpen={isAddFriendOpen}
        onClose={() => setIsAddFriendOpen(false)}
        onAdd={handleAddFriend}
      />

      <NewsModal
        isOpen={isNewsOpen}
        onClose={() => setIsNewsOpen(false)}
      />

      <Toast message={toastMessage} onClear={() => setToastMessage(null)} />
    </div>
  );
}
