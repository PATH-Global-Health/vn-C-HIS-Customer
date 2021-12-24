import React from "react";
import {
  IonCard,
  IonCardContent,
  IonIcon,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import { useDispatch, useSelector } from "@app/hooks";
import { useHistory } from "react-router-dom";
import { analytics, chatbubbles } from "ionicons/icons";
import { useTranslation } from "react-i18next";
import {
  ExaminationService,
  ExaminationStatus,
} from "booking/models/examinationListModel";
import moment from "moment";
import styles from "../../css/examinationList.module.css";
import classNames from "classnames/bind";
import { BookingModel, TestingContent } from "../../models/bookingModel";

interface Props {
  bookingModel: BookingModel;
  handleClick: () => void;
  confirmClick: () => void;
}
const ExaminationItem: React.FC<Props> = (props) => {
  const { bookingModel, handleClick, confirmClick } = props;
  const e = bookingModel;
  const testingContent = e.testingContent as TestingContent;
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  var cx = classNames.bind(styles);

  return (
    <>
      <div className={styles.styledCardDiv}>
        <IonCard
          onClick={() => {
            history.replace({
              pathname: "/apointmentInfo",
              state: e.id,
            });
          }}
          className={cx("styledCardAids", {
            styledCardBlood: e?.service?.id === ExaminationService.TESTING,
            styledCardExpired:
              moment(
                moment(e.date).format("YYYY-MM-DD") + " " + e?.interval?.from
              ).format("YYYY-MM-DD HH:mm") <
              moment(new Date()).format("YYYY-MM-DD HH:mm"),
          })}
        >
          <div
            className={cx("styledDivIconBlood", {
              styledDivIconAids: e?.service?.id !== ExaminationService.TESTING,
            })}
          >
            <IonIcon
              className={styles.styledIcon}
              icon={
                e?.service?.id === ExaminationService.TESTING
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
                  e?.service?.id === ExaminationService.TESTING,
              }
            )}
          >
            <IonCardTitle
              className={cx("styledCardTitle", {
                styledCardTitleBlood:
                  e?.service?.id === ExaminationService.TESTING,
                styledContentExpired:
                  moment(
                    moment(e.date).format("YYYY-MM-DD") +
                    " " +
                    e?.interval?.from
                  ).format("YYYY-MM-DD HH:mm") <
                  moment(new Date()).format("YYYY-MM-DD HH:mm"),
              })}
            >
              {e?.service?.name}
            </IonCardTitle>
            <IonCardSubtitle
              className={cx("styledSubtitle", {
                styledSubtitleBlood:
                  e?.service?.id === ExaminationService.TESTING,
                styledContentExpired:
                  moment(
                    moment(e.date).format("YYYY-MM-DD") +
                    " " +
                    e?.interval?.from
                  ).format("YYYY-MM-DD HH:mm") <
                  moment(new Date()).format("YYYY-MM-DD HH:mm"),
              })}
            >
              {t("Time") + ": "} {e?.interval?.from},{" "}
              {moment(e.date).format("DD-MM-YYYY")}
            </IonCardSubtitle>
            <IonCardSubtitle
              className={cx("styledSubtitle", {
                styledSubtitleBlood:
                  e?.service?.id === ExaminationService.TESTING,
                styledContentExpired:
                  moment(
                    moment(e.date).format("YYYY-MM-DD") +
                    " " +
                    e?.interval?.from
                  ).format("YYYY-MM-DD HH:mm") <
                  moment(new Date()).format("YYYY-MM-DD HH:mm"),
              })}
            >
              {t("Doctor") + ": "}{" "}
              {e?.doctor?.fullname?.length! <= 12
                ? e.doctor?.fullname
                : e.doctor?.fullname.slice(0, 12) + " ..."}
            </IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent
            className={cx("styledCardContent", {
              styledCardContentBlood:
                e?.service?.id === ExaminationService.TESTING,
              styledContentExpired:
                moment(
                  moment(e.date).format("YYYY-MM-DD") + " " + e?.interval?.from
                ).format("YYYY-MM-DD HH:mm") <
                moment(new Date()).format("YYYY-MM-DD HH:mm"),
            })}
          >
            <p>
              {e?.unit?.name?.length! <= 35
                ? e?.unit?.name
                : e?.unit?.name?.slice(0, 32) + " ..."}
            </p>
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
              {e?.unit?.address?.length! <= 35
                ? e?.unit?.address
                : e?.unit?.address?.slice(0, 32) + " ..."}
            </p>
          </IonCardContent>
          <IonCardHeader className={styles.headerBottomCard}>
            {
              // moment(
              //   moment(e.date).format("YYYY-MM-DD") + " " + e.interval.from
              // ).format("YYYY-MM-DD HH:mm") <
              // moment(new Date()).format("YYYY-MM-DD HH:mm") ? (
              //   ""
              // ) : (
              Boolean(e.status === ExaminationStatus.UNFINISHED) && (
                <button
                  onClick={() => {
                    // handleClick();
                  }}
                  className={styles.btnCancelCard}
                >
                  {t("Cancel appointment")}
                </button>
              )

              // )
            }
            {Boolean(
              e.status === ExaminationStatus.UNFINISHED &&
              e.service?.id === ExaminationService.TESTING &&
              !testingContent?.isPickUpAtTheFacility
            ) && (
                <button
                  onClick={() => {
                    // confirmClick();
                  }}
                  className={styles.btnConfirmCard}
                >
                  {t("Received")}
                </button>
              )}

            {
              // moment(
              //   moment(e.date).format("YYYY-MM-DD") + " " + e.interval.from
              // ).format("YYYY-MM-DD HH:mm") <
              // moment(new Date()).format("YYYY-MM-DD HH:mm") ? (
              //   ""
              // ) : (
              // Boolean(e.status === 1) && (
              //   <button
              //     onClick={() => {
              //       // performClick();
              //     }}
              //     className={styles.btnHandleCard}
              //   >
              //     {t("Perform")}
              //   </button>
              // )
              // )
            }
          </IonCardHeader>
        </IonCard>
      </div>
    </>
  );
};

export default ExaminationItem;
