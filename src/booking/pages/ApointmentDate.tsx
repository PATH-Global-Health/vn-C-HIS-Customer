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
import { getDateByUnitAndService } from '../slices/workingCalendar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DayPicker from 'react-day-picker';
import DatePickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css';
import { useHistory } from "react-router-dom";

import hospitalServices from '../services/hospitals';
import { arrowBack, text } from 'ionicons/icons';
import moment from 'moment';
import { WorkingCalendar } from 'booking/models/workingCalendar';
import {getDateBooking} from '../slices/date';

const StyledButton = styled(IonButton)`
    width: 300px;
    --background: #293978;
    text-align: center;
`;
const ApointmentDate: React.FC = () => {
    const [date, setDate] = useState<string>("none");
    const dispatch = useDispatch();
    const getHospital = () => {
        dispatch(getHospitalByServiceIdAndDate(date + ""));
        dispatch(getDateBooking(date));
        history.push("/choosingHospital");
    }

    const getByUnitAndService = () => {
        const arg = {
            unitId: "c12b3f73-e73b-4a5e-27df-08d8f26accab",
            serviceId: "f2490f62-1d28-4edd-362a-08d8a7232229",
        }
        dispatch(getDateByUnitAndService(arg));
        // history.push("/choosingHospital");
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
    return (
        <IonPage>
            <StyledHeader>
                <StyledButtonHeader onClick={() => history.goBack()}><StyledIconRight icon={arrowBack}></StyledIconRight></StyledButtonHeader>
                <StyledLabel>Đặt Lịch Xét nghiệm</StyledLabel>
            </StyledHeader>
            <StyledContent>
                <StyledLabelContent>Chọn ngày xét nghiệm</StyledLabelContent>
                <StyledDatePicker>

                    <DatePickerInput ></DatePickerInput>
                    <DayPicker
                        // onDayMouseEnter

                        onDayClick={(day) => { setDate(day+""); console.log(day) }}
                        disabledDays={(day: Date) => !dateBookings.map(ad => moment(ad).format('YYYY-MM-DD')).includes(moment(day).format('YYYY-MM-DD'))}>
                    </DayPicker>
                </StyledDatePicker>
                {date === "none" ? "" : <StyledButtonSubmit onClick={() => { getHospital(); getByUnitAndService() }} expand="block">Bước tiếp theo</StyledButtonSubmit>}
            </StyledContent>

        </IonPage>
    )
};

export default ApointmentDate;