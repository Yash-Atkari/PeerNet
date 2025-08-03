import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api';
import PostCard from './PostCard';
import NewPostForm from './NewPostForm';
import { AuthContext } from '../AuthContext';

export default function Profile() {
  const { id } = useParams();
  const { user: currentUser } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);

  const fetchProfile = async () => {
    const { data } = await api.get(`/users/${id}`);
    setProfile(data);
  };

  const fetchPosts = async () => {
    const { data } = await api.get(`/users/${id}/posts`);
    setPosts(data);
  };

  useEffect(() => { fetchProfile(); fetchPosts(); }, [id]);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <div className="flex items-center mb-4">
        {profile.avatar && <img src={profile.avatar} alt="avatar" className="w-16 h-16 rounded-full mr-4" />}
        <div>
          <div className="text-2xl font-bold">{profile.name}</div>
          <div className="text-gray-600">{profile.email}</div>
          <div className="mt-2">{profile.bio}</div>
        </div>
      </div>
      {currentUser && currentUser.id === id && <NewPostForm onPost={fetchPosts} />}
      {posts.map(p => <PostCard key={p._id} post={p} />)}
    </div>
  );
}
