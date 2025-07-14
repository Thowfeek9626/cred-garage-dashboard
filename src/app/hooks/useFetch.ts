import { useState, useEffect } from 'react';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '@/lib/firebase';

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
    let isSubscribed = true;

    const fetchData = async (finalDocId?: string) => {
      try {
        if (!isSubscribed) return;
        if (mode === 'collection') {
          const ref = collection(db, collectionName);
          const snapshot = await getDocs(ref);
          if (!isSubscribed) return;
          const docs = snapshot.docs.map(doc => ({
            id: doc.id,
            ...(doc.data() as Omit<T, 'id'>),
          })) as T[];
          setData(docs);
        } else if (mode === 'document') {
          const ref = doc(db, collectionName, finalDocId!);
          const snapshot = await getDoc(ref);
          if (!isSubscribed) return;
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
        if (!isSubscribed) return;
        console.error(`Error fetching ${collectionName}:`, err);
        setError(`Failed to load ${collectionName}.`);
      } finally {
        if (isSubscribed) setLoading(false);
      }
    };

    if (mode === 'document') {
      if (docId) {
        fetchData(docId);
      } else {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            fetchData(user.uid);
          } else {
            setError('User not authenticated');
            setLoading(false);
          }
        });
        return () => {
          isSubscribed = false;
          unsubscribe();
        };
      }
    } else {
      fetchData();
    }

    return () => {
      isSubscribed = false;
    };
  }, [collectionName, mode, docId]);

  return { data, loading, error };
};
