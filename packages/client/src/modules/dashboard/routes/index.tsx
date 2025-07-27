import { Route } from "react-router-dom";
import { Dashboard } from "../components/Dashboard";

export const DashboardRoutes = (
    <>
        <Route index element={<Dashboard />} />
    </>
);
