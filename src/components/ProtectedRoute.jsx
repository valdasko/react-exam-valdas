import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuthCtx } from '../store/AuthProvider';

function ProtectedRoute({ element: Component, ...rest }) {
  const { isLoggedIn } = useAuthCtx();

  return <Route {...rest} element={isLoggedIn ? <Component /> : <Navigate to='/login' />} />;
}

export default ProtectedRoute;
