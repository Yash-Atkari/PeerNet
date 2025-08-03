import React, { useState, useEffect, useContext } from 'react';
import { api } from '../api';
import PostCard from './PostCard';
import NewPostForm from './NewPostForm';
import { AuthContext } from '../AuthContext';

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const { token } = useContext(AuthContext);

  const fetchPosts = async () => {
    const { data } = await api.get('/posts');
    setPosts(data);
  };

  useEffect(() => { fetchPosts(); }, []);

  return (
    <div className="max-w-2xl mx-auto mt-6">
      {token && <NewPostForm onPost={fetchPosts} />}
      {posts.map(post => <PostCard key={post._id} post={post} />)}
    </div>
  );
}
