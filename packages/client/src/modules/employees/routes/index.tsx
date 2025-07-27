import { Route } from "react-router-dom";
import { EmployeeList } from "../components/EmployeeList";

export const EmployeeRoutes = (
    <>
        <Route index element={<EmployeeList />} />
    </>
);
