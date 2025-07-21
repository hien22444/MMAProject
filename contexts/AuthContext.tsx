import React, { createContext, useContext, useState, ReactNode } from "react";

type User = {
  email: string;
  password: string;
  role: "user" | "admin";
  phone: string;
  fullName: string;
  id: string;
  avatar: string;
};

type AuthContextType = {
  currentUser: User | null;
  login: (email: string, password: string) => boolean;
  register: (
    email: string,
    password: string,
    phone: string,
    fullName: string
  ) => boolean;
  logout: () => void;
  registeredUsers: User[];
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const defaultUsers: User[] = [
  {
    email: "admin",
    password: "123",
    role: "admin",
    fullName: "Admin",
    phone: "0123456789",
    id: "1",
    avatar: "",
  },
  {
    email: "user@test.com",
    password: "user123",
    role: "user",
    fullName: "User",
    phone: "0986542765",
    id: "2",
    avatar: "",
  },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [registeredUsers, setRegisteredUsers] = useState<User[]>(defaultUsers);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = (email: string, password: string): boolean => {
    console.log("AuthContext login attempt:", email, password);
    console.log("Available users:", registeredUsers);
    const user = registeredUsers.find(
      (u) => u.email === email && u.password === password
    );
    console.log("Found user:", user);
    if (user) {
      setCurrentUser(user);
      console.log("Login successful, user role:", user.role);
      return true;
    }
    console.log("Login failed");
    return false;
  };

  const register = (
    fullName: string,
    email: string,
    phone: string,
    password: string
  ): boolean => {
    const exists = registeredUsers.some((u) => u.email === email);
    if (exists) return false;
    const newUser = {
      email,
      password,
      role: "user" as const,
      fullName,
      phone,
      id: (registeredUsers.length + 1).toString(),
      avatar: "",
    };
    setRegisteredUsers((prev) => [...prev, newUser]);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, login, register, logout, registeredUsers }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
