import React from "react";
import { IonIcon, IonModal } from "@ionic/react";
import { useDispatch, useSelector } from "@app/hooks";
import { help } from "ionicons/icons";
import { useTranslation } from "react-i18next";
import { getExaminationList } from "../../slices/workingCalendar";
import styles from "../../css/examinationList.module.css";
import examinationService from "../../services/examinations";
import styled from "styled-components";
// import { getDoctorIdByUserId } from "../../slices/workingCalendar";
import { ExaminationStatus } from "booking/models/examinationListModel";
const StyleModal = styled(IonModal)`
   {
    padding: 65% 15%;
  }
`;
interface Props {
  examId: string;
  open: boolean;
  onClose: () => void;
  setShowModalSuccess: () => void;
}
const ModalConfirm: React.FC<Props> = (props) => {
  const { open, onClose, examId, setShowModalSuccess } = props;
  const { t } = useTranslation();

  return (
    <>
      <StyleModal
        isOpen={open}
        cssClass="my-custom-class"
        onDidDismiss={() => onClose()}
      >
        <div className={styles.styledDivIconModal}>
          <IonIcon className={styles.styledIconModal} icon={help}></IonIcon>
        </div>
        <div className={styles.styledDivLabel}>
          <p>{t("Definitely receive the goods")}</p>
        </div>
        <div className={styles.styledDivModal}>
          <p
            onClick={async () => {
              try {
                await examinationService.updateExamination({
                  id: examId,
                  status: ExaminationStatus.FINISHED,
                  consultingContent: {},
                  testingContent: {},
                });
                onClose();
                setShowModalSuccess();
                // onRefresh();
              } catch (error) {}
            }}
            className={styles.styledLabelModal}
          >
            {t("Sure")}
          </p>
          <p onClick={() => onClose()} className={styles.styledLabelModal}>
            {t("Cancel")}
          </p>
        </div>
      </StyleModal>
    </>
  );
};

export default ModalConfirm;
