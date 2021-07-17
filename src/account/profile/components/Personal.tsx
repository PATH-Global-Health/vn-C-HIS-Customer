import React, { useState } from 'react';

import styled from 'styled-components';

import { IonIcon, IonContent, IonInput, IonButton, IonRow, IonCol, IonToast, IonItem, IonLabel, IonHeader, IonTitle, IonPage, IonNote } from '@ionic/react';
import { eyeSharp, eyeOffSharp, chevronBackOutline } from 'ionicons/icons';

import { useHistory } from 'react-router-dom';
import { Controller, useForm } from "react-hook-form";

import authService from '@app/services/auth';
import { useTranslation } from 'react-i18next';

const StyledInput = styled(IonInput)`
    color: black;
    margin-top: 2px;
    margin-left: 15px
`;

const StyledButton = styled(IonButton)`
    margin-left: 20px;
    width: 300px;
    --background: #293978;
    
`;
const StyledLabel = styled(IonLabel)`
    font-size: 18px;
    font-weight: 700;
    color: #010100;
    padding-left: 25px;
    padding-top: 15px;
`;
const StyledIcon = styled(IonIcon)`
   font-size: 20px;
`;


interface InputProps {
  name: string;
  fieldType: string;
  label?: string;
  [otherProps: string]: unknown;
};
interface ChangePasswordModal {
  oldPassword: string,
  newPassword: string,
  confirmNewPassword: string,
}


const Personal: React.FC = () => {
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const { control, handleSubmit } = useForm();

  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmNewPasswordVisible, setConfirmNewPasswordVisible] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showFailedToast, setShowFailedToast] = useState(false);
  const [showMatchPasswordFailedToast, setShowMatchPasswordFailedToast] = useState(false);

  const formFields: InputProps[] = [
    {
      name: "oldPassword",
      fieldType: "input",
      type: "password",
      label: t('Enter old password'),
      placeholder: "Mật khẩu cũ",
    },
    {
      name: "newPassword",
      fieldType: "input",
      type: "password",
      label: t('Enter new password'),
      placeholder: "Mật khẩu mới",
    },
    {
      name: "confirmNewPassword",
      fieldType: "input",
      type: "password",
      label: t('Confirm new password'),
      placeholder: "Nhập lại mật khẩu mới",
    },
  ];

  const handleChangePassword = async (data: ChangePasswordModal): Promise<void> => {
    try {
      const { oldPassword, newPassword, confirmNewPassword } = data;
      if (newPassword && confirmNewPassword && newPassword !== confirmNewPassword) {
        console.log('fa', showMatchPasswordFailedToast);
        setShowMatchPasswordFailedToast(true);
      }
      else {
        const params = { oldPassword: oldPassword, newPassword: newPassword };
        await authService.changePassword(params);
        setShowSuccessToast(true);
        setTimeout(() => history.push('/login'), 1500);
      }
    } catch (error) {
      setShowFailedToast(true);
    }
  };
  return (
    <IonPage >
      <IonHeader className='ion-margin-bottom' >
        <IonItem color='light' style={{ margin: '15px 20px 0px 10px' }}>
          <StyledIcon icon={chevronBackOutline} onClick={() => history.push('/account')}></StyledIcon>
          <IonTitle style={{ fontSize: '20px', textAlign: 'center' }}>{t('Personal Information')}</IonTitle>
        </IonItem>
      </IonHeader>
      <IonContent >
        <IonToast
          isOpen={showSuccessToast}
          onDidDismiss={() => setShowSuccessToast(false)}
          color='success'
          message={t('Change password successfully')}
          duration={1000}
          position="top"
          animated={true}
        />
        <IonToast
          isOpen={showFailedToast}
          onDidDismiss={() => setShowFailedToast(false)}
          color='danger'
          message={t('Old password is incorrect')}
          duration={1000}
          position="top"
          animated={true}
        />
        <IonToast
          isOpen={showMatchPasswordFailedToast}
          onDidDismiss={() => setShowMatchPasswordFailedToast(false)}
          color='danger'
          message={t('New password is incorrect')}
          duration={1000}
          position="top"
          animated={true}
        />

        <IonRow >
          <StyledLabel >
            {'ID người dùng'}
          </StyledLabel>
          <IonCol size="12" size-sm='3'>
            <IonItem color='light'>
              {1122330}
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow >
          <StyledLabel >
            {'Họ và tên'}
          </StyledLabel>
          <IonCol size="12" size-sm='3'>
            <IonItem color='light'>
              {'Đoàn Thanh Hoàng'}
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow >
          <StyledLabel >
            {'Số điện thoại'}
          </StyledLabel>
          <IonCol size="12" size-sm='3'>
            <IonItem color='light'>
              {'0988108341'}
            </IonItem>
          </IonCol>
        </IonRow>

      </IonContent>
    </IonPage>
  );
};

export default Personal;
