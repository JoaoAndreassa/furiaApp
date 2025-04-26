import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  name: string;
  email: string;
  password: string;
}

interface AuthContextData {
  user: User | null;
  register: (user: User) => void;
  login: (email: string, password: string) => boolean;
}

const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  function register(newUser: User) {
    setUser(newUser);
  }

  function login(email: string, password: string) {
    if (user && user.email === email && user.password === password) {
      return true;
    }
    return false;
  }

  return (
    <AuthContext.Provider value={{ user, register, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
