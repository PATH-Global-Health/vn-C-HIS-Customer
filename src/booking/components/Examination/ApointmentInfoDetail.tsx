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
  reader,
  layers,
  pencil,
  personOutline,
  phonePortraitOutline,
  todaySharp,
  water,
  pricetag,
} from "ionicons/icons";
import { useTranslation } from "react-i18next";
import { TestingContent, ConsultingContent } from "booking/models/bookingModel";
import location from "@app/mock/locations.json";
import AddressCardSubTitle from "./AddressCardSubTitle";
import { BookingModelResponse } from "booking/models/bookingModelResponse";
import { ExaminationService } from "booking/models/examinationListModel";

interface Props {
  data: BookingModelResponse;
}

const ApointmentInfoDetail: React.FC<Props> = (props) => {
  const testingContent = props?.data?.data?.testingContent as TestingContent;
  const consultingContent = props?.data?.data
    .consultingContent as ConsultingContent;
  const unit = props?.data?.data?.unit;
  const customer = props?.data?.data?.customer;
  const { t } = useTranslation();
  return (
    <>
      <IonCard>
        <IonCardHeader>
          {Boolean(
            props?.data?.data?.service?.id === ExaminationService.TESTING
          ) ? (
            <IonCardTitle>
              {testingContent.isPickUpAtTheFacility
                ? t("Receive at facility")
                : t("Receive at another location")}
            </IonCardTitle>
          ) : (
            <IonCardTitle>{`${t("Customer")}: ${
              customer?.fullname
            }`}</IonCardTitle>
          )}
        </IonCardHeader>
        {Boolean(
          props?.data?.data?.service?.id === ExaminationService.TESTING
        ) && (
          <>
            <IonItem className="ion-activated">
              <IonIcon icon={water} slot="start" />
              <IonLabel>{testingContent.typeTesting}</IonLabel>
            </IonItem>

            <IonItem>
              <IonIcon icon={layers} slot="start" />
              <IonLabel>{testingContent.quantity}</IonLabel>
            </IonItem>

            <IonItem className="ion-activated">
              <IonIcon icon={phonePortraitOutline} slot="start" />
              <IonLabel>{testingContent.recipientPhoneNumber}</IonLabel>
            </IonItem>

            <IonItem>
              <IonIcon icon={personOutline} slot="start" />
              <IonLabel>{testingContent.receiver}</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={todaySharp} slot="start" />
              <IonLabel>{testingContent.result}</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={pencil} slot="start" />
              <IonLabel>{testingContent.note}</IonLabel>
            </IonItem>
          </>
        )}
        {Boolean(
          props?.data?.data?.service?.id === ExaminationService.CONSULTATION
        ) && (
          <>
            <IonItem className="ion-activated">
              <IonIcon icon={pricetag} slot="start" />
              <IonLabel>{consultingContent.type}</IonLabel>
            </IonItem>

            <IonItem>
              <IonIcon icon={reader} slot="start" />
              <IonLabel>{consultingContent.content}</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={todaySharp} slot="start" />
              <IonLabel>{consultingContent.result}</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={pencil} slot="start" />
              <IonLabel>{consultingContent.note}</IonLabel>
            </IonItem>
          </>
        )}
        {Boolean(testingContent?.wardCode) ? (
          <AddressCardSubTitle
            data={{
              address: testingContent?.receivingAddress!,
              provinceCode: testingContent?.provinceCode!,
              districtCode: testingContent?.districtCode!,
              wardCode: testingContent?.wardCode!,
            }}
          ></AddressCardSubTitle>
        ) : (
          <AddressCardSubTitle
            data={{
              address: unit?.address!,
              provinceCode: unit?.provinceCode!,
              districtCode: unit?.districtCode!,
              wardCode: unit?.wardCode!,
            }}
          ></AddressCardSubTitle>
        )}
      </IonCard>
    </>
  );
};

export default ApointmentInfoDetail;
