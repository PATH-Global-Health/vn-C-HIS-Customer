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
import examinationServices from '../services/examinations';
import { BookingModel } from 'booking/models/bookingModel';

const StyledButton = styled(IonButton)`
    width: 300px;
    --background: #293978;
    text-align: center;
`;
const ApointmentInfo: React.FC = () => {
    const [date, setDate] = useState<string>("none");
    const dispatch = useDispatch();
    const getHospital = () => {
        dispatch(getHospitalByServiceIdAndDate(date + ""));
        history.push("/choosingHospital");
    }

    const dateBookings = useSelector((d) => d.dateBooking.dateBookings);



    const [value, onChange] = useState(new Date(2021, 5, 22));

    const history = useHistory();

    const bookingModel = useSelector((b) => b.workingCaledar.bookingModelResponse);

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
    const StyledButtonCancel = styled(IonButton)`
// width: 300px;
--background: #eb445a;
// position: absolute;
// bottom: 5px;
// width: 
margin: 16px;
margin-bottom: 80px;
`
    useEffect(() => {
        console.log(bookingModel);
    }, [])

    return (
        <IonPage>
            <StyledHeader>
                <StyledButtonHeader onClick={() => history.goBack()}><StyledIconRight icon={arrowBack}></StyledIconRight></StyledButtonHeader>
                <StyledLabelHeader>Thông tin lịch hẹn</StyledLabelHeader>
            </StyledHeader>
            {/* {userProfile === undefined ? "" : */}
            <IonContent>
                <IonList>
                    <IonItem>
                        <StyledLabel position="stacked">Tên dịch vụ</StyledLabel>
                        <IonInput value={bookingModel.data.service.name}> </IonInput>
                    </IonItem>
                    <IonItem>
                        <StyledLabel position="stacked">Ngày hẹn</StyledLabel>
                        {/* <IonInput value={new Date(bookingModel.date).toDateString()}> </IonInput> */}
                    </IonItem>
                    {/* <IonItem>
                        <StyledLabel position="stacked">Tỉnh/Thành phố</StyledLabel>
                        <IonInput value={hospital.province}> </IonInput>
                    </IonItem> */}
                    <IonItem>
                        <StyledLabel position="stacked">Thời gian hẹn</StyledLabel>
                        <IonInput value={bookingModel.data.interval.from}> </IonInput>
                    </IonItem>
                    <IonItem>
                        <StyledLabel position="stacked">Cơ sở dịch vụ</StyledLabel>
                        <IonInput value={bookingModel.data.unit.name}> </IonInput>
                    </IonItem>

                </IonList>

            </IonContent>
            {/* } */}
            <StyledButtonCancel>Hủy lịch hẹn</StyledButtonCancel>

        </IonPage>
    )
};

export default ApointmentInfo;