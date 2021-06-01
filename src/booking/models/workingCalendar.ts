export interface WorkingCalendar {
    date: string,
    doctor: {
        description: string,
        id: string,
    },
    room: {
        description: string,
        id: string,
    },
    id: string,
    schedules: {
        from: string,
        to: string,
    },
    service: [{
        id: string,
        description: string,
    }],
    status: boolean,
    time: string,
}