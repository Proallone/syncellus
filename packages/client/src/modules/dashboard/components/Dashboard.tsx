import { ClipboardClock, PersonStanding } from "lucide-react";
import "./Dashboard.css"; // optional styles
import type React from "react";
import { useNavigate } from "react-router-dom";
import { ModuleTile } from "./ModuleTile";

interface Module {
    name: string;
    description: string;
    path: string;
    icon: React.ElementType;
}

const modules: Module[] = [
    { name: "Employees", description: "Manage your employees!", path: "/employees", icon: PersonStanding },
    { name: "Timesheets", description: "Manage your timesheets!", path: "/timesheets", icon: ClipboardClock }
];

export const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="dashboard-container">
            <h1>Main Dashboard</h1>
            <div className="tile-grid">
                {modules.map((mod) => (
                    <ModuleTile title={mod.name} description={mod.description} onClick={() => navigate(mod.path)} Icon={mod.icon} />
                ))}
            </div>
        </div>
    );
};
