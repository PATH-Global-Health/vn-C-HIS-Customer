import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from '../../@app/hooks';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonRadioGroup,
  IonRadio
} from '@ionic/react';
import styled from 'styled-components';
import { useDispatch, useSelector } from '@app/hooks';
// import { getUserInfo } from '../../@app/slices/auth';
import { useHistory } from "react-router-dom";
import { arrowBack, arrowBackCircle, arrowBackOutline, arrowBackSharp, arrowDown, arrowForward, arrowRedo, arrowUndo, backspace, build, calendar, chatbubble, flag, flash, home, newspaper, people, podium, returnDownBack } from 'ionicons/icons';
// import HospitalDetail from 'booking/components/HospitalDetail';
// import moment from 'moment';
// import { Interval } from 'booking/models/interval';
import { IntervalModel } from 'booking/models/IntervalModel';
import { getInterBooking } from 'booking/slices/workingCalendar';
import { useTranslation } from 'react-i18next';
import styles from '../css/choosingTime.module.css';


const ChoosingTime: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const interval = useSelector((w) => w.workingCaledar.interval);
  const [intervalSelected, setIntervalSelected] = useState<IntervalModel>();
  const w = useSelector((w) => w.workingCaledar.workingCalendar);
  const serviceId = useSelector((w) => w.workingCaledar.serviceId);
  const { t, i18n } = useTranslation();
  let result = false;
  interval.map((interval) => {
    interval.intervals.map((item) => {
      if (item.isAvailable) result = true;
    });
  })

  return (
    <IonPage>
      <IonHeader className={styles.header}>
        <button
          className={styles.btnCustomHeader}
          onClick={() => history.goBack()}><IonIcon className={styles.iconLeft} icon={arrowBack}></IonIcon></button>
        {serviceId + "" === 'f2490f62-1d28-4edd-362a-08d8a7232229' ?
          <IonLabel className={styles.headerLabel}>{t('Test time')}</IonLabel> : <IonLabel className={styles.headerLabel}>{t('Consultation time')}</IonLabel>}
      </IonHeader>
      <IonContent className={styles.styledContent}>
        <IonLabel className={styles.styledLabelContent}>{t('Please choose a time that works for you')}</IonLabel>
        <IonRadioGroup onIonChange={e => setIntervalSelected(e.detail.value)}>
          {interval.map((interval) => {
            const intervalAvailable = interval.intervals.filter((inter) => inter.isAvailable)
            if (intervalAvailable.length > 0) {
              return (

                <IonItem className={styles.styledItem}>
                  <IonLabel >{interval.from}</IonLabel>
                  <IonRadio className={styles.btnRadio} value={intervalAvailable[0]} />
                </IonItem>
                // <button className={styles.btnSelect}
                //   onFocus={() => {
                //     setIntervalSelected(intervalAvailable[0])
                //   }}
                //   onClick={() => {
                //     setIntervalSelected(intervalAvailable[0])
                //   }}
                // >
                //   {interval.from}
                // </button>
              )
            }


          })}
        </IonRadioGroup>
      </IonContent>
      {Boolean(intervalSelected) === true ?
        <button className={styles.styledButtonSubmit} onClick={() => {
          dispatch(getInterBooking(intervalSelected))
          history.push("/confirmProfile")
        }}>{t('Confirm')}</button> : ""}
    </IonPage>
  );
};

export default ChoosingTime;