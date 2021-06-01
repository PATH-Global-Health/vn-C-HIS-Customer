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
import { getDateByUnitAndService, getWorkingCalendarBooking } from '../slices/workingCalendar';
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
import { getDateBooking } from '../slices/date';
import { getIntervals } from '../slices/workingCalendar';
const StyledButton = styled(IonButton)`
    width: 300px;
    --background: #293978;
    text-align: center;
`;
const ApointmentDate: React.FC = () => {
    const [date, setDate] = useState<string>("none");
    const [workingCalendar, setWorkingCalendar] = useState<WorkingCalendar>();
    const dispatch = useDispatch();




    const dateBookings = useSelector((d) => d.dateBooking.dateBookings);
    const workingCalendars = useSelector((w) => w.workingCaledar.workingCalendars);

    const [value, onChange] = useState(new Date(2021, 5, 22));

    const history = useHistory();
    const typeChoosing = useSelector((d) => d.dateBooking.typeChoosing);
    const getInterval = () => {
        workingCalendars.map((d) => {
            if (
                new Date(d.date).getDate() === new Date(date).getDate()
                && new Date(d.date).getMonth() === new Date(date).getMonth()
                && new Date(d.date).getFullYear() === new Date(date).getFullYear()
            ) {
                console.log(d.id);
                dispatch(getIntervals(d.id));
            }
        }
        )

    }
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
        // font-size: px;
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

                    {typeChoosing === "apointmentDate" ?
                        <DayPicker
                            onDayClick={(day) => { setDate(day + ""); console.log(day) }}
                            disabledDays={(day: Date) => !dateBookings.map(ad => moment(ad).format('YYYY-MM-DD')).includes(moment(day).format('YYYY-MM-DD'))}>
                        </DayPicker>
                        : <DayPicker
                            onDayClick={(day) => { setDate(day + ""); console.log(day) }}
                            disabledDays={(day: Date) => !workingCalendars.map(ad => moment(ad.date).format('YYYY-MM-DD')).includes(moment(day).format('YYYY-MM-DD'))}>
                        </DayPicker>
                    }
                </StyledDatePicker>
                {date === "none" ? "" : <StyledButtonSubmit onClick={() => {
                    if (typeChoosing === "apointmentDate") {
                        dispatch(getHospitalByServiceIdAndDate(date + ""));
                        dispatch(getDateBooking(date));
                        history.push("/choosingHospital");
                    } else {
                        const w = workingCalendars.filter((wor) =>
                            new Date(wor.date).getDate() === new Date(date).getDate()
                            && new Date(wor.date).getMonth() === new Date(date).getMonth()
                            && new Date(wor.date).getMonth() === new Date(date).getMonth()
                        )
                        dispatch(getWorkingCalendarBooking(w[0]));
                        // console.log(w);
                        getInterval();
                        history.push("/choosingTime");
                    }
                }} expand="block">Bước tiếp theo</StyledButtonSubmit>}
            </StyledContent>

        </IonPage>
    )
};

export default ApointmentDate;