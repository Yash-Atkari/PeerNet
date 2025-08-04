import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthProvider, { AuthContext } from './AuthContext';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Signup from './components/Signup';
import Feed from './components/Feed';
import Profile from './components/Profile';

// Protects routes that require authentication
function RequireAuth({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <div style={{backgroundColor: "white", height: "100%", width: "100%"}}>
      <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <Feed />
              </RequireAuth>
            }
          />
          <Route
            path="/profile/:id"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          {/* Redirect any unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
    </div>
  );
}
