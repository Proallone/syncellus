import { useEffect, useState } from "react";
import { fetchTimesheets } from "../service/timesheet";
import type { Timesheet } from "../service/timesheet";

export const TimesheetList = () => {
    const [timesheets, setTimesheets] = useState<Timesheet[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTimesheets().then((data) => {
            setTimesheets(data);
            setLoading(false);
        });
    }, []);

    if (loading) return <p>Loading timesheets...</p>;

    return (
        <div style={{ padding: "2rem" }}>
            <h2>Timesheets</h2>
            <ul>
                {timesheets.map((tms) => (
                    <li key={tms.id}>
                        {tms.date.toDateString()}, {tms.start_hour} — {tms.end_hour} <strong>{tms.hours_worked}H</strong>
                    </li>
                ))}
            </ul>
        </div>
    );
};
