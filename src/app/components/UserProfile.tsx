'use client';

import { motion } from 'framer-motion';
import ProfileSkeleton from './ProfileSkeleton';
import { useFetch } from '../hooks/useFetch';
import { Profile } from '../types';


const UserProfile = () => {

  const userId = 'F0E2ZvHF75uuo2BlokZu';
  const { data, loading } = useFetch<Profile>('users', 'document', userId);
  const profile = data as Profile | null;

  return (
    <motion.div
      className="p-6 mt-6 bg-zinc-100 dark:bg-black rounded-2xl shadow-lg flex items-center gap-6 max-w-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {loading || !profile ? (
        <ProfileSkeleton />
      ) : (
        <>
          <div
            className={`
              relative w-24 h-24 rounded-full
              bg-gradient-to-br from-teal-400 via-cyan-300 to-emerald-300
              flex items-center justify-center
              dark:text-zinc-800 text-zinc-800
              text-4xl font-extrabold
              shadow-lg
              border-2 border-zinc-300 dark:border-zinc-700

              /* Larger avatar and more shadow on mobile */
              mb-4
              sm:mb-0 sm:w-20 sm:h-20 sm:text-3xl sm:font-bold sm:shadow-md sm:border
            `}
          >
            {profile.name?.charAt(0).toUpperCase() || 'U'}
          </div>


          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-zinc-800 dark:text-white">
              {profile.name}
            </h2>
            <p className="text-sm font-medium text-teal-600 dark:text-cyan-300 mb-3">
              Lv.{profile.level ?? 'Level 1'}
            </p>

            <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-3 overflow-hidden shadow-inner">
              <motion.div
                className="h-3 rounded-full bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-300 shadow-md shadow-cyan-400/30"
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
