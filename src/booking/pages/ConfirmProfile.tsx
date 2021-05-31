import React, { useEffect, useState } from 'react';
import {
    IonButton,
    IonContent,
    IonDatetime,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonItemDivider,
    IonLabel,
    IonList,
    IonModal,
    IonPage,
    IonSelect,
    IonSelectOption,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import styled from 'styled-components';
import { useDispatch, useSelector } from '@app/hooks';
import hospital, { getHospitalByServiceIdAndDate } from '../slices/hospital';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { useHistory } from "react-router-dom";

import hospitalServices from '../services/hospitals';
import { arrowBack, text } from 'ionicons/icons';
import moment from 'moment';
import { userInfo } from 'node:os';
import { BookingModel } from 'booking/models/bookingModel';
import { getBookingModel } from 'booking/slices/workingCalendar';

const StyledButton = styled(IonButton)`
    width: 300px;
    --background: #293978;
    text-align: center;
`;
const ConfirmProfile: React.FC = () => {
    const [date, setDate] = useState<string>("none");
    const dispatch = useDispatch();
    const getHospital = () => {
        dispatch(getHospitalByServiceIdAndDate(date + ""));
        history.push("/choosingHospital");
    }

    const dateBookings = useSelector((d) => d.dateBooking.dateBookings);



    const [value, onChange] = useState(new Date(2021, 5, 22));

    const history = useHistory();

    const StyledIconRight = styled(IonIcon)`
    {
        color: #b3b3b3;
        right: -9px;
        position: absolute;
      }
    `;

    const StyledIconLeft = styled(IonIcon)`
    {
        color: #b3b3b3;
        left: 5px;
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
    const StyledLabelContent = styled(IonLabel)`
    {
        font-weight: bold;
        font-size: px;
        color: #293978;
        margin-left: 16px;
        
    }
    `

    const StyledButtonHeader = styled(IonButton)`
    {
      --background: white;
      left: 10px;
      position: absolute;
    }
    `

    const StyledContent = styled(IonContent)`
    {
       text-align: center;
    }
    `

    const StyledDatePicker = styled.div`
    {
        border: 1px solid #b3b3b3;
        border-radius: 17px;
        margin: 16px;
        margin-bottom: 150px;
        // position: relative;
    }
    `



    const StyledButtonSubmit = styled(IonButton)`
    // width: 300px;
    --background: #293978;
    // position: absolute;
    // bottom: 5px;
    // width: 
    margin: 16px;
    margin-top: 50px;
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
    let bookingModel = {}
    if (userProfile !== null) {
        bookingModel = {
            interval: {
                id: interval.id,
                from: interval.from,
                to: interval.to,
                numId: interval.numId,
            },
            unit: {
                id: unitBooking.id,
                name: unitBooking.name,
                information: unitBooking.introduction,
                addressUnit: unitBooking.address,
                username: unitBooking.username,
            },
            doctor: {
                id: workingCalendarBooking.doctor.id,
                fullname: workingCalendarBooking.doctor.description,
            },
            room: {
                id: workingCalendarBooking.room.id,
                name: workingCalendarBooking.room.description,
            },
            service: {
                id: workingCalendarBooking.service[0].id,
                name: workingCalendarBooking.service[0].description,
            },
            customer: {
                id: userProfile.id,
                fullname: userProfile.fullname,
                phone: userProfile.phoneNumber,
                email: userProfile.email,
                address: userProfile.address,
                birthDate: "",
                gender: true,
                provinceCode: userProfile.province,
                districtCode: userProfile.district,
                wardCode: userProfile.ward,
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
            date: workingCalendarBooking.date,
            bookedByUser: "",
            exitInformation: {
                destination: "",
                exitingDate: "",
                entryingDate: ""
            }
        }
    }

    // bookingModel.customer.id = userProfile?.id;
    // bookingModel.customer.address = userProfile?.name;
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
                            <IonInput value={userProfile?.fullname}> </IonInput>
                        </IonItem>
                        <IonItem>
                            <StyledLabel position="stacked">Số điện thoại</StyledLabel>
                            <IonInput value={userProfile?.phoneNumber}> </IonInput>
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
            <StyledButtonNext onClick={() => {
                dispatch(getBookingModel(bookingModel));
                history.push("/apointmentInfo")
            }}>Đặt lịch</StyledButtonNext>

        </IonPage>
    )
};

export default ConfirmProfile;