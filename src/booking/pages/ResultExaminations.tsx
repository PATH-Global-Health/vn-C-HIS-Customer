import React, { useEffect, useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonSearchbar,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonModal,
  IonSpinner,
} from "@ionic/react";
import { useDispatch, useSelector } from "@app/hooks";
import { useHistory } from "react-router-dom";
import {
  search,
  analytics,
  chatbubbles,
  help,
  checkmark,
  download,
  downloadOutline,
  cloudDownloadOutline,
} from "ionicons/icons";
import { useTranslation } from "react-i18next";
import { getExaminationList } from "../slices/workingCalendar";
import moment from "moment";
import styles from "../css/resultExaminations.module.css";
import classNames from "classnames/bind";
import { deburr } from "../../@app/utils/helpers";
import examinationService from "../services/examinations";
import styled from "styled-components";
import { Rating } from "react-simple-star-rating";
import bookingServices from "booking/services";
import examinationServices from "../services/examinations";

const ResultExaminations: React.FC = () => {
  const [searchInput, setSearchInput] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("test");
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const examinationList = useSelector((w) => w.workingCaledar.examinationList);
  const loading = useSelector((b) => b.workingCaledar.loading);
  const [nameSearch, setNameSearch] = useState("");
  var cx = classNames.bind(styles);

  const resultList = examinationList.data.filter((e) => e.status === 6);
  const resultListTesting = examinationList.data.filter(
    (e) =>
      e.status === 6 &&
      e?.service?.id === "f2490f62-1d28-4edd-362a-08d8a7232229"
  );
  const resultListAdvise = examinationList.data.filter(
    (e) =>
      e.status === 6 &&
      e?.service?.id === "9f9e8dd3-890e-4ae5-2952-08d92b03ae12"
  );
  const resultListSearch = resultList.filter((e) =>
    deburr(
      e?.service?.name +
        e?.unit?.name! +
        e.unit?.address +
        e.date +
        e?.interval?.from
    ).includes(deburr(nameSearch))
  );
  const [cancelExamId, setCancelExamId] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    dispatch(getExaminationList());
  }, [dispatch]);
  return loading === true ? (
    <IonSpinner
      name="bubbles"
      color="primary"
      style={{ left: "50%", top: "50%" }}
    ></IonSpinner>
  ) : (
    <IonPage className={styles.styledPage}>
      {searchInput === false ? (
        <IonHeader className={styles.header}>
          <IonLabel className={styles.headerLabel}>
            {t("Result information")}{" "}
          </IonLabel>
          <IonIcon
            onClick={() => setSearchInput(true)}
            className={styles.iconRight}
            icon={search}
          ></IonIcon>
          <ul className={styles.styledMenu}>
            <li
              className={cx({ styledLiSelected: selectedMenu === "test" })}
              onClick={() => setSelectedMenu("test")}
            >
              {t("Test")}
            </li>
            <li
              className={cx({ styledLiSelected: selectedMenu === "advise" })}
              onClick={() => setSelectedMenu("advise")}
            >
              {t("Advise")}
            </li>
          </ul>
        </IonHeader>
      ) : (
        <div className={styles.headerSearch}>
          <IonSearchbar
            onIonChange={(e) => setNameSearch(e.detail.value!)}
            placeholder={t("Search")}
            className={styles.searchBar}
          ></IonSearchbar>
          <button
            onClick={() => setSearchInput(false)}
            className={styles.cancelSearch}
          >
            Cancel
          </button>
        </div>
      )}
      <IonContent className={styles.content}>
        {searchInput === true ? (
          <>
            <IonLabel className={styles.styledLabel}>
              {t("Your upcoming appointments")}
            </IonLabel>
            {resultListSearch.map((e) => (
              <div className={styles.styledCardDiv}>
                <IonCard
                  onClick={() => {
                    history.push({
                      pathname: "/examinationResultInfo",
                      state: e.id,
                    });
                  }}
                  className={cx("styledCardAids", {
                    styledCardBlood:
                      e?.service?.id === "f2490f62-1d28-4edd-362a-08d8a7232229",
                    styledCardNegative:
                      e.result === "Âm tính" &&
                      e?.service?.id === "f2490f62-1d28-4edd-362a-08d8a7232229",
                    styledCardAdvise:
                      e?.service?.id === "9f9e8dd3-890e-4ae5-2952-08d92b03ae12",
                  })}
                >
                  <div
                    className={cx("styledDivIconBlood", {
                      styledDivIconAids:
                        e?.service?.id !==
                        "f2490f62-1d28-4edd-362a-08d8a7232229",
                    })}
                  >
                    <IonIcon
                      className={styles.styledIcon}
                      icon={
                        e?.service?.id ===
                        "f2490f62-1d28-4edd-362a-08d8a7232229"
                          ? analytics
                          : chatbubbles
                      }
                    ></IonIcon>
                  </div>
                  <IonCardHeader
                    className={cx("styledCardHeader", {
                      styledCardHeaderBlood:
                        e?.service?.id ===
                        "f2490f62-1d28-4edd-362a-08d8a7232229",
                    })}
                  >
                    <IonCardTitle
                      className={cx("styledCardTitleBlood", {
                        styledCardTitleBlood:
                          e?.service?.id ===
                          "f2490f62-1d28-4edd-362a-08d8a7232229",
                      })}
                    >
                      {e?.service?.name}
                    </IonCardTitle>
                    <IonCardSubtitle
                      className={cx("styledSubtitleBlood", {
                        styledSubtitleBlood:
                          e?.service?.id ===
                          "f2490f62-1d28-4edd-362a-08d8a7232229",
                      })}
                    >
                      Vào lúc {e?.interval?.from},{" "}
                      {moment(e.date).format("DD-MM-YYYY")}
                    </IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent
                    className={cx("styledCardContentBlood", {
                      styledCardContentBlood:
                        e?.service?.id ===
                        "f2490f62-1d28-4edd-362a-08d8a7232229",
                    })}
                  >
                    <p>{e?.unit?.name}</p>
                    <p>{e?.unit?.address}</p>
                  </IonCardContent>
                </IonCard>
                <button
                  onClick={() => {
                    examinationServices.downloadResultFile(e?.id!);
                  }}
                  className={styles.btnCancelCard}
                >
                  <IonIcon
                    style={{ fontSize: "25px" }}
                    icon={cloudDownloadOutline}
                  />
                </button>
              </div>
            ))}
          </>
        ) : (
          <>
            {selectedMenu === "test" ? (
              <div className={styles.styledDivUpcoming}>
                {resultListTesting.map((e) => (
                  <div className={styles.styledCardDiv}>
                    <IonCard
                      onClick={() => {
                        history.push({
                          pathname: "/examinationResultInfo",
                          state: e.id,
                        });
                      }}
                      className={cx("styledCardAids", {
                        styledCardNegative: e.result === "Âm tính",
                      })}
                    >
                      <div
                        className={cx("styledDivIconBlood", {
                          styledDivIconAids:
                            e?.service?.id !==
                            "f2490f62-1d28-4edd-362a-08d8a7232229",
                        })}
                      >
                        <IonIcon
                          className={styles.styledIcon}
                          icon={
                            e?.service?.id ===
                            "f2490f62-1d28-4edd-362a-08d8a7232229"
                              ? analytics
                              : chatbubbles
                          }
                        ></IonIcon>
                      </div>
                      <IonCardHeader
                        className={cx(
                          // 'styledCardHeader',
                          {
                            styledCardHeaderBlood:
                              e?.service?.id ===
                              "f2490f62-1d28-4edd-362a-08d8a7232229",
                          }
                        )}
                      >
                        <IonCardTitle
                          className={cx("styledCardTitle", {
                            styledCardTitleBlood:
                              e?.service?.id ===
                              "f2490f62-1d28-4edd-362a-08d8a7232229",
                          })}
                        >
                          {e.service?.name}
                        </IonCardTitle>
                        <IonCardSubtitle
                          className={cx("styledSubtitle", {
                            styledSubtitleBlood:
                              e?.service?.id ===
                              "f2490f62-1d28-4edd-362a-08d8a7232229",
                          })}
                        >
                          Vào lúc {e?.interval?.from},{" "}
                          {moment(e.date).format("DD-MM-YYYY")}
                        </IonCardSubtitle>
                      </IonCardHeader>
                      <IonCardContent
                        className={cx("styledCardContent", {
                          styledCardContentBlood:
                            e?.service?.id ===
                            "f2490f62-1d28-4edd-362a-08d8a7232229",
                        })}
                      >
                        <p>{e?.unit?.name}</p>
                        <p
                          className={classNames({
                            styledContentExpired:
                              moment(
                                moment(e.date).format("YYYY-MM-DD") +
                                  " " +
                                  e?.interval?.from
                              ).format("YYYY-MM-DD HH:mm") <
                              moment(new Date()).format("YYYY-MM-DD HH:mm"),
                          })}
                        >
                          {e?.unit?.address}
                        </p>
                      </IonCardContent>
                    </IonCard>
                    <button
                      onClick={() => {
                        examinationServices.downloadResultFile(e?.id!);
                      }}
                      className={styles.btnCancelCard}
                    >
                      <IonIcon
                        style={{ fontSize: "25px" }}
                        icon={cloudDownloadOutline}
                      />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.styledDivHistory}>
                {resultListAdvise.map((e) => (
                  <div className={styles.styledCardDiv}>
                    <IonCard
                      onClick={() => {
                        history.push({
                          pathname: "/examinationResultInfo",
                          state: e.id,
                        });
                      }}
                      className={cx("styledCardAdvise", {
                        // 'styledCardBlood': e.service.id === "f2490f62-1d28-4edd-362a-08d8a7232229",
                        // 'styledCardNegative': e.result === "Âm tính"
                      })}
                    >
                      <div
                        className={cx("styledDivIconAids", {
                          styledDivIconAids:
                            e?.service?.id !==
                            "f2490f62-1d28-4edd-362a-08d8a7232229",
                        })}
                      >
                        <IonIcon
                          className={styles.styledIcon}
                          icon={
                            e?.service?.id ===
                            "f2490f62-1d28-4edd-362a-08d8a7232229"
                              ? analytics
                              : chatbubbles
                          }
                        ></IonIcon>
                      </div>
                      <IonCardHeader
                        className={cx(
                          // 'styledCardHeader',
                          {
                            styledCardHeaderBlood:
                              e?.service?.id ===
                              "f2490f62-1d28-4edd-362a-08d8a7232229",
                          }
                        )}
                      >
                        <IonCardTitle className={cx("styledCardTitleBlood")}>
                          {e?.service?.name}
                        </IonCardTitle>
                        <IonCardSubtitle className={cx("styledSubtitleBlood")}>
                          Vào lúc {e?.interval?.from},{" "}
                          {moment(e.date).format("DD-MM-YYYY")}
                        </IonCardSubtitle>
                      </IonCardHeader>
                      <IonCardContent className={cx("styledCardContentBlood")}>
                        <p>{e?.unit?.name}</p>
                        <p
                          className={classNames({
                            styledContentExpired:
                              moment(
                                moment(e.date).format("YYYY-MM-DD") +
                                  " " +
                                  e?.interval?.from
                              ).format("YYYY-MM-DD HH:mm") <
                              moment(new Date()).format("YYYY-MM-DD HH:mm"),
                          })}
                        >
                          {e?.unit?.address}
                        </p>
                      </IonCardContent>
                    </IonCard>
                    <button
                      onClick={() => {
                        examinationServices.downloadResultFile(e?.id!);
                      }}
                      className={styles.btnCancelCard}
                    >
                      <IonIcon
                        style={{ fontSize: "25px" }}
                        icon={cloudDownloadOutline}
                      ></IonIcon>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ResultExaminations;
