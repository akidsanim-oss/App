import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar as CalendarIcon, Clock, CheckCircle2, AlertCircle, Plus, ChevronRight } from 'lucide-react';
import { ScheduledPayment } from '../../types';

interface CalendarScreenProps {
  onScheduleNew: () => void;
}

export const CalendarScreen: React.FC<CalendarScreenProps> = ({ onScheduleNew }) => {
  const [selectedDay, setSelectedDay] = useState<number>(15);

  const scheduledBills: ScheduledPayment[] = [
    {
      id: '1',
      title: 'Apartment Rent (Unit 4B)',
      amount: 2400.0,
      dueDate: 'Sep 1st (in 2 days)',
      avatar: '🏢',
      membersCount: 4,
      category: 'Housing',
    },
    {
      id: '2',
      title: 'High-speed Fiber Wi-Fi',
      amount: 85.0,
      dueDate: 'Sep 5th',
      avatar: '📶',
      membersCount: 4,
      category: 'Utilities',
    },
    {
      id: '3',
      title: 'Groceries & Household Supplies',
      amount: 190.5,
      dueDate: 'Sep 8th',
      avatar: '🛒',
      membersCount: 3,
      category: 'Food',
    },
    {
      id: '4',
      title: 'Netflix 4K & Spotify Family',
      amount: 32.99,
      dueDate: 'Sep 15th',
      avatar: '🎬',
      membersCount: 4,
      category: 'Entertainment',
    },
  ];

  const calendarDays = [
    { day: 'Mon', num: 13 },
    { day: 'Tue', num: 14 },
    { day: 'Wed', num: 15, active: true, hasBill: true },
    { day: 'Thu', num: 16 },
    { day: 'Fri', num: 17, hasBill: true },
    { day: 'Sat', num: 18 },
    { day: 'Sun', num: 19 },
  ];

  return (
    <div className="min-h-full bg-white pb-32 pt-5 px-5 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
            Automated Schedules
          </span>
          <h1 className="text-[24px] font-black text-neutral-900 tracking-tight leading-none mt-0.5">
            Bill Calendar
          </h1>
        </div>

        <button
          onClick={onScheduleNew}
          className="flex items-center gap-1 bg-[#8BC53F] hover:bg-[#78ad34] text-white px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer"
        >
          <Plus size={14} strokeWidth={2.8} />
          <span>New</span>
        </button>
      </div>

      {/* Week Selector Strip */}
      <div className="bg-neutral-50 p-3 rounded-[22px] border border-neutral-100 flex items-center justify-between">
        {calendarDays.map((d) => (
          <button
            key={d.num}
            onClick={() => setSelectedDay(d.num)}
            className={`flex flex-col items-center py-2 px-2.5 rounded-2xl transition-all cursor-pointer ${
              selectedDay === d.num
                ? 'bg-[#121212] text-white shadow-md'
                : 'text-neutral-500 hover:bg-neutral-200/50'
            }`}
          >
            <span className="text-[10px] font-bold uppercase opacity-80">{d.day}</span>
            <span className="text-base font-black mt-0.5">{d.num}</span>
            {d.hasBill && (
              <span
                className={`w-1.5 h-1.5 rounded-full mt-1 ${
                  selectedDay === d.num ? 'bg-[#8BC53F]' : 'bg-[#8BC53F]'
                }`}
              />
            )}
          </button>
        ))}
      </div>

      {/* Recurring Squad Split List */}
      <section aria-label="Upcoming recurring splits" className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-neutral-900">Upcoming Recurring Splits</h2>
          <span className="text-xs font-semibold text-neutral-400">4 Active</span>
        </div>

        <div className="space-y-3">
          {scheduledBills.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -2 }}
              className="bg-white rounded-[22px] p-4 border border-neutral-100 shadow-soft flex items-center justify-between"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-neutral-100 flex items-center justify-center text-xl shadow-inner">
                  {item.avatar}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-900">{item.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-neutral-400 mt-0.5 font-medium">
                    <span>{item.dueDate}</span>
                    <span>•</span>
                    <span className="text-[#8BC53F] font-semibold">
                      ${(item.amount / item.membersCount).toFixed(2)}/ea
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm font-black text-neutral-900">
                  ${item.amount.toFixed(2)}
                </div>
                <div className="text-[10px] font-bold text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded-full mt-1 inline-block">
                  Auto-Split
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};
