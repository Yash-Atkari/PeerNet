import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { api } from '../api';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const { login } = useContext(AuthContext);
  const nav = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const form = { username, password }; // ✅ Define form before sending
      const { data } = await api.post(`/api/login`, form);
      login(data.user); // updates context + localStorage
      nav('/'); // redirect to home after login
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
  <div className="login-container">
    <h2>Login</h2>
    {error && <p className="login-error">{error}</p>}
    <form onSubmit={handleSubmit} className="login-form">
      <input type="text" placeholder="Username" value={username}
             onChange={e => setUsername(e.target.value)} required />
      <input type="password" placeholder="Password" value={password}
             onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Login</button>
    </form>
    <p className="login-footer">
      No account? <Link to="/signup">Sign up</Link>
    </p>
  </div>
);
}
