import React, { useEffect } from 'react';
import {
    IonButton,
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
} from '@ionic/react';
import styled from 'styled-components';
import { useSelector, useDispatch } from '@app/hooks';
import 'react-day-picker/lib/style.css';
import { useHistory } from "react-router-dom";
import { arrowBack, text } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import { getUserInfo } from '../slices/workingCalendar';
import styles from '../css/apointmentInfo.module.css';
const ApointmentInfo: React.FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const bookingModel = useSelector((b) => b.workingCaledar.bookingModelResponse);
    const examinationSuccess = useSelector((b) => b.workingCaledar.examinationSuccess);
    const { t, i18n } = useTranslation();
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
        dispatch(getUserInfo())
    }, [])
    return (
        <IonPage className={styles.styledPage}>
            {examinationSuccess === false ? <IonHeader className={styles.header}>
                <button
                    className={styles.btnCustomHeader} onClick={() => history.goBack()}><IonIcon className={styles.iconLeft} icon={arrowBack}></IonIcon></button>
                <IonLabel className={styles.headerLabel}>{t('Make an appointment failed')}</IonLabel>
            </IonHeader> :
                <>
                    <IonHeader className={styles.header}>
                        <button
                            className={styles.btnCustomHeader} onClick={() => history.goBack()}><IonIcon className={styles.iconLeft} icon={arrowBack}></IonIcon></button>
                        <IonLabel className={styles.headerLabel}>{t('Appointment information')}</IonLabel>
                    </IonHeader>
                    {/* {userProfile === undefined ? "" : */}
                    <IonContent>
                        <IonList>
                            <IonItem>
                                <IonLabel className={styles.styledLabel} position="stacked">{t('Service name')}</IonLabel>
                                <IonInput value={bookingModel.data.service.name}> </IonInput>
                            </IonItem>
                            <IonItem>
                                <IonLabel className={styles.styledLabel} position="stacked">{t('Appointment date')}</IonLabel>
                                <IonInput value={new Date(bookingModel.data.date).toDateString()}> </IonInput>
                            </IonItem>
                            {/* <IonItem>
                        <StyledLabel position="stacked">Tỉnh/Thành phố</StyledLabel>
                        <IonInput value={hospital.province}> </IonInput>
                    </IonItem> */}
                            <IonItem>
                                <IonLabel className={styles.styledLabel} position="stacked">{t('Appointment time')}</IonLabel>
                                <IonInput value={bookingModel.data.interval.from}> </IonInput>
                            </IonItem>
                            <IonItem>
                                <IonLabel className={styles.styledLabel} position="stacked">{t('Service Unit')}</IonLabel>
                                <IonInput value={bookingModel.data.unit.name}> </IonInput>
                            </IonItem>

                        </IonList>

                    </IonContent>
                    {/* } */}
                    <button className={styles.styledButtonCancel}>{t('Cancel appointment')}</button>
                </>
            }
        </IonPage>
    )
};

export default ApointmentInfo;