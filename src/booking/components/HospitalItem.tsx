import React, { useEffect, useState } from "react";
import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonSpinner,
} from "@ionic/react";
import styled from "styled-components";
import { useDispatch, useSelector } from "@app/hooks";
import { useHistory } from "react-router-dom";
import { arrowForward, chevronBack, filter, podium } from "ionicons/icons";
import { getHospitalBooking } from "booking/slices/hospital";
import location from "@app/mock/locations.json";
import { deburr } from "../../@app/utils/helpers";
import { getUnitTypes } from "booking/slices/unitType";
import { useTranslation } from "react-i18next";
import styles from "../css/choosingHospital.module.css";
import { CityS } from "booking/models/city";
import { apiLinks } from "@app/utils";
import { Hospital } from "booking/models/hospital";

interface Props {
  hospital: Hospital;
}

const HospitalItem: React.FC<Props> = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const hos = props.hospital;
  return (
    <IonItem
      className={styles.btnCustom}
      onClick={() => {
        dispatch(getHospitalBooking(hos));
        history.push("/hospitalDetail", hos);
      }}
    >
      <IonAvatar>
        <img
          src={`${apiLinks.manageSchedule.hospital.getHospitalImage}${hos.id}`}
        />
      </IonAvatar>
      <IonLabel>
        <h2 style={{ fontSize: "20px" }}>{`${hos.name}`}</h2>
        <p>{`${hos.address}, ${
          location
            .find((item) => item.value === hos.province)
            ?.districts.find((di) => di.value === hos.district)
            ?.wards.find((w) => w.value === hos.ward)?.label
        }`}</p>
        <p>{` ${
          location
            .find((item) => item.value === hos.province)
            ?.districts.find((di) => di.value === hos.district)?.label
        }, ${location.find((item) => item.value === hos.province)?.label}`}</p>
      </IonLabel>
    </IonItem>
  );
};

export default HospitalItem;
