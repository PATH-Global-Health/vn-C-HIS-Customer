import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { IonIcon, IonContent, IonInput, IonButton, IonRow, IonCol, IonToast, IonItem, IonLabel, IonHeader, IonTitle, IonPage, IonNote, IonText } from '@ionic/react';
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
const ErrorText = styled(IonText)`
   color: #f46a6a;
   margin-top: 15px;
   margin-left: 15px;
   font-size: 15px;
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


const ChangePasswordPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const { control, handleSubmit, register, formState: { errors }, trigger } = useForm();

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
  useEffect(() => {
    register(
      'oldPassword',
      {
        required: { value: true, message: t('Password not entered') },
        minLength: { value: 6, message: t('password minimum length 5 characters') },
      }
    );
    register(
      'newPassword',
      {
        required: { value: true, message: t('Password not entered') },
        minLength: { value: 6, message: t('password minimum length 5 characters') },
      }
    );
    register(
      'confirmNewPassword',
      {
        required: { value: true, message: t('Password not entered') },
        minLength: { value: 6, message: t('password minimum length 5 characters') },
      }
    );
  }, [register]);
  return (
    <IonPage >
      <IonHeader className='ion-margin-bottom' >
        <IonItem color='light' style={{ margin: '15px 20px 0px 10px' }}>
          <StyledIcon icon={chevronBackOutline} onClick={() => history.push('/account')}></StyledIcon>
          <IonTitle style={{ fontSize: '20px', textAlign: 'center' }}>{t('Change Password')}</IonTitle>
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

        <form onSubmit={handleSubmit(handleChangePassword)} style={{ paddingLeft: '10px', paddingRight: '25px' }}>
          {formFields.map(({ label, name, fieldType, ...otherProps }) => {
            switch (fieldType) {
              case 'input': {
                return (
                  <Controller
                    key={name}
                    name={name}
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <IonRow >
                        <StyledLabel >
                          {label}
                        </StyledLabel>
                        <IonCol size="12" size-sm='3'>
                          <IonItem color='light'>
                            <StyledInput
                              required={true}
                              onIonBlur={() => {
                                trigger(name)
                              }}
                              value={value}
                              onIonChange={onChange}
                              type={
                                name === "oldPassword" ? oldPasswordVisible === true ? "text" : "password"
                                  : name === "newPassword" ? newPasswordVisible === true ? "text" : "password"
                                    : confirmNewPasswordVisible === true ? "text" : "password"
                              }
                            >
                            </StyledInput>
                            {
                              name === "oldPassword" ?
                                <StyledIcon slot="end" icon={oldPasswordVisible === true ? eyeOffSharp : eyeSharp} onClick={() => setOldPasswordVisible(!oldPasswordVisible)} />
                                : name === "newPassword" ?
                                  <StyledIcon slot="end" icon={newPasswordVisible === true ? eyeOffSharp : eyeSharp} onClick={() => setNewPasswordVisible(!newPasswordVisible)} />
                                  : <StyledIcon slot="end" icon={confirmNewPasswordVisible === true ? eyeOffSharp : eyeSharp} onClick={() => setConfirmNewPasswordVisible(!confirmNewPasswordVisible)} />
                            }

                          </IonItem>
                          {(errors?.oldPassword?.message && name === 'oldPassword') && <ErrorText color='danger'>{(errors?.oldPassword?.message)}</ErrorText>}
                          {(errors?.newPassword?.message && name === 'newPassword') && <ErrorText color='danger'>{(errors?.newPassword?.message)}</ErrorText>}
                          {(errors?.confirmNewPassword?.message && name === 'confirmNewPassword') && <ErrorText color='danger'>{(errors?.confirmNewPassword?.message)}</ErrorText>}
                        </IonCol>
                      </IonRow>
                    )}
                  />

                )
              }
              default: {
                return (
                  <Controller
                    key={name}
                    name={name}
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <IonRow className="ion-justify-content-center">
                        <IonCol size="12" size-sm='3'>
                          <IonItem color='light' >
                            <StyledInput
                              onIonBlur={onBlur}
                              value={value}
                              onIonChange={(event: any) => {
                                onChange(event);
                              }}
                              {...otherProps}>
                            </StyledInput>
                          </IonItem>
                        </IonCol>
                      </IonRow>
                    )}
                  />
                )
              }
            }
          })}
          <IonNote style={{ fontSize: '10px', paddingLeft: '25px', color: '#a6a3a3' }}>{t('Password consists of 8 digits, including uppercase and lowercase letters')}</IonNote>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" size-sm='3'>
              <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <StyledButton type='submit'>{t('Update')}</StyledButton>
              </div>
            </IonCol>
          </IonRow>
        </form>


      </IonContent>
    </IonPage>
  );
};

export default ChangePasswordPage;
