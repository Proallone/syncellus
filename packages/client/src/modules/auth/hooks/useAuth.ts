import { useState } from "react";

let loggedUser: { email: string } | null = null;

export function useAuth() {
    const [user, setUser] = useState(loggedUser);

    const login = async (email: string, password: string) => {
        const response = await fetch("/api/v1/auth/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
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

    return { user, isAuthenticated: !!user, login, logout };
}
