import React, { useEffect, useState } from "react";

import styled from "styled-components";

import {
  IonIcon,
  IonContent,
  IonInput,
  IonButton,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonHeader,
  IonTitle,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonDatetime,
  IonText,
  IonAlert,
  isPlatform,
} from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";

import { useHistory } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

import { useTranslation } from "react-i18next";
import { useSelector } from "@app/hooks";
import moment from "moment";
import profileService from "../profile.service";
import location from "@app/mock/locations.json";
import nation from "@app/mock/nations.json";
const StyledInput = styled(IonInput)`
  color: black;
  margin-top: 2px;
  margin-left: 5px;
  --placeholder-color: #91969c;
`;
const StyledSelect = styled(IonSelect)`
  color: black;
  margin-top: 2px;
  margin-left: 5px;
  --placeholder-color: #91969c;
  ::part(icon) {
    position: absolute;
    right: 6%;
    color: #666666;
    opacity: 1;
  }
`;
const StyledButton = styled(IonButton)`
  margin-left: 20px;
  width: 300px;
  --background: #293978;
`;
const StyledLabel = styled(IonLabel)`
  font-size: 18px;
  font-weight: 700;
  color: #010100;
  padding-left: 25px;
  padding-top: 15px;
`;
const StyledIcon = styled(IonIcon)`
  font-size: 20px;
`;
const StyledDatePicker = styled(IonDatetime)`
  color: black;
  margin-top: 2px;
  margin-left: 5px;
  --placeholder-color: #91969c;
`;
const ErrorText = styled(IonText)`
  color: #f46a6a;
  margin-left: 20px;
  font-size: 15px;
`;
interface InputProps {
  name: string;
  fieldType: string;
  label?: string;
  [otherProps: string]: unknown;
}
const gender = [
  { value: true, label: "Male" },
  { value: false, label: "Female" },
];
const UpdateProfile: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { profile: data } = useSelector((s) => s.profile);
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    trigger,
    reset,
    watch,
  } = useForm();

  const [showAlert, setShowAlert] = useState(false);
  const [success, setSuccess] = useState(false);

  const formFields: InputProps[] = [
    {
      name: "id",
      fieldType: "input",
      type: "text",
      label: t("User ID"),
      placeholder: t("User ID"),
    },
    {
      name: "fullname",
      fieldType: "input",
      type: "text",
      label: t("Full name"),
      placeholder: t("Full name"),
    },
    {
      name: "gender",
      fieldType: "select",
      type: "text",
      label: t("Gender"),
      placeholder: t("Gender"),
    },
    {
      name: "dateOfBirth",
      fieldType: "date",
      type: "text",
      label: t("Date of birth"),
      placeholder: t("Date of birth"),
    },
    {
      name: "identityCard",
      fieldType: "input",
      type: "number",
      label: t("Identity card"),
      placeholder: t("Identity card"),
    },
    {
      name: "address",
      fieldType: "input",
      type: "text",
      label: t("Address"),
      placeholder: t("Address"),
    },
    {
      name: "province",
      fieldType: "select",
      type: "text",
      label: t("Province/City"),
      placeholder: t("Province/City"),
    },
    {
      name: "district",
      fieldType: "select",
      type: "text",
      label: t("District"),
      placeholder: t("District"),
    },
    {
      name: "ward",
      fieldType: "select",
      type: "text",
      label: t("Ward"),
      placeholder: t("Ward"),
    },
    {
      name: "passportNumber",
      fieldType: "input",
      type: "text",
      label: t("Passport number"),
      placeholder: t("Passport number"),
    },
    {
      name: "nation",
      fieldType: "select",
      type: "text",
      label: t("Nation"),
      placeholder: t("Nation"),
    },
  ];

  const onSubmit = async (data: any): Promise<void> => {
    try {
      await profileService.updateProfile(data);
      setSuccess(true);
      setShowAlert(true);
    } catch (error) {
      setSuccess(false);
      setShowAlert(true);
    }
  };

  useEffect(() => {
    register("fullname", {
      required: { value: true, message: t("Username not enter") },
      minLength: { value: 4, message: t("Fullname minimum is 4 characters") },
      maxLength: { value: 35, message: t("Fullname maximum is 35 characters") },
    });
    register("gender", {
      required: { value: true, message: t("gender not entered") },
    });
    register("dateOfBirth", {
      required: { value: true, message: t("date of birth not entered") },
    });
    register("address", {
      required: { value: true, message: t("address not entered") },
    });
    register("nation", {
      required: { value: true, message: t("nation name not entered") },
    });
  }, [register, t]);
  useEffect(() => {
    reset({
      ...data,
    });
  }, [data, reset]);
  return (
    <IonPage style={isPlatform('ios') ? { paddingTop: 30 } : { paddingTop: 0 }}>
      <IonHeader className="ion-margin-bottom">
        <IonItem color="light" style={{ margin: "15px 20px 0px 10px" }}>
          <StyledIcon
            icon={chevronBackOutline}
            onClick={() => history.replace("/account")}
          ></StyledIcon>
          <IonTitle style={{ fontSize: "20px", textAlign: "center" }}>
            {t("Update Profile")}
          </IonTitle>
        </IonItem>
      </IonHeader>
      <IonContent>
        <form
          onSubmit={handleSubmit((d) => onSubmit(d))}
          style={{ paddingLeft: "10px", paddingRight: "25px" }}
        >
          {formFields.map(({ label, name, fieldType, ...otherProps }) => {
            switch (fieldType) {
              case "input": {
                return (
                  <Controller
                    key={name}
                    name={name}
                    control={control}
                    rules={
                      name === "fullname"
                        ? {
                          required: {
                            value: true,
                            message: t("full name not entered"),
                          },
                          minLength: {
                            value: 4,
                            message: t("Fullname minimum is 4 characters"),
                          },
                          maxLength: {
                            value: 35,
                            message: t("Fullname maximum is 35 characters"),
                          },
                        }
                        : name === "gender"
                          ? {
                            required: {
                              value: true,
                              message: t("gender not entered"),
                            },
                          }
                          : name === "dateOfBirth"
                            ? {
                              required: {
                                value: true,
                                message: t("date of birth not entered"),
                              },
                            }
                            : name === "nation"
                              ? {
                                required: {
                                  value: true,
                                  message: t("nation name not entered"),
                                },
                              }
                              : undefined
                    }
                    render={({ field: { onChange, onBlur, value } }) => (
                      <IonRow>
                        <StyledLabel>{label}</StyledLabel>
                        <IonCol size="12">
                          <IonItem color="light">
                            <StyledInput
                              onIonBlur={(e) => {
                                trigger(name);
                              }}
                              readonly={name === "id" ? true : false}
                              value={watch(name) || undefined}
                              onIonChange={onChange}
                              {...otherProps}
                            ></StyledInput>
                          </IonItem>
                          {errors?.fullname?.message && name === "fullname" && (
                            <ErrorText color="danger">
                              {errors?.fullname?.message}
                            </ErrorText>
                          )}
                          {errors?.identityCard?.message &&
                            name === "identityCard" && (
                              <ErrorText color="danger">
                                {errors?.identityCard?.message}
                              </ErrorText>
                            )}
                          {errors?.address?.message && name === "address" && (
                            <ErrorText color="danger">
                              {errors?.address?.message}
                            </ErrorText>
                          )}
                          {errors?.nation?.message && name === "nation" && (
                            <ErrorText color="danger">
                              {errors?.nation?.message}
                            </ErrorText>
                          )}
                        </IonCol>
                      </IonRow>
                    )}
                  />
                );
              }
              case "select": {
                return (
                  <Controller
                    key={name}
                    name={name}
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <IonRow>
                        <StyledLabel>{label}</StyledLabel>
                        <IonCol size="12">
                          <IonItem color="light">
                            <StyledSelect
                              cancelText={t("Cancel")}
                              okText={t("Okay")}
                              onIonBlur={() => {
                                trigger(name);
                              }}
                              value={watch(name)}
                              onIonChange={onChange}
                            >
                              {name === "province"
                                ? location.map((lo) => (
                                  <IonSelectOption
                                    key={lo.value}
                                    value={lo.value}
                                  >
                                    {lo.label}
                                  </IonSelectOption>
                                ))
                                : name === "district"
                                  ? Boolean(
                                    location.find(
                                      (lo) => lo.value === watch("province")
                                    )
                                  ) === true
                                    ? location
                                      .filter(
                                        (lo) => lo.value === watch("province")
                                      )[0]
                                      .districts.map((districts) => (
                                        <IonSelectOption
                                          key={districts.value}
                                          value={districts.value}
                                        >
                                          {districts.label}
                                        </IonSelectOption>
                                      ))
                                    : ""
                                  : name === "ward"
                                    ? Boolean(
                                      location.find(
                                        (lo) => lo.value === watch("province")
                                      )
                                    ) === true &&
                                      location
                                        .filter(
                                          (lo) => lo.value === watch("province")
                                        )[0]
                                        .districts.filter(
                                          (dis) => dis.value === watch("district")
                                        )[0] !== undefined
                                      ? location
                                        .filter(
                                          (lo) => lo.value === watch("province")
                                        )[0]
                                        .districts.filter(
                                          (dis) => dis.value === watch("district")
                                        )[0]
                                        .wards.map((ward) => (
                                          <IonSelectOption
                                            key={ward.value}
                                            value={ward.value}
                                          >
                                            {ward.label}
                                          </IonSelectOption>
                                        ))
                                      : ""
                                    : name === "nation"
                                      ? nation.map((na) => (
                                        <IonSelectOption
                                          key={na.countryCode}
                                          value={na.countryCode}
                                        >
                                          {na.name}
                                        </IonSelectOption>
                                      ))
                                      : gender.map((i, idx) => (
                                        <IonSelectOption key={idx} value={i.value}>
                                          {t(i.label)}
                                        </IonSelectOption>
                                      ))}
                            </StyledSelect>
                          </IonItem>
                          {errors?.gender?.message && name === "gender" && (
                            <ErrorText color="danger">
                              {errors?.gender?.message}
                            </ErrorText>
                          )}
                        </IonCol>
                      </IonRow>
                    )}
                  />
                );
              }
              case "date": {
                return (
                  <Controller
                    key={name}
                    name={name}
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <IonRow>
                        <StyledLabel>{label}</StyledLabel>
                        <IonCol size="12">
                          <IonItem color="light">
                            <StyledDatePicker
                              cancelText={t("Cancel")}
                              doneText={t("Okay")}
                              pickerFormat="DDDDD MMMM YYYY"
                              placeholder={t("day/month/year")}
                              displayFormat="MM/DD/YYYY"
                              min="1900-01-01"
                              max={moment().format("YYYY-MM-DD")}
                              onIonBlur={onBlur}
                              value={
                                watch(name) || moment().format("MM/DD/YYYY")
                              }
                              onIonChange={onChange}
                              {...otherProps}
                            ></StyledDatePicker>
                          </IonItem>
                        </IonCol>
                      </IonRow>
                    )}
                  />
                );
              }
              default: {
                return (
                  <Controller
                    key={name}
                    name={name}
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <IonRow className="ion-justify-content-center">
                        <IonCol size="12">
                          <IonItem color="light">
                            <StyledInput
                              onIonBlur={onBlur}
                              value={value}
                              onIonChange={(event: any) => {
                                onChange(event);
                              }}
                            ></StyledInput>
                          </IonItem>
                        </IonCol>
                      </IonRow>
                    )}
                  />
                );
              }
            }
          })}
          <IonRow className="ion-justify-content-center">
            <IonCol size="12">
              <div style={{ textAlign: "center", marginTop: "50px" }}>
                <StyledButton type="submit">{t("Update")}</StyledButton>
              </div>
            </IonCol>
          </IonRow>
        </form>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          cssClass="my-custom-class"
          header={success ? t("Success!") : t("Failed!")}
          message={
            success
              ? t("Update profile successfully")
              : t("Update profile failed")
          }
          buttons={[
            {
              text: t("Back to account"),
              handler: () => {
                setTimeout(() => {
                  history.replace("/account");
                }, 0);
              },
            },
            {
              text: t("Close"),
              role: "cancel",
              cssClass: "secondary",
              handler: () => {
                setShowAlert(false);
              },
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default UpdateProfile;
