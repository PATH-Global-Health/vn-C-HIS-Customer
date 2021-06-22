import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonRadioGroup,
  IonRadio
} from '@ionic/react';
import { useDispatch, useSelector } from '@app/hooks';
import { useHistory } from "react-router-dom";
import { arrowBack} from 'ionicons/icons';
import { IntervalModel } from 'booking/models/IntervalModel';
import { getInterBooking } from 'booking/slices/workingCalendar';
import { useTranslation } from 'react-i18next';
import styles from '../css/choosingTime.module.css';
import classNames from 'classnames/bind';


const ChoosingTime: React.FC = () => {
  var cx = classNames.bind(styles);
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
    <IonPage className={styles.styledPage}>
      <IonHeader className={styles.header}>
        <button
          className={styles.btnCustomHeader}
          onClick={() => history.goBack()}><IonIcon className={styles.iconLeft} icon={arrowBack}></IonIcon></button>
        {serviceId + "" === 'f2490f62-1d28-4edd-362a-08d8a7232229' ?
          <IonLabel className={styles.headerLabel}>{t('Test time')}</IonLabel> : <IonLabel className={styles.headerLabel}>{t('Consultation time')}</IonLabel>}
      </IonHeader>
      <IonContent className={styles.styledContent}>
        <IonLabel className={styles.styledLabelContent}>{t('Please choose a time that works for you')}</IonLabel>
        {/* <IonRadioGroup onIonChange={e => setIntervalSelected(e.detail.value)}> */}
          {interval.map((interval) => {
            const intervalAvailable = interval.intervals.filter((inter) => inter.isAvailable)
            if (intervalAvailable.length > 0) {
              return (

                // <IonItem className={styles.styledItem}>
                //   <IonLabel >{interval.from}</IonLabel>
                //   <IonRadio className={styles.btnRadio} value={intervalAvailable[0]} />
                // </IonItem>
                <button className = {cx('btnSelect', {'btnSelected' : !intervalAvailable.findIndex(i => i.id === intervalSelected?.id)})}
                  onFocus={() => {
                    setIntervalSelected(intervalAvailable[0])
                  }}
                  onClick={() => {
                    setIntervalSelected(intervalAvailable[0])
                  }}
                >
                  {interval.from}
                </button>
              )
            }


          })}
        {/* </IonRadioGroup> */}
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