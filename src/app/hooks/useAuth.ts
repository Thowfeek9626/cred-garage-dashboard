import { useEffect, useState } from 'react';
import { auth } from '../../lib/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      localStorage.setItem('isLoggedIn', currentUser ? 'true' : 'false');
    });

    return () => unsubscribe();
  }, []);

  const signup = async (email: string, password: string) => {
    setError(null);
    await createUserWithEmailAndPassword(auth, email, password);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const login = async (email: string, password: string) => {
    setError(null);
    await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    localStorage.setItem('isLoggedIn', 'false');
  };

  return { user, loading, error, signup, login, logout };
};
