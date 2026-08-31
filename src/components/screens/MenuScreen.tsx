import React from 'react';
import { motion } from 'motion/react';
import {
  Users,
  CreditCard,
  Bell,
  Lock,
  HelpCircle,
  LogOut,
  ChevronRight,
  Sparkles,
  Zap,
} from 'lucide-react';
import { Friend } from '../../types';

interface MenuScreenProps {
  onRestartOnboarding: () => void;
  friends: Friend[];
}

export const MenuScreen: React.FC<MenuScreenProps> = ({
  onRestartOnboarding,
  friends,
}) => {
  return (
    <div className="min-h-full bg-white pb-32 pt-5 px-5 space-y-5">
      {/* Header */}
      <div className="pt-1">
        <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
          Account & Squads
        </span>
        <h1 className="text-[24px] font-black text-neutral-900 tracking-tight leading-none mt-0.5">
          Settings & Menu
        </h1>
      </div>

      {/* Profile Card */}
      <div className="bg-[#121212] text-white rounded-[24px] p-4.5 flex items-center justify-between shadow-card-dark">
        <div className="flex items-center gap-3.5">
          <div className="w-13 h-13 rounded-full overflow-hidden ring-2 ring-[#8BC53F]">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
              alt="Alex Rivera"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Alex Rivera</h2>
            <p className="text-xs text-neutral-400">alex.squad@billsum.io</p>
            <div className="inline-flex items-center gap-1 bg-[#8BC53F]/20 text-[#8BC53F] text-[10px] font-extrabold px-2 py-0.5 rounded-full mt-1">
              <Sparkles size={10} />
              <span>PRO SQUAD LEADER</span>
            </div>
          </div>
        </div>
      </div>

      {/* Squad Members Quick List */}
      <section aria-label="Roommate squad members" className="bg-neutral-50 rounded-[24px] p-4.5 border border-neutral-100 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-[#8BC53F]" />
            <h3 className="text-sm font-bold text-neutral-900">Roommate Squad ({friends.length + 1})</h3>
          </div>
          <span className="text-xs text-neutral-400 font-semibold">Apartment 4B</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <div className="w-10 h-10 rounded-full ring-2 ring-[#8BC53F] overflow-hidden shrink-0">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
              alt="You"
              className="w-full h-full object-cover"
            />
          </div>
          {friends.map((f) => (
            <div key={f.id} className="w-10 h-10 rounded-full overflow-hidden ring-1 ring-neutral-200 shrink-0">
              <img src={f.avatar} alt={f.name} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* Menu Options Group */}
      <section aria-label="App settings and preferences" className="bg-white rounded-[24px] border border-neutral-100 shadow-soft overflow-hidden divide-y divide-neutral-100">
        <button
          onClick={() => {}}
          className="w-full p-4 flex items-center justify-between hover:bg-neutral-50 transition-colors text-left cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-700">
              <CreditCard size={18} strokeWidth={2.2} />
            </div>
            <div>
              <p className="text-sm font-bold text-neutral-900">Linked Bank & Cards</p>
              <p className="text-[11px] text-neutral-400">Chase •••• 4012 (Primary)</p>
            </div>
          </div>
          <ChevronRight size={16} className="text-neutral-400" />
        </button>

        <button
          onClick={() => {}}
          className="w-full p-4 flex items-center justify-between hover:bg-neutral-50 transition-colors text-left cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-700">
              <Bell size={18} strokeWidth={2.2} />
            </div>
            <div>
              <p className="text-sm font-bold text-neutral-900">Push Notifications</p>
              <p className="text-[11px] text-neutral-400">Instant bill split alerts enabled</p>
            </div>
          </div>
          <ChevronRight size={16} className="text-neutral-400" />
        </button>

        <button
          onClick={() => {}}
          className="w-full p-4 flex items-center justify-between hover:bg-neutral-50 transition-colors text-left cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-700">
              <Lock size={18} strokeWidth={2.2} />
            </div>
            <div>
              <p className="text-sm font-bold text-neutral-900">Privacy & FaceID</p>
              <p className="text-[11px] text-neutral-400">Biometric login active</p>
            </div>
          </div>
          <ChevronRight size={16} className="text-neutral-400" />
        </button>

        <button
          onClick={onRestartOnboarding}
          className="w-full p-4 flex items-center justify-between hover:bg-neutral-50 transition-colors text-left cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#8BC53F]/15 flex items-center justify-center text-[#70a12e]">
              <Sparkles size={18} strokeWidth={2.2} />
            </div>
            <div>
              <p className="text-sm font-bold text-neutral-900">View Onboarding Experience</p>
              <p className="text-[11px] text-neutral-400">Replay intro & 3D illustrations</p>
            </div>
          </div>
          <ChevronRight size={16} className="text-neutral-400" />
        </button>
      </section>

      {/* Logout button */}
      <button
        onClick={onRestartOnboarding}
        className="w-full py-3.5 rounded-[22px] bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
      >
        <LogOut size={16} strokeWidth={2.5} />
        <span>Log Out of Session</span>
      </button>
    </div>
  );
};
