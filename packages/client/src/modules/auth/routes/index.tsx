import { Route, Routes } from "react-router-dom";
import { PasswordResetPage } from "../components/PasswordResetPage";
import { SinginPage } from "../components/SigninPage";
import { SignupPage } from "../components/SignupPage";

const AuthRoutes = () => (
    <Routes>
        <Route path="login" element={<SinginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="reset-password" element={<PasswordResetPage />} />
    </Routes>
);

export default AuthRoutes;
