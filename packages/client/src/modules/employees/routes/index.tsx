import { Route, Routes } from "react-router-dom";
import { EmployeeList } from "../components/EmployeeList.tsx";

export const EmployeeRoutes = () => (
  <Routes>
    <Route index element={<EmployeeList />} />
  </Routes>
);

export default EmployeeRoutes;
