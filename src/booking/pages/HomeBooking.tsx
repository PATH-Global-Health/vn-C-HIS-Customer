import React, { useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  isPlatform,
} from "@ionic/react";
import { useDispatch, useSelector } from "@app/hooks";
import { useHistory } from "react-router-dom";
import { arrowForward, chatbubble, chevronBack, flash } from "ionicons/icons";
import { getServiceId } from "booking/slices/workingCalendar";
import { useTranslation } from "react-i18next";
import { getUserInfo } from "../slices/workingCalendar";
import styles from "../css/homeBooking.module.css";
import { setHandleRedirectPage } from "@app/slices/global";

const HomeBooking: React.FC = () => {
  const { t } = useTranslation();
  const { typeRedirect } = useSelector((state) => state.global);
  const history = useHistory();
  const dispatch = useDispatch();
  const back = () => {
    if (typeRedirect == 'service-page') {
      dispatch(setHandleRedirectPage(''));
      history.replace("/customer-service")
    }
    else {
      history.replace("/home");
    }
  };
  useEffect(() => {
    dispatch(getUserInfo());
  }, []);
  return (
    <IonPage style={isPlatform("ios") ? { paddingTop: 40 } : { paddingTop: 0 }}>
      <IonHeader className={styles.header}>
        <button
          className={styles.btnCustomHeader}
          onClick={() => back()}
        >
          <IonIcon className={styles.iconLeft} icon={chevronBack}></IonIcon>
        </button>
        <IonLabel className={styles.headerLabel}>{t("Booking")} </IonLabel>
      </IonHeader>
      <IonContent className={styles.content}>
        <button
          className={styles.btnCustom}
          onClick={() => {
            dispatch(getServiceId("9f9e8dd3-890e-4ae5-2952-08d92b03ae12"));
            history.replace("/testingAppointment");
          }}
        >
          {t("Schedule a consultation")}
          <IonIcon className={styles.iconRight} icon={arrowForward}></IonIcon>
          <IonIcon className={styles.iconLeft} icon={chatbubble}></IonIcon>
        </button>
        <button
          className={styles.btnCustom}
          onClick={() => {
            dispatch(getServiceId("f2490f62-1d28-4edd-362a-08d8a7232229"));
            history.replace("/testingAppointment");
          }}
        >
          {t("Schedule a test")}
          <IonIcon className={styles.iconRight} icon={arrowForward}></IonIcon>
          <IonIcon className={styles.iconLeft} icon={flash}></IonIcon>
        </button>

        {/* <button
          className={styles.btnCustom}
          onClick={() => {
            dispatch(getAllDoctor());
            history.push('/doctorList')
          }
          }>{t('List of doctors')}
          <IonIcon className={styles.iconRight} icon={arrowForward}></IonIcon>
          <IonIcon className={styles.iconLeft} icon={people}></IonIcon>
        </button> */}
      </IonContent>
    </IonPage>
  );
};

export default HomeBooking;
