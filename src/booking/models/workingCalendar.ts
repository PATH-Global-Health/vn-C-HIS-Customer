import { Room } from "./bookingModel";

export interface WorkingCalendar {
    date?: string,
    doctor?: Doctor,
    room?: Room,
    id?: string,
    schedules?: Schedules,
    service?: Service[] | [],
    status?: boolean,
    time?: string,
}

export interface Doctor {
    description: string,
    id: string,
}

export interface Service {
    description: string,
    id: string,
}

export interface Schedules {
    from: string,
    to: string,
}