export type Employee = {
    id: number;
    name: string;
    surname: string;
};

export async function fetchEmployees(): Promise<Employee[]> {
    return [
        { id: 1, name: "Bart", surname: "Test" },
        { id: 2, name: "Ada", surname: "Lovelace" }
    ];
}
