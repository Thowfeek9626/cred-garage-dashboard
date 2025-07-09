'use client';
import { motion } from 'framer-motion';

const UserProfile = () => {
  return (
    <motion.div
      className="p-6 bg-white dark:bg-zinc-800 rounded-xl shadow-md flex items-center gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <img
        src="/avatar.png"
        alt="User Avatar"
        className="w-16 h-16 rounded-full border"
      />
      <div>
        <h2 className="text-xl font-semibold text-zinc-800 dark:text-white">Mohamed</h2>
        <p className="text-zinc-500 dark:text-zinc-400">Level 8</p>
        <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2 mt-2">
          <div className="bg-blue-500 h-2 rounded-full w-3/4 transition-all" />
        </div>
      </div>
    </motion.div>
  );
};

export default UserProfile;
