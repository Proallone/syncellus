import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./Layout";

const AuthRoutes = lazy(() => import("../modules/auth/routes"));
const DashboardRoutes = lazy(() => import("../modules/dashboard/routes"));
const EmployeeRoutes = lazy(() => import("../modules/employees/routes"));
const TimesheetRoutes = lazy(() => import("../modules/timesheets/routes"));

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route
                        path="/auth/*"
                        element={
                            <Suspense fallback={<div>Loading Auth Module...</div>}>
                                <AuthRoutes />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/dashboard/*"
                        element={
                            <Suspense fallback={<div>Loading Dashboard Module...</div>}>
                                <DashboardRoutes />
                            </Suspense>
                        }
                    />
                    <Route
                        path="employees/*"
                        element={
                            <Suspense fallback={<div>Loading Employees Module...</div>}>
                                <EmployeeRoutes />
                            </Suspense>
                        }
                    />
                    <Route
                        path="timesheets/*"
                        element={
                            <Suspense fallback={<div>Loading Timesheets Module...</div>}>
                                <TimesheetRoutes />
                            </Suspense>
                        }
                    />
                    <Route path="*" element={<div>404 Not Found</div>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
