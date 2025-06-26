import React from 'react';
import { getAuth } from 'firebase/auth';
import { Navigate } from 'react-router-dom';
import { app } from '../firebase';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const auth = getAuth(app);
  const user = auth.currentUser;

  if (!user) {
    return <Navigate to="/adminlogin" />;
  }

  return children;
};

export default ProtectedRoute;
