import React from "react";
import {
  IonCard,
  IonCardContent,
  IonIcon,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { analytics } from "ionicons/icons";
import { useTranslation } from "react-i18next";
import moment from "moment";
import styles from "../../css/examinationList.module.css";
import { Rating } from "react-simple-star-rating";
import { BookingModel } from "../../models/bookingModel";

interface Props {
  bookingModel: BookingModel;
  handleClick: () => void;
}
const ExaminationItemHistory: React.FC<Props> = (props) => {
  const { bookingModel } = props;
  const e = bookingModel;
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <>
      <div className={styles.styledCardDiv}>
        <IonCard
          className={styles.styledCardHistory}
          onClick={() => {
            history.push({
              pathname: "/apointmentInfo",
              state: e.id,
            });
          }}
        >
          <div className={styles.styledDivIconHistory}>
            <IonIcon
              className={styles.styledIconHistory}
              icon={analytics}
            ></IonIcon>
          </div>
          <IonCardHeader className={styles.styledCardHeader}>
            <IonCardTitle className={styles.styledCardTitle}>
              {e?.service?.name}
            </IonCardTitle>
            <IonCardSubtitle className={styles.styledSubtitle}>
              {t("Time") + ": "} {e?.interval?.from},{" "}
              {moment(e.date).format("DD-MM-YYYY")}
            </IonCardSubtitle>
            <IonCardSubtitle className={styles.styledSubtitle}>
              {t("Doctor") + ": "} {e?.doctor?.fullname}
            </IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent className={styles.styledCardContent}>
            <p>{e?.unit?.name}</p>
            <p>{e?.unit?.address}</p>
            {e.rate !== "string" && e.rate !== null ? (
              <Rating
                onClick={(rate) => console.log("")}
                ratingValue={parseInt(e?.rate!)}
              />
            ) : (
              ""
            )}
          </IonCardContent>
          {e.rate === "string" || e.rate === null ? (
            <button
              onClick={() => {
                history.push({ pathname: "/evaluate", state: e.id });
              }}
              className={styles.btnEvaluate}
            >
              {t("Evaluate")}
            </button>
          ) : (
            ""
          )}
        </IonCard>
      </div>
    </>
  );
};

export default ExaminationItemHistory;
