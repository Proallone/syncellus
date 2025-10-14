import { Route, Routes } from "react-router-dom";
import { TimesheetList } from "../components/TimesheetList.tsx";

const TimesheetRoutes = () => (
    <Routes>
        <Route index element={<TimesheetList />} />
    </Routes>
);

export default TimesheetRoutes;
