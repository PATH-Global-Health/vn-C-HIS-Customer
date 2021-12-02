import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import {
  IonCard,
  IonCardHeader,
  IonCol,
  IonContent,
  IonIcon,
  IonItem,
  IonNote,
  IonRow,
  useIonViewWillEnter,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonSpinner,
  IonHeader,
  IonTitle,
  IonButton,
  IonPage,
  isPlatform,
} from "@ionic/react";
import { chevronBackOutline, eyedropOutline } from "ionicons/icons";
import { useDispatch, useSelector } from "@app/hooks";
import moment from "moment";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";
import { getLaytests, setLaytestDetail } from "laytest/laytest.slice";
import { getUserInfo } from "@app/slices/auth";

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
const ChildCard = styled(IonRow)`
  position: relative;
  ion-item {
    border: 0.5px solid #d5c9c9;
    box-shadow: 1px 2px 2px 0px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    margin: 5px 10px 5px 0px;
    min-width: 100%;
    min-height: 70px;
    background-color: white;
  }
  ion-card {
    width: 100%;
    min-height: 200px;
    border-radius: 5px;
    background-color: white;
    padding: 0;
    margin: 15px 15px 0px 15px;
  }
  img {
    max-width: 140px;
    border-radius: 5px;
    margin: 0px 0px 0px -10px;
    padding: 0;
  }
  ion-icon {
    position: absolute;
    left: 5%;
    margin: 25px 30px 15px 0px;
    padding: 8px 8px;
    font-size: 20px;
    border-radius: 10px;
    color: white;
    align-item: center;
  }
  ion-card-header {
    position: absolute;
    left: 15%;
  }
  .main-title {
    color: #da0011;
    font-size: 23px;
    font-family: system-ui;
  }
  .main-card {
    margin-top: 5px;
    font-size: 13px;
    color: #000000;
    display: block;
    font-family: system-ui;
  }
  .note {
    font-weight: 700;
  }
  & .btn {
    font-size: 13px;
    text-transform: capitalize;
    position: absolute !important;
    width: 140px !important;
    height: 40px !important;
    margin: -10px 15px !important;
    right: 0px !important;
    bottom: 10%;
    --background: #293978;
    --border-radius: 5px;
  }
`;
const CustomerLaytest: React.FC = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const customerUserName = useSelector(
    (s) => s.auth.userInfo?.data.userInfo.username
  );
  const { data } = useSelector((s) => s.laytest.laytestList);

  async function fetchData() {
    setTimeout(() => {
      setPageSize(pageSize + 5);
      setLoading(false);
    }, 500);
  }
  useIonViewWillEnter(async () => {
    await fetchData();
  });

  async function searchNext($event: CustomEvent<void>) {
    await fetchData();
    setLoading(true);
    ($event.target as HTMLIonInfiniteScrollElement).complete();
  }
  const getData = useCallback(() => {
    if (customerUserName) {
      dispatch(
        getLaytests({
          username: customerUserName,
          pageIndex,
          pageSize,
        })
      );
    }
  }, [customerUserName, pageIndex, pageSize, dispatch]);
  const getUserData = useCallback(() => {
    dispatch(getUserInfo());
  }, [dispatch]);
  useEffect(getUserData, [getUserData]);
  useEffect(getData, [getData]);
  return (
    <IonPage style={isPlatform("ios") ? { paddingTop: 40 } : { paddingTop: 0 }}>
      <IonContent>
        <Header>
          <IonHeader className="header">
            <IonItem color="light" onClick={() => history.replace("/home")}>
              <IonIcon icon={chevronBackOutline} color="dark"></IonIcon>
              <IonTitle className="title">{t("Laytest result")}</IonTitle>
            </IonItem>
          </IonHeader>
        </Header>
        {(data || []).map((o, idx) => (
          <div
            key={idx}
            onClick={() => {
              // dispatch(getPostDetail({ postId: p.id }));
            }}
          >
            <IonRow
              className="ion-justify-content-center"
              style={{ cursor: "pointer" }}
            >
              <IonCol size="12">
                <ChildCard className="card_width">
                  <IonCard color="light" className="item-content">
                    <IonIcon
                      icon={eyedropOutline}
                      style={{ backgroundColor: "#f77070" }}
                    ></IonIcon>
                    <IonCardHeader>
                      <b className="main-title">{t("Laytest result")}</b>
                      <span></span>
                      <IonNote className="main-card">{`${t("Laytest code")}: ${
                        o?.result?.code ?? "..."
                      }`}</IonNote>
                      <IonNote className="main-card">{`${t("Test date")}: ${
                        moment(o?.dateCreate).format("MM/DD/YYYY") ?? "..."
                      }`}</IonNote>
                      <IonNote className="main-card">{`${t("Result date")}: ${
                        o?.result?.resultDate
                          ? moment(o?.result?.resultDate).format("MM/DD/YYYY")
                          : "..."
                      }`}</IonNote>
                      <IonNote className="main-card note">{`${t(
                        "Test result"
                      )}: ${o?.result?.resultTesting ?? "..."}`}</IonNote>
                    </IonCardHeader>
                    <IonButton
                      onClick={() => {
                        dispatch(setLaytestDetail({ data: o }));
                        history.replace("/update-laytest");
                      }}
                      className="btn"
                    >
                      {t("Update result")}
                    </IonButton>
                  </IonCard>
                </ChildCard>
              </IonCol>
            </IonRow>
          </div>
        ))}
        <div>
          <IonInfiniteScroll
            threshold="100px"
            onIonInfinite={(e: CustomEvent<void>) => searchNext(e)}
          >
            <IonInfiniteScrollContent
              loadingSpinner="bubbles"
              loadingText="Loading more data..."
            >
              {loading ? (
                <IonSpinner
                  name="bubbles"
                  color="primary"
                  style={{ left: "50%" }}
                ></IonSpinner>
              ) : null}
            </IonInfiniteScrollContent>
          </IonInfiniteScroll>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CustomerLaytest;
