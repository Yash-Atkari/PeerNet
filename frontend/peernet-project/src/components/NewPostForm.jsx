import React, { useState } from 'react';
import { api } from '../api';
import './NewPostForm.css';
const BASE_URL = import.meta.env.VITE_API_BASE;

export default function NewPostForm({ onPost }) {
  const [text, setText] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    await api.post(`${BASE_URL}/api/posts`, { text });
    setText('');
    onPost();
  };

  return (
    <form onSubmit={handleSubmit} className="new-post-form mb-6">
      <textarea
        className="w-full p-2 border mb-2"
        rows={3}
        placeholder="What's on your mind?"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
        Post
      </button>
    </form>
  );
}
