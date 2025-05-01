import React, { createContext, useContext, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api'; // axios configurado

interface User {
  name: string;
  email: string;
}

interface AuthContextData {
  user: User | null;
  register: (user: User) => void; // por enquanto mantém
  login: (email: string, password: string) => Promise<boolean>; // AGORA é async!
}

const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  async function login(email: string, password: string) {
    try {
      const response = await api.post("/login", { email, password });

      const { token } = response.data;

      // Salva o token no storage
      await AsyncStorage.setItem("@furiafans:token", token);
      
      setUser({ name: "", email }); 

      return true;
    } catch (error) {
      const err = error as any;
      console.error("Erro no login:", err.response?.data || err.message);
      return false;
    }
  }

  function register(newUser: User) {
    setUser(newUser);
  }

  return (
    <AuthContext.Provider value={{ user, register, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
