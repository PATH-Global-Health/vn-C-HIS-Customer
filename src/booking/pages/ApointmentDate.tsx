import React, { useState } from 'react';
import {
    IonButton,
    IonContent,
    IonHeader,
    IonIcon,
    IonLabel,
    IonPage,
} from '@ionic/react';
import styled from 'styled-components';
import { useDispatch, useSelector } from '@app/hooks';
import { getHospitalByServiceId, getHospitalByServiceIdAndDate } from '../slices/hospital';
import { getWorkingCalendarBooking } from '../slices/workingCalendar';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { useHistory } from "react-router-dom";
import { arrowBack, text } from 'ionicons/icons';
import moment from 'moment';
import { getDateBooking } from '../slices/date';
import { getIntervals } from '../slices/workingCalendar';
import { useTranslation } from 'react-i18next';

const ApointmentDate: React.FC = () => {
    const [date, setDate] = useState<string>("none");
    const dispatch = useDispatch();
    const dateBookings = useSelector((d) => d.dateBooking.dateBookings);
    const workingCalendars = useSelector((w) => w.workingCaledar.workingCalendars);
    const serviceId = useSelector((w) => w.workingCaledar.serviceId);
    const history = useHistory();
    const typeChoosing = useSelector((d) => d.dateBooking.typeChoosing);
    const { t, i18n } = useTranslation();
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

    const getHospitalByServiceAndDate = () => {
        const arg = {
            serviceId: serviceId,
            date: moment(date).format("YYYY-MM-DD")
        }
        dispatch(getHospitalByServiceIdAndDate(arg));
    }
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
                {serviceId + "" === 'f2490f62-1d28-4edd-362a-08d8a7232229' ?
                    <StyledLabel>{t('Schedule a test')}</StyledLabel> : <StyledLabel>{t('Schedule a consultation')}</StyledLabel>}
            </StyledHeader>
            <StyledContent>
                {serviceId + "" === 'f2490f62-1d28-4edd-362a-08d8a7232229' ?
                    <StyledLabelContent>{t('Choose a test date')}</StyledLabelContent> : <StyledLabelContent>{t('Choose a consultation date')}</StyledLabelContent>}
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
                        // dispatch(getHospitalByServiceIdAndDate(date + ""));
                        getHospitalByServiceAndDate();
                        dispatch(getDateBooking(date));
                        history.push("/choosingHospital");
                    } else {
                        const w = workingCalendars.filter((wor) =>
                            new Date(wor.date).getDate() === new Date(date).getDate()
                            && new Date(wor.date).getMonth() === new Date(date).getMonth()
                            && new Date(wor.date).getMonth() === new Date(date).getMonth()
                        )
                        dispatch(getWorkingCalendarBooking(w[0]));
                        getInterval();
                        history.push("/choosingTime");
                    }
                }} expand="block">{t('Next step')}</StyledButtonSubmit>}
            </StyledContent>

        </IonPage>
    )
};

export default ApointmentDate;