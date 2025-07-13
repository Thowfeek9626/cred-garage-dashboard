'use client';

import { motion } from 'framer-motion';

const Spinner = () => (
  <motion.div
    className="w-6 h-6 border-4 border-indigo-600 border-t-transparent rounded-full"
    animate={{ rotate: 360 }}
    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
    role="status"
    aria-label="Loading"
  />
);

export default Spinner;
