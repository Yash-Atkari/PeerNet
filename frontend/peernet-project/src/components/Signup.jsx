import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { api } from '../api';
import { useNavigate, Link } from 'react-router-dom';
import './Signup.css';
const BASE_URL = import.meta.env.VITE_API_BASE;

export default function Signup() {
  const { login } = useContext(AuthContext);
  const nav = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await api.post(`${BASE_URL}/api/auth/register`, form);
      login(data.user);
      nav('/');
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Sign Up</h2>
      {error && <p className="signup-error">{error}</p>}
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
          className="signup-input"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="signup-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="signup-input"
        />
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
      <p className="signup-footer">
        Already have an account? <Link to="/login" className="signup-link">Login</Link>
      </p>
    </div>
  );
}
