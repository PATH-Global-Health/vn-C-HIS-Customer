import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonSearchbar,
  IonModal,
  IonSpinner,
  isPlatform,
} from "@ionic/react";
import { useDispatch, useSelector } from "@app/hooks";
import { useHistory } from "react-router-dom";
import { search, chevronBack } from "ionicons/icons";
import { useTranslation } from "react-i18next";
import { getExaminationList } from "../slices/workingCalendar";
import moment from "moment";
import styles from "../css/examinationList.module.css";
import classNames from "classnames/bind";
import { deburr } from "../../@app/utils/helpers";
import styled from "styled-components";
import ExaminationItem from "booking/components/Examination/ExaminationItem";
import ExaminationItemHistory from "booking/components/Examination/ExaminationItemHistory";
import ModalCancel from "booking/components/Examination/ModalCancel";
import ModalCancelSuccess from "booking/components/Examination/ModalCancelSuccess";
import { ExaminationStatus } from "booking/models/examinationListModel";
import ModalConfirm from "booking/components/Examination/ModalConfirm";
import { BookingModel } from "booking/models/bookingModel";
import { setHandleRedirectPage } from "@app/slices/global";

const ExaminationList: React.FC = () => {
  const [searchInput, setSearchInput] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("upcoming");
  const [contentSuccess, setContentSuccess] = useState<string>("");
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { typeRedirect } = useSelector((state) => state.global);
  const examinationList = useSelector((w) => w.workingCaledar.examinationList);
  const loading = useSelector((b) => b.workingCaledar.loading);
  const [nameSearch, setNameSearch] = useState("");
  var cx = classNames.bind(styles);

  const handleSort = (before: BookingModel, after: BookingModel) => {
    const beforeDate = moment(
      moment(before.date).format("YYYY-MM-DD") + " " + before?.interval?.from
    ).format("YYYY-MM-DD HH:mm");

    const afterDate = moment(
      moment(after.date).format("YYYY-MM-DD") + " " + after?.interval?.from
    ).format("YYYY-MM-DD HH:mm");

    // const i = moment(testa).milliseconds
    return moment(beforeDate).valueOf() - moment(afterDate).valueOf();
  };

  const examinationListSuccess = examinationList.data
    .filter((e) => e.status === ExaminationStatus.UNFINISHED)
    .sort(handleSort);
  const examinationListFinished = examinationList.data
    .filter(
      (e) =>
        e.status === ExaminationStatus.FINISHED ||
        e.status === ExaminationStatus.RESULTED
    )
    .sort(handleSort)
    .reverse();

  const examinationListSearch = examinationListSuccess.filter((e) =>
    deburr(
      e?.service?.name! +
      e?.unit?.name +
      e?.unit?.address +
      moment(e.date).format("DD-MM-YYYY") +
      e?.interval?.from +
      e?.doctor?.fullname!
    ).includes(deburr(nameSearch))
  );

  const examinationFinishedListSearch = examinationListFinished.filter((e) =>
    deburr(
      e?.service?.name! +
      e?.unit?.name +
      e?.unit?.address +
      moment(e.date).format("DD-MM-YYYY") +
      e?.interval?.from +
      e?.doctor?.fullname
    ).includes(deburr(nameSearch))
  );
  const [examId, setExamId] = useState("");
  const [rating, setRating] = useState(0);
  const back = () => {
    if (typeRedirect == 'service-page') {
      dispatch(setHandleRedirectPage(''));
      history.replace("/customer-service")
    }
    else {
      history.replace("/home");
    }
  };
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
    <IonPage style={isPlatform("ios") ? { paddingTop: 40 } : { paddingTop: 0 }}>
      <ModalCancel
        open={showModal}
        onClose={() => setShowModal(false)}
        setShowModalSuccess={() => {
          setShowModalSuccess(true);
          setContentSuccess(t("Appointment has been canceled successfully"));
        }}
        cancelExamId={examId}
      ></ModalCancel>
      <ModalConfirm
        open={showModalConfirm}
        onClose={() => setShowModalConfirm(false)}
        setShowModalSuccess={() => {
          setContentSuccess(t("Successful delivery confirmation"));
          setShowModalSuccess(true);
        }}
        examId={examId}
      ></ModalConfirm>
      <ModalCancelSuccess
        content={contentSuccess}
        open={showModalSuccess}
        onClose={() => {
          setShowModalSuccess(false);
          dispatch(getExaminationList());
        }}
      ></ModalCancelSuccess>
      {searchInput === false ? (
        <IonHeader className={styles.header}>
          <button
            className={styles.btnCustomHeader}
            onClick={() => back()}
          >
            <IonIcon className={styles.iconLeft} icon={chevronBack}></IonIcon>
          </button>
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
            onClick={() => {
              setSearchInput(false);
              setNameSearch("");
            }}
            className={styles.cancelSearch}
          >
            Cancel
          </button>
        </div>
      )}
      <IonContent className={styles.content}>
        {searchInput === true ? (
          Boolean(selectedMenu === "upcoming") ? (
            <>
              <IonLabel className={styles.styledLabel}>
                {t("Your upcoming appointments")}
              </IonLabel>
              {examinationListSearch.map((e) => (
                <div className={styles.styledCardDiv}>
                  <ExaminationItem
                    bookingModel={e}
                    handleClick={() => {
                      setShowModal(true);
                      setExamId(e?.id!);
                    }}
                    confirmClick={() => {
                      setContentSuccess(t("Successful delivery confirmation"));
                      setShowModalConfirm(true);
                      setExamId(e?.id!);
                    }}
                  ></ExaminationItem>
                </div>
              ))}
            </>
          ) : (
            <>
              {examinationFinishedListSearch.map((e) => (
                <ExaminationItemHistory
                  bookingModel={e}
                  handleClick={() => {
                    setShowModal(true);
                    setExamId(e?.id!);
                  }}
                ></ExaminationItemHistory>
              ))}
            </>
          )
        ) : (
          <>
            {selectedMenu === "upcoming" ? (
              <div className={styles.styledDivUpcoming}>
                {examinationListSuccess.map((e) => (
                  <div className={styles.styledCardDiv}>
                    <ExaminationItem
                      bookingModel={e}
                      handleClick={() => {
                        setShowModal(true);
                        setExamId(e?.id!);
                      }}
                      confirmClick={() => {
                        setContentSuccess(
                          t("Successful delivery confirmation")
                        );
                        setShowModalConfirm(true);
                        setExamId(e?.id!);
                      }}
                    ></ExaminationItem>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.styledDivHistory}>
                {examinationListFinished.map((e) => (
                  <ExaminationItemHistory
                    bookingModel={e}
                    handleClick={() => {
                      setShowModal(true);
                      // setExamId(e.id);
                    }}
                  ></ExaminationItemHistory>
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
