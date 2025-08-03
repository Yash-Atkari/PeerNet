import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { api } from '../api';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const { login } = useContext(AuthContext);
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', { email, password });
      login(data.user, data.token);
      nav('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl mb-4">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input type="email" placeholder="Email" value={email}
               onChange={e => setEmail(e.target.value)} required
               className="p-2 mb-2 border"/>
        <input type="password" placeholder="Password" value={password}
               onChange={e => setPassword(e.target.value)} required
               className="p-2 mb-2 border"/>
        <button type="submit" className="p-2 bg-blue-500 text-white">Login</button>
      </form>
      <p className="mt-4">No account? <Link to="/signup" className="text-blue-500">Sign up</Link></p>
    </div>
  );
}
