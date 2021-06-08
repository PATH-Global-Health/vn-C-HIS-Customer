import { httpClient, apiLinks } from '@app/utils';
import { BookingModel } from 'booking/models/bookingModel';
import { BookingModelResponse } from 'booking/models/bookingModelResponse';

const postExaminations = async (da: BookingModel): Promise<BookingModelResponse> => {
    const response = await httpClient.post({
        url: apiLinks.bookingService.postExaminations,
        data: {
            interval: {
                id: da.interval.id,
                from: da.interval.from,
                to: da.interval.to,
                numId: da.interval.numId
            },
            unit: {
                id: da.unit.id,
                name: da.unit.name,
                information: da.unit.information,
                address: da.unit.address,
                username: da.unit.username,
            },
            doctor: {
                id: da.doctor.id,
                fullname: da.doctor.fullname,
            },
            room: {
                id: da.room.id,
                name: da.room.name
            },
            service: {
                id: da.service.id,
                name: da.service.name
            },
            customer: {
                id: da.customer.id,
                fullname: da.customer.fullname,
                phone: da.customer.phone,
                email: da.customer.email,
                address: da.customer.address,
                birthDate: da.customer.birthDate,
                gender: da.customer.gender,
                provinceCode: da.customer.provinceCode,
                districtCode: da.customer.districtCode,
                wardCode: da.customer.wardCode,
                ic: da.customer.ic,
                nation: da.customer.nation,
                passportNumber: da.customer.passportNumber,
                vaccinationCode: da.customer.vaccinationCode
            },
            contacts: [
                {
                    fullname: "",
                    phone: "",
                    relationship: ""
                }
            ],
            note: da.note,
            date: da.date,
            bookedByUser: da.bookedByUser,
            exitInformation: {
                destination: da.exitInformation.destination,
                exitingDate: da.exitInformation.exitingDate,
                entryingDate: da.exitInformation.entryingDate
            }
        },
    });
    // console.log(response.data as BookingModel);
    return response.data as BookingModelResponse;
};



const examinationServices = {
    postExaminations,
};


export default examinationServices;