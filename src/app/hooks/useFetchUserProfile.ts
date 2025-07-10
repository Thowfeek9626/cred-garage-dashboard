import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Profile } from '../types';

export const useFetchUserProfile = (userId: string) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const ref = doc(db, 'users', userId);
      const snapshot = await getDoc(ref);
      if (snapshot.exists()) {
        const obj: Profile = { id: snapshot.id, ...(snapshot.data() as Omit<Profile, 'id'>) };
        setProfile(obj);
      }
      setLoading(false);
    };

    fetchProfile();
  }, [userId]);

  return { profile, loading};
};
