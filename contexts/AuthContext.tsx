import React, { createContext, useContext, useState, ReactNode } from 'react';

type User = {
  email: string;
  password: string;
  role: 'user' | 'admin';
};

type AuthContextType = {
  currentUser: User | null;
  login: (email: string, password: string) => boolean;
  register: (email: string, password: string) => boolean;
  logout: () => void;
  registeredUsers: User[];
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const defaultUsers: User[] = [
  { email: 'admin', password: '123', role: 'admin' },
  { email: 'user@test.com', password: 'user123', role: 'user' }
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [registeredUsers, setRegisteredUsers] = useState<User[]>(defaultUsers);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = (email: string, password: string): boolean => {
    const user = registeredUsers.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const register = (email: string, password: string): boolean => {
    const exists = registeredUsers.some(u => u.email === email);
    if (exists) return false;
    const newUser = { email, password, role: 'user' as const };
    setRegisteredUsers(prev => [...prev, newUser]);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout, registeredUsers }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
