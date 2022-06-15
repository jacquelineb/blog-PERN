import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { authVerify, authLogin, authLogout } from '../api/auth';

const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    async function getCurrentUser() {
      setIsLoadingUser(true);
      try {
        const response = await authVerify();
        const userData = await response.json();
        setUser(userData.user);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingUser(false);
      }
    }
    getCurrentUser();
  }, []);

  async function login(credentials) {
    setIsLoading(true);
    try {
      const response = await authLogin(credentials);
      if (response.status === 200) {
        const { user } = await response.json();
        setUser(user);
        return true;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function logout() {
    try {
      await authLogout();
      setUser(undefined);
    } catch (error) {
      console.error(error);
    }
  }

  const memoizedValue = useMemo(
    () => ({
      user,
      isLoading,
      login,
      logout,
    }),
    [user, isLoading]
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

export { useAuthContext, AuthProvider };
