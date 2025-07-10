'use client';
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const DashboardFooter: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.footer
      ref={ref}
      initial={{ y: 40, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : {}}
      transition={{ type: "spring", stiffness: 70, damping: 14 }}
      className="w-full mt-8 border-t bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
    >
      <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm sm:text-base text-zinc-500 dark:text-zinc-400">
        <p className="mb-1">
          © {new Date().getFullYear()} <span className="font-medium text-zinc-700 dark:text-zinc-300">Dashboard inspired by CRED Garage</span>
        </p>
        <p className="text-xs text-zinc-400 dark:text-zinc-600">
          All rights reserved. Crafted with ❤️ using Next.js, Tailwind CSS, and Framer Motion.
        </p>
      </div>
    </motion.footer>
  );
};

export default DashboardFooter;
