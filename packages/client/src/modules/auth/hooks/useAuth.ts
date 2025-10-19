import { useState } from "react";

let loggedUser: { email: string } | null = null;

export function useAuth() {
  const [user, setUser] = useState(loggedUser);

  const login = async (email: string, password: string) => {
    const response = await fetch("/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      loggedUser = { email };
      setUser(loggedUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    loggedUser = null;
    setUser(null);
  };

  const passwordReset = async (token: string, newPassword: string) => {
    const response = await fetch("/api/v1/auth/password-reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, newPassword }),
    });
    return response;
  };

  return { user, isAuthenticated: !!user, login, logout, passwordReset };
}
