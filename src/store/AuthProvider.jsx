import { createContext, useContext, useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';

const localUserKey = 'FIRE_USER';
const storageUserData = localStorage.getItem(localUserKey);

const AuthContext = createContext({
  user: {},
  login() {},
  logout() {},
  register() {},
  isLoggedIn: false,
  isLoading: false,
  logoutNotification() {},
  regNotification() {},
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

  const regNotification = () => toast.success('Welcome to our page', { duration: 3000 });
  const logoutNotification = () => toast.success('See you next time!', { duration: 2000 });

  function login(uObj) {
    localStorage.setItem(localUserKey, uObj.uid);
    setUser(uObj);
    navigate('/shops');
  }
  function logout() {
    setUser(null);
    localStorage.removeItem(localUserKey);
    logoutNotification();
    navigate('/');
  }
  function register(uObj) {
    regNotification();
    setUser(uObj);
    localStorage.setItem(localUserKey, uObj.uid);
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
