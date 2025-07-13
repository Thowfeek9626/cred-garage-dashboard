import { useState, useEffect } from 'react';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

type FetchMode = 'collection' | 'document';

export const useFetch = <T extends { id: string }>(
  collectionName: string,
  mode: FetchMode = 'collection',
  docId?: string
) => {
  const [data, setData] = useState<T | T[] | null>(mode === 'collection' ? [] : null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (mode === 'collection') {
          const ref = collection(db, collectionName);
          const snapshot = await getDocs(ref);
          const docs = snapshot.docs.map(doc => ({
            id: doc.id,
            ...(doc.data() as Omit<T, 'id'>),
          })) as T[]; // ✅ assert entire array
          setData(docs);
        } else if (mode === 'document' && docId) {
          const ref = doc(db, collectionName, docId);
          const snapshot = await getDoc(ref);
          if (snapshot.exists()) {
            const document = {
              id: snapshot.id,
              ...(snapshot.data() as Omit<T, 'id'>),
            } as T;
            setData(document);
          } else {
            setError(`Document not found in ${collectionName}`);
          }
        }
      } catch (err: any) {
        console.error(`Error fetching ${collectionName}:`, err);
        setError(`Failed to load ${collectionName}.`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [collectionName, mode, docId]);

  return { data, loading, error };
};
