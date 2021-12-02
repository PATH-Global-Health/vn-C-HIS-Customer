import React, { useCallback, useEffect, useState } from "react";

import styled from "styled-components";

import {
  IonIcon,
  IonContent,
  IonInput,
  IonButton,
  IonRow,
  IonCol,
  IonToast,
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
  IonModal,
  IonRadioGroup,
  IonRadio,
  isPlatform,
} from "@ionic/react";
import { chevronBackOutline, watch } from "ionicons/icons";

import { useHistory } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "@app/hooks";
import { getQuestions } from "../security-question.slice";
import securityQuestionService from "../security-question.service";

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
const ErrorText = styled(IonText)`
  color: #f46a6a;
  margin-left: 20px;
  font-size: 15px;
`;
const StyledAlertForm = styled(IonAlert)`
  --color: #ff0000 !important;
  --background: red !important;
  .pass {
    color: black !important;
  }
`;
const WrapperQuestion = styled(IonRow)`
  position: absolute !important;
  top: 8%;
  ion-label {
    --color: black !important;
  }
  ion-item {
    color: black;
    --background: white;
    --border-style: none;
  }
  & .label {
    font-size: 17px;
  }
`;
const Header = styled.div`
  & .header {
    margin-left: -10px;
    height: 40px;
  }
  & .title {
    font-weight: 600;
    text-align: center;
    margin: 10px 0px !important;
  }
`;
const CreateModal: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    trigger,
    getValues,
    setValue,
    watch,
  } = useForm();
  const [showAlert, setShowAlert] = useState(false);
  const [modalQuestion, setModalQuestion] = useState<boolean>(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showFailedToast, setShowFailedToast] = useState(false);
  const onSubmit = async (data: any): Promise<void> => {
    const { question, answer, password } = getValues();
    let param = {
      password: password,
      questionAnswer: {
        id: question.id,
        answer: answer,
      },
    };
    try {
      await securityQuestionService.ChangeSecurityQuestionAnswer(param);
      setShowSuccessToast(true);
      setTimeout(() => history.replace("/account"), 1500);
    } catch (error) {
      setShowFailedToast(true);
    }
  };
  const { data } = useSelector((s) => s.securityQuestion.questions);
  const getData = useCallback(() => {
    dispatch(getQuestions());
  }, [dispatch]);
  useEffect(getData, [getData]);
  useEffect(() => {
    register("question", {
      required: { value: true, message: t("Question not selected") },
    });
    register("password", {
      required: { value: true, message: t("Password not selected") },
    });
    register("answer", {
      required: { value: true, message: t("Answer not entered") },
    });
  }, [register, t]);
  return (
    <IonPage style={isPlatform('ios') ? { paddingTop: 40 } : { paddingTop: 0 }}>
      <IonHeader className="ion-margin-bottom">
        <IonItem color="light" style={{ margin: "15px 20px 0px 10px" }}>
          <StyledIcon
            icon={chevronBackOutline}
            onClick={() => history.replace("/account")}
          ></StyledIcon>
          <IonTitle style={{ fontSize: "20px", textAlign: "center" }}>
            {t("Security Setting")}
          </IonTitle>
        </IonItem>
      </IonHeader>
      <IonContent>
        <IonToast
          isOpen={showSuccessToast}
          onDidDismiss={() => setShowSuccessToast(false)}
          color="success"
          message={t("Setting secutiry successfully")}
          duration={1000}
          position="top"
          animated={true}
        />
        <IonToast
          isOpen={showFailedToast}
          onDidDismiss={() => setShowFailedToast(false)}
          color="danger"
          message={t("Setting secutiry failed")}
          duration={1000}
          position="top"
          animated={true}
        />

        <form
          onSubmit={handleSubmit((d) => onSubmit(d))}
          style={{ paddingLeft: "10px", paddingRight: "25px" }}
        >
          <Controller
            key={"question"}
            name={"question"}
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <IonRow>
                <StyledLabel>{t("Select security question")}</StyledLabel>
                <IonCol size="12">
                  <IonItem color="light">
                    <StyledInput
                      onIonBlur={() => {
                        trigger("question");
                      }}
                      value={watch("question")?.id ?? ""}
                      onClick={() => setModalQuestion(true)}
                    >
                      {getValues("question")?.question}
                    </StyledInput>
                  </IonItem>
                  {!getValues("question") && (
                    <ErrorText color="danger">
                      {errors?.question?.message}
                    </ErrorText>
                  )}
                </IonCol>
              </IonRow>
            )}
          />
          <Controller
            key={"answer"}
            name={"answer"}
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <IonRow>
                <StyledLabel>{t("Answer")} :</StyledLabel>
                <IonCol size="12">
                  <IonItem color="light">
                    <StyledInput
                      onIonBlur={() => {
                        trigger("answer");
                      }}
                      onIonChange={onChange}
                    ></StyledInput>
                  </IonItem>
                  {errors?.answer?.message && (
                    <ErrorText color="danger">
                      {errors?.answer?.message}
                    </ErrorText>
                  )}
                </IonCol>
              </IonRow>
            )}
          />
          <StyledAlertForm
            isOpen={showAlert}
            onDidDismiss={() => setShowAlert(false)}
            cssClass="my-custom-class"
            header={t("Enter password")}
            inputs={[
              {
                name: "password",
                type: "password",
                placeholder: t("Password"),
                cssClass: "pass",
                attributes: {
                  minlength: 8,
                  inputmode: "decimal",
                },
              },
            ]}
            buttons={[
              {
                text: t("Cancel"),
                role: "cancel",
                cssClass: "secondary",
                handler: () => {
                  console.log("Confirm Cancel");
                },
              },
              {
                text: t("Confirm"),
                handler: (data) => {
                  setValue("password", data.password);
                  onSubmit(data.password);
                },
              },
            ]}
          />
          <IonRow className="ion-justify-content-center">
            <IonCol size="12">
              <div style={{ textAlign: "center", marginTop: "50px" }}>
                <StyledButton onClick={() => setShowAlert(true)}>
                  {t("Save change")}
                </StyledButton>
              </div>
            </IonCol>
          </IonRow>
        </form>

        <IonModal isOpen={modalQuestion}>
          <Header>
            <IonHeader className="header">
              <IonItem color="light" onClick={() => setModalQuestion(false)}>
                <IonIcon icon={chevronBackOutline} color="dark"></IonIcon>
                <IonTitle className="title">
                  {t("Select security question")}
                </IonTitle>
              </IonItem>
            </IonHeader>
          </Header>
          <WrapperQuestion>
            <IonCol size="12">
              <IonItem color="light" lines="inset" className="group-item">
                <IonRadioGroup
                  onIonChange={(e) => {
                    setValue("question", e.detail?.value);
                    setModalQuestion(false);
                  }}
                >
                  {(data || []).map((item) => (
                    <IonItem key={item?.id}>
                      <div className="label">{item?.question ?? ""}</div>
                      <IonRadio slot="start" value={item} />
                    </IonItem>
                  ))}
                </IonRadioGroup>
              </IonItem>
            </IonCol>
          </WrapperQuestion>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default CreateModal;
