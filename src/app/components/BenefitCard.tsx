import { motion } from 'framer-motion';
import { Benefit } from '../types';

interface Props {
  benefit: Benefit;
}

const BenefitCard = ({ benefit}: Props) => (
    <motion.div
    className="rounded-2xl shadow-md p-6 min-w-[220px] max-w-[260px] flex flex-col items-center transition-transform duration-200 cursor-pointer bg-white dark:bg-[#23242a] hover:scale-[1.03] hover:shadow-xl dark:hover:shadow-2xl"
    whileHover={{
      scale: 1.04,
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    }}
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    }}
    transition={{ type: 'spring', stiffness: 120, damping: 14 }}
  >
    <div className="text-5xl mb-4">{benefit.icon}</div>
    <h3 className="font-semibold text-zinc-900 dark:text-white text-lg">{benefit.title}</h3>
    <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1 mb-4">{benefit.desc}</p>
    <button className="self-center px-4 py-2 text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white transition">
      {benefit.cta}
    </button>
  </motion.div>
);

export default BenefitCard;
