import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // src/contexts/AuthContext.js
useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged(user => {
    // Add null check and proper state update
    if (user !== currentUser) {
      setCurrentUser(user ?? null);
    }
    setLoading(false);
  });
  return unsubscribe;
}, []);

  const value = {
    currentUser,
    login: async (email, password) => {
      return auth.signInWithEmailAndPassword(email, password);
    },
    signup: async (email, password) => {
      return auth.createUserWithEmailAndPassword(email, password);
    },
    logout: async () => {
      return auth.signOut();
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}