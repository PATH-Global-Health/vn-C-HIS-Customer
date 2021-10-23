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
import { calendarOutline, checkmark, chevronBack, help, timeOutline } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import { getExaminationById, getUserInfo } from '../slices/workingCalendar';
import styles from '../css/apointmentInfo.module.css';
import moment from 'moment';
import styled from 'styled-components';
import examinationService from '../services/examinations';
const StyleModal = styled(IonModal)`
    {
      padding: 65% 15%;
    }
`

const ApointmentInfo: React.FC = () => {
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
        dispatch(getUserInfo());
        history.location.state && dispatch(getExaminationById(history.location.state + ""));
    }, []);
    const [showModalBooking, setShowModalBooking] = useState(true);
    return (
        <>
            {serviceId === "" && history.location.state === undefined ? history.push('/home') :
                loading === true ? <IonSpinner name='bubbles' color='primary' style={{ left: '50%', top: '50%' }}></IonSpinner> :
                    <IonPage className={styles.styledPage}>
                        <StyleModal isOpen={showModal} cssClass='my-custom-class' onDidDismiss={() => setShowModal(false)}>
                            <div className={styles.styledDivIconModal}>
                                <IonIcon className={styles.styledIconModal} icon={help}></IonIcon>
                            </div>
                            <div className={styles.styledDivLabel}>
                                <p>{t('Are you sure you want to cancel your appointment ?')}</p>
                            </div>
                            <div className={styles.styledDivModal}>
                                <p onClick={async () => {
                                    try {
                                        await examinationService.cancelExamination(cancelExamId);
                                        setShowModal(false);
                                        setShowModalSuccess(true);
                                    } catch (error) {

                                    }
                                }} className={styles.styledLabelModal}>{t('Sure')}</p>
                                <p onClick={() => setShowModal(false)} className={styles.styledLabelModal}>{t('Cancel')}</p>
                            </div>
                        </StyleModal>

                        <StyleModal isOpen={showModalSuccess} cssClass='my-custom-class' onDidDismiss={() => { setShowModalSuccess(false); history.push('/examinationList') }}>
                            <div className={styles.styledDivIconModalS}>
                                <IonIcon className={styles.styledIconModal} icon={checkmark}></IonIcon>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <p>{t('Appointment has been canceled successfully')}</p>
                            </div>
                            <div className={styles.styledDivModalS}>

                                <p onClick={() => { setShowModalSuccess(false); history.push('/examinationList') }} className={styles.styledLabelModal}>{t('Cancel')}</p>
                            </div>
                        </StyleModal>

                        {examinationSuccess === true && history.location.state === undefined ?
                            <StyleModal isOpen={showModalBooking} cssClass='my-custom-class' onDidDismiss={() => setShowModalBooking(false)}>
                                <div className={styles.styledDivIconModalS}>
                                    <IonIcon className={styles.styledIconModal} icon={checkmark}></IonIcon>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <p>{t('Appointment successful')}</p>
                                </div>
                                <div className={styles.styledDivModalS}>

                                    <p onClick={() => setShowModalBooking(false)} className={styles.styledLabelModal}>{t('Cancel')}</p>
                                </div>
                            </StyleModal>
                            : ""
                        }
                        {examinationSuccess === true || history.location.state !== undefined ?
                            <>
                                <IonHeader className={styles.header}>
                                    <IonLabel className={styles.headerLabel}>{t('Appointment information')}</IonLabel>
                                </IonHeader>
                                <IonContent>
                                    <IonList>
                                        <IonItem>
                                            <IonLabel className={styles.styledLabel} position="stacked">{t('Service name')}</IonLabel>
                                            <IonInput readonly value={bookingModel.data.service.name}> </IonInput>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel className={styles.styledLabel} position="stacked">{t('Appointment date')}</IonLabel>
                                            <IonInput readonly className={styles.styledInput} value={moment(bookingModel.data.date).format('DD/MM/YYYY')}>
                                                <IonIcon className={styles.styledIconInput} icon={calendarOutline}></IonIcon>
                                                {/* {moment(bookingModel.data.date).format('DD/MM/YYYY')} */}
                                            </IonInput>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel className={styles.styledLabel} position="stacked">{t('Appointment time')}</IonLabel>
                                            <IonInput readonly className={styles.styledInput} value={bookingModel.data.interval.from}>
                                                <IonIcon className={styles.styledIconInput} icon={timeOutline}></IonIcon>
                                                {/* {bookingModel.data.interval.from} */}
                                            </IonInput>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel className={styles.styledLabel} position="stacked">{t('Service Unit')}</IonLabel>
                                            <IonInput readonly className={styles.styledInput} value={bookingModel.data.unit.name}>
                                                <IonImg className={styles.img} src={`http://202.78.227.174:30111/api/Hospitals/Logo/${bookingModel.data.unit.id}`}></IonImg>
                                            </IonInput>
                                        </IonItem>
                                    </IonList>
                                </IonContent>
                                <button className={styles.btnExamination} onClick={() => history.push('/examinationList')}>{t('View Examination List')}</button>
                                <button className={styles.styledButtonCancel} onClick={() => { setCancelExamId(bookingModel.data.id); setShowModal(true) }}>{t('Cancel appointment')}</button>
                            </> : <IonHeader className={styles.header}>
                                <button
                                    className={styles.btnCustomHeader} onClick={() => history.goBack()}><IonIcon className={styles.iconLeft} icon={chevronBack}></IonIcon></button>
                                <IonLabel className={styles.headerLabel}>{t('Time has been booked')}</IonLabel>
                            </IonHeader>
                        }
                    </IonPage>
            }
        </>
    )
};

export default ApointmentInfo;