'use client';

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import Notification from './Notification';
import Spinner from './Spinner';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

interface SignupFormProps {
  onSignup: () => void;
}

const SignupForm = ({ onSignup }: SignupFormProps) => {
  const { signup } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);
    try {
      await signup(email, password, fullName);
      setSuccessMessage('Account created successfully!');
      setTimeout(() => {
        onSignup();
      }, 1500);
    } catch (err: any) {
      setErrorMessage(err.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {errorMessage && (
          <Notification
            key="error"
            type="error"
            message={errorMessage}
            onClose={() => setErrorMessage('')}
          />
        )}
        {successMessage && (
          <Notification
            key="success"
            type="success"
            message={successMessage}
            onClose={() => setSuccessMessage('')}
          />
        )}
      </AnimatePresence>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-black p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-6 text-center">Sign Up</h2>

        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Full Name"
          className="w-full p-3 mb-4 border border-zinc-300 dark:border-zinc-700 rounded-lg dark:bg-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
          disabled={loading}
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 mb-4 border border-zinc-300 dark:border-zinc-700 rounded-lg dark:bg-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
          disabled={loading}
        />

        <div className="relative mb-4">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 pr-10 border border-zinc-300 dark:border-zinc-700 rounded-lg dark:bg-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
            disabled={loading}
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-zinc-500 dark:text-zinc-400"
            onClick={() => setShowPassword((prev) => !prev)}
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeSlashIcon className="w-5 h-5" />
            ) : (
              <EyeIcon className="w-5 h-5" />
            )}
          </button>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: loading ? 1 : 1.02 }}
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 font-semibold rounded-lg shadow transition ${
            loading ? 'bg-pink-400 cursor-not-allowed' : 'bg-pink-600 hover:bg-pink-700 text-white'
          }`}
        >
          {loading ? <Spinner /> : 'Create Account'}
        </motion.button>
      </motion.form>
    </>
  );
};

export default SignupForm;
