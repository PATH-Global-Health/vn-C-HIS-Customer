import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonModal,
  IonSpinner,
  isPlatform,
  IonButton,
} from "@ionic/react";
import { useSelector, useDispatch } from "@app/hooks";
import "react-day-picker/lib/style.css";
import { useHistory } from "react-router-dom";
import {
  calendarOutline,
  checkmark,
  chevronBack,
  timeOutline,
} from "ionicons/icons";
import { useTranslation } from "react-i18next";
import { getExaminationById, getUserInfo } from "../slices/workingCalendar";
import styles from "../css/apointmentInfo.module.css";
import moment from "moment";
import styled from "styled-components";
import { apiLinks } from "@app/utils";
import { TestingContent } from "booking/models/bookingModel";
import {
  ExaminationService,
  ExaminationStatus,
} from "booking/models/examinationListModel";
import ApointmentInfoDetail from "booking/components/Examination/ApointmentInfoDetail";
import { Rating } from "react-simple-star-rating";
import ModalCancel from "booking/components/Examination/ModalCancel";
import ModalCancelSuccess from "booking/components/Examination/ModalCancelSuccess";
import ModalConfirm from "booking/components/Examination/ModalConfirm";
const StyleModal = styled(IonModal)`
   {
    padding: 65% 15%;
  }
`;

