import { auth, db } from '@/lib/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

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

  const signup = async (email: string, password: string, fullName: string) => {
    setError(null);
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      await setDoc(doc(db, 'users', user.uid), {
        fullName,
        email,
        createdAt: new Date().toISOString(),
        level: 1,
        progress: 20,
      });
  
      await setDoc(doc(db, 'rewards', user.uid), {
        userId: user.uid,
        totalXP: 10000,
        currentXp: 5000,
      });
  
      setUser(user);
  
      localStorage.setItem('isLoggedIn', 'true');
  
      return user;
    } catch (err: any) {
      setError(err.message || 'Signup failed. Please try again.');
      throw err;
    }
  };
  
  

  const login = async (email: string, password: string) => {
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem('isLoggedIn', 'true');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
      throw err;
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    localStorage.setItem('isLoggedIn', 'false');
  };

  return { user, loading, error, signup, login, logout };
};
