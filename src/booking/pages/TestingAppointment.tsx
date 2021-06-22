import React from 'react';
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
} from '@ionic/react';
import styled from 'styled-components';
import { useDispatch, useSelector } from '@app/hooks';
import { useHistory } from "react-router-dom";
import { getDateByServiceId } from '../slices/date';
import { getHospitalByServiceId } from '../slices/hospital';
import { arrowBack, arrowForward, calendar, podium, } from 'ionicons/icons';
import { getTypeChoosing } from 'booking/slices/date';
import { useTranslation } from 'react-i18next';
import styles from '../css/testingAppointment.module.css';

const TestingAppointment: React.FC = () => {
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const serviceId = useSelector((w) => w.workingCaledar.serviceId);
  return (
    <>
      {serviceId === "" ? history.push('/home') :
        <IonPage className={styles.styledPage}>
          <IonHeader className={styles.header}>
            <button
              className={styles.btnCustomHeader}
              onClick={() => history.goBack()}><IonIcon className={styles.iconLeft} icon={arrowBack}></IonIcon></button>
            {serviceId + "" === 'f2490f62-1d28-4edd-362a-08d8a7232229' ?
              <IonLabel className={styles.headerLabel}>{t('Schedule a test')}</IonLabel> : <IonLabel className={styles.headerLabel}>{t('Schedule a consultation')}</IonLabel>}
          </IonHeader>
          <IonContent className={styles.content}>
            <button
              className={styles.btnCustom}
              onClick={() => {
                dispatch(getDateByServiceId(serviceId));
                dispatch(getTypeChoosing("apointmentDate"));
                history.push('/apointmentDate')
              }
              }>{t('Time')}
              <IonIcon className={styles.iconRight} icon={arrowForward}></IonIcon>
              <IonIcon className={styles.iconLeft} icon={calendar}></IonIcon>
            </button>
            <button
              className={styles.btnCustom}
              onClick={() => {
                dispatch(getHospitalByServiceId(serviceId));
                dispatch(getTypeChoosing("choosingHospital"));
                history.push('/choosingHospital')
              }}
            >{t('Service Unit')}
              <IonIcon className={styles.iconRight} icon={arrowForward}></IonIcon>
              <IonIcon className={styles.iconLeft} icon={podium}></IonIcon>
            </button>
          </IonContent>
        </IonPage>
      }
    </>

  );
};

export default TestingAppointment;