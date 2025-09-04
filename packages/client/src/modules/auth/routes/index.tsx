import { Routes, Route } from "react-router-dom";
import { SinginPage } from "../components/SigninPage";
import { SignupPage } from "../components/SignupPage";
import { PasswordResetPage } from "../components/PasswordResetPage";

const AuthRoutes = () => (
    <Routes>
        <Route path="login" element={<SinginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="reset-password" element={<PasswordResetPage />} />
    </Routes>
);

export default AuthRoutes;
