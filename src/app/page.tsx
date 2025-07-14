'use client';

import { useEffect, useState } from 'react';
import RewardPoints from './components/RewardPoints';
import UserProfile from './components/UserProfile';
import BenefitsGrid from './components/BenefitsGrid';
import DashboardFooter from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignUpForm';
import { useAuth } from './hooks/useAuth';
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/solid';
import './icons';

export default function Home() {
  const { user, loading, logout } = useAuth();
  const [showSignup, setShowSignup] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const flag = localStorage.getItem('isLoggedIn');
    setIsAuthenticated(flag === 'true');
  }, [user]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    localStorage.setItem('isLoggedIn', 'false');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-zinc-100 via-white to-zinc-200 dark:from-black dark:via-black dark:to-black text-zinc-900 dark:text-white">
      {/* Header */}
      <header className="w-full border-b border-zinc-200 dark:border-zinc-800 shadow-sm backdrop-blur bg-white/60 dark:bg-zinc-900/60 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-teal-400 to-emerald-400">
            CRED Garage
          </h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                aria-label="Logout"
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-white hover:bg-teal-500 hover:text-white transition"
              >
                <ArrowRightStartOnRectangleIcon className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-6">
        {!user && !isAuthenticated ? (
          <div className="w-full max-w-md p-6 rounded-2xl shadow-xl backdrop-blur-md bg-white/60 dark:bg-zinc-900/70">
            {showSignup ? (
              <>
                <SignupForm onSignup={handleLogin} />
                <button
                  className="mt-4 text-sm text-blue-600 hover:underline w-full text-center"
                  onClick={() => setShowSignup(false)}
                >
                  Already have an account? Login
                </button>
              </>
            ) : (
              <>
                <LoginForm onLogin={handleLogin} />
                <button
                  className="mt-4 text-sm text-blue-600 hover:underline w-full text-center"
                  onClick={() => setShowSignup(true)}
                >
                  Don’t have an account? Sign up
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="max-w-5xl mx-auto px-4 py-8">
            <UserProfile />
            <RewardPoints />
            <BenefitsGrid />
          </div>
        )}
      </main>
      {/* Footer */}
      <footer className="mt-auto">
        <DashboardFooter />
      </footer>
    </div>
  );
}
