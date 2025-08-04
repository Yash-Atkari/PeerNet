import React, { useState, useEffect, useContext } from 'react';
import { api } from '../api';
import PostCard from './PostCard';
import NewPostForm from './NewPostForm';
import { AuthContext } from '../AuthContext';
import './Feed.css';

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  const fetchPosts = async () => {
    const { data } = await api.get('/posts');
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="feed-container">
      {user && <NewPostForm onPost={fetchPosts} />}
      <div className="post-list">
        {posts.map(post => <PostCard key={post._id} post={post} />)}
      </div>
    </div>
  );
}
