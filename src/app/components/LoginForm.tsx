'use client';

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import Notification from './Notification';
import Spinner from './Spinner';

interface LoginFormProps {
  onLogin: () => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);
    try {
      await login(email, password);
      setSuccessMessage('Login successful!');
  
      setTimeout(() => {
        onLogin();
      }, 1500);
    } catch (err: any) {
      setErrorMessage(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
      <AnimatePresence>
        {errorMessage && <Notification type="error" message={errorMessage} onClose={() => setErrorMessage('')} />}
        {successMessage && <Notification type="success" message={successMessage} onClose={() => setSuccessMessage('')} />}
      </AnimatePresence>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-black p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-6 text-center">Login</h2>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 mb-4 border border-zinc-300 dark:border-zinc-700 rounded-lg dark:bg-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
          disabled={loading}
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-3 mb-4 border border-zinc-300 dark:border-zinc-700 rounded-lg dark:bg-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
          disabled={loading}
        />

<motion.button
  whileTap={{ scale: 0.95 }}
  whileHover={{ scale: loading ? 1 : 1.02 }}
  type="submit"
  disabled={loading}
  className={`w-full py-3 px-4 font-semibold rounded-lg shadow transition ${
    loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white'
  } flex justify-center items-center`}
>
  <div className="w-24 flex justify-center">
    {loading ? <Spinner /> : 'Sign In'}
  </div>
</motion.button>

      </motion.form>
    </>
  );
};

export default LoginForm;
