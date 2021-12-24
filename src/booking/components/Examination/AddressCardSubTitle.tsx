import React from "react";
import {
  IonIcon,
  IonItem,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import "react-day-picker/lib/style.css";
import {
  businessSharp,
  layers,
  pencil,
  personOutline,
  phonePortraitOutline,
  todaySharp,
  water,
} from "ionicons/icons";
import { useTranslation } from "react-i18next";
import { TestingContent } from "booking/models/bookingModel";
import location from "@app/mock/locations.json";

interface Address {
  address?: string;
  provinceCode?: string;
  districtCode?: string;
  wardCode?: string;
}

interface Props {
  data: Address;
}

const AddressCardSubTitle: React.FC<Props> = (props) => {
  const { address, provinceCode, districtCode, wardCode } = props.data;
  const { t } = useTranslation();
  return (
    <IonItem>
      <IonIcon icon={businessSharp} slot="start" />
      <IonCardSubtitle>{`${address}, ${
        location
          .find((lo) => lo.value === provinceCode)
          ?.districts.find((d) => d.value)
          ?.wards.find((w) => w.value)?.label
      }, ${
        location
          .find((lo) => lo.value === provinceCode)
          ?.districts.find((d) => d.value)?.label
      }, ${
        location.find((lo) => lo.value === provinceCode)?.label
      }`}</IonCardSubtitle>
    </IonItem>
  );
};

export default AddressCardSubTitle;
