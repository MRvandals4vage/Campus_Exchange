import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import { FiPlusCircle } from 'react-icons/fi';

const PostItem = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !desc || !currentUser) return;

    setSubmitting(true);
    try {
      await addDoc(collection(db, 'items'), {
        title,
        desc,
        createdAt: serverTimestamp(),
        uid: currentUser.uid,
        userName: currentUser.displayName || 'Anonymous',
        userPhoto: currentUser.photoURL || '',
      });
      setTitle('');
      setDesc('');
    } catch (error) {
      console.error('Error adding item:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-red-500 font-medium">
          You must be logged in to post items.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <FiPlusCircle className="mr-2" />
          Post a New Item
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Item Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="What are you offering?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            required
            minLength={3}
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Describe your item in detail..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition min-h-[120px]"
            required
            minLength={10}
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition flex items-center justify-center disabled:opacity-70"
        >
          {submitting ? 'Posting...' : 'Post Item'}
        </button>
      </form>
    </div>
  );
};

export default PostItem;