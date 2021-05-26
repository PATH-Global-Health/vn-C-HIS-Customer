export interface BookingModel {
    interval: {
        id: string,
        from: string,
        to: string,
        numId: 0
    },
    unit: {
        id: string,
        name: string,
        information: string,
        address: string,
        username: string,
    },
    doctor: {
        id: string,
        fullname: string,
    },
    room: {
        id: string,
        name: string
    },
    service: {
        id: string,
        name: string
    },
    customer: {
        id: string,
        fullname: string,
        phone: string,
        email: string,
        address: string,
        birthDate: string,
        gender: true,
        provinceCode: string,
        districtCode: string,
        wardCode: string,
        ic: string,
        nation: string,
        passportNumber: string,
        vaccinationCode: string
    },
    contacts: [
        {
            fullname: string,
            phone: string,
            relationship: string
        }
    ],
    note: string,
    date: string,
    bookedByUser: string,
    exitInformation: {
        destination: string,
        exitingDate: string,
        entryingDate: string
    }
}