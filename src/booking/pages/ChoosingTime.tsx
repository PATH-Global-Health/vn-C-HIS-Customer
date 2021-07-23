import React, { useEffect, useState } from 'react';
import {
  IonAlert,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonSpinner,
} from '@ionic/react';
import { useDispatch, useSelector } from '@app/hooks';
import { useHistory } from "react-router-dom";
import { chevronBack } from 'ionicons/icons';
import { IntervalModel } from 'booking/models/IntervalModel';
import { getInterBooking } from 'booking/slices/workingCalendar';
import { useTranslation } from 'react-i18next';
import styles from '../css/choosingTime.module.css';
import classNames from 'classnames/bind';
import moment from 'moment';


const ChoosingTime: React.FC = () => {
  var cx = classNames.bind(styles);
  const history = useHistory();
  const dispatch = useDispatch();
  const interval = useSelector((w) => w.workingCaledar.interval);
  const loading = useSelector((b) => b.workingCaledar.loading);
  const [intervalSelected, setIntervalSelected] = useState<IntervalModel>();
  const w = useSelector((w) => w.workingCaledar.workingCalendar);
  const serviceId = useSelector((w) => w.workingCaledar.serviceId);
  const dateBooking = useSelector((d) => d.dateBooking.dateBooking);
  const [showAlert, setShowAlert] = useState(false);
  const { t, i18n } = useTranslation();
  let result = false;
  interval.map((interval) => {
    interval.intervals.map((item) => {
      if (item.isAvailable) result = true;
    });
  });

  return (
    <>
      {serviceId === "" ? history.push('/home') :
        loading === true ? <IonSpinner name='bubbles' color='primary' style={{ left: '50%', top: '50%' }}></IonSpinner> :
          <IonPage className={styles.styledPage}>
            <IonHeader className={styles.header}>
              <button
                className={styles.btnCustomHeader}
                onClick={() => history.goBack()}><IonIcon className={styles.iconLeft} icon={chevronBack}></IonIcon></button>
              {serviceId + "" === 'f2490f62-1d28-4edd-362a-08d8a7232229' ?
                <IonLabel className={styles.headerLabel}>{t('Test time')}</IonLabel> : <IonLabel className={styles.headerLabel}>{t('Consultation time')}</IonLabel>}
            </IonHeader>
            <IonContent className={styles.styledContent}>
              <IonLabel className={styles.styledLabelContent}>{t('Please choose a time that works for you')}</IonLabel>
              {interval.map((interval) => {
                const intervalAvailable = interval.intervals.filter((inter) => inter.isAvailable)
                if (intervalAvailable.length > 0) {
                  return (
                    <button className={cx('btnSelect', { 'btnSelected': !intervalAvailable.findIndex(i => i.id === intervalSelected?.id) })}
                      onClick={() => {
                        const date = moment(dateBooking).format('YYYY-MM-DD');
                        if (moment(date + " " + intervalAvailable[0].from).format('YYYY-MM-DD HH:mm') > moment(new Date()).format('YYYY-MM-DD HH:mm')) {

                          setIntervalSelected(intervalAvailable[0]);
                        }
                      }}
                    >
                      {interval.from}
                    </button>
                  )
                }


              })}
            </IonContent>
            {Boolean(intervalSelected) === true ?
              <button className={styles.styledButtonSubmit}
                onClick={() => {
                  const date = moment(dateBooking).format('YYYY-MM-DD');
                  if (moment(date + " " + intervalSelected?.from).format('YYYY-MM-DD HH:mm') > moment(new Date()).format('YYYY-MM-DD HH:mm')) {
                    dispatch(getInterBooking(intervalSelected));
                    history.push("/confirmProfile");
                  } else {
                    setShowAlert(true);
                  }
                }}>{t('Confirm')}</button> : ""}

            <IonAlert
              isOpen={showAlert}
              onDidDismiss={() => setShowAlert(false)}
              cssClass='my-custom-class'
              header={t('Note')}
              message={t('Interval has expired')}
              buttons={[t('Cancel')]}
            />
          </IonPage>
      }
    </>
  );
};

export default ChoosingTime;