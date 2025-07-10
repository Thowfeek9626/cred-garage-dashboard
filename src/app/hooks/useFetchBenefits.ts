import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Benefit } from '../types';

export const useFetchBenefits = () => {
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBenefits = async () => {
      try {
        const ref = collection(db, 'benefits');
        const snapshot = await getDocs(ref);
        const data: Benefit[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<Benefit, 'id'>),
        }));
        setBenefits(data);
      } catch (err: any) {
        console.error("Error fetching benefits:", err);
        setError('Failed to load benefits. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBenefits();
  }, []);

  return { benefits, loading, error };
};
