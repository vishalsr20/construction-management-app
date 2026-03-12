import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Try to load user from localStorage to persist mock session
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('auth_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const isAuthenticated = !!user;

  const login = (email, password) => {
    // Mock login logic
    if (email === 'test@test.com' && password === '123456') {
      const mockUser = {
        name: 'Jane Doe',
        email: 'test@test.com',
        role: 'Senior Project Supervisor',
        avatar: 'https://i.pravatar.cc/150?img=47' // Placeholder avatar
      };
      setUser(mockUser);
      localStorage.setItem('auth_user', JSON.stringify(mockUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
