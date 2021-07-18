import { UserInfo } from 'booking/models/userInfoModel';
import { httpClient, apiLinks } from '@app/utils';
import { BookingModel } from 'booking/models/bookingModel';
import { BookingModelResponse } from 'booking/models/bookingModelResponse';
import { ExaminationListModel } from 'booking/models/examinationListModel';
import { UserProfile } from 'booking/models/userProfile';

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
    return response.data as BookingModelResponse;
};

const getExaminationList = async (): Promise<ExaminationListModel> => {
    const result = await httpClient.get({
        url: apiLinks.bookingService.postExaminations,
    });
    return result.data as ExaminationListModel;
};

const getExaminationById = async (id: string): Promise<BookingModelResponse> => {
    const result = await httpClient.get({
        url: apiLinks.bookingService.postExaminations + `/${id}`,
    });
    return result.data as BookingModelResponse;
};

const cancelExamination = async (id: string): Promise<void> => {
    await httpClient.put({
        url: apiLinks.bookingService.postExaminations,
        data: {
            id: id,
            status: 3,
            note: "Cancel"
        },
    });
};

const evaluateExamination = async (id: string, rate: string, typeRating: string, dest: string ): Promise<void> => {
    await httpClient.put({
        url: apiLinks.bookingService.postExaminations,
        data: {
            id: id,
            rate: rate,
            status: 2,
            typeRating: typeRating,
            dest: dest
        },
    });
};


const getUserInfo = async (): Promise<UserProfile> => {
    const result = await httpClient.get({
        url: apiLinks.manageSchedule.profile.get,
    });
    return result.data as UserProfile;
};

const putUserProfile = async (da: UserProfile): Promise<UserProfile> => {
    const response = await httpClient.put({
        url: apiLinks.manageSchedule.profile.get,
        data: {
            fullname: da.fullname,
            gender: da.gender,
            dateOfBirth: da.dateOfBirth,
            phoneNumber: da.phoneNumber,
            email: da.email,
            vaccinationCode: da.vaccinationCode,
            identityCard: da.identityCard,
            address: da.address,
            province: da.province,
            district: da.district,
            ward: da.ward,
            passportNumber: da.passportNumber,
            nation: da.nation,
            id: da.id,
        },
    });
    return response.data as UserProfile;
};



const examinationServices = {
    postExaminations,
    getExaminationList,
    getUserInfo,
    putUserProfile,
    getExaminationById,
    cancelExamination,
    evaluateExamination
};


export default examinationServices;