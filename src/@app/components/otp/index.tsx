import React, { useState, useEffect } from "react";
import {
  IonIcon,
  IonContent,
  IonInput,
  IonButton,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonHeader,
  IonTitle,
  IonSelect,
  IonSelectOption,
  IonDatetime,
  IonText,
  IonAlert,
  IonModal,
  IonToast
} from '@ionic/react';
import styled from 'styled-components';
import { useHistory } from "react-router";
import { useAuth } from "@app/hooks";
import { chevronBackOutline } from 'ionicons/icons';
import OtpInput from 'react-otp-input';
import { useTranslation } from "react-i18next";

const StyledButton = styled(IonButton)`
    margin-left: 20px;
    width: 300px;
    --background: #293978;
`;
const Header = styled.div`
    margin-bottom: 20px;
    & .header{
      margin-left: -10px;
      height: 40px;
      
    }
    & .title{
      font-weight: 600;
      text-align: center;
      margin: 10px 0px !important
    }
`;
const StyledOtpInput = styled(OtpInput)`
  margin: 0 auto;
  text-align: center;
  padding: 50px 0px 50px 4px;
  input{
    padding: 10px;
    color: #3e3c3c !important;
    background-color:white;
    font-weight:600;  
  }
`;
interface Props {
  showModal: boolean;
  data: {
    type: string,
    data: string,
  };
  verifyOtp: (otp: string, type: string) => void;
  onClose: () => void;
}
const OtpModal: React.FC<Props> = ({ showModal, verifyOtp, data, onClose }) => {
  const history = useHistory();
  const { t } = useTranslation();
  const [otp, setOtp] = useState<string>('');

  return (
    <IonModal isOpen={showModal}>
      <Header>
        <IonHeader className="header">
          <IonItem color="light" onClick={() => onClose()} >
            <IonIcon icon={chevronBackOutline} color="dark"></IonIcon>
            <IonTitle className="title">
              {t('OTP verification')}
            </IonTitle>
          </IonItem>
        </IonHeader>
      </Header>
      <IonRow className="ion-justify-content-center ">
        <IonCol size="12" >
          <div className="ion-align-items-center" style={{ textAlign: 'center', marginTop: '150px', color: '#1145a0', fontSize: '20px', fontWeight: 500 }}>
            <IonText style={{ marginBottom: '30px', color: 'black' }}>
              {
                data?.type === 'phone' ? `Nhập mã xác thực đã được gửi đến số điện thoại ${data?.data || ''}`
                  : `Nhập mã xác thực đã được gửi đến mail ${data?.data || ''}`
              }
            </IonText>
          </div>
        </IonCol>
      </IonRow>
      <StyledOtpInput
        inputStyle={{
          width: '2.7rem',
          height: '2.7rem',
          marginRight: '10px',
          fontSize: '1rem',
          color: 'black',
          borderRadius: 4,
          border: '2px solid rgba(0,0,0,0.3)',
        }}
        isInputNum={true}
        value={otp}
        onChange={(otp: any) => setOtp(otp)}
        numInputs={6}
        separator={<span style={{ color: 'black' }}>-</span>}
      />
      <IonRow style={{ margin: '0 auto', paddingBottom: '80%' }}>
        <IonCol size="12">
          <div style={{}}>
            <StyledButton onClick={() => verifyOtp(otp, data.type)}>{t('Confirm')}</StyledButton>
          </div>
        </IonCol>
      </IonRow>
    </IonModal>
  )

}
export default OtpModal