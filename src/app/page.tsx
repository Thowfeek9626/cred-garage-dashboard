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
    <div className="flex flex-col justify-between min-h-screen">
      <header className="w-full bg-zinc-100 dark:bg-black">
  <div className="flex flex-col sm:flex-row justify-between items-center m-8 gap-4">
    <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
      CRED Garage
    </h1>
    <div className="flex items-center gap-4">
      <ThemeToggle />
      {isAuthenticated && (
        <button
          onClick={handleLogout}
          className="text-sm px-4 py-2 border rounded-lg bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-700 transition text-zinc-900 dark:text-white"
        >
          Logout
        </button>
      )}
    </div>
  </div>
</header>


      {!user && !isAuthenticated ? (
        <div className="flex flex-col items-center justify-center flex-1 bg-zinc-100 dark:bg-black gap-4 px-4">
          {showSignup ? (
            <>
              <SignupForm onSignup={handleLogin} />
              <button
                className="text-sm text-blue-600 hover:underline"
                onClick={() => setShowSignup(false)}
              >
                Already have an account? Login
              </button>
            </>
          ) : (
            <>
              <LoginForm onLogin={handleLogin} />
              <button
                className="text-sm text-blue-600 hover:underline"
                onClick={() => setShowSignup(true)}
              >
                Don’t have an account? Sign up
              </button>
            </>
          )}
        </div>
      ) : (
        <>
          <main className="max-w-5xl mx-auto px-4 py-8">
            <UserProfile />
            <RewardPoints />
            <BenefitsGrid />
          </main>
          <DashboardFooter />
        </>
      )}
    </div>
  );
}
