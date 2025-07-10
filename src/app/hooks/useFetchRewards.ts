import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Reward } from '../types';

export const useFetchRewards = (userId: string) => {
  const [reward, setReward] = useState<Reward | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const ref = doc(db, 'rewards', userId);
      const snapshot = await getDoc(ref);
      if (snapshot.exists()) {
        const obj: Reward = { id: snapshot.id, ...(snapshot.data() as Omit<Reward, 'id'>) };
        setReward(obj);
      }
      setLoading(false);
    };

    fetchProfile();
  }, [userId]);

  return { reward, loading};
};
