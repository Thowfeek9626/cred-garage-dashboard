import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export const useFetchCollection = <T extends { id: string }>(collectionName: string) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ref = collection(db, collectionName);
        const snapshot = await getDocs(ref);
        const docs = snapshot.docs.map(doc => {
          const docData = doc.data();
          return {
            id: doc.id,
            ...(docData as Omit<T, 'id'>)
          } as T;
        });
        setData(docs);
      } catch (err: any) {
        console.error(`Error fetching ${collectionName}:`, err);
        setError(`Failed to load ${collectionName}. Please try again later.`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [collectionName]);

  return { data, loading, error };
};
