'use client';
import { motion } from 'framer-motion';

const benefits = [
  { title: "10% Off", icon: "🎁", desc: "Save on your next bill", cta: "Claim" },
  { title: "Movie Tickets", icon: "🎬", desc: "Buy 1 Get 1 Free", cta: "View" },
  { title: "Gift Cards", icon: "🎉", desc: "Redeem your points", cta: "Claim" }
];

const BenefitsGrid = () => (
  <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
    {benefits.map((benefit, idx) => (
      <motion.div
        key={idx}
        className="p-5 bg-white dark:bg-zinc-800 rounded-lg shadow hover:shadow-lg transition"
        whileHover={{ scale: 1.03 }}
      >
        <div className="text-4xl mb-2">{benefit.icon}</div>
        <h3 className="font-bold text-zinc-800 dark:text-white">{benefit.title}</h3>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">{benefit.desc}</p>
        <button className="mt-4 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
          {benefit.cta}
        </button>
      </motion.div>
    ))}
  </motion.div>
);

export default BenefitsGrid;
