export type Employee = {
    id: number;
    createdAt: Date;
    modifiedAt: Date;
    user_id: number;
    name: string | undefined;
    surname: string | undefined;
};
export async function fetchEmployees(): Promise<Employee[]> {
    return [
        {
            id: 1,
            createdAt: new Date("2024-01-15T10:00:00Z"),
            modifiedAt: new Date("2024-06-20T14:30:00Z"),
            user_id: 1,
            name: "John",
            surname: "Doe"
        },
        {
            id: 2,
            createdAt: new Date("2023-11-01T09:15:00Z"),
            modifiedAt: new Date("2025-07-28T11:00:00Z"),
            user_id: 2,
            name: "Jane",
            surname: "Smith"
        },
        {
            id: 3,
            createdAt: new Date("2025-03-10T11:45:00Z"),
            modifiedAt: new Date("2025-03-10T11:45:00Z"),
            user_id: 3,
            name: "Harald",
            surname: "Johnson"
        }
    ];
}
