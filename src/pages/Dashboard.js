import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { FiTrash2, FiEdit } from 'react-icons/fi';

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchUserItems = async () => {
      if (!currentUser) return;
      try {
        const q = query(collection(db, 'items'), where('uid', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItems(data);
      } catch (error) {
        console.error('Error fetching user items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserItems();
  }, [currentUser]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await deleteDoc(doc(db, 'items', id));
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-10 text-center text-yellow-400 tracking-widest uppercase">
          My Exchange Posts
        </h1>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20 text-yellow-200 text-lg">
            You haven’t posted any items yet. Start by creating your first post!
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-gray-900 text-yellow-100 rounded-xl shadow-xl overflow-hidden border border-yellow-600 hover:shadow-yellow-600 transition-shadow duration-300"
              >
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-5 space-y-4">
                  <div className="flex items-center space-x-3">
                    {item.userPhoto && (
                      <img
                        src={item.userPhoto}
                        alt="User"
                        className="w-10 h-10 rounded-full object-cover border border-yellow-400"
                      />
                    )}
                    <div>
                      <p className="font-medium text-yellow-300">{item.userName || 'Anonymous'}</p>
                      <p className="text-xs text-yellow-500">
                        {item.createdAt?.toDate().toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-yellow-200">{item.title}</h3>
                  <p className="text-yellow-400">{item.desc}</p>

                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-yellow-100 text-black px-2 py-1 rounded-full font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-end space-x-3 pt-2">
                    <button
                      className="p-2 text-yellow-300 hover:bg-yellow-700 hover:text-white rounded-full transition"
                      aria-label="Edit item"
                      onClick={() => alert('Edit functionality coming soon!')}
                    >
                      <FiEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-red-400 hover:bg-red-700 hover:text-white rounded-full transition"
                      aria-label="Delete item"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
