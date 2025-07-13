'use client';

import { motion } from 'framer-motion';
import BenefitCard from './BenefitCard';
import BenefitCardSkeleton from './BenefitCardSkeleton';
import { useFetchCollection } from '../hooks/useFetchBenefits';
import { Benefit } from '../types';

const BenefitsGrid = () => {
  
  const { data:benefits, loading, error } = useFetchCollection<Benefit>('benefits');

  if (loading) {
    return (
      <div className="flex flex-wrap gap-6 justify-center my-8 w-full">
        {[...Array(3)].map((_, idx) => (
          <BenefitCardSkeleton key={idx} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center my-8 w-full">
        <div className="text-red-500 dark:text-red-400 text-lg font-semibold">{error}</div>
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 max-w-6xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.15 } },
        hidden: {},
      }}
    >
      {benefits.map((benefit, idx) => (
        <BenefitCard benefit={benefit} key={idx}/>
      ))}
    </motion.div>
  );
};

export default BenefitsGrid;
