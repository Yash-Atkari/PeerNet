import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

export default function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();
  const handleLogout = () => {
    logout();
    nav('/login');
  };
  return (
    <nav className="p-4 bg-gray-100 flex justify-between">
      <Link to="/" className="font-bold text-xl">PeerNet</Link>
      <div>
        {user ? (
          <>
            <Link to={`/profile/${user.id}`} className="mr-4">{user.name}</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>            
            <Link to="/login" className="mr-4">Login</Link>&nbsp;
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}
