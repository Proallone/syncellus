import { Route } from "react-router-dom";
import { TimesheetList } from "../components/TimesheetList";

export const TimesheetRoutes = (
    <>
        <Route index element={<TimesheetList />} />
    </>
);
