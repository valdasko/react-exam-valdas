import { createContext, useContext, useState } from 'react';
import React from 'react';
import { redirect, useNavigate } from 'react-router';

const AuthContext = createContext({
  user: {},
  login() {},
  logout() {},
  register() {},
  isLoggedIn: false,
  isLoading: false,
});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const isLoggedIn = !!user;
  const navigate = useNavigate();
  function login(uObj) {
    setUser(uObj);
    navigate('/');
  }
  function logout() {
    setUser(null);
    navigate('/');
  }
  function register(uObj) {
    setUser(uObj);
    navigate('/');
  }

  const authCtx = {
    user,
    isLoading,
    isLoggedIn,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={authCtx}>{children}</AuthContext.Provider>;
}

export default AuthProvider;

export function useAuthCtx() {
  return useContext(AuthContext);
}
