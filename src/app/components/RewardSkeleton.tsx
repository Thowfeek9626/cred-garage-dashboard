'use client';
import { motion } from 'framer-motion';

const RewardSkeleton = () => (
  <motion.div
    className="p-6 mt-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg flex flex-col items-center max-w-xs mx-auto animate-pulse"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <div className="h-5 w-32 bg-zinc-300 dark:bg-zinc-700 rounded mb-6" />
    <div className="relative w-28 h-28">
      <div className="absolute inset-0 rounded-full border-8 border-zinc-200 dark:border-zinc-800" />
      <div className="absolute inset-8 rounded-full bg-zinc-200 dark:bg-zinc-700" />
    </div>
  </motion.div>
);

export default RewardSkeleton;
