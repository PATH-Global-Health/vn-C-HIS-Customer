import React, { useEffect, useState } from 'react';
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
    IonModal,
    IonSpinner
} from '@ionic/react';
import { useSelector, useDispatch } from '@app/hooks';
import 'react-day-picker/lib/style.css';
import { useHistory } from "react-router-dom";
import { calendarOutline, checkmark, chevronBack, cloudDownloadOutline, help, timeOutline } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import { getExaminationById, getUserInfo } from '../slices/workingCalendar';
import styles from '../css/resultExaminationInfo.module.css';
import moment from 'moment';
import styled from 'styled-components';
import examinationService from '../services/examinations';
import examinationServices from '../services/examinations';
const StyleModal = styled(IonModal)`
    {
      padding: 65% 15%;
    }
`

const ExaminationResultInfo: React.FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [showModalSuccess, setShowModalSuccess] = useState(false);
    const bookingModel = useSelector((b) => b.workingCaledar.bookingModelResponse);
    const examinationSuccess = useSelector((b) => b.workingCaledar.examinationSuccess);
    const loading = useSelector((b) => b.workingCaledar.loading);
    const [cancelExamId, setCancelExamId] = useState("");
    const { t } = useTranslation();
    const serviceId = useSelector((w) => w.workingCaledar.serviceId);
    useEffect(() => {
        dispatch(getUserInfo())
        dispatch(getExaminationById(history.location.state + ""));
    }, []);
    const [showModalBooking, setShowModalBooking] = useState(true);
    return (
        <>
            {serviceId === "" && history.location.state === undefined ? history.push('/home') :
                loading === true ? <IonSpinner name='bubbles' color='primary' style={{ left: '50%', top: '50%' }}></IonSpinner> :
                    <IonPage className={styles.styledPage}>
                        <>
                            <IonHeader className={styles.header}>
                                <IonLabel className={styles.headerLabel}>{t('Examination information')}</IonLabel>
                            </IonHeader>
                            <IonContent>
                                <IonList>
                                    <IonItem>
                                        <IonLabel className={styles.styledLabel} position="stacked">{t('Full name')}</IonLabel>
                                        <IonInput readonly value={bookingModel.data.customer.fullname}> </IonInput>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel className={styles.styledLabel} position="stacked">{t('Test address')}</IonLabel>
                                        <IonInput readonly className={styles.styledInput} value={bookingModel.data.unit.name}>
                                            <IonImg className={styles.img} src={`http://202.78.227.174:30111/api/Hospitals/Logo/${bookingModel.data.unit.id}`}></IonImg>
                                        </IonInput>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel className={styles.styledLabel} position="stacked">{t('Test Type')}</IonLabel>
                                        <IonInput readonly value={bookingModel.data.service.name}> </IonInput>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel className={styles.styledLabel} position="stacked">{t('Test Date')}</IonLabel>
                                        <IonInput readonly className={styles.styledInput} value={moment(bookingModel.data.date).format('DD/MM/YYYY')}>
                                            <IonIcon className={styles.styledIconInput} icon={calendarOutline}></IonIcon>
                                        </IonInput>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel className={styles.styledLabel} position="stacked">{t('Result Day')}</IonLabel>
                                        <IonInput readonly className={styles.styledInput} value={moment(bookingModel.data.resultDate).format('DD/MM/YYYY')}>
                                            <IonIcon className={styles.styledIconInput} icon={calendarOutline}></IonIcon>
                                        </IonInput>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel className={styles.styledLabel} position="stacked">{t('Test Results')}</IonLabel>
                                        <IonInput readonly value={bookingModel.data.result}> </IonInput>
                                    </IonItem>

                                </IonList>
                            </IonContent>
                            <button className={styles.btnExamination} onClick={() => history.push('/resultExaminations')}>{t('Result information')}</button>
                            <button className={styles.styledButtonDownload} onClick={() => {
                                examinationServices.downloadResultFile(bookingModel.data.id);
                            }}><IonIcon style={{ fontSize: '25px' }} icon={cloudDownloadOutline} /></button>
                        </>

                    </IonPage>
            }
        </>
    )
};

export default ExaminationResultInfo;