import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import './NavBar.css';

export default function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();
  const handleLogout = () => {
    logout();
    nav('/login');
  };
  return (
    <nav className="navbar">
  <Link to="/" className="brand">PeerNet</Link>
  <div>
    {user ? (
      <>
        <Link to={`/profile/${user.id}`}>{user.name}</Link>
        <button onClick={handleLogout}>Logout</button>
      </>
    ) : (
      <>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </>
    )}
  </div>
</nav>
  );
}
