import React, { useState } from "react";
import {
  IonAlert,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonSpinner,
  isPlatform,
} from "@ionic/react";
import { useDispatch, useSelector } from "@app/hooks";
import { useHistory } from "react-router-dom";
import { chevronBack } from "ionicons/icons";
import { IntervalModel } from "booking/models/IntervalModel";
import { getInterBooking } from "booking/slices/workingCalendar";
import { useTranslation } from "react-i18next";
import styles from "../css/choosingTime.module.css";
import classNames from "classnames/bind";
import moment from "moment";

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
  const { t } = useTranslation();

  const listInterval = interval.filter(
    (i) => i.isAvailable && i.availableQuantity > 0
  );

  return (
    <>
      {serviceId === "" ? (
        history.replace("/home")
      ) : loading === true ? (
        <IonSpinner
          name="bubbles"
          color="primary"
          style={{ left: "50%", top: "50%" }}
        ></IonSpinner>
      ) : (
        <IonPage
          style={isPlatform("ios") ? { paddingTop: 40 } : { paddingTop: 0 }}
        >
          <IonHeader className={styles.header}>
            <button
              className={styles.btnCustomHeader}
              onClick={() => history.replace("/apointmentDate")}
            >
              <IonIcon className={styles.iconLeft} icon={chevronBack}></IonIcon>
            </button>
            {serviceId + "" === "f2490f62-1d28-4edd-362a-08d8a7232229" ? (
              <IonLabel className={styles.headerLabel}>{t("Time")}</IonLabel>
            ) : (
              <IonLabel className={styles.headerLabel}>{t("Time")}</IonLabel>
            )}
          </IonHeader>
          <IonContent className={styles.styledContent}>
            <IonLabel className={styles.styledLabelContent}>
              {t("Please choose a time that works for you")}
            </IonLabel>
            {listInterval.map((interval) => {
              // const intervalAvailable = interval.filter((inter) => inter.isAvailable)
              // if (intervalAvailable.length > 0) {
              return (
                <button
                  className={cx("btnSelect", {
                    btnSelected: interval.id === intervalSelected?.id,
                  })}
                  onClick={() => {
                    const date = moment(dateBooking).format("YYYY-MM-DD");
                    if (
                      moment(date + " " + interval.from).format(
                        "YYYY-MM-DD HH:mm"
                      ) > moment(new Date()).format("YYYY-MM-DD HH:mm")
                    ) {
                      setIntervalSelected(interval);
                    }
                  }}
                >
                  {interval.from}
                </button>
              );
            })}
          </IonContent>
          {Boolean(intervalSelected) === true ? (
            <button
              className={styles.styledButtonSubmit}
              onClick={() => {
                const date = moment(dateBooking).format("YYYY-MM-DD");
                if (
                  moment(date + " " + intervalSelected?.from).format(
                    "YYYY-MM-DD HH:mm"
                  ) > moment(new Date()).format("YYYY-MM-DD HH:mm")
                ) {
                  dispatch(getInterBooking(intervalSelected));
                  history.replace("/confirmProfile");
                } else {
                  setShowAlert(true);
                }
              }}
            >
              {t("Confirm")}
            </button>
          ) : (
            ""
          )}

          <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => setShowAlert(false)}
            cssClass="my-custom-class"
            header={t("Note")}
            message={t("Interval has expired")}
            buttons={[t("Cancel")]}
          />
        </IonPage>
      )}
    </>
  );
};

export default ChoosingTime;
