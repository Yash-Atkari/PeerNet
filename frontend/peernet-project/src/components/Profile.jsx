import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api';
import PostCard from './PostCard';
import NewPostForm from './NewPostForm';
import { AuthContext } from '../AuthContext';
import './Profile.css';

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
  <div className="profile-container">
    <div className="profile-header">
      {profile.avatar && (
        <img src={profile.avatar} alt="avatar" className="profile-avatar" />
      )}
      <div className="profile-info">
        <div className="profile-name">{profile.name}</div>
        <div className="profile-email">{profile.email}</div>
        <div className="profile-bio">{profile.bio}</div>
      </div>
    </div>
    {currentUser && <NewPostForm onPost={fetchPosts} />}
    {posts.map(p => <PostCard key={p._id} post={p} />)}
  </div>
);
}
