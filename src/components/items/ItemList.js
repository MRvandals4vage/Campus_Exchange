import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { FiClock, FiTag } from 'react-icons/fi';

const ItemList = ({ selectedCategory, searchTerm }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);

        const snapshot = await getDocs(collection(db, 'items'));
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        const filtered = data.filter(item => {
          const matchesCategory = selectedCategory
            ? item.category === selectedCategory
            : true;
          const matchesSearch = searchTerm
            ? item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
              item.desc?.toLowerCase().includes(searchTerm.toLowerCase())
            : true;
          return matchesCategory && matchesSearch;
        });

        setItems(filtered);
      } catch (error) {
        console.error('Error fetching items:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [selectedCategory, searchTerm]);

  return (
    <div className="space-y-6">
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 bg-silver rounded-lg shadow-md border border-black">
          <p className="text-gray-500 text-lg">No items found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map(item => (
            <div key={item.id} className="bg-silver rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-black">
              {item.imageUrl && (
                <img 
                  src={item.imageUrl} 
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-5">
                <h2 className="text-xl font-bold text-black mb-2">{item.title}</h2>
                <p className="text-gray-600 mb-4">{item.desc}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <FiClock className="mr-1" />
                    {item.createdAt?.toDate()?.toLocaleDateString()}
                  </div>
                  {item.category && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-black text-white">
                      <FiTag className="mr-1" />
                      {item.category}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ItemList;
