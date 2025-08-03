import { useState } from "react";

let mockUser: { email: string } | null = null;

export function useAuth() {
    const [user, setUser] = useState(mockUser);

    const login = async (email: string, password: string) => {
        const response = await fetch("http://localhost:3000/api/v1/auth/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
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
