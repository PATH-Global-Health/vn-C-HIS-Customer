import React from "react";
import styled from "styled-components";
import {
  IonCard,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonTitle,
  isPlatform,
} from "@ionic/react";
import {
  searchOutline,
  calendarOutline,
  alarmOutline,
  chevronBackOutline,
  peopleCircleSharp,
} from "ionicons/icons";

import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { setHandeRisk } from "risk/QuestionTemplate/question-template.slice";

const Wrapper = styled(IonRow)`
  margin-left: 11%;
  margin-top: 5%;
`;
const Card = styled(IonCard)`
  height: 115px;
  background-color: blue;
  margin-inline: 0 !important;
  width: 75%;
`;
const CardIcon = styled(IonIcon)`
  font-size: 20px;
  color: black;
  background-color: white;
  margin: 10px 0px 5px 10px;
  padding: 8px 8px;
  border-radius: 10px;
  align-item: center;
`;
const CardLabel = styled(IonLabel)`
  @media (max-width: 380px) {
    font-size: 17px !important;
  }
  margin: 0px 0px 10px 6px;
  font-size: 20px;
  font-weight: 300;
  color: white;
  position: absolute;
  left: 5%;
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

const CustomerService: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  interface OptionProps {
    icon: string;
    label: string;
    color: string;
    [otherProps: string]: unknown;
  }
  const optionFields: OptionProps[] = [
    {
      name: "booking",
      icon: calendarOutline,
      label: t("Service"),
      color: "#4c8dff",
    },
    {
      name: "examinationList",
      icon: alarmOutline,
      label: t("Schedule"),
      color: "#409f4e",
    },
    {
      name: "risk",
      icon: searchOutline,
      label: t("Risk assessment"),
      color: "#f1c248",
    },

    {
      name: "doctorList",
      icon: peopleCircleSharp,
      label: t("CBO support"),
      color: "#EB5757",
    },
  ];
  const handleTypeService = (name: string) => {
    name === "booking"
      ? history.replace("/shomeBooking")
      : name === "examinationList"
      ? history.replace("/examinationList")
      : name === "risk"
      ? history.replace("/risk")
      : name === "doctorList"
      ? history.replace("/doctorList")
      : RedirectRiskPage();
  };
  const RedirectRiskPage = () => {
    history.replace("/home");
    dispatch(setHandeRisk({ type: undefined }));
  };
  return (
    <IonPage style={isPlatform("ios") ? { paddingTop: 40 } : { paddingTop: 0 }}>
      <IonContent>
        <Header>
          <IonHeader className="header">
            <IonItem color="light" onClick={() => history.replace("/home")}>
              <IonIcon icon={chevronBackOutline} color="dark"></IonIcon>
              <IonTitle className="title">{t("Your service")}</IonTitle>
            </IonItem>
          </IonHeader>
        </Header>
        <Wrapper>
          {optionFields.map(({ name, icon, label, color, note }, idx) => {
            return (
              <IonCol size="6" key={idx}>
                <Card
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    handleTypeService(name + "");
                  }}
                >
                  <div>
                    <CardIcon icon={icon} slot="start" />
                  </div>
                  <CardLabel>{label}</CardLabel>
                </Card>
              </IonCol>
            );
          })}
        </Wrapper>
      </IonContent>
    </IonPage>
  );
};

export default CustomerService;
