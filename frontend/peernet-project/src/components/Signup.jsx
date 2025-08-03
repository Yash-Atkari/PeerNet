import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { api } from '../api';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const { login } = useContext(AuthContext);
  const nav = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/register', form);
      login(data.user, data.token);
      nav('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl mb-4">Sign Up</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input type="text" name="name" placeholder="Name" value={form.name}
               onChange={handleChange} required
               className="p-2 mb-2 border" />
        <input type="email" name="email" placeholder="Email" value={form.email}
               onChange={handleChange} required
               className="p-2 mb-2 border" />
        <input type="password" name="password" placeholder="Password" value={form.password}
               onChange={handleChange} required
               className="p-2 mb-2 border" />
        <button type="submit" className="p-2 bg-green-500 text-white">Sign Up</button>
      </form>
      <p className="mt-4">Already have an account? <Link to="/login" className="text-blue-500">Login</Link></p>
    </div>
  );
}
