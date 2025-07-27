import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthRoutes } from "../modules/auth/routes";
import { DashboardRoutes } from "../modules/dashboard/routes";
import { EmployeeRoutes } from "../modules/employees/routes";
import { Layout } from "./Layout";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    {DashboardRoutes}
                    <Route path="/auth/*" element={<AuthRoutes />} />
                    <Route path="employees">{EmployeeRoutes}</Route>
                    <Route path="*" element={<div>404 Not Found</div>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
