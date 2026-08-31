import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, UserPlus, Sparkles } from 'lucide-react';

interface AddFriendModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string, username: string) => void;
}

export const AddFriendModal: React.FC<AddFriendModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd(name.trim(), username.trim() || `@${name.toLowerCase().replace(/\s+/g, '')}`);
    setName('');
    setUsername('');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-[28px] max-w-sm w-full p-6 shadow-2xl relative border border-neutral-100"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-500 cursor-pointer"
          >
            <X size={16} />
          </button>

          <div className="w-12 h-12 rounded-2xl bg-[#8BC53F]/20 text-[#699a29] flex items-center justify-center mb-3">
            <UserPlus size={24} strokeWidth={2.2} />
          </div>

          <h3 className="text-xl font-bold text-neutral-900">Add Squad Member</h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            Add a roommate or friend to split shared expenses.
          </p>

          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <div>
              <label className="text-[11px] font-bold text-neutral-700 uppercase">
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Jordan Lee"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-2xl text-sm focus:outline-none focus:border-[#8BC53F]"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-neutral-700 uppercase">
                Handle / Phone (Optional)
              </label>
              <input
                type="text"
                placeholder="@jordan or +1 555-0199"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full mt-1 px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-2xl text-sm focus:outline-none focus:border-[#8BC53F]"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 bg-[#8BC53F] hover:bg-[#7ab035] text-white rounded-[20px] font-bold text-sm shadow-[0_8px_20px_rgba(139,197,63,0.35)] transition-all cursor-pointer"
              >
                Add Member
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
