import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonInput, IonItem, IonLabel, IonList, IonItemDivider, IonButton, IonIcon, IonImg } from '@ionic/react';
import { useHistory, } from 'react-router-dom';
import { arrowBack } from 'ionicons/icons';
import { useDispatch, useSelector } from '@app/hooks';
import { getIntervals } from '../slices/workingCalendar';
import { getDateByUnitAndService, getWorkingCalendarBooking, setInterval } from '../slices/workingCalendar';
import { useTranslation } from 'react-i18next';
import styles from '../css/hospitalDetail.module.css';
import location from '../../@app/mock/locations.json';

const HospitalDetail: React.FC = () => {
    const history = useHistory();
    // const hospital = useLocation<Hospital>().state;
    const dispatch = useDispatch();
    let dayId = "";
    const hospital = useSelector((h) => h.hospital.hospitalBooking);
    const d = useSelector((d) => d.dateBooking.dateBooking);
    const dateByUnitAndServices = useSelector((s) => s.workingCaledar.workingCalendars);
    const typeChoosing = useSelector((d) => d.dateBooking.typeChoosing);
    const serviceId = useSelector((w) => w.workingCaledar.serviceId);
    const { t, i18n } = useTranslation();
    const getInterval = () => {
        dateByUnitAndServices.map((date) => {
            if (
                new Date(date.date).getDate() === new Date(d).getDate()
                && new Date(date.date).getMonth() === new Date(d).getMonth()
                && new Date(date.date).getFullYear() === new Date(d).getFullYear()
            ) {
                console.log(date.id);
                dispatch(getWorkingCalendarBooking(date));
                dispatch(getIntervals(date.id));
            }else{
                dispatch(setInterval([]));
            }
        }
        )

    }
   
    useEffect(() => {
        const arg = {
            unitId: hospital.id,
            serviceId: serviceId,
        }
        dispatch(getDateByUnitAndService(arg));
    }, [hospital.id])

    return (
        <IonPage>
            <IonHeader className={styles.header}>
                <button
                className={styles.btnCustomHeader} onClick={() => history.goBack()}><IonIcon className={styles.iconLeft} icon={arrowBack}></IonIcon></button>
                <IonLabel className={styles.styledLabel}>{t('Service Unit')}</IonLabel>
            </IonHeader>
            {hospital === undefined ? "" :
                <IonContent>
                    <IonList>
                        <IonItem>
                            <IonImg className={styles.img} src={`http://202.78.227.94:30111/api/Hospitals/Logo/${hospital.id}`}></IonImg>
                        </IonItem>
                        <IonItem>
                            <IonLabel className={styles.styledLabel} position="stacked">{t('Unit Name')}</IonLabel>
                            <IonInput value={hospital.name}> </IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel className={styles.styledLabel} position="stacked">{t('City')}</IonLabel>
                            <IonInput value={location.find(item => item.value === hospital.province)?.label}> </IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel className={styles.styledLabel} position="stacked">{t('District')}</IonLabel>
                            <IonInput value={location.find(item => item.value === hospital.province)?.districts.find(di => di.value === hospital.district)?.label}> </IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel className={styles.styledLabel} position="stacked">{t('Ward')}</IonLabel>
                            <IonInput value={location.find(item => item.value === hospital.province)?.districts.find(di => di.value === hospital.district)?.wards.find(w => w.value === hospital.ward)?.label}> </IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel className={styles.styledLabel} position="stacked">{t('Address')}</IonLabel>
                            <IonInput value={hospital.address}> </IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel className={styles.styledLabel} position="stacked">{t('Email')}</IonLabel>
                            <IonInput value={hospital.email}> </IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel className={styles.styledLabel} position="stacked">{t('Website')}</IonLabel>
                            <IonInput value={hospital.website}> </IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel className={styles.styledLabel} position="stacked">{t('PhoneNumber')}</IonLabel>
                            <IonInput value={hospital.phone}> </IonInput>
                        </IonItem>
                    </IonList>

                </IonContent>
            }
            <button className={styles.styledButtonSubmit} onClick={() => {
                if (typeChoosing === "apointmentDate") {
                    getInterval()
                    history.push("/choosingTime")
                } else if (typeChoosing === "choosingHospital") {
                    history.push("/apointmentDate")
                }
            }}>{t('Next step')}</button>

        </IonPage>
    );
};

export default HospitalDetail;