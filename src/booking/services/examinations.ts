import { UserInfo } from 'booking/models/userInfoModel';
import { httpClient, apiLinks } from '@app/utils';
import { BookingModel } from 'booking/models/bookingModel';
import { BookingModelResponse } from 'booking/models/bookingModelResponse';
import { ExaminationListModel, ExaminationUpdate } from 'booking/models/examinationListModel';
import { UserProfile } from 'booking/models/userProfile';
import { File } from "@ionic-native/file";
import { FileOpener } from "@ionic-native/file-opener";
import { useTranslation } from 'react-i18next';

const postExaminations = async (da: BookingModel): Promise<BookingModelResponse> => {

    const response = await httpClient.post({
        url: apiLinks.bookingService.postExaminations,
        data: da 
        
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

const updateExamination = async (data: ExaminationUpdate): Promise<void> => {
    await httpClient.put({
        url: apiLinks.bookingService.postExaminations,
        data: data,
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

const downloadResultFile = async (examId: string): Promise<void> => {
    const result = await httpClient.get({
        url: apiLinks.bookingService.resultForm,
        responseType: 'blob',
        params: {
            examId
        },
    });
    // ----------------------web-----------------------------------
    const url = window.URL.createObjectURL(new Blob([result.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
        'download',
        `report.pdf`,
    );
    document.body.appendChild(link);
    link.click();

    //--------------------mobile------------------------------------
    File.writeFile(
        File.externalRootDirectory + "/Download",
        `report.pdf`,
        new Blob([result.data]),
        {
            replace: true,
        }
    ).then(() => alert('Download file success')).catch(() => alert('Download file failed'));
    FileOpener.open(
        File.externalRootDirectory + "/Download/" + `report.pdf`,
        "application/pdf"
    );
};



const examinationServices = {
    downloadResultFile,
    postExaminations,
    getExaminationList,
    getUserInfo,
    putUserProfile,
    getExaminationById,
    cancelExamination,
    updateExamination
};


export default examinationServices;