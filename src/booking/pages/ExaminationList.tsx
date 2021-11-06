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
} from "ionicons/icons";
import { useTranslation } from "react-i18next";
import { getExaminationList } from "../slices/workingCalendar";
import moment from "moment";
import styles from "../css/examinationList.module.css";
import classNames from "classnames/bind";
import { deburr } from "../../@app/utils/helpers";
import examinationService from "../services/examinations";
import styled from "styled-components";
import { Rating } from "react-simple-star-rating";
const StyleModal = styled(IonModal)`
   {
    padding: 65% 15%;
  }
`;

const ExaminationList: React.FC = () => {
  const [searchInput, setSearchInput] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("upcoming");
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const examinationList = useSelector((w) => w.workingCaledar.examinationList);
  const loading = useSelector((b) => b.workingCaledar.loading);
  const [nameSearch, setNameSearch] = useState("");
  var cx = classNames.bind(styles);

  const examinationListSuccess = examinationList.data.filter(
    (e) => e.status === 1
  );
  const examinationListFinished = examinationList.data.filter(
    (e) => e.status === 2
  );
  const examinationListSearch = examinationListSuccess.filter((e) =>
    deburr(
      e.service.name +
        e.unit.name +
        e.unit.address +
        e.date +
        e.interval.from +
        e.doctor.fullname
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
      <StyleModal
        isOpen={showModal}
        cssClass="my-custom-class"
        onDidDismiss={() => setShowModal(false)}
      >
        <div className={styles.styledDivIconModal}>
          <IonIcon className={styles.styledIconModal} icon={help}></IonIcon>
        </div>
        <div className={styles.styledDivLabel}>
          <p>{t("Are you sure you want to cancel your appointment ?")}</p>
        </div>
        <div className={styles.styledDivModal}>
          <p
            onClick={async () => {
              try {
                setShowModal(false);
                await examinationService.cancelExamination(cancelExamId);
                dispatch(getExaminationList());
                setShowModalSuccess(true);
              } catch (error) {}
            }}
            className={styles.styledLabelModal}
          >
            {t("Sure")}
          </p>
          <p
            onClick={() => setShowModal(false)}
            className={styles.styledLabelModal}
          >
            {t("Cancel")}
          </p>
        </div>
      </StyleModal>

      <StyleModal
        isOpen={showModalSuccess}
        cssClass="my-custom-class"
        onDidDismiss={() => setShowModalSuccess(false)}
      >
        <div className={styles.styledDivIconModalS}>
          <IonIcon
            className={styles.styledIconModal}
            icon={checkmark}
          ></IonIcon>
        </div>
        <div style={{ textAlign: "center" }}>
          <p>{t("Appointment has been canceled successfully")}</p>
        </div>
        <div className={styles.styledDivModalS}>
          <p
            onClick={() => setShowModalSuccess(false)}
            className={styles.styledLabelModal}
          >
            {t("Cancel")}
          </p>
        </div>
      </StyleModal>
      {searchInput === false ? (
        <IonHeader className={styles.header}>
          {/* <IonIcon
            onClick={() => history.goBack()}
            className={styles.iconLeft}
            icon={chevronBack}></IonIcon> */}
          <IonLabel className={styles.headerLabel}>
            {t("Appointment schedule")}{" "}
          </IonLabel>
          <IonIcon
            onClick={() => setSearchInput(true)}
            className={styles.iconRight}
            icon={search}
          ></IonIcon>
          <ul className={styles.styledMenu}>
            <li
              className={cx({ styledLiSelected: selectedMenu === "upcoming" })}
              onClick={() => setSelectedMenu("upcoming")}
            >
              {t("Upcoming")}
            </li>
            <li
              className={cx({ styledLiSelected: selectedMenu === "history" })}
              onClick={() => setSelectedMenu("history")}
            >
              {t("History")}
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
            {examinationListSearch.map((e) => (
              <div className={styles.styledCardDiv}>
                <IonCard
                  onClick={() => {
                    moment(
                      moment(e.date).format("YYYY-MM-DD") +
                        " " +
                        e.interval.from
                    ).format("YYYY-MM-DD HH:mm") <
                    moment(new Date()).format("YYYY-MM-DD HH:mm")
                      ? console.log("")
                      : history.push({
                          pathname: "/apointmentInfo",
                          state: e.id,
                        });
                  }}
                  className={cx("styledCardAids", {
                    styledCardBlood:
                      e.service.id === "f2490f62-1d28-4edd-362a-08d8a7232229",
                    styledCardExpired:
                      moment(
                        moment(e.date).format("YYYY-MM-DD") +
                          " " +
                          e.interval.from
                      ).format("YYYY-MM-DD HH:mm") <
                      moment(new Date()).format("YYYY-MM-DD HH:mm"),
                  })}
                >
                  <div
                    className={cx("styledDivIconBlood", {
                      styledDivIconAids:
                        e.service.id !== "f2490f62-1d28-4edd-362a-08d8a7232229",
                    })}
                  >
                    <IonIcon
                      className={styles.styledIcon}
                      icon={
                        e.service.id === "f2490f62-1d28-4edd-362a-08d8a7232229"
                          ? analytics
                          : chatbubbles
                      }
                    ></IonIcon>
                  </div>
                  <IonCardHeader
                    className={cx("styledCardHeader", {
                      styledCardHeaderBlood:
                        e.service.id === "f2490f62-1d28-4edd-362a-08d8a7232229",
                    })}
                  >
                    <IonCardTitle
                      className={cx("styledCardTitle", {
                        styledCardTitleBlood:
                          e.service.id ===
                          "f2490f62-1d28-4edd-362a-08d8a7232229",
                      })}
                    >
                      {e.service.name}
                    </IonCardTitle>
                    <IonCardSubtitle
                      className={cx("styledSubtitle", {
                        styledSubtitleBlood:
                          e.service.id ===
                          "f2490f62-1d28-4edd-362a-08d8a7232229",
                      })}
                    >
                      {t("Time")}: {e.interval.from},{" "}
                      {moment(e.date).format("DD-MM-YYYY")}
                    </IonCardSubtitle>
                    <IonCardSubtitle
                      className={cx("styledSubtitle", {
                        styledSubtitleBlood:
                          e.service.id ===
                          "f2490f62-1d28-4edd-362a-08d8a7232229",
                      })}
                    >
                      {t("Doctor")}: {e.doctor.fullname}
                    </IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent
                    className={cx("styledCardContent", {
                      styledCardContentBlood:
                        e.service.id === "f2490f62-1d28-4edd-362a-08d8a7232229",
                    })}
                  >
                    <p>{e.unit.name}</p>
                    <p>{e.unit.address}</p>
                  </IonCardContent>
                </IonCard>
                {moment(e.date).format("DD-MM-YYYY") <
                moment(new Date()).format("DD-MM-YYYY") ? (
                  ""
                ) : (
                  <button
                    onClick={() => {
                      moment(e.date).format("DD-MM-YYYY") === "23-07-2021"
                        ? console.log("")
                        : setShowModal(true);
                      setCancelExamId(e.id);
                    }}
                    className={styles.btnCancelCard}
                  >
                    {t("Cancel appointment")}
                  </button>
                )}
              </div>
            ))}
          </>
        ) : (
          <>
            {selectedMenu === "upcoming" ? (
              <div className={styles.styledDivUpcoming}>
                {examinationListSuccess.map((e) => (
                  <div className={styles.styledCardDiv}>
                    <IonCard
                      onClick={() => {
                        moment(
                          moment(e.date).format("YYYY-MM-DD") +
                            " " +
                            e.interval.from
                        ).format("YYYY-MM-DD HH:mm") <
                        moment(new Date()).format("YYYY-MM-DD HH:mm")
                          ? console.log("")
                          : history.push({
                              pathname: "/apointmentInfo",
                              state: e.id,
                            });
                      }}
                      className={cx("styledCardAids", {
                        styledCardBlood:
                          e.service.id ===
                          "f2490f62-1d28-4edd-362a-08d8a7232229",
                        styledCardExpired:
                          moment(
                            moment(e.date).format("YYYY-MM-DD") +
                              " " +
                              e.interval.from
                          ).format("YYYY-MM-DD HH:mm") <
                          moment(new Date()).format("YYYY-MM-DD HH:mm"),
                      })}
                    >
                      <div
                        className={cx("styledDivIconBlood", {
                          styledDivIconAids:
                            e.service.id !==
                            "f2490f62-1d28-4edd-362a-08d8a7232229",
                        })}
                      >
                        <IonIcon
                          className={styles.styledIcon}
                          icon={
                            e.service.id ===
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
                              e.service.id ===
                              "f2490f62-1d28-4edd-362a-08d8a7232229",
                          }
                        )}
                      >
                        <IonCardTitle
                          className={cx("styledCardTitle", {
                            styledCardTitleBlood:
                              e.service.id ===
                              "f2490f62-1d28-4edd-362a-08d8a7232229",
                            styledContentExpired:
                              moment(
                                moment(e.date).format("YYYY-MM-DD") +
                                  " " +
                                  e.interval.from
                              ).format("YYYY-MM-DD HH:mm") <
                              moment(new Date()).format("YYYY-MM-DD HH:mm"),
                          })}
                        >
                          {e.service.name}
                        </IonCardTitle>
                        <IonCardSubtitle
                          className={cx("styledSubtitle", {
                            styledSubtitleBlood:
                              e.service.id ===
                              "f2490f62-1d28-4edd-362a-08d8a7232229",
                            styledContentExpired:
                              moment(
                                moment(e.date).format("YYYY-MM-DD") +
                                  " " +
                                  e.interval.from
                              ).format("YYYY-MM-DD HH:mm") <
                              moment(new Date()).format("YYYY-MM-DD HH:mm"),
                          })}
                        >
                          {t("Time")}: {e.interval.from},{" "}
                          {moment(e.date).format("DD-MM-YYYY")}
                        </IonCardSubtitle>
                        <IonCardSubtitle
                          className={cx("styledSubtitle", {
                            styledSubtitleBlood:
                              e.service.id ===
                              "f2490f62-1d28-4edd-362a-08d8a7232229",
                            styledContentExpired:
                              moment(
                                moment(e.date).format("YYYY-MM-DD") +
                                  " " +
                                  e.interval.from
                              ).format("YYYY-MM-DD HH:mm") <
                              moment(new Date()).format("YYYY-MM-DD HH:mm"),
                          })}
                        >
                          {t("Doctor")}: {e.doctor.fullname}
                        </IonCardSubtitle>
                      </IonCardHeader>
                      <IonCardContent
                        className={cx("styledCardContent", {
                          styledCardContentBlood:
                            e.service.id ===
                            "f2490f62-1d28-4edd-362a-08d8a7232229",
                          styledContentExpired:
                            moment(
                              moment(e.date).format("YYYY-MM-DD") +
                                " " +
                                e.interval.from
                            ).format("YYYY-MM-DD HH:mm") <
                            moment(new Date()).format("YYYY-MM-DD HH:mm"),
                        })}
                      >
                        <p>{e.unit.name}</p>
                        <p
                          className={classNames({
                            styledContentExpired:
                              moment(
                                moment(e.date).format("YYYY-MM-DD") +
                                  " " +
                                  e.interval.from
                              ).format("YYYY-MM-DD HH:mm") <
                              moment(new Date()).format("YYYY-MM-DD HH:mm"),
                          })}
                        >
                          {e.unit.address}
                        </p>
                      </IonCardContent>
                    </IonCard>
                    {moment(
                      moment(e.date).format("YYYY-MM-DD") +
                        " " +
                        e.interval.from
                    ).format("YYYY-MM-DD HH:mm") <
                    moment(new Date()).format("YYYY-MM-DD HH:mm") ? (
                      ""
                    ) : (
                      <button
                        onClick={() => {
                          // moment(e.date).format("DD-MM-YYYY") === '23-07-2021' ? console.log("") :
                          setShowModal(true);
                          setCancelExamId(e.id);
                        }}
                        className={styles.btnCancelCard}
                      >
                        {t("Cancel appointment")}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.styledDivHistory}>
                {examinationListFinished.map((e) => (
                  <IonCard className={styles.styledCardHistory}>
                    <div className={styles.styledDivIconHistory}>
                      <IonIcon
                        className={styles.styledIconHistory}
                        icon={analytics}
                      ></IonIcon>
                    </div>
                    <IonCardHeader className={styles.styledCardHeader}>
                      <IonCardTitle className={styles.styledCardTitle}>
                        {e.service.name}
                      </IonCardTitle>
                      <IonCardSubtitle className={styles.styledSubtitle}>
                        {t("Time")}: {e.interval.to},{" "}
                        {moment(e.date).format("DD-MM-YYYY")}
                      </IonCardSubtitle>
                      <IonCardSubtitle className={styles.styledSubtitle}>
                        {t("Doctor")}: {e.doctor.fullname}
                      </IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent className={styles.styledCardContent}>
                      <p>{e.unit.name}</p>
                      <p>{e.unit.address}</p>
                      {e.rate !== "string" && e.rate !== null ? (
                        <Rating
                          onClick={(rate) => setRating(rate)}
                          ratingValue={parseInt(e.rate)}
                        />
                      ) : (
                        ""
                      )}
                    </IonCardContent>
                    {e.rate === "string" || e.rate === null ? (
                      <button
                        onClick={() => {
                          history.push({ pathname: "/evaluate", state: e.id });
                        }}
                        className={styles.btnEvaluate}
                      >
                        {t("Evaluate")}
                      </button>
                    ) : (
                      ""
                    )}
                  </IonCard>
                ))}
              </div>
            )}
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ExaminationList;
