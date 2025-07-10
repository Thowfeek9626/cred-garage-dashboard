'use client';

import RewardPoints from "./components/RewardPoints";
import { useFetchUserProfile } from "./hooks/useFetchUserProfile";
import { useFetchRewards } from "./hooks/useFetchRewards";
import UserProfile from "./components/UserProfile";
import BenefitsGrid from "./components/BenefitsGrid";
import DashboardFooter from "./components/Footer";
import ThemeToggle from "./components/ThemeToggle";

export default function Home() {
  const userId = 'F0E2ZvHF75uuo2BlokZu';
  const { profile, loading } = useFetchUserProfile(userId);
  const { reward, loading: rewardLoading } = useFetchRewards('RJz9ZtjgO96FNCPy9M6H');

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <header>
        <div className="flex flex-col sm:flex-row justify-between items-center m-8 gap-4">
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">CRED Garage</h1>
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10">
        <UserProfile loading={loading} profile={profile} />
        <RewardPoints loading={rewardLoading} reward={reward} />
        <BenefitsGrid />
      </main>

      <DashboardFooter />
    </div>
  );
}
