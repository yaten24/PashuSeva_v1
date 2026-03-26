import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

const LS_USER = "app_user"; // { name, email, role }
const LS_TOKEN = "app_token"; // any string

function getStoredUser() {
  try {
    const raw = localStorage.getItem(LS_USER);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser());
  const [token, setToken] = useState(localStorage.getItem(LS_TOKEN));

  useEffect(() => {
    if (user) localStorage.setItem(LS_USER, JSON.stringify(user));
    else localStorage.removeItem(LS_USER);
  }, [user]);

  useEffect(() => {
    if (token) localStorage.setItem(LS_TOKEN, token);
    else localStorage.removeItem(LS_TOKEN);
  }, [token]);

  const isAuthenticated = !!token;

  // Demo register: store user; real app me API call karna
  const register = ({ name, email, password, role = "user" }) => {
    if (!email || !password) throw new Error("Email & password required");
    const newUser = { name: name || "User", email, role };
    // demo: password store mat karna real apps me; API/hashed
    localStorage.setItem("demo_password", password);
    setUser(newUser);
    setToken("demo-token-" + Date.now());
    return newUser;
  };

  // Demo login: compare with demo password
  const login = ({ email, password }) => {
    const stored = getStoredUser();
    const storedPass = localStorage.getItem("demo_password");
    if (!stored || stored.email !== email || storedPass !== password) {
      throw new Error("Invalid credentials");
    }
    setUser(stored);
    setToken("demo-token-" + Date.now());
    return stored;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("demo_password");
  };

  const value = useMemo(
    () => ({ user, token, isAuthenticated, login, register, logout }),
    [user, token, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
