import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../components/Dashboard.tsx";

const DashboardRoutes = () => (
    <Routes>
        <Route index element={<Dashboard />} />
    </Routes>
);

export default DashboardRoutes;
