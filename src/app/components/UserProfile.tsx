'use client';

import { motion } from 'framer-motion';
import ProfileSkeleton from './ProfileSkeleton';
import { Profile } from '../types';

interface UserProfileProps {
  loading: boolean;
  profile: Profile | null;
}

const UserProfile = ({ loading, profile }: UserProfileProps) => {
  return (
    <motion.div
      className="p-6 mt-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg flex items-center gap-6 max-w-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {loading || !profile ? (
        <ProfileSkeleton />
      ) : (
        <>
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white text-3xl font-extrabold shadow-lg border-4 border-white dark:border-zinc-900">
            {profile.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">
              {profile.name}
            </h2>
            <p className="text-sm font-medium text-indigo-500 dark:text-indigo-400 mb-3">
              {profile.level ?? 'Level 1'}
            </p>
            <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-3 overflow-hidden">
              <motion.div
                className="bg-indigo-500 h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${profile.progress ?? 0}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default UserProfile;
