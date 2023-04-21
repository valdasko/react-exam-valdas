import { createContext, useContext, useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router';

const localUserKey = 'FIRE_USER';

const storageUserData = localStorage.getItem(localUserKey);

const AuthContext = createContext({
  user: {},
  // uid: storageUserData ? user.uid : null,
  login() {},
  logout() {},
  register() {},
  isLoggedIn: false,
  isLoading: false,
});

function AuthProvider({ children }) {
  const navigate = useNavigate();

  // States
  const [user, setUser] = useState(() => {
    const storageUserData = localStorage.getItem(localUserKey);
    return storageUserData ? { uid: storageUserData } : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  const isLoggedIn = !!user;

  function login(uObj) {
    localStorage.setItem(localUserKey, uObj.uid);
    setUser(uObj);

    navigate('/shops');
  }
  function logout() {
    setUser(null);
    localStorage.removeItem(localUserKey);
    navigate('/');
  }
  function register(uObj) {
    setUser(uObj);
    navigate('/shops');
  }

  const authCtx = {
    user,

    isLoading,
    isLoggedIn,
    login,
    logout,
    register,
    setIsLoading,
  };

  return <AuthContext.Provider value={authCtx}>{children}</AuthContext.Provider>;
}

export default AuthProvider;

export function useAuthCtx() {
  return useContext(AuthContext);
}
