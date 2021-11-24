import React from "react";
import {
  IonContent,
  IonHeader,
  IonLabel,
  IonModal,
  IonList,
  IonItem,
  IonInput,
  IonBadge,
  IonButton,
} from "@ionic/react";
import { useTranslation } from "react-i18next";
import styles from "../../css/examinationList.module.css";
import styled from "styled-components";
import { BookingModel, ConsultingContent } from "booking/models/bookingModel";
import {
  ExaminationService,
  ExaminationStatus,
} from "booking/models/examinationListModel";
import { useForm } from "react-hook-form";
import examinationService from "booking/services/examinations";
const StyleModal = styled(IonModal)`
   {
    padding: 65% 15%;
  }
`;
interface Props {
  examination: BookingModel;
  open: boolean;
  onClose: () => void;
  setShowModalSuccess: () => void;
}
const ModalPerform: React.FC<Props> = (props) => {
  const { open, onClose, examination, setShowModalSuccess } = props;
  const { t } = useTranslation();
  const {
    handleSubmit,
    register,
    formState: { errors },
    unregister,
  } = useForm();

  const onSubmit = async (data: ConsultingContent) => {
    console.log(data);
    try {
      // await examinationService.updateExamination({
      //   id: examination.id,
      //   testingContent: Boolean(
      //     examination.service.id === ExaminationService.TESTING
      //   )
      //     ? data
      //     : {},
      //   consultingContent: Boolean(
      //     examination.service.id === ExaminationService.CONSULTATION
      //   )
      //     ? data
      //     : {},
      //   status: ExaminationStatus.FINISHED,
      // });
      onClose();
      setShowModalSuccess();
    } catch (error) {}
  };

  const handleUnregister = () => {
    unregister("type");
    unregister("result");
    unregister("content");
    unregister("note");
  };

  return (
    <>
      <StyleModal
        isOpen={open}
        cssClass="my-custom-class"
        onDidDismiss={() => {
          handleUnregister();
          onClose();
        }}
      >
        <IonHeader className={styles.header}>
          {Boolean(examination?.service?.id === ExaminationService.TESTING) ? (
            <IonLabel className={styles.headerLabel}>{t("Testing")}</IonLabel>
          ) : Boolean(
              examination?.service?.id === ExaminationService.CONSULTATION
            ) ? (
            <IonLabel className={styles.headerLabel}>
              {t("Consultation")}
            </IonLabel>
          ) : (
            ""
          )}
        </IonHeader>
        <IonContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <IonList>
              {Boolean(
                examination?.service?.id === ExaminationService.TESTING
              ) ? (
                <>
                  <IonItem>
                    <IonLabel className={styles.styledLabel} position="stacked">
                      {t("Result")}
                    </IonLabel>
                    <IonInput
                      type="text"
                      {...register("result", {
                        required: {
                          value: false,
                          message: t("Result not enter"),
                        },
                      })}
                      // value={examination.testingContent?.result!}
                    ></IonInput>
                    {errors.result && (
                      <IonBadge color="danger">
                        {errors.result.message}
                      </IonBadge>
                    )}
                  </IonItem>
                  <IonItem>
                    <IonLabel className={styles.styledLabel} position="stacked">
                      {t("Note")}
                    </IonLabel>
                    <IonInput
                      {...register("note", {
                        required: {
                          value: false,
                          message: t("Result not enter"),
                        },
                      })}
                      // value={examination.testingContent?.note}
                    ></IonInput>
                    {errors.note && (
                      <IonBadge color="danger">{errors.note.message}</IonBadge>
                    )}
                  </IonItem>
                </>
              ) : (
                <>
                  <IonItem>
                    <IonLabel className={styles.styledLabel} position="stacked">
                      {t("Type of consultation")}
                    </IonLabel>
                    <IonInput
                      {...register("type", {
                        required: {
                          value: false,
                          message: t("Type not enter"),
                        },
                      })}
                      // value={examination?.consultingContent?.type}
                    ></IonInput>
                    {errors.type && (
                      <IonBadge color="danger">{errors.type.message}</IonBadge>
                    )}
                  </IonItem>
                  <IonItem>
                    <IonLabel className={styles.styledLabel} position="stacked">
                      {t("Content of consultation")}
                    </IonLabel>
                    <IonInput
                      {...register("content", {
                        required: {
                          value: false,
                          message: t("Content not enter"),
                        },
                      })}
                      // value={examination?.consultingContent?.content}
                    ></IonInput>
                    {errors.content && (
                      <IonBadge color="danger">
                        {errors.content.message}
                      </IonBadge>
                    )}
                  </IonItem>
                  <IonItem>
                    <IonLabel className={styles.styledLabel} position="stacked">
                      {t("Result")}
                    </IonLabel>
                    <IonInput
                      {...register("result", {
                        required: {
                          value: false,
                          message: t("Result not enter"),
                        },
                      })}
                      // value={examination?.consultingContent?.result}
                    ></IonInput>
                    {errors.result && (
                      <IonBadge color="danger">
                        {errors.result.message}
                      </IonBadge>
                    )}
                  </IonItem>
                  <IonItem>
                    <IonLabel className={styles.styledLabel} position="stacked">
                      {t("Note")}
                    </IonLabel>
                    <IonInput
                      {...register("note", {
                        required: {
                          value: false,
                          message: t("Note not enter"),
                        },
                      })}
                      // value={examination?.consultingContent?.note}
                    ></IonInput>
                    {errors.note && (
                      <IonBadge color="danger">{errors.note.message}</IonBadge>
                    )}
                  </IonItem>
                </>
              )}
              <IonItem>
                <IonButton
                  className={styles.btnPerform}
                  color="#00b5ad"
                  type="submit"
                >
                  {t("Confirm")}
                </IonButton>
              </IonItem>
            </IonList>
          </form>
        </IonContent>
        {/* <button
          type="submit"
          className={styles.btnPerform}
          onClick={async () => {
            try {
              await examinationService.updateExamination({
                id: examination.id,
                status: ExaminationStatus.FINISHED,
              });
              onClose();
              setShowModalSuccess();
              // onRefresh();
            } catch (error) {}
          }}
        >
          {t("Confirm")}
        </button> */}
      </StyleModal>
    </>
  );
};

export default ModalPerform;
