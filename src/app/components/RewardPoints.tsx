'use client';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useFetchRewards } from '../hooks/useFetchRewards';

const circumference = 2 * Math.PI * 45; // 45 radius circle circumference

const RewardPoints = () => {
  const { reward, loading } = useFetchRewards('RJz9ZtjgO96FNCPy9M6H');
  const controls = useAnimation();


  useEffect(() => {
    const maxPoints = reward?.totalXP as number
    const points = reward?.currentXp as number
    const progress = Math.min(points / maxPoints, 1);
    const strokeDashoffset = circumference * (1 - progress);
    controls.start({ strokeDashoffset });
  }, [reward, controls]);

  return (
    <motion.div
      className="p-6 mt-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg flex flex-col items-center max-w-xs mx-auto"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">Reward Points</h2>
      <svg className="w-28 h-28" viewBox="0 0 100 100">
        <circle
          cx="50" cy="50" r="45"
          stroke="#ddd"
          strokeWidth="10"
          fill="none"
          className="dark:stroke-zinc-700"
        />
        <motion.circle
          cx="50" cy="50" r="45"
          stroke="#4f46e5" // Indigo-600
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          animate={controls}
          initial={{ strokeDashoffset: circumference }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
        />
        <text
          x="50"
          y="55"
          textAnchor="middle"
          fontSize="18"
          fill="#4f46e5"
          className="dark:fill-indigo-400 font-semibold"
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
