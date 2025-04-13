// src/components/PostForm.js
import React, { useRef, useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { v4 as uuidv4 } from 'uuid';

const PostForm = () => {
  const titleRef = useRef();
  const descRef = useRef();
  const imageRef = useRef();
  const tagsRef = useRef();
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = '';
      const imageFile = imageRef.current.files[0];

      // Upload image to Firebase Storage
      if (imageFile) {
        const imagePath = `item-images/${uuidv4()}-${imageFile.name}`;
        const imageRefStorage = ref(storage, imagePath);
        await uploadBytes(imageRefStorage, imageFile);
        imageUrl = await getDownloadURL(imageRefStorage);
      }

      // Parse tags (comma-separated)
      const tags = tagsRef.current.value
        .split(',')
        .map(tag => tag.trim())
        .filter(Boolean);

      await addDoc(collection(db, 'items'), {
        title: titleRef.current.value,
        desc: descRef.current.value,
        imageUrl,
        tags,
        uid: currentUser.uid,
        userName: currentUser.displayName || 'Anonymous',
        userPhoto: currentUser.photoURL || '',
        createdAt: serverTimestamp(),
      });

      // Clear form
      titleRef.current.value = '';
      descRef.current.value = '';
      tagsRef.current.value = '';
      imageRef.current.value = '';
      alert('Item posted successfully!');
    } catch (err) {
      console.error('Error posting item:', err);
      alert('Failed to post item.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Post a New Item</h2>
      <input ref={titleRef} type="text" placeholder="Item Title" className="w-full p-2 border rounded" required />
      <textarea ref={descRef} placeholder="Description" className="w-full p-2 border rounded" required></textarea>
      <input ref={tagsRef} type="text" placeholder="Tags (comma-separated)" className="w-full p-2 border rounded" />
      <input ref={imageRef} type="file" accept="image/*" className="w-full p-2 border rounded" />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Posting...' : 'Post Item'}
      </button>
    </form>
  );
};

export default PostForm;
