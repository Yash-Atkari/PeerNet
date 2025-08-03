import React from 'react';
import { formatDistanceToNow } from 'date-fns';

export default function PostCard({ post }) {
  return (
    <div className="border p-4 mb-4 rounded">
      <div className="font-bold">{post.author.name}</div>
      <div className="text-sm text-gray-500 mb-2">
        {formatDistanceToNow(new Date(post.createdAt))} ago
      </div>
      <div>{post.text}</div>
    </div>
  );
}
