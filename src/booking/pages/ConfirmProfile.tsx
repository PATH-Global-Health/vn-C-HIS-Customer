import React, { useEffect, useState } from 'react';
import {
    IonButton,
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
} from '@ionic/react';
import styled from 'styled-components';
import { useDispatch, useSelector } from '@app/hooks';
import 'react-day-picker/lib/style.css';
import { useHistory } from "react-router-dom";
import { arrowBack, text } from 'ionicons/icons';
import { BookingModel } from 'booking/models/bookingModel';
import { postExaminations } from 'booking/slices/workingCalendar'

const ConfirmProfile: React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const StyledIconRight = styled(IonIcon)`
    {
        color: #b3b3b3;
        right: -9px;
        position: absolute;
      }
    `;

    const StyledHeader = styled(IonHeader)`
    {
      height: 60px;
      border-bottom: 1px solid #b3b3b3;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
    }
    `

    const StyledLabel = styled(IonLabel)`
    {
        font-weight: bold;
        font-size: 23px;
    }
    `
    const StyledButtonHeader = styled(IonButton)`
    {
      --background: white;
      left: 10px;
      position: absolute;
    }
    `
    const StyledLabelHeader = styled(IonLabel)`
{
  font-weight: bold;
    font-size: 23px;
}
`
    const StyledButtonNext = styled(IonButton)`
// width: 300px;
--background: #293978;
// position: absolute;
// bottom: 5px;
// width: 
margin: 16px;
margin-bottom: 80px;
`
    const userProfile = useSelector((u) => u.auth.userInfo);
    const interval = useSelector((i) => i.workingCaledar.intervalBooking);
    const unitBooking = useSelector((u) => u.hospital.hospitalBooking);
    const workingCalendarBooking = useSelector((w) => w.workingCaledar.workingCalendar);
    const bookingModel = {
        interval: {
            id: "",
            from: "",
            to: "",
            numId: 0
        },
        unit: {
            id: "",
            name: "",
            information: "",
            address: "",
            username: "",
        },
        doctor: {
            id: "",
            fullname: "",
        },
        room: {
            id: "",
            name: ""
        },
        service: {
            id: "",
            name: ""
        },
        customer: {
            id: "",
            fullname: "",
            phone: "",
            email: "",
            address: "",
            birthDate: "",
            gender: true,
            provinceCode: "",
            districtCode: "",
            wardCode: "",
            ic: "",
            nation: "",
            passportNumber: "",
            vaccinationCode: ""
        },
        contacts: [
            {
                fullname: "",
                phone: "",
                relationship: ""
            }
        ],
        note: "",
        date: "",
        bookedByUser: "",
        exitInformation: {
            destination: "",
            exitingDate: "",
            entryingDate: ""
        }
    } as BookingModel;
    if (userProfile !== null && interval !== null && unitBooking !== null && workingCalendarBooking !== null) {
        bookingModel.interval.id = interval.id;
        bookingModel.interval.from = interval.from;
        bookingModel.interval.to = interval.to;
        bookingModel.interval.numId = interval.numId;
        bookingModel.unit.id = unitBooking.id;
        bookingModel.unit.name = unitBooking.name;
        bookingModel.unit.information = unitBooking.introduction;
        bookingModel.unit.address = unitBooking.address;
        bookingModel.unit.username = unitBooking.username;
        bookingModel.doctor.id = workingCalendarBooking.doctor.id;
        bookingModel.doctor.fullname = workingCalendarBooking.doctor.description;
        bookingModel.room.id = workingCalendarBooking.room.id;
        bookingModel.room.name = workingCalendarBooking.room.description;

        bookingModel.service.id = workingCalendarBooking.service[0].id;
        bookingModel.service.name = workingCalendarBooking.service[0].description;
        bookingModel.customer.id = userProfile.id;
        // bookingModel.customer.fullname = userProfile.fullname;
        // bookingModel.customer.phone = userProfile.phoneNumber;
        bookingModel.customer.email = userProfile.email;
        bookingModel.customer.address = userProfile.address;
        bookingModel.customer.birthDate = "2021-06-01T00:58:27.530Z";
        bookingModel.customer.gender = true;
        bookingModel.customer.provinceCode = userProfile.province;
        bookingModel.customer.districtCode = userProfile.district;
        bookingModel.customer.wardCode = userProfile.ward;
        bookingModel.customer.ic = "";
        bookingModel.customer.nation = "";
        bookingModel.customer.passportNumber = "";
        bookingModel.customer.vaccinationCode = "";
        bookingModel.contacts[0].fullname = "";
        bookingModel.contacts[0].phone = "";
        bookingModel.contacts[0].relationship = "";
        bookingModel.note = "";
        bookingModel.date = workingCalendarBooking.date;
        bookingModel.bookedByUser = "";
        bookingModel.exitInformation.destination = "lieu";
        bookingModel.exitInformation.exitingDate = "2021-06-01T00:58:27.530Z";
        bookingModel.exitInformation.entryingDate = "2021-06-01T00:58:27.530Z";
    }

    return (
        <IonPage>
            <StyledHeader>
                <StyledButtonHeader onClick={() => history.goBack()}><StyledIconRight icon={arrowBack}></StyledIconRight></StyledButtonHeader>
                <StyledLabelHeader>Thông tin người dùng</StyledLabelHeader>
            </StyledHeader>
            {userProfile === undefined ? "" :
                <IonContent>
                    <IonList>
                        <IonItem>
                            <StyledLabel position="stacked">Tên người dùng</StyledLabel>
                            {/* <IonInput value={userProfile?.fullname}> </IonInput> */}
                        </IonItem>
                        <IonItem>
                            <StyledLabel position="stacked">Số điện thoại</StyledLabel>
                            {/* <IonInput value={userProfile?.phoneNumber}> </IonInput> */}
                        </IonItem>
                        <IonItem>
                            <StyledLabel position="stacked">Địa chỉ</StyledLabel>
                            <IonInput value={userProfile?.address}> </IonInput>
                        </IonItem>
                        <IonItem>
                            <StyledLabel position="stacked">Quận/Huyện</StyledLabel>
                            <IonInput value={userProfile?.district}> </IonInput>
                        </IonItem>
                        <IonItem>
                            <StyledLabel position="stacked">Email</StyledLabel>
                            <IonInput value={userProfile?.ward}> </IonInput>
                        </IonItem>
                        <IonItem>
                            <StyledLabel position="stacked">Email</StyledLabel>
                            <IonInput value={userProfile?.email}> </IonInput>
                        </IonItem>
                        <IonItem>
                            <StyledLabel position="stacked">Province</StyledLabel>
                            <IonInput value={userProfile?.province}> </IonInput>
                        </IonItem>

                    </IonList>

                </IonContent>
            }
            <StyledButtonNext onClick={async () => {
                await dispatch(postExaminations(bookingModel));
                history.push("/apointmentInfo")
            }}>Đặt lịch</StyledButtonNext>

        </IonPage>
    )
};

export default ConfirmProfile;