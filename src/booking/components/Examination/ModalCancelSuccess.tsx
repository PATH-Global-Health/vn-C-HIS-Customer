import React from "react";
import { IonIcon, IonModal } from "@ionic/react";
import { checkmark } from "ionicons/icons";
import { useTranslation } from "react-i18next";
import styles from "../../css/examinationList.module.css";
import styled from "styled-components";
const StyleModal = styled(IonModal)`
   {
    padding: 30% 15%;
  }
`;
interface Props {
  open: boolean;
  onClose: () => void;
  content: string;
}
const ModalCancelSuccess: React.FC<Props> = (props) => {
  const { open, onClose, content } = props;
  const { t } = useTranslation();

  return (
    <>
      <StyleModal
        isOpen={open}
        cssClass="my-custom-class"
        onDidDismiss={() => onClose()}
      >
        <div className={styles.styledDivIconModalS}>
          <IonIcon
            className={styles.styledIconModal}
            icon={checkmark}
          ></IonIcon>
        </div>
        <div style={{ textAlign: "center" }}>
          <p>{content}</p>
        </div>
        <div className={styles.styledDivModalS}>
          <p onClick={() => onClose()} className={styles.styledLabelModal}>
            {t("Cancel")}
          </p>
        </div>
      </StyleModal>
    </>
  );
};

export default ModalCancelSuccess;
