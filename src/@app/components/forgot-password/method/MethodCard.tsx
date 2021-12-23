import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import {
  IonRow,
  IonCol,
  IonIcon,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonModal,
  IonRadioGroup,
  IonRadio,
  IonHeader,
  IonTitle,
  IonPage,
  isPlatform,
} from "@ionic/react";
import { useDispatch, useSelector } from "@app/hooks";
import { setDataForgotPassword } from "@app/slices/auth";
import {
  getQuestionDetail,
  getQuestions,
} from "account/security-question/security-question.slice";
import { chevronBackOutline } from "ionicons/icons";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

export interface MethodField {
  name: string;
  icon: string;
  color: string;
  label: string;
  content: string;
  [key: string]: unknown;
}

interface Props {
  methods: MethodField[];
}

const StyledItem = styled(IonItem)`
  margin: 15px 15px;
  border: 1px solid #b3aeae;
  border-radius: 10px;
  --min-height: 40px;
`;
const StyledLabel = styled(IonLabel)`
  font-size: 35px;
  font-weight: 50;
  margin-bottom: 15px;
`;
const StyledIcon = styled(IonIcon)`
  margin: 20px 40px 20px 0px;
  padding: 10px 12px;
  font-size: 35px;
  border-radius: 10px;
  color: white;
  align-item: center;
`;
const StyledSelect = styled(IonSelect)`
  color: black;
  margin-top: 2px;
  margin-left: 5px;
  --placeholder-color: #91969c;
`;
const WrapperQuestion = styled(IonRow)`
  position: absolute !important;
  top: 10%;
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
    font-size: 23px;
    font-weight: 600;
    text-align: center;
    // margin: 10px 0px !important;
  }
`;
const MethodCard: React.FC<Props> = ({ methods }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [modalQuestion, setModalQuestion] = useState<boolean>(false);
  const handeChange = useCallback(
    (method: string) => {
      dispatch(setDataForgotPassword({ method }));
    },
    [dispatch]
  );
  const handeSecurityQuestion = useCallback(
    (id: string) => {
      dispatch(getQuestionDetail({ id }));
      dispatch(setDataForgotPassword({ method: "question" }));
    },
    [dispatch]
  );
  const { data } = useSelector((s) => s.securityQuestion.questions);
  const getData = useCallback(() => {
    dispatch(getQuestions());
  }, [dispatch]);
  useEffect(getData, [getData]);
  return (
    <>
      {(methods || []).map(({ name, icon, color, label, content }, index) => (
        <div key={index}>
          {name === "question" ? (
            <IonRow>
              <IonCol size="12">
                <StyledItem
                  color="light"
                  onClick={() => setModalQuestion(true)}
                >
                  <StyledIcon
                    icon={icon}
                    style={{ backgroundColor: color, minWidth: "35px" }}
                  />
                  <div
                    style={{
                      fontSize: "19px",
                      fontWeight: 50,
                      minWidth: "200px",
                    }}
                  >
                    <b>{label}</b>
                    <br />
                  </div>
                </StyledItem>
              </IonCol>
            </IonRow>
          ) : (
            <IonRow key={index}>
              <IonCol size="12">
                <StyledItem color="light" onClick={() => handeChange(name)}>
                  <StyledIcon icon={icon} style={{ backgroundColor: color }} />
                  <StyledLabel style={{ fontSize: "18px" }}>
                    <b>{label}</b>
                    <br />
                    {content}
                  </StyledLabel>
                </StyledItem>
              </IonCol>
            </IonRow>
          )}
        </div>
      ))}
      <IonModal isOpen={modalQuestion}>
        <IonPage
          style={isPlatform("ios") ? { paddingTop: 30 } : { paddingTop: 0 }}
        >
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
                  onIonChange={(e) => handeSecurityQuestion(e.detail?.value)}
                >
                  {(data || []).map((item) => (
                    <IonItem key={item?.id}>
                      <div className="label">{item?.question ?? ""}</div>
                      <IonRadio slot="start" value={item?.id} />
                    </IonItem>
                  ))}
                </IonRadioGroup>
              </IonItem>
            </IonCol>
          </WrapperQuestion>
        </IonPage>
      </IonModal>
    </>
  );
};

export default MethodCard;
