import React, { useEffect } from 'react';
import {
    IonContent,
    IonHeader,
    IonIcon,
    IonImg,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
} from '@ionic/react';
import { useSelector, useDispatch } from '@app/hooks';
import 'react-day-picker/lib/style.css';
import { useHistory } from "react-router-dom";
import { arrowBack } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import { getUserInfo } from '../slices/workingCalendar';
import styles from '../css/apointmentInfo.module.css';
import moment from 'moment';
const ApointmentInfo: React.FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const bookingModel = useSelector((b) => b.workingCaledar.bookingModelResponse);
    const examinationSuccess = useSelector((b) => b.workingCaledar.examinationSuccess);
    const { t } = useTranslation();
    const serviceId = useSelector((w) => w.workingCaledar.serviceId);
    useEffect(() => {
        dispatch(getUserInfo())
    }, [])
    return (
        <>
            {serviceId === "" ? history.push('/home') :
                <IonPage className={styles.styledPage}>
                    {examinationSuccess === true ?
                        <>
                            <IonHeader className={styles.header}>
                                <button
                                    className={styles.btnCustomHeader} onClick={() => history.goBack()}><IonIcon className={styles.iconLeft} icon={arrowBack}></IonIcon></button>
                                <IonLabel className={styles.headerLabel}>{t('Appointment information')}</IonLabel>
                            </IonHeader>
                            <IonContent>
                                <IonList>
                                    <IonItem>
                                        <IonLabel className={styles.styledLabel} position="stacked">{t('Service name')}</IonLabel>
                                        <IonInput value={bookingModel.data.service.name}> </IonInput>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel className={styles.styledLabel} position="stacked">{t('Appointment date')}</IonLabel>
                                        <IonInput value={moment(bookingModel.data.date).format('DD/MM/YYYY')}> </IonInput>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel className={styles.styledLabel} position="stacked">{t('Appointment time')}</IonLabel>
                                        <IonInput value={bookingModel.data.interval.from}> </IonInput>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel className={styles.styledLabel} position="stacked">{t('Service Unit')}</IonLabel>
                                        <IonInput value={bookingModel.data.unit.name}>
                                            <IonImg className={styles.img} src={`http://202.78.227.94:30111/api/Hospitals/Logo/${bookingModel.data.unit.id}`}></IonImg>
                                        </IonInput>
                                    </IonItem>
                                </IonList>
                            </IonContent>
                            <button className={styles.btnExamination} onClick={() => history.push('/examinationList')}>{t('View Examination List')}</button>
                            {/* <button className={styles.styledButtonCancel}>{t('Cancel appointment')}</button> */}
                        </> : <IonHeader className={styles.header}>
                            <button
                                className={styles.btnCustomHeader} onClick={() => history.goBack()}><IonIcon className={styles.iconLeft} icon={arrowBack}></IonIcon></button>
                            <IonLabel className={styles.headerLabel}>{t('Time has been booked')}</IonLabel>
                        </IonHeader>
                    }
                </IonPage>
            }
        </>
    )
};

export default ApointmentInfo;