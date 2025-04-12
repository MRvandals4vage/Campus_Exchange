import React from 'react';
import PostItem from '../components/items/PostItem';
import ItemList from '../components/items/ItemList';

const Home = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h1 className="text-2xl font-semibold">Exchange Items</h1>
      <PostItem />
      <ItemList />
    </div>
  );
};

export default Home;