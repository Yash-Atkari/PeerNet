import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom'; // assuming you're using React Router
import './PostCard.css';

export default function PostCard({ post }) {
  return (
    <div className="post-card">
      <Link 
        to={`/profile/${post.author._id}`} 
        className="post-author"
      >
        {post.author.username}
      </Link>
      <div className="post-time">
        {formatDistanceToNow(new Date(post.createdAt))} ago
      </div>
      <div className="post-content">{post.text}</div>
    </div>
  );
}
