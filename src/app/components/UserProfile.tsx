'use client';

import { motion } from 'framer-motion';
import {
  CheckIcon,
  EnvelopeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import ProfileSkeleton from './ProfileSkeleton';
import { useFetch } from '../hooks/useFetch';
import { useAuth } from '../hooks/useAuth'; // adjust path accordingly
import { Profile } from '../types';

const UserProfile = () => {
  const { user, loading: authLoading } = useAuth();
  const { data, loading: fetchLoading, error } = useFetch<Profile>('users', 'document', user?.uid);
  const profile = data as Profile | null;
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (authLoading || fetchLoading) return <ProfileSkeleton />;
  if (!user) return <div>Please log in to see your profile.</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!profile) return <ProfileSkeleton />;

  return (
    <motion.div
      className="p-6 mt-6 bg-zinc-100 dark:bg-black rounded-2xl shadow-lg flex items-center gap-6 max-w-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className={`
          relative w-24 h-24 rounded-full
          bg-gradient-to-br from-teal-400 via-cyan-300 to-emerald-300
          flex items-center justify-center
          dark:text-zinc-800 text-zinc-800
          text-4xl font-extrabold
          shadow-lg
          border-2 border-zinc-300 dark:border-zinc-700

          mb-4
          sm:mb-0 sm:w-20 sm:h-20 sm:text-3xl sm:font-bold sm:shadow-md sm:border
        `}
      >
        {profile.fullName?.charAt(0).toUpperCase() || 'U'}
      </div>

      <div className="flex-1">
        <h2 className="text-2xl font-semibold text-zinc-800 dark:text-white">
          {profile.fullName}
        </h2>

        <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 my-1">
          <EnvelopeIcon className="h-5 w-5" />
          <span>{profile.email}</span>
          <motion.button
            whileTap={{ scale: 0.9, rotate: -10 }}
            onClick={() => copyToClipboard(profile.email)}
            className="hover:text-teal-500 transition"
            aria-label="Copy email"
          >
            {copied ? (
              <CheckIcon className="w-4 h-4 text-green-500" />
            ) : (
              <DocumentDuplicateIcon className="w-4 h-4" />
            )}
          </motion.button>
        </div>

        <p className="text-sm font-medium text-teal-600 dark:text-cyan-300 mb-3">
          Lv.{profile.level ?? '1'}
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
    </motion.div>
  );
};

export default UserProfile;
