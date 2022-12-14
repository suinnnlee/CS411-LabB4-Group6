import React from 'react'
import useAuth from '../hooks/useAuth'
import { useLocation, Navigate } from 'react-router-dom'

function RequireAuth({ children }) {
    const { authed } = useAuth();
    const location = useLocation();
  
    return authed === true ? (
      children
    ) : (
      <Navigate to="/" replace state={{ path: location.pathname }} />
    );
}

export default RequireAuth;