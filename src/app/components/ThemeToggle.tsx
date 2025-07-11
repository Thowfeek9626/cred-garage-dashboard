'use client';
import { useEffect, useState } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

const ThemeToggle = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const isDark = stored === "dark";
    document.documentElement.classList.toggle("dark", isDark);
    setDark(isDark);
  }, []);

  const toggle = () => {
    const isDark = !dark;
    localStorage.setItem("theme", isDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", isDark);
    setDark(isDark);
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle Dark Mode"
      style={{cursor:'pointer'}}
      className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-white hover:bg-indigo-600 hover:text-white transition"
    >
      {dark ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
    </button>
  );
};

export default ThemeToggle;
