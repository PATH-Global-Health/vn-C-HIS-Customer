import React, { useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonIcon,
  IonImg,
  IonSpinner,
  isPlatform,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { chevronBack } from "ionicons/icons";
import { useDispatch, useSelector } from "@app/hooks";
import { getIntervals } from "../slices/workingCalendar";
import {
  getDateByUnitAndService,
  getWorkingCalendarBooking,
  setInterval,
} from "../slices/workingCalendar";
import { useTranslation } from "react-i18next";
import styles from "../css/hospitalDetail.module.css";
import location from "@app/mock/locations.json";
import { apiLinks } from "@app/utils";

const HospitalDetail: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const hospital = useSelector((h) => h.hospital.hospitalBooking);
  const d = useSelector((d) => d.dateBooking.dateBooking);
  const dateByUnitAndServices = useSelector(
    (s) => s.workingCaledar.workingCalendars
  );
  const loading = useSelector((b) => b.workingCaledar.loading);
  const typeChoosing = useSelector((d) => d.dateBooking.typeChoosing);
  const serviceId = useSelector((w) => w.workingCaledar.serviceId);
  const { t } = useTranslation();
  const getInterval = () => {
    dateByUnitAndServices.map((date) => {
      if (
        new Date(date.date!).getDate() === new Date(d).getDate() &&
        new Date(date.date!).getMonth() === new Date(d).getMonth() &&
        new Date(date.date!).getFullYear() === new Date(d).getFullYear()
      ) {
        console.log(date.id);
        dispatch(getWorkingCalendarBooking(date));
        dispatch(getIntervals(date.id!));
      } else {
        dispatch(setInterval([]));
      }
    });
  };

  useEffect(() => {
    const arg = {
      unitId: hospital.id,
      serviceId: serviceId,
    };
    dispatch(getDateByUnitAndService(arg));
  }, [hospital.id]);

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
          {hospital === undefined ? (
            ""
          ) : (
            <IonContent>
              <IonHeader className={styles.header}>
                <button
                  className={styles.btnCustomHeader}
                  onClick={() => history.replace("/choosingHospital")}
                >
                  <IonIcon
                    className={styles.iconLeft}
                    icon={chevronBack}
                  ></IonIcon>
                </button>
                <IonLabel className={styles.styledLabel}>
                  {t("Service Unit")}
                </IonLabel>
              </IonHeader>
              <IonList>
                <IonItem>
                  <IonImg
                    className={styles.img}
                    src={`${apiLinks.manageSchedule.hospital.getHospitalImage}${hospital.id}`}
                  ></IonImg>
                </IonItem>
                <IonItem>
                  <IonLabel className={styles.styledLabel} position="stacked">
                    {t("Unit Name")}
                  </IonLabel>
                  <IonInput value={hospital.name} readonly>
                    {" "}
                  </IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel className={styles.styledLabel} position="stacked">
                    {t("City")}
                  </IonLabel>
                  <IonInput
                    readonly
                    value={
                      location.find((item) => item.value === hospital.province)
                        ?.label
                    }
                  >
                    {" "}
                  </IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel className={styles.styledLabel} position="stacked">
                    {t("District")}
                  </IonLabel>
                  <IonInput
                    readonly
                    value={
                      location
                        .find((item) => item.value === hospital.province)
                        ?.districts.find((di) => di.value === hospital.district)
                        ?.label
                    }
                  >
                    {" "}
                  </IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel className={styles.styledLabel} position="stacked">
                    {t("Ward")}
                  </IonLabel>
                  <IonInput
                    readonly
                    value={
                      location
                        .find((item) => item.value === hospital.province)
                        ?.districts.find((di) => di.value === hospital.district)
                        ?.wards.find((w) => w.value === hospital.ward)?.label
                    }
                  >
                    {" "}
                  </IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel className={styles.styledLabel} position="stacked">
                    {t("Address")}
                  </IonLabel>
                  <IonInput readonly value={hospital.address}>
                    {" "}
                  </IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel className={styles.styledLabel} position="stacked">
                    {t("Email")}
                  </IonLabel>
                  <IonInput readonly value={hospital.email}>
                    {" "}
                  </IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel className={styles.styledLabel} position="stacked">
                    {t("Website")}
                  </IonLabel>
                  <IonInput readonly value={hospital.website}>
                    {" "}
                  </IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel className={styles.styledLabel} position="stacked">
                    {t("PhoneNumber")}
                  </IonLabel>
                  <IonInput readonly value={hospital.phone}>
                    {" "}
                  </IonInput>
                </IonItem>
              </IonList>
              <button
                className={styles.styledButtonSubmit}
                onClick={() => {
                  if (typeChoosing === "apointmentDate") {
                    getInterval();
                    history.replace("/choosingTime");
                  } else if (typeChoosing === "choosingHospital") {
                    history.replace("/apointmentDate");
                  }
                }}
              >
                {t("Next step")}
              </button>
            </IonContent>
          )}
        </IonPage>
      )}
    </>
  );
};

export default HospitalDetail;
