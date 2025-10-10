import { useEffect, useState } from "react";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import type { Employee } from "../service/employees";
import { fetchEmployees } from "../service/employees";

export const EmployeeList = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEmployees().then((data) => {
            setEmployees(data);
            setLoading(false);
        });
    }, []);

    if (loading)
        return (
            <div className="flex items-center justify-center h-full w-full">
                <div className="flex flex-col space-y-3 ">
                    <Skeleton className="h-[235px] w-[1400px] rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-20 w-[1400px]" />
                        <Skeleton className="h-20 w-[1400px]" />
                        <Skeleton className="h-20 w-[1400px]" />
                        <Skeleton className="h-20 w-[1400px]" />
                        <Skeleton className="h-20 w-[1400px]" />
                        <Skeleton className="h-20 w-[1400px]" />
                        <Skeleton className="h-20 w-[1400px]" />
                        <Skeleton className="h-20 w-[1400px]" />
                    </div>
                </div>
            </div>
        );

    return (
        <Table>
            <TableCaption>A list of your employees.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Employee</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {employees.map((employee) => (
                    <TableRow key={employee.id}>
                        <TableCell className="font-medium hover:bg-primary/5">
                            {employee.name} {employee.surname}{" "}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
