import { createContext, useContext, useState } from 'react';

const AuthContext = createContext({
  user: {},
  login() {},
  logout() {},
  register() {},
  isLoggedIn: false,
  isLoading: false,
});

import React from 'react';

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const isLoggedIn = !!user;

  function login(uObj) {
    setUser(uObj);
  }

  const authCtx = {
    user,
    isLoading,
    isLoggedIn,
    login,
  };

  return <AuthContext.Provider value={authCtx}>{children}</AuthContext.Provider>;
}

export default AuthProvider;

export function useAuthCtx() {
  return useContext(AuthContext);
}
