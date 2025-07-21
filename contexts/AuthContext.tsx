import React, { createContext, useContext, useState, ReactNode } from "react";

type User = {
  email: string;
  password: string;
  role: "user" | "admin" | "agent";
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
    id: "1",
    email: "admin@test.com",
    password: "123",
    role: "admin",
    fullName: "Admin",
    phone: "0123456789",
    avatar: "",
  },
  {
    id: "2",
    email: "user@test.com",
    password: "user123",
    role: "user",
    fullName: "User",
    phone: "0986542765",
    avatar: "",
  },
  {
    id: "3",
    email: "duc@gmail.com",
    password: "duc123",
    role: "user",
    fullName: "Nguyễn Sỹ Đức",
    phone: "0911111111",
    avatar: "",
  },
  {
    id: "4",
    email: "an@gmail.com",
    password: "an123",
    role: "user",
    fullName: "Trần Văn An",
    phone: "0922222222",
    avatar: "",
  },
  {
    id: "5",
    email: "ninh@gmail.com",
    password: "ninh123",
    role: "user",
    fullName: "Lưu Vũ Ninh",
    phone: "0933333333",
    avatar: "",
  },
  {
    id: "6",
    email: "han@gmail.com",
    password: "han123",
    role: "user",
    fullName: "Trần Gia Hân",
    phone: "0944444444",
    avatar: "",
  },
  {
    id: "7",
    email: "khai@gmail.com",
    password: "khai123",
    role: "user",
    fullName: "Ngô Bá Khải",
    phone: "0955555555",
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
