import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signup = async (formState) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: "POST",
        body: JSON.stringify(formState),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { token, message, user } = await res.json();
      if (!res.ok) throw new Error(message);
      setUser(user);
      localStorage.setItem("token", token);
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (formState) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
        method: "POST",
        body: JSON.stringify(formState),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { token, message, user } = await res.json();
      console.log({ message, user });
      if (!res.ok) throw new Error(message);
      setUser(user);
      setIsAuthenticated(true);
      localStorage.setItem("token", token);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/logout`, {
        method: "POST",
        credentials: "include",
      });
      const { message } = await res.json();
      if (!res.ok) throw new Error(message);
      localStorage.removeItem("token");
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  // const sendMe = async () => {
  //   try {
  //     const res = await fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
  //       credentials: "include",
  //     });
  //     const { message, data } = await res.json();
  //     if (!res.ok) throw new Error(message);
  //     setUser(data);
  //     setIsAuthenticated(true);
  //   } catch (error) {
  //     logout();
  //   }
  // };

  // useEffect(() => {
  //   sendMe();
  // }, []);

  return (
    <AuthContext.Provider
      value={{
        signup,
        login,
        logout,
        user,
        setUser,
        setIsAuthenticated,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
