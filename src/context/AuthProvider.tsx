import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import CurrentUser from "../entities/CurrentUser";

interface AuthUser {
  _id: string;
  email: string;
  name: string;
  role: "user" | "admin" | "super_admin";
  subscriptionActive?: boolean;
}

interface AuthContextType {
  auth: { user: AuthUser | null };
  setAuth: (auth: { user: AuthUser | null }) => void;
}

export const AuthContext = createContext<AuthContextType>({
  auth: { user: null },
  setAuth: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<{ user: AuthUser | null }>({ user: null });

  useEffect(() => {
    // Load user from localStorage or token validation
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<CurrentUser>(token);
        setAuth({
          user: {
            _id: decoded._id,
            email: decoded.email,
            name: decoded.name,
            role: decoded.role,
            subscriptionActive: decoded.subscriptionActive,
          },
        });
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
