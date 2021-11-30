import React, { useState } from "react";
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
} from "@ionic/react";
import { useSelector, useDispatch } from "@app/hooks";
import "react-day-picker/lib/style.css";
import { useHistory } from "react-router-dom";
import {
  book,
  card,
  code,
  information,
  leafSharp,
  mailOpen,
  people,
  phonePortrait,
  peopleCircleSharp,
  chevronBack,
} from "ionicons/icons";
import { useTranslation } from "react-i18next";
import styles from "../css/resultExaminationInfo.module.css";
import styled from "styled-components";
import { Doctor, DoctorData } from "booking/models/hospital";

const DoctorDetail: React.FC = () => {
  const history = useHistory();
  const doctor = history.location.state as DoctorData;
  const { t } = useTranslation();
  return (
    <>
      <IonPage className={styles.styledPage}>
        <>
          <IonHeader className={styles.header}>
            <IonIcon
              onClick={() => history.replace("/doctorList")}
              className={styles.iconLeft}
              icon={chevronBack}
            ></IonIcon>
            <IonLabel className={styles.headerLabel}>
              {t("Doctor Information")}
            </IonLabel>
          </IonHeader>
          <IonContent>
            <IonList>
              <IonItem>
                <div
                  style={{
                    height: "80px",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {/* <IonLabel className={styles.styledLabel} position="stacked">{t('Full name')}</IonLabel> */}
                  <div className={styles.styledDivIcon}>
                    <IonIcon
                      className={styles.styledIcon}
                      icon={peopleCircleSharp}
                    ></IonIcon>
                  </div>
                  <div className={styles.styledDivName}>
                    <IonLabel className={styles.styledInputName}>
                      {doctor?.fullName}
                    </IonLabel>
                    <IonLabel className={styles.styledInputName}>
                      {doctor?.phone}
                    </IonLabel>
                  </div>
                </div>
              </IonItem>

              <IonItem>
                <IonLabel className={styles.styledLabel} position="stacked">
                  {t("Academic Title")}
                </IonLabel>
                <IonInput
                  className={styles.styledInput}
                  readonly
                  value={doctor?.academicTitle}
                >
                  {/* <IonIcon className={styles.styledIconInput} icon={book}></IonIcon>  */}
                </IonInput>
              </IonItem>
              <IonItem>
                <IonLabel className={styles.styledLabel} position="stacked">
                  {t("Email")}
                </IonLabel>
                <IonInput
                  className={styles.styledInput}
                  readonly
                  value={doctor?.email}
                >
                  {/* <IonIcon className={styles.styledIconInput} icon={mailOpen}></IonIcon> */}
                </IonInput>
              </IonItem>

              <IonItem>
                <IonLabel className={styles.styledLabel} position="stacked">
                  {t("Code")}
                </IonLabel>
                <IonInput
                  className={styles.styledInput}
                  readonly
                  value={doctor?.code}
                >
                  {/* <IonIcon className={styles.styledIconInput} icon={code}></IonIcon> */}
                </IonInput>
              </IonItem>

              <IonItem>
                <IonLabel className={styles.styledLabel} position="stacked">
                  {t("Identity Card")}
                </IonLabel>
                <IonInput
                  className={styles.styledInput}
                  readonly
                  value={doctor?.identityCard}
                >
                  {/* <IonIcon className={styles.styledIconInput} icon={card}></IonIcon> */}
                </IonInput>
              </IonItem>

              <IonItem>
                <IonLabel className={styles.styledLabel} position="stacked">
                  {t("PhoneNumber")}
                </IonLabel>
                <IonInput
                  className={styles.styledInput}
                  readonly
                  value={doctor?.phone}
                >
                  {/* <IonIcon className={styles.styledIconInput} icon={phonePortrait}></IonIcon> */}
                </IonInput>
              </IonItem>

              <IonItem>
                <IonLabel className={styles.styledLabel} position="stacked">
                  {t("Title")}
                </IonLabel>
                <IonInput
                  className={styles.styledInput}
                  readonly
                  value={doctor?.title}
                >
                  {/* <IonIcon className={styles.styledIconInput} icon={leafSharp}></IonIcon> */}
                </IonInput>
              </IonItem>

              <IonItem>
                <IonLabel className={styles.styledLabel} position="stacked">
                  {t("Gender")}
                </IonLabel>
                <IonInput
                  className={styles.styledInput}
                  readonly
                  value={
                    doctor?.gender
                      ? t("Male").toString()
                      : t("Female").toString()
                  }
                >
                  {/* <IonIcon className={styles.styledIconInput} icon={people}></IonIcon> */}
                </IonInput>
              </IonItem>

              <IonItem>
                <IonLabel className={styles.styledLabel} position="stacked">
                  {t("Unit Name")}
                </IonLabel>
                <IonInput
                  className={styles.styledInput}
                  readonly
                  value={doctor?.unit[0]?.name}
                >
                  {/* <IonIcon className={styles.styledIconInput} icon={people}></IonIcon> */}
                </IonInput>
              </IonItem>
            </IonList>

            <div style={{ width: "100%", display: "flex" }}>
              <button
                className={styles.btnGoBack}
                onClick={() => history.goBack()}
              >
                {t("Go Back")}
              </button>
            </div>
          </IonContent>
        </>
      </IonPage>
    </>
  );
};

export default DoctorDetail;
