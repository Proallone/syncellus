import { Routes, Route } from "react-router-dom";
import { LoginPage } from "../components/LoginPage";

export const AuthRoutes = () => (
    <Routes>
        <Route path="login" element={<LoginPage />} />
    </Routes>
);
