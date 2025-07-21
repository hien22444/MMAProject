import React, { createContext, useContext, useState } from 'react';
import { User } from '../types/User';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => boolean;
  register: (email: string, password: string) => boolean;
  logout: () => void;
  setProfileInfo: (
    name: string,
    phone: string,
    address: string,
    gender: string,
    dob: string
  ) => void;
  setCurrentUser: (user: User | null) => void; // ✅ thêm dòng này
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<User[]>([
    {
      email: 'admin@gmail.com',
      password: 'Admin@123',
      role: 'admin',
      name: 'Admin',
      phone: '0123456789',
      address: 'Admin Address',
      gender: 'Nam',
      dob: '2000-01-01',
      hasProfileInfo: true,
    },
  ]);

  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const register = (email: string, password: string) => {
    if (users.some(u => u.email === email)) return false;
    const newUser: User = {
      email,
      password,
      role: 'user',
      hasProfileInfo: false,
    };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    return true;
  };

  const logout = () => setCurrentUser(null);

  const setProfileInfo = (
    name: string,
    phone: string,
    address: string,
    gender: string,
    dob: string
  ) => {
    if (!currentUser) return;
    const updated = {
      ...currentUser,
      name,
      phone,
      address,
      gender,
      dob,
      hasProfileInfo: true,
    };
    setCurrentUser(updated);
    setUsers(prev =>
      prev.map(u => (u.email === currentUser.email ? updated : u))
    );
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        register,
        logout,
        setProfileInfo,
        setCurrentUser, // ✅ cung cấp hàm ra ngoài
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