const ApointmentInfo: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const bookingModel = useSelector(
    (b) => b.workingCaledar.bookingModelResponse
  );

  const testingContent = bookingModel?.data.testingContent as TestingContent;
  const examinationSuccess = useSelector(
    (b) => b.workingCaledar.examinationSuccess
  );
  const loading = useSelector((b) => b.workingCaledar.loading);
  const [examId, setExamId] = useState("");
  const [contentSuccess, setContentSuccess] = useState<string>("");
  const { t } = useTranslation();
  const serviceId = useSelector((w) => w.workingCaledar.serviceId);
  useEffect(() => {
    dispatch(getUserInfo());
    history.location.state &&
      dispatch(getExaminationById(history.location.state + ""));
  }, []);
  const [showModalBooking, setShowModalBooking] = useState(true);
  return (
    <>
      {serviceId === "" && history.location.state === undefined ? (
        history.replace("/home")
      ) : loading === true ? (
        <IonSpinner
          name="bubbles"
          color="primary"
          style={{ left: "50%", top: "50%" }}
        ></IonSpinner>
      ) : (
        <IonPage
          style={isPlatform("ios") ? { paddingTop: 40 } : { paddingTop: 0 }}
        >
          <ModalCancel
            open={showModal}
            onClose={() => setShowModal(false)}
            setShowModalSuccess={() => {
              setShowModalSuccess(true);
              setContentSuccess(
                t("Appointment has been canceled successfully")
              );
            }}
            cancelExamId={examId}
          ></ModalCancel>
          <ModalConfirm
            open={showModalConfirm}
            onClose={() => setShowModalConfirm(false)}
            setShowModalSuccess={() => {
              setShowModalSuccess(true);
              setContentSuccess(t("Successful delivery confirmation"));
            }}
            examId={examId}
          ></ModalConfirm>
          <ModalCancelSuccess
            content={contentSuccess}
            open={showModalSuccess}
            onClose={() => {
              setShowModalSuccess(false);
              history.replace("/examinationList");
            }}
          ></ModalCancelSuccess>

          {examinationSuccess === true &&
          history.location.state === undefined ? (
            <StyleModal
              isOpen={showModalBooking}
              cssClass="my-custom-class"
              onDidDismiss={() => setShowModalBooking(false)}
            >
              <div className={styles.styledDivIconModalS}>
                <IonIcon
                  className={styles.styledIconModal}
                  icon={checkmark}
                ></IonIcon>
              </div>
              <div style={{ textAlign: "center" }}>
                <p>{t("Appointment successful")}</p>
              </div>
              <div className={styles.styledDivModalS}>
                <p
                  onClick={() => setShowModalBooking(false)}
                  className={styles.styledLabelModal}
                >
                  {t("Cancel")}
                </p>
              </div>
            </StyleModal>
          ) : (
            ""
          )}
          {examinationSuccess === true ||
          history.location.state !== undefined ? (
            <>
              <IonContent>
                <IonHeader className={styles.header}>
                  <button
                    className={styles.btnCustomHeader}
                    onClick={() => {
                      if (Boolean(history.location.state)) {
                        history.replace("/examinationList");
                      } else {
                        history.replace("/confirmProfile");
                      }
                    }}
                  >
                    <IonIcon
                      className={styles.iconLeft}
                      icon={chevronBack}
                    ></IonIcon>
                  </button>
                  <IonLabel className={styles.headerLabel}>
                    {t("Appointment information")}
                  </IonLabel>
                </IonHeader>
                <IonList>
                  <IonItem>
                    <IonLabel className={styles.styledLabel} position="stacked">
                      {t("Service name")}
                    </IonLabel>
                    <IonInput readonly value={bookingModel?.data.service?.name}>
                      {" "}
                    </IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel className={styles.styledLabel} position="stacked">
                      {t("Doctor")}
                    </IonLabel>
                    <IonInput
                      readonly
                      value={bookingModel?.data?.doctor?.fullname!}
                    >
                      {" "}
                    </IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel className={styles.styledLabel} position="stacked">
                      {t("Appointment date")}
                    </IonLabel>
                    <IonInput
                      readonly
                      className={styles.styledInput}
                      value={moment(bookingModel?.data.date).format(
                        "DD/MM/YYYY"
                      )}
                    >
                      <IonIcon
                        className={styles.styledIconInput}
                        icon={calendarOutline}
                      ></IonIcon>
                      {/* {moment(bookingModel.data.date).format('DD/MM/YYYY')} */}
                    </IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel className={styles.styledLabel} position="stacked">
                      {t("Appointment time")}
                    </IonLabel>
                    <IonInput
                      readonly
                      className={styles.styledInput}
                      value={bookingModel?.data?.interval?.from}
                    >
                      <IonIcon
                        className={styles.styledIconInput}
                        icon={timeOutline}
                      ></IonIcon>
                      {/* {bookingModel.data.interval.from} */}
                    </IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel className={styles.styledLabel} position="stacked">
                      {t("Service Unit")}
                    </IonLabel>
                    <IonInput
                      readonly
                      className={styles.styledInput}
                      value={bookingModel?.data?.unit?.name}
                    >
                      <IonImg
                        className={styles.img}
                        src={`${apiLinks.manageSchedule.hospital.getHospitalImage}${bookingModel?.data?.unit?.id}`}
                      ></IonImg>
                    </IonInput>
                  </IonItem>

                  {/* {Boolean(
                    bookingModel?.data?.status === ExaminationStatus.FINISHED
                  ) && (
                    
                  )} */}

                  {/* {testingContent?.typeTesting && ( */}
                  <ApointmentInfoDetail
                    data={bookingModel!}
                  ></ApointmentInfoDetail>
                  {/* )} */}
                </IonList>
              </IonContent>
              <IonList>
                <IonItem>
                  <div className={styles.styledItemRating}>
                    {Boolean(
                      bookingModel?.data.rate !== "string" &&
                        bookingModel?.data.rate !== null
                    ) ? (
                      <Rating
                        onClick={(rate) => console.log("")}
                        ratingValue={parseInt(bookingModel?.data?.rate!)}
                      />
                    ) : (
                      Boolean(
                        bookingModel?.data.status ===
                          ExaminationStatus.FINISHED ||
                          bookingModel?.data.status ===
                            ExaminationStatus.RESULTED
                      ) && (
                        <IonButton
                          onClick={() => {
                            history.replace({
                              pathname: "/evaluate",
                              state: bookingModel?.data?.id,
                            });
                          }}
                        >
                          {t("Evaluate")}
                        </IonButton>
                      )
                    )}

                    {Boolean(
                      bookingModel?.data?.status ===
                        ExaminationStatus.UNFINISHED &&
                        bookingModel?.data?.service?.id ===
                          ExaminationService.TESTING &&
                        !testingContent.isPickUpAtTheFacility
                    ) && (
                      <IonButton
                        // color=""
                        onClick={() => {
                          setExamId(bookingModel?.data?.id!);
                          setShowModalConfirm(true);
                        }}
                      >
                        {t("Received")}
                      </IonButton>
                    )}
                  </div>
                </IonItem>
                <IonItem>
                  <button
                    className={styles.btnExamination}
                    onClick={() => history.replace("/examinationList")}
                  >
                    {t("View Examination List")}
                  </button>
                </IonItem>
                <IonItem>
                  {Boolean(
                    // moment(
                    //   moment(bookingModel?.data?.date).format("YYYY-MM-DD") +
                    //     " " +
                    //     bookingModel?.data?.interval?.from
                    // ).format("YYYY-MM-DD HH:mm") <
                    //   moment(new Date()).format("YYYY-MM-DD HH:mm") ||
                    bookingModel?.data?.status === ExaminationStatus.UNFINISHED
                    // || bookingModel?.data?.status === ExaminationStatus.RESULTED
                  ) && (
                    <button
                      className={styles.styledButtonCancel}
                      onClick={() => {
                        setExamId(bookingModel?.data?.id!);
                        setShowModal(true);
                      }}
                    >
                      {t("Cancel appointment")}
                    </button>
                  )}
                </IonItem>
              </IonList>
            </>
          ) : (
            <IonHeader className={styles.header}>
              <button
                className={styles.btnCustomHeader}
                onClick={() => history.replace("/confirmProfile")}
              >
                <IonIcon
                  className={styles.iconLeft}
                  icon={chevronBack}
                ></IonIcon>
              </button>
              <IonLabel className={styles.headerLabel}>
                {t("Time has been booked")}
              </IonLabel>
            </IonHeader>
          )}
        </IonPage>
      )}
    </>
  );
};

export default ApointmentInfo;
