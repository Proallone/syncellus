export type Timesheet = {
    id: number;
    createdAt: Date;
    modifiedAt: Date;
    employee_id: number;
    date: Date;
    start_hour: string;
    end_hour: string;
    hours_worked: string;
};
export async function fetchTimesheets(): Promise<Timesheet[]> {
    return [
        {
            id: 1,
            createdAt: new Date("2025-07-01T08:00:00Z"),
            modifiedAt: new Date("2025-07-01T17:00:00Z"),
            employee_id: 1,
            date: new Date("2025-07-01T00:00:00Z"),
            start_hour: "09:00",
            end_hour: "17:00",
            hours_worked: "8.00"
        },
        {
            id: 2,
            createdAt: new Date("2025-07-02T08:30:00Z"),
            modifiedAt: new Date("2025-07-02T17:30:00Z"),
            employee_id: 2,
            date: new Date("2025-07-02T00:00:00Z"),
            start_hour: "09:30",
            end_hour: "17:30",
            hours_worked: "8.00"
        },
        {
            id: 3,
            createdAt: new Date("2025-07-03T07:45:00Z"),
            modifiedAt: new Date("2025-07-03T16:45:00Z"),
            employee_id: 3,
            date: new Date("2025-07-03T00:00:00Z"),
            start_hour: "08:45",
            end_hour: "16:45",
            hours_worked: "8.00"
        },
        {
            id: 4,
            createdAt: new Date("2025-07-04T09:00:00Z"),
            modifiedAt: new Date("2025-07-04T13:00:00Z"),
            employee_id: 1,
            date: new Date("2025-07-04T00:00:00Z"),
            start_hour: "09:00",
            end_hour: "13:00",
            hours_worked: "4.00" // Half-day
        },
        {
            id: 5,
            createdAt: new Date("2025-07-05T10:00:00Z"),
            modifiedAt: new Date("2025-07-05T19:00:00Z"),
            employee_id: 2,
            date: new Date("2025-07-05T00:00:00Z"),
            start_hour: "10:00",
            end_hour: "19:00",
            hours_worked: "9.00" // Overtime
        },
        {
            id: 6,
            createdAt: new Date("2025-07-08T08:15:00Z"),
            modifiedAt: new Date("2025-07-08T17:15:00Z"),
            employee_id: 3,
            date: new Date("2025-07-08T00:00:00Z"),
            start_hour: "09:15",
            end_hour: "17:15",
            hours_worked: "8.00"
        },
        {
            id: 7,
            createdAt: new Date("2025-07-09T09:00:00Z"),
            modifiedAt: new Date("2025-07-09T17:00:00Z"),
            employee_id: 1,
            date: new Date("2025-07-09T00:00:00Z"),
            start_hour: "09:00",
            end_hour: "17:00",
            hours_worked: "8.00"
        },
        {
            id: 8,
            createdAt: new Date("2025-07-10T09:45:00Z"),
            modifiedAt: new Date("2025-07-10T18:00:00Z"),
            employee_id: 2,
            date: new Date("2025-07-10T00:00:00Z"),
            start_hour: "09:45",
            end_hour: "18:00",
            hours_worked: "8.25" // 8 hours 15 minutes
        },
        {
            id: 9,
            createdAt: new Date("2025-07-11T08:00:00Z"),
            modifiedAt: new Date("2025-07-11T16:00:00Z"),
            employee_id: 3,
            date: new Date("2025-07-11T00:00:00Z"),
            start_hour: "08:00",
            end_hour: "16:00",
            hours_worked: "8.00"
        },
        {
            id: 10,
            createdAt: new Date("2025-07-12T11:00:00Z"),
            modifiedAt: new Date("2025-07-12T15:00:00Z"),
            employee_id: 1,
            date: new Date("2025-07-12T00:00:00Z"),
            start_hour: "11:00",
            end_hour: "15:00",
            hours_worked: "4.00" // Another half-day
        }
    ];
}
