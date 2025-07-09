'use client';
import { motion } from 'framer-motion';

const RewardPoints = () => (
  <motion.div
    className="p-6 mt-6 bg-white dark:bg-zinc-800 rounded-xl shadow-md"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <h2 className="text-lg font-semibold text-zinc-800 dark:text-white mb-2">Reward Points</h2>
    <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-4">
      <div className="bg-green-500 h-4 rounded-full w-[65%]" />
    </div>
    <p className="text-sm mt-2 text-zinc-500 dark:text-zinc-400">6,500 / 10,000 XP</p>
  </motion.div>
);

export default RewardPoints;
