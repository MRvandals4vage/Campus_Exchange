import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchUserItems = async () => {
      if (!currentUser) return;
      try {
        const q = query(
          collection(db, 'items'),
          where('uid', '==', currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItems(data);
      } catch (error) {
        console.error('Error fetching user items:', error);
      }
    };

    fetchUserItems();
  }, [currentUser]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'items', id));
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">My Posts</h1>
      {items.map((item) => (
        <div key={item.id} className="p-4 bg-white shadow rounded space-y-2">
          <h2 className="text-lg font-semibold">{item.title}</h2>
          <p>{item.desc}</p>
          <div className="flex space-x-4 mt-2">
            <button
              onClick={() => handleDelete(item.id)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
            {/* Optional Edit functionality */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
