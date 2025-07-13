'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { Reward } from '../types';
import { useFetch } from '../hooks/useFetch';
import RewardSkeleton from './RewardSkeleton';

const circumference = 2 * Math.PI * 45;

const RewardPoints = () => {
  const { data, loading } = useFetch<Reward>('rewards', 'document', 'RJz9ZtjgO96FNCPy9M6H');
  const reward = data as Reward | null;
  const controls = useAnimation();

  useEffect(() => {
    if (!reward || !reward.totalXP || !reward.currentXp) {
      controls.set({ strokeDashoffset: circumference });
      return;
    }
    const maxPoints = reward.totalXP;
    const points = reward.currentXp;
    const progress = Math.min(points / maxPoints, 1);
    const strokeDashoffset = circumference * (1 - progress);

    controls.set({ strokeDashoffset: circumference });
    controls.start({ strokeDashoffset });
  }, [reward, controls]);

  if (loading || !reward) return <RewardSkeleton />;

  return (
    <motion.div
      className="p-6 mt-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg flex flex-col items-center max-w-xs mx-auto"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">Reward Points</h2>
      <svg className="w-28 h-28" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50" cy="50" r="45"
          stroke="#ddd"
          strokeWidth="10"
          fill="none"
          className="dark:stroke-zinc-700"
        />
        {/* Progress circle */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          stroke="#14b8a6"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={controls}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="dark:stroke-cyan-400"
          style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
        />
        <text
          x="50"
          y="55"
          textAnchor="middle"
          fontSize="18"
          className="font-semibold fill-teal-600 dark:fill-cyan-400"
        >
          {reward?.currentXp?.toLocaleString()}
        </text>
        <text
          x="50"
          y="72"
          textAnchor="middle"
          fontSize="10"
          fill="#6b7280"
          className="dark:fill-zinc-400"
        >
          / {reward?.totalXP?.toLocaleString()} XP
        </text>
      </svg>
    </motion.div>
  );
};

export default RewardPoints;
