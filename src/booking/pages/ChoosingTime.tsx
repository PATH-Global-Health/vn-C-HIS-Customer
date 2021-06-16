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

const StyledButton = styled(IonButton)`{
    ::after{content: ""}
    width: 68px;
    height: 28px;
    --background: white;
    text-align: center;
    color: black;
    border: 1px solid #d7d8da;
    border-radius: 11px;
    // margin-left: 37px;
    position: relative;
    font-family: system-ui;
    font-size: 18px;
    margin: 10px;
}
`;


const StyledContent = styled(IonContent)`
{
  text-align: center;
 
}
`
const StyledLabelContent = styled(IonLabel)`
    {
        font-weight: bold;
        font-size: px;
        color: #a09b9b;
        display: inline-block;
        // margin-left: 16px;
        
    }
    `
const StyledButtonNext = styled(IonButton)`
    // width: 300px;
    --background: #293978;
    // position: absolute;
    // bottom: 5px;
    // width: 
    margin: 16px;
    margin-bottom: 200px;
    `
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
    if (result) {
      <StyledButton>Lieu</StyledButton>
    }
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
        {interval.map((interval) => {
          const intervalAvailable = interval.intervals.filter((inter) => inter.isAvailable)
          if (intervalAvailable.length > 0) {
            return (
              <button className={styles.btnSelect}
                onClick={() => {
                  setIntervalSelected(intervalAvailable[0])
                }}
              >
                {interval.from}
              </button>)
          }


        })}
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