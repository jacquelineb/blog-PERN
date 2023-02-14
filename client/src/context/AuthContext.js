import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { authVerify, authLogin, authLogout } from '../api/auth';

const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState();
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
      const _authUser = await authVerify();
      setAuthUser(_authUser);
      setIsLoadingUser(false);
    }
    getCurrentUser();
  }, []);

  async function login(credentials) {
    setIsLoading(true);
    const loginStatus = await authLogin(credentials);
    if (loginStatus.user) {
      setAuthUser(loginStatus.user);
    } else {
      setError(loginStatus.error);
    }
    setIsLoading(false);
  }

  async function logout() {
    await authLogout();
    setAuthUser(undefined);
  }

  const memoizedValue = useMemo(
    () => ({
      authUser,
      isLoading,
      error,
      login,
      logout,
    }),
    [authUser, isLoading, error]
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
