import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { authVerify, authLogin, authLogout } from '../api/auth';

const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setError(null);
  }, [location.pathname]);

  useEffect(() => {
    async function getCurrentUser() {
      setIsLoadingUser(true);
      const _user = await authVerify();
      setUser(_user);
      setIsLoadingUser(false);
    }
    getCurrentUser();
  }, []);

  async function login(credentials) {
    setIsLoading(true);
    const loginStatus = await authLogin(credentials);
    if (loginStatus.user) {
      setUser(loginStatus.user);
    } else {
      setError(loginStatus.error);
    }
    setIsLoading(false);
  }

  async function logout() {
    await authLogout();
    setUser(undefined);
  }

  const memoizedValue = useMemo(
    () => ({
      user,
      isLoading,
      error,
      login,
      logout,
    }),
    [user, isLoading, error]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {!isLoadingUser && children}
    </AuthContext.Provider>
  );
}

function useAuthContext() {
  return useContext(AuthContext);
}

// Reference: https://dev.to/finiam/predictable-react-authentication-with-the-context-api-g10
export { useAuthContext, AuthProvider };
