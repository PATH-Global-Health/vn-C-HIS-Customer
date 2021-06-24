import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonText,
  IonCardHeader,
  IonCardSubtitle,
  IonGrid,
  IonRow,
  IonCol,
  IonAvatar,
} from "@ionic/react";
import styled from "styled-components";
import { useDispatch, useSelector } from "@app/hooks";
import { useHistory } from "react-router-dom";
import {
  arrowBack,
  person,
  mail,
  call,
  medkit,
} from "ionicons/icons";
import { useTranslation } from "react-i18next";
import { getExaminationList } from "../slices/workingCalendar";
import moment from "moment";
import styles from "../css/examinationList.module.css";


const StyledIconRight = styled(IonIcon)`
   {
    color: #b3b3b3;
    right: -9px;
    position: absolute;
  }
`;

const StyledLabelHeader = styled(IonLabel)`
   {
    font-weight: bold;
    font-size: 23px;
  }
`;

const StyledButtonHeader = styled(IonButton)`
   {
    --background: white;
    left: 10px;
    position: absolute;
  }
`;

const StyledContent = styled(IonContent)`
   {
    text-align: center;
  }
`;

const ExaminationList: React.FC = () => {
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const examinationList = useSelector((w) => w.workingCaledar.examinationList);
  const [showDetail,setSowdetail] = useState(false);

  useEffect(() => {
    dispatch(getExaminationList());
  }, [dispatch]);
  return (
    <IonPage className={styles.styledPage}>
      <IonHeader className={styles.header}>
        <button className={styles.btnCustomHeader} onClick={() => history.goBack()}>
          <IonIcon className={styles.iconLeft} icon={arrowBack}></IonIcon>
        </button>
        <StyledLabelHeader>{t("Examination List")} </StyledLabelHeader>
      </IonHeader>
      <IonContent>
        {examinationList.data.map((e,index) => (
          <IonCard className={styles.customCard} key={index}>
            <IonCardHeader className={styles.cardHeader}>
              <IonCardSubtitle className={styles.customSubtitleCard}>
                {moment(e.date).format("DD-MM-YYYY")} | {e.interval.from}
              </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <IonGrid>
                <IonRow>
                  <IonCol size="4">
                    <IonAvatar>
                      <img
                        src={`http://202.78.227.94:30111/api/Hospitals/Logo/${e.unit.id}`}
                      />
                    </IonAvatar>
                  </IonCol>
                  <IonCol size="8">
                    <IonText className={styles.customText}>
                      <IonIcon icon={person} className={styles.customIcon} />
                      <h4>{e.customer.fullname} </h4>
                    </IonText>

                    <IonText className={styles.customText}>
                      <IonIcon icon={mail} className={styles.customIcon} />
                      <h5>
                        {e.customer.email.length > 15
                          ? e.customer.email.substring(0, 15) + "..."
                          : e.customer.email}
                      </h5>
                    </IonText>
                    <IonText className={styles.customText}>
                      <IonIcon icon={call} className={styles.customIcon} />
                      <h5>{e.customer.phone}</h5>
                    </IonText>
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol size="4">{e.unit.name}</IonCol>
                  <IonCol size="8">
                    <IonText className={styles.customText}>
                      <IonIcon icon={medkit} className={styles.customIcon} />
                      <h2>{e.service.name}</h2>
                    </IonText>
                  </IonCol>                  
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default ExaminationList;