import { Link } from "react-router-dom";
import "./Dashboard.css"; // optional styles
import { Button } from "@/components/ui/button";
import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
interface Module {
    name: string;
    path: string;
}

const modules: Module[] = [
    { name: "Employees", path: "/employees" },
    { name: "Timesheets", path: "/timesheets" }
];

export const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <h1>Main Dashboard</h1>
            <div className="tile-grid">
                {modules.map((mod) => (
                    <Link to={mod.path} key={mod.path} className="tile">
                        {mod.name}
                    </Link>
                ))}
            </div>
        </div>
    );
};
