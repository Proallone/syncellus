import { useState } from "react";

let mockUser: { email: string } | null = null;

export function useAuth() {
    const [user, setUser] = useState(mockUser);

    const login = (email: string, password: string) => {
        if (email === "admin@local" && password === "password") {
            mockUser = { email };
            setUser(mockUser);
            return true;
        }
        return false;
    };

    const logout = () => {
        mockUser = null;
        setUser(null);
    };

    return { user, isAuthenticated: !!user, login, logout };
}
