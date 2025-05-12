import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = ({ email, passwort }) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (
      storedUser &&
      storedUser.email === email &&
      storedUser.passwort === passwort
    ) {
      localStorage.setItem("authToken", "dummy-token");
      setUser(storedUser);
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
