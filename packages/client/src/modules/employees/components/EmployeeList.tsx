import { useEffect, useState } from "react";
import { fetchEmployees } from "../service/employees";
import type { Employee } from "../service/employees";

export const EmployeeList = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEmployees().then((data) => {
            setEmployees(data);
            setLoading(false);
        });
    }, []);

    if (loading) return <p>Loading employees...</p>;

    return (
        <div style={{ padding: "2rem" }}>
            <h2>Employees</h2>
            <ul>
                {employees.map((emp) => (
                    <li key={emp.id}>
                        {emp.name} — <strong>{emp.surname}</strong>
                    </li>
                ))}
            </ul>
        </div>
    );
};
