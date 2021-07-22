import React, { useState } from 'react';
import {
    IonContent,
    IonHeader,
    IonIcon,
    IonLabel,
    IonPage,
    IonSpinner,
} from '@ionic/react';
import { useDispatch, useSelector } from '@app/hooks';
import { getHospitalByServiceIdAndDate } from '../slices/hospital';
import { getWorkingCalendarBooking } from '../slices/workingCalendar';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { useHistory } from "react-router-dom";
import { chevronBack } from 'ionicons/icons';
import moment from 'moment';
import { getDateBooking } from '../slices/date';
import { getIntervals } from '../slices/workingCalendar';
import { useTranslation } from 'react-i18next';
import styles from '../css/apointmentDate.module.css';

const ApointmentDate: React.FC = () => {
    const [date, setDate] = useState<string>("none");
    const dispatch = useDispatch();
    const dateBookings = useSelector((d) => d.dateBooking.dateBookings);
    const workingCalendars = useSelector((w) => w.workingCaledar.workingCalendars);
    const loading = useSelector((b) => b.workingCaledar.loading);
    const serviceId = useSelector((w) => w.workingCaledar.serviceId);
    const history = useHistory();
    const typeChoosing = useSelector((d) => d.dateBooking.typeChoosing);
    const { t } = useTranslation();
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

    return (
        <>
            {serviceId === "" ? history.push('/home') :
            loading === true ? <IonSpinner name='bubbles' color='primary' style={{ left: '50%', top: '50%' }}></IonSpinner> :
                <IonPage className={styles.styledPage}>
                    <IonHeader className={styles.header}>
                        <button
                            className={styles.btnCustomHeader}
                            onClick={() => history.goBack()}><IonIcon className={styles.iconLeft} icon={chevronBack}></IonIcon></button>
                        {serviceId + "" === 'f2490f62-1d28-4edd-362a-08d8a7232229' ?
                            <IonLabel className={styles.styledLabel}>{t('Schedule a test')}</IonLabel> : <IonLabel className={styles.styledLabel}>{t('Schedule a consultation')}</IonLabel>}
                    </IonHeader>
                    <IonContent className={styles.styledContent}>
                        {serviceId + "" === 'f2490f62-1d28-4edd-362a-08d8a7232229' ?
                            <IonLabel className={styles.styledLabelContent}>{t('Choose a test date')}</IonLabel> : <IonLabel className={styles.styledLabelContent}>{t('Choose a consultation date')}</IonLabel>}
                        <div className={styles.styledDatePicker}>

                            {typeChoosing === "apointmentDate" ?
                                <DayPicker
                                    modifiersStyles={{ selectedDate: { color: 'white', backgroundColor: 'rgb(26, 177, 214)' } }}
                                    modifiers={{ selectedDate: new Date(date) }}
                                    onDayClick={(day) => {
                                        if (dateBookings.map(ad => moment(ad).format('YYYY-MM-DD')).includes(moment(day).format('YYYY-MM-DD'))) {
                                            setDate(day + "");
                                            console.log(day)
                                        } else {
                                            setDate('none');
                                        }
                                    }

                                    }
                                    disabledDays={(day: Date) => !dateBookings.map(ad => moment(ad).format('YYYY-MM-DD')).includes(moment(day).format('YYYY-MM-DD'))}>
                                </DayPicker>
                                : <DayPicker
                                    modifiersStyles={{ selectedDate: { color: 'white', backgroundColor: 'rgb(26, 177, 214)' } }}
                                    modifiers={{ selectedDate: new Date(date) }}
                                    onDayClick={(day) => {
                                        if (workingCalendars.map(ad => moment(ad.date).format('YYYY-MM-DD')).includes(moment(day).format('YYYY-MM-DD'))) {
                                            setDate(day + "");
                                            console.log(day)
                                        } else {
                                            setDate('none');
                                        }
                                    }
                                    }
                                    disabledDays={(day: Date) => !workingCalendars.map(ad => moment(ad.date).format('YYYY-MM-DD')).includes(moment(day).format('YYYY-MM-DD'))}
                                    >
                                </DayPicker>
                            }
                        </div>
                        {date === "none" ? "" : <button
                            className={styles.styledButtonSubmit}
                            onClick={() => {
                                if (typeChoosing === "apointmentDate") {
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
                                    dispatch(getDateBooking(date));
                                    getInterval();
                                    history.push("/choosingTime");
                                }
                            }}>{t('Next step')}</button>}
                    </IonContent>

                </IonPage>
            }
        </>
    )
};

export default ApointmentDate;