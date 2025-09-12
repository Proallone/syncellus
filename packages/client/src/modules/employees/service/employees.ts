export type Employee = {
    id: number;
    created_at: Date;
    modified_at: Date;
    user_id: number;
    name: string | undefined;
    surname: string | undefined;
};
export async function fetchEmployees(): Promise<Employee[]> {
    return [
        {
            id: 1,
            created_at: new Date("2024-01-15T10:00:00Z"),
            modified_at: new Date("2024-06-20T14:30:00Z"),
            user_id: 1,
            name: "John",
            surname: "Doe"
        },
        {
            id: 2,
            created_at: new Date("2023-11-01T09:15:00Z"),
            modified_at: new Date("2025-07-28T11:00:00Z"),
            user_id: 2,
            name: "Jane",
            surname: "Smith"
        },
        {
            id: 3,
            created_at: new Date("2025-03-10T11:45:00Z"),
            modified_at: new Date("2025-03-10T11:45:00Z"),
            user_id: 3,
            name: "Harald",
            surname: "Johnson"
        }
    ];
}
