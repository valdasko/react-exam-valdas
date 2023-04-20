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
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = {
    user,
    isLoading,
  };

  return <AuthContext.Provider value={authCtx}>{children}</AuthContext.Provider>;
}

export default AuthProvider;

export function useAuthCtx() {
  return useContext(AuthContext);
}
