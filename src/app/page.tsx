'use client';

import BenefitsGrid from "./components/BenefitsGrid";
import RewardPoints from "./components/RewardPoints";
import ThemeToggle from "./components/ThemeToggle";
import UserProfile from "./components/UserProfile";

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-zinc-800 dark:text-white">Dashboard</h1>
        <ThemeToggle />
      </div>
      <UserProfile />
      <RewardPoints />
      <BenefitsGrid />
    </main>
  );
}