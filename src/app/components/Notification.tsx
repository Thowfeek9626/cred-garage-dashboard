'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { XCircleIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  onClose?: () => void;
}

const Notification = ({ message, type, onClose }: NotificationProps) => {
  const bgColor = type === 'success' ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900';
  const textColor = type === 'success' ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300';
  const Icon = type === 'success' ? CheckCircleIcon : XCircleIcon;

  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose?.(); 
    }, 3000);

    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <motion.div
      className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-md ${bgColor} ${textColor}`}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.3 }}
    >
      <Icon className="w-6 h-6" />
      <span className="font-medium">{message}</span>
    </motion.div>
  );
};

export default Notification;
