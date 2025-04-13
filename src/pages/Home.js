import React, { useState } from 'react';
import PostItem from '../components/items/PostItem';
import ItemList from '../components/items/ItemList';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div style={{ backgroundColor: '#e5e7eb', color: '#000', minHeight: '100vh', padding: '20px' }}>
      {/* Post Item Form */}
      <PostItem />

      {/* Filters */}
      <div style={{
        marginTop: '24px',
        marginBottom: '24px',
        backgroundColor: '#f8f9fa',
        padding: '16px',
        borderRadius: '12px',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
        border: '1px solid #000'
      }}>
        <input
          type="text"
          placeholder="Search by title or description"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            display: 'block',
            width: '100%',
            marginBottom: '12px',
            padding: '8px 12px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            fontSize: '16px',
            backgroundColor: '#f8f9fa'
          }}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            display: 'block',
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            fontSize: '16px',
            backgroundColor: '#f8f9fa'
          }}
        >
          <option value="">All Categories</option>
          <option value="Books">Books</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
        </select>
      </div>

      {/* Item List */}
      <h2 style={{
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '16px',
        color: '#000'
      }}>
        Available Items
      </h2>
      <ItemList selectedCategory={selectedCategory} searchTerm={searchTerm} />
    </div>
  );
};

export default Home;
