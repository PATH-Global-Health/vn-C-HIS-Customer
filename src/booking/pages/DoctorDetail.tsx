import React, { useState } from 'react';
import {
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonModal,
} from '@ionic/react';
import { useSelector, useDispatch } from '@app/hooks';
import 'react-day-picker/lib/style.css';
import { useHistory } from "react-router-dom";
import { book, card, code, information, leafSharp, mailOpen, people, phonePortrait } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import styles from '../css/resultExaminationInfo.module.css';
import styled from 'styled-components';
import { Doctor } from 'booking/models/hospital';

const DoctorDetail: React.FC = () => {
    const history = useHistory();
    const doctor = history.location.state as Doctor;
    const { t } = useTranslation();
    return (
        <>
            <IonPage className={styles.styledPage}>
                <>
                    <IonHeader className={styles.header}>
                        <IonLabel className={styles.headerLabel}>{t('Doctor Information')}</IonLabel>
                    </IonHeader>
                    <IonContent>
                        <IonList>
                            <IonItem>
                                <IonLabel className={styles.styledLabel} position="stacked">{t('Full name')}</IonLabel>
                                <IonInput readonly value={doctor?.fullName}>
                                    <IonIcon className={styles.styledIconInput} icon={information}></IonIcon>
                                </IonInput>
                            </IonItem>

                            <IonItem>
                                <IonLabel className={styles.styledLabel} position="stacked">{t('Học vị')}</IonLabel>
                                <IonInput readonly value={doctor?.academicTitle}>
                                    <IonIcon className={styles.styledIconInput} icon={book}></IonIcon> </IonInput>
                            </IonItem>
                            <IonItem>
                                <IonLabel className={styles.styledLabel} position="stacked">{t('Email')}</IonLabel>
                                <IonInput readonly value={doctor?.email}>
                                    <IonIcon className={styles.styledIconInput} icon={mailOpen}></IonIcon>
                                </IonInput>
                            </IonItem>

                            <IonItem>
                                <IonLabel className={styles.styledLabel} position="stacked">{t('Code')}</IonLabel>
                                <IonInput readonly value={doctor?.code}>
                                    <IonIcon className={styles.styledIconInput} icon={code}></IonIcon>
                                </IonInput>
                            </IonItem>

                            <IonItem>
                                <IonLabel className={styles.styledLabel} position="stacked">{t('Identity Card')}</IonLabel>
                                <IonInput readonly value={doctor?.identityCard}>
                                    <IonIcon className={styles.styledIconInput} icon={card}></IonIcon>
                                </IonInput>
                            </IonItem>

                            <IonItem>
                                <IonLabel className={styles.styledLabel} position="stacked">{t('PhoneNumber')}</IonLabel>
                                <IonInput readonly value={doctor?.phone}>
                                    <IonIcon className={styles.styledIconInput} icon={phonePortrait}></IonIcon>
                                </IonInput>
                            </IonItem>

                            <IonItem>
                                <IonLabel className={styles.styledLabel} position="stacked">{t('Title')}</IonLabel>
                                <IonInput readonly value={doctor?.title}>
                                    <IonIcon className={styles.styledIconInput} icon={leafSharp}></IonIcon>
                                </IonInput>
                            </IonItem>

                            <IonItem>
                                <IonLabel className={styles.styledLabel} position="stacked">{t('Gender')}</IonLabel>
                                <IonInput readonly value={doctor?.gender ? t('Male').toString() : t('Female').toString()}>
                                    <IonIcon className={styles.styledIconInput} icon={people}></IonIcon>
                                </IonInput>
                            </IonItem>

                        </IonList>
                    </IonContent>
                    <button className={styles.btnExamination} onClick={() => history.goBack()}>{t('Go Back')}</button>
                </>
            </IonPage>
        </>
    )
};

export default DoctorDetail;