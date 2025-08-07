import { Route, Routes } from "react-router-dom";
import { TimesheetList } from "../components/TimesheetList";

const TimesheetRoutes = () => (
    <Routes>
        <Route index element={<TimesheetList />} />
    </Routes>
);

export default TimesheetRoutes;
