import { Hospital } from "./hospital";
import { Interval } from "./interval";
import { UserProfile } from "./userProfile";

export interface BookingModel {
    rate?: string;
    status?: number,
    id?: string,
    interval?: Interval,
    unit?: Hospital,
    doctor?: Doctor,
    room?: Room,
    service?: Service,
    customer?: UserProfile,
    // contacts: [
    //     {
    //         fullname: string,
    //         phone: string,
    //         relationship: string
    //     }
    // ],
    note?: string,
    date?: string,
    bookedByUser?: string,
    exitInformation: {
        destination: string,
        exitingDate: string,
        entryingDate: string
    },
    result?: string;
    resultDate?: string;
    testingContent?: TestingContent | {};
    consultingContent?: ConsultingContent | {}
}

export interface Service {
    id: string,
    name: string;
}

export interface Room {
    id: string,
    name: string;
}

export interface Doctor {
    fullname: string,
    id: string,
}

export interface TestingContent {
    typeTesting: string,
    quantity: number,
    isReceived: true,
    isPickUpAtTheFacility: true,
    receivingAddress: string,
    provinceCode: string,
    districtCode: string,
    wardCode: string,
    receiver: string,
    recipientPhoneNumber: string,
    content: string,
    result: string,
    note: string
}

export interface ConsultingContent {
    type: string,
    content: string,
    result: string,
    note: string
}