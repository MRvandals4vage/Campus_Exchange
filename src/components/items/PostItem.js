import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import { FiPlusCircle } from 'react-icons/fi';

const PostItem = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !desc || !currentUser) {
      alert('Please fill all fields and ensure you are logged in.');
      return;
    }

    setSubmitting(true);

    try {
      await addDoc(collection(db, 'items'), {
        title,
        desc,
        category,
        createdAt: serverTimestamp(),
        uid: currentUser.uid,
        userName: currentUser.displayName || 'Anonymous',
        userPhoto: currentUser.photoURL || '',
      });

      setTitle('');
      setDesc('');
      setCategory('');

      alert('Item posted successfully!');
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Failed to post item.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">You must be logged in to post items.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ backgroundColor: '#C0C0C0', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', border: '2px solid #000' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#000', marginBottom: '16px' }}>Post a New Item</h2>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="title" style={{ fontSize: '14px', fontWeight: '500', color: '#000' }}>Item Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginTop: '8px',
            borderRadius: '8px',
            border: '1px solid #000',
            fontSize: '16px',
            backgroundColor: '#fff'
          }}
          required
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="desc" style={{ fontSize: '14px', fontWeight: '500', color: '#000' }}>Description</label>
        <textarea
          id="desc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginTop: '8px',
            borderRadius: '8px',
            border: '1px solid #000',
            fontSize: '16px',
            backgroundColor: '#fff',
            minHeight: '100px'
          }}
          required
        ></textarea>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="category" style={{ fontSize: '14px', fontWeight: '500', color: '#000' }}>Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            marginTop: '8px',
            borderRadius: '8px',
            border: '1px solid #000',
            fontSize: '16px',
            backgroundColor: '#fff'
          }}
        >
          <option value="">Select Category</option>
          <option value="Books">Books</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={submitting}
        style={{
          width: '100%',
          padding: '12px',
          borderRadius: '8px',
          backgroundColor: submitting ? '#D3D3D3' : '#000',
          color: '#fff',
          fontSize: '16px',
          fontWeight: '600',
          cursor: submitting ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {submitting ? 'Posting...' : (
          <>
            <FiPlusCircle className="mr-2" />
            Post Item
          </>
        )}
      </button>
    </form>
  );
};

export default PostItem;
