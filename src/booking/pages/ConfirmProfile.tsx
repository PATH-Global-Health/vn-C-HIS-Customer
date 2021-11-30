import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonCheckbox,
  IonBadge,
  IonImg,
} from "@ionic/react";
import { useDispatch, useSelector } from "@app/hooks";
import "react-day-picker/lib/style.css";
import { useHistory } from "react-router-dom";
import { calendarOutline, chevronBack, timeOutline } from "ionicons/icons";
import location from "../../@app/mock/locations.json";
import { postExaminations } from "booking/slices/workingCalendar";
import { useTranslation } from "react-i18next";
import { getUserInfo } from "../slices/workingCalendar";
import styles from "../css/confirmProfile.module.css";
import { useForm } from "react-hook-form";
import { TestingContent } from "booking/models/bookingModel";
import { ExaminationService } from "booking/models/examinationListModel";
import moment from "moment";
import { apiLinks } from "@app/utils";

const ConfirmProfile: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userInfo = useSelector((w) => w.workingCaledar.userProfile);
  const interval = useSelector((i) => i.workingCaledar.intervalBooking);
  const unitBooking = useSelector((u) => u.hospital.hospitalBooking);
  const workingCalendarBooking = useSelector(
    (w) => w.workingCaledar.workingCalendar
  );
  const loading = useSelector((w) => w.workingCaledar.loading);
  const [city, setCity] = useState("");
  const [districts, setDistricts] = useState("");
  const [wards, setWards] = useState("");
  const [checked, setChecked] = useState(false);
  const { t } = useTranslation();
  const serviceId = useSelector((w) => w.workingCaledar.serviceId);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: TestingContent) => {
    console.log(data);
    dispatch(
      postExaminations({
        interval: interval!,
        customer: userInfo,
        doctor: {
          id: workingCalendarBooking?.doctor?.id!,
          fullname: workingCalendarBooking?.doctor?.description!,
        },
        room: workingCalendarBooking?.room,
        unit: {
          ...unitBooking,
          provinceCode: unitBooking.province,
          districtCode: unitBooking.district,
          wardCode: unitBooking.ward,
        },
        service: {
          id: workingCalendarBooking?.service![0].id!,
          name: workingCalendarBooking?.service![0].description!,
        },
        exitInformation: {
          destination: "none",
          entryingDate: "2021-06-01T00:58:27.530Z",
          exitingDate: "2021-06-01T00:58:27.530Z",
        },
        date: workingCalendarBooking?.date,
        testingContent: Boolean(serviceId.includes(ExaminationService.TESTING))
          ? {
              ...data,
              districtCode: districts!,
              provinceCode: city!,
              wardCode: wards!,
              quantity: parseInt(data?.quantity?.toString()),
              isPickUpAtTheFacility: checked ? false : true,
            }
          : {},
        consultingContent: {},
      })
    );
    history.replace("/apointmentInfo");
  };

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);
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
        <IonPage className={styles.styledPage}>
          <IonHeader className={styles.header}>
            <button
              className={styles.btnCustomHeader}
              onClick={() => history.replace("/choosingTime")}
            >
              <IonIcon className={styles.iconLeft} icon={chevronBack}></IonIcon>
            </button>
            <IonLabel className={styles.headerLabel}>
              {Boolean(serviceId === ExaminationService.TESTING)
                ? t("Required information")
                : t("Service information")}
            </IonLabel>
          </IonHeader>
          <IonContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              {Boolean(serviceId === ExaminationService.TESTING) && (
                <IonList>
                  <IonItem>
                    <IonLabel className={styles.styledLabel} position="stacked">
                      {t("Biological product type")}
                    </IonLabel>
                    <IonInput
                      {...register("typeTesting", {
                        required: {
                          value: true,
                          message: t("Biological product type not enter"),
                        },
                      })}
                      placeholder={t("Biological product type")}
                    ></IonInput>
                    {errors.typeTesting && (
                      <IonBadge color="danger">
                        {errors.typeTesting.message}
                      </IonBadge>
                    )}
                  </IonItem>
                  <IonItem>
                    <IonLabel className={styles.styledLabel} position="stacked">
                      {t("Quantity")}
                    </IonLabel>
                    <IonInput
                      type="number"
                      {...register("quantity", {
                        required: {
                          value: true,
                          message: t("Quantity not enter"),
                        },
                      })}
                      placeholder={t("Quantity")}
                    ></IonInput>
                    {errors.quantity && (
                      <IonBadge color="danger">
                        {errors.quantity.message}
                      </IonBadge>
                    )}
                  </IonItem>
                  <IonItem>
                    <IonLabel className={styles.styledLabel} position="stacked">
                      {t("Receiver")}
                    </IonLabel>
                    <IonInput
                      {...register("receiver", {
                        required: {
                          value: true,
                          message: t("Receiver not enter"),
                        },
                      })}
                      placeholder={t("Receiver")}
                      // onIonChange={(e) => setPhoneNumber(e.detail.value!)}
                      // value={phoneNumber}
                    ></IonInput>
                    {errors.receiver && (
                      <IonBadge color="danger">
                        {errors.receiver.message}
                      </IonBadge>
                    )}
                  </IonItem>
                  <IonItem>
                    <IonLabel className={styles.styledLabel} position="stacked">
                      {t("Recipient phone number")}
                    </IonLabel>
                    <IonInput
                      {...register("recipientPhoneNumber", {
                        required: {
                          value: true,
                          message: t("Recipient phone number not enter"),
                        },
                        minLength: {
                          value: 10,
                          message: t("Phone numbers with minimum is 10 digits"),
                        },
                        maxLength: {
                          value: 11,
                          message: t("Phone numbers with up to 11 digits"),
                        },
                        pattern: {
                          value: /^[0-9\b]+$/,
                          message: t(
                            "Phone numbers contain digits from 0 -> 9"
                          ),
                        },
                      })}
                      placeholder={t("Recipient phone number")}
                    ></IonInput>
                    {errors.recipientPhoneNumber && (
                      <IonBadge color="danger">
                        {errors.recipientPhoneNumber.message}
                      </IonBadge>
                    )}
                  </IonItem>
                  <IonItem>
                    <IonLabel>{t("Receive at another location")}</IonLabel>
                    <IonCheckbox
                      checked={checked}
                      onIonChange={(e) => setChecked(e.detail.checked)}
                    />
                  </IonItem>
                  {Boolean(checked) && (
                    <>
                      <IonItem>
                        <IonLabel
                          className={styles.styledLabel}
                          position="stacked"
                        >
                          {t("Address")}
                        </IonLabel>
                        <IonInput
                          {...register("receivingAddress", {
                            required: {
                              value: true,
                              message: t("Receiving address not enter"),
                            },
                          })}
                          placeholder={t("Address")}
                        ></IonInput>
                      </IonItem>
                      <IonItem>
                        <IonLabel
                          className={styles.styledLabel}
                          position="stacked"
                        >
                          {t("City")}
                        </IonLabel>
                        <IonSelect
                          // value={city}
                          onIonChange={(e) => {
                            setCity(e.detail.value);
                            setDistricts("");
                            setWards("");
                          }}
                        >
                          {location.map((lo) => (
                            <IonSelectOption value={lo.value}>
                              {lo.label}
                            </IonSelectOption>
                          ))}
                        </IonSelect>
                      </IonItem>
                      <IonItem>
                        <IonLabel
                          className={styles.styledLabel}
                          position="stacked"
                        >
                          {t("District")}
                        </IonLabel>
                        {districts === undefined ? (
                          ""
                        ) : (
                          <IonSelect
                            // value={districts}
                            onIonChange={(e) => {
                              setDistricts(e.detail.value);
                              setWards("");
                            }}
                          >
                            {Boolean(
                              location.find((lo) => lo.value === city)
                            ) === true
                              ? location
                                  .filter((lo) => lo.value === city)[0]
                                  .districts.map((districts) => (
                                    <IonSelectOption value={districts.value}>
                                      {districts.label}
                                    </IonSelectOption>
                                  ))
                              : ""}
                          </IonSelect>
                        )}
                      </IonItem>
                      <IonItem>
                        <IonLabel
                          className={styles.styledLabel}
                          position="stacked"
                        >
                          {t("Ward")}
                        </IonLabel>
                        {districts === null || districts === undefined ? (
                          ""
                        ) : (
                          <IonSelect
                            // value={wards}
                            onIonChange={(e) => setWards(e.detail.value)}
                          >
                            {Boolean(
                              location.find((lo) => lo.value === city)
                            ) === true &&
                            location
                              .filter((lo) => lo.value === city)[0]
                              .districts.filter(
                                (dis) => dis.value === districts
                              )[0] !== undefined
                              ? location
                                  .filter((lo) => lo.value === city)[0]
                                  .districts.filter(
                                    (dis) => dis.value === districts
                                  )[0]
                                  .wards.map((ward) => (
                                    <IonSelectOption value={ward.value}>
                                      {ward.label}
                                    </IonSelectOption>
                                  ))
                              : ""}
                          </IonSelect>
                        )}
                      </IonItem>
                    </>
                  )}
                </IonList>
              )}
              {Boolean(serviceId === ExaminationService.CONSULTATION) && (
                <IonList>
                  <IonItem>
                    <IonLabel className={styles.styledLabel} position="stacked">
                      {t("Service name")}
                    </IonLabel>
                    <IonInput
                      readonly
                      value={workingCalendarBooking?.service![0].description!}
                    >
                      {" "}
                    </IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel className={styles.styledLabel} position="stacked">
                      {t("Doctor")}
                    </IonLabel>
                    <IonInput
                      readonly
                      value={workingCalendarBooking?.doctor?.description!}
                    >
                      {" "}
                    </IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel className={styles.styledLabel} position="stacked">
                      {t("Appointment date")}
                    </IonLabel>
                    <IonInput
                      readonly
                      className={styles.styledInput}
                      value={moment(workingCalendarBooking?.date).format(
                        "DD/MM/YYYY"
                      )}
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel className={styles.styledLabel} position="stacked">
                      {t("Appointment time")}
                    </IonLabel>
                    <IonInput
                      readonly
                      className={styles.styledInput}
                      value={interval?.from}
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel className={styles.styledLabel} position="stacked">
                      {t("Service Unit")}
                    </IonLabel>
                    <IonInput
                      readonly
                      className={styles.styledInput}
                      value={unitBooking?.name}
                    ></IonInput>
                  </IonItem>
                </IonList>
              )}
              <button
                className={styles.styledButtonSubmit}
                disabled={!Boolean(wards) && checked}
                type="submit"
              >
                {t("Make an appointment")}
              </button>
            </form>
          </IonContent>
        </IonPage>
      )}
    </>
  );
};

export default ConfirmProfile;
