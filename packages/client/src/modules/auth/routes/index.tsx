import { Routes, Route } from "react-router-dom";
import { SinginPage } from "../components/SigninPage";
import { SignupPage } from "../components/SignupPage";

const AuthRoutes = () => (
    <Routes>
        <Route path="login" element={<SinginPage />} />
        <Route path="signup" element={<SignupPage />} />
    </Routes>
);

export default AuthRoutes;
