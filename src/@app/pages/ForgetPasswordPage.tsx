import React from "react";
import styled from "styled-components";

import { useHistory } from "react-router-dom";

import {
  chevronBackOutline,
  mailOutline,
  phonePortraitOutline,
  informationCircleOutline,
} from "ionicons/icons";

import {
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonPage,
  IonRow,
  IonTitle,
  isPlatform,
} from "@ionic/react";
import MethodCard, {
  MethodField,
} from "@app/components/forgot-password/method/MethodCard";
import MessageMethod from "@app/components/forgot-password/method/MessageMethod";
import { useDispatch, useSelector } from "@app/hooks";
import { setDataForgotPassword } from "@app/slices/auth";
import CreatePassword from "@app/components/forgot-password/create-password/CreatePassword";
import MailMethod from "@app/components/forgot-password/method/MailMethod";
import ConfirmOTP from "@app/components/forgot-password/create-password/ConfirmOTP";
import { useTranslation } from "react-i18next";
import SecurityQuestionMehod from "@app/components/forgot-password/method/SecurityQuestionMethod";
const StyledText = styled.div`
  color: black;
  text-align: center;
  font-size: 30px;
  font-weight: 600;
  margin: 30px 15px;
`;

const StyledIcon = styled(IonIcon)`
  font-size: 20px;
`;

const ForgetPassword: React.FC = () => {
  const { t } = useTranslation();
  const {
    forgotPasswordData: { method },
  } = useSelector((state) => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();
  const methodField: MethodField[] = [
    {
      name: "message",
      icon: phonePortraitOutline,
      color: "rgb(91 153 255)",
      label: "SMS",
      content: "",
    },
    {
      name: "mail",
      icon: mailOutline,
      color: "rgb(91 153 255)",
      label: "GMAIL",
      content: "",
    },
    {
      name: "question",
      icon: informationCircleOutline,
      color: "rgb(91 153 255)",
      label: t("Select security question"),
      content: t("Date of birth"),
    },
  ];
  const back = () => {
    if (method === undefined) {
      history.replace("/login");
    } else {
      dispatch(setDataForgotPassword({}));
    }
  };

  return (
    <IonPage style={isPlatform("ios") ? { paddingTop: 30 } : { paddingTop: 0 }}>
      <IonHeader className="ion-margin-bottom">
        <IonItem color="light" style={{ margin: "15px 20px 0px 10px" }}>
          <StyledIcon
            icon={chevronBackOutline}
            onClick={() => back()}
          ></StyledIcon>
          <IonTitle style={{ fontSize: "15px", textAlign: "center" }}>
            {t("Forgot password")}
          </IonTitle>
        </IonItem>
      </IonHeader>
      <IonContent>
        {/* <IonHeader className="ion-margin-bottom">
          <IonItem color="light" onClick={() => back()}>
            <IonIcon icon={chevronBackOutline} color="dark"></IonIcon>
          </IonItem>
        </IonHeader> */}
        {method !== undefined || (
          <div>
            <IonRow className="ion-justify-content-center">
              <IonCol size="12">
                <StyledText>{t("Choose password recovery method")}</StyledText>
              </IonCol>
            </IonRow>
            <MethodCard methods={methodField} />
          </div>
        )}
        {method === "question" && <SecurityQuestionMehod />}
        {method === "message" && <MessageMethod />}
        {method === "mail" && <MailMethod />}
        {method === "confirmed" && <CreatePassword />}
        {method === "confirmSmsOTP" && <ConfirmOTP />}
        {method === "confirmEmailOTP" && <ConfirmOTP />}
      </IonContent>
    </IonPage>
  );
};

export default ForgetPassword;
