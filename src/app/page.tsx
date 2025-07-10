'use client';
 
import RewardPoints from "./components/RewardPoints";
import UserProfile from "./components/UserProfile";
import BenefitsGrid from "./components/BenefitsGrid";
import DashboardFooter from "./components/Footer";
import ThemeToggle from "./components/ThemeToggle";
 
export default function Home() {
 
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <header>
        <div className="flex flex-col sm:flex-row justify-between items-center m-8 gap-4">
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">CRED Garage</h1>
          <ThemeToggle />
        </div>
      </header>
 
      <main className="max-w-5xl mx-auto px-4 py-8">
      <UserProfile />
      <RewardPoints />
      <BenefitsGrid />
    </main>
 
      <DashboardFooter />
    </div>
  );
}