import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const success = await login(email, password);

        if (!success) {
            setError("Invalid credentials");
        } else {
            navigate("/");
        }
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh"
            }}
        >
            <div
                style={{
                    padding: 32,
                    border: "1px solid #ccc",
                    borderRadius: 8,
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                    width: "100%",
                    maxWidth: 400
                }}
            >
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label style={{ marginRight: 5 }}>Email:</label>
                        <input value={email} onChange={(event) => setEmail(event.target.value)} />
                    </div>
                    <div style={{ marginTop: 12 }}>
                        <label style={{ marginRight: 5 }}>Password:</label>
                        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "end",
                            width: "100%"
                        }}
                    >
                        <button style={{ marginTop: 16, marginRight: 16 }} type="submit">
                            Log In
                        </button>
                        <button style={{ marginTop: 16, marginRight: 16 }}>Register</button>
                    </div>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                </form>
            </div>
        </div>
    );
};
