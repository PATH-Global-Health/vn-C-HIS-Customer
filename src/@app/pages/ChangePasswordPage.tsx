import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { IonIcon, IonContent, IonInput, IonButton, IonRow, IonCol, IonItem, IonLabel, IonHeader, IonTitle, IonPage, IonNote, IonText, IonAlert } from '@ionic/react';
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
  const { t } = useTranslation();
  const history = useHistory();
  const { control, handleSubmit, register, formState: { errors }, trigger, getValues } = useForm();

  const [showAlert, setShowAlert] = useState(false);
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmNewPasswordVisible, setConfirmNewPasswordVisible] = useState(false);
  const [success, setSuccess] = useState(false);

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
      const { oldPassword, newPassword } = data;
      const params = { oldPassword: oldPassword, newPassword: newPassword };
      await authService.changePassword(params);
      setSuccess(true);
      setShowAlert(true);
    } catch (error) {
      setSuccess(false);
      setShowAlert(true);
    }
  };
  useEffect(() => {
    register(
      'oldPassword',
      {
        required: { value: true, message: t('Password not entered') },
        minLength: { value: 8, message: t('Password minimum is 8 characters') },
        maxLength: { value: 12, message: t('Password maximum is 12 characters') },
      }
    );
    register(
      'newPassword',
      {
        required: { value: true, message: t('Password not entered') },
        minLength: { value: 8, message: t('Password minimum is 8 characters') },
        maxLength: { value: 12, message: t('Password maximum is 12 characters') },
      }
    );
    register(
      'confirmNewPassword',
      {
        required: { value: true, message: t('Password not entered') },
        minLength: { value: 8, message: t('Password minimum is 8 characters') },
        maxLength: { value: 12, message: t('Password maximum is 12 characters') },
        validate: value => value !== getValues('newPassword') ? t('Confirm password is not match').toString() : true
      }
    );
  }, [register, getValues, t]);
  return (
    <IonPage >
      <IonHeader className='ion-margin-bottom' >
        <IonItem color='light' style={{ margin: '15px 20px 0px 10px' }}>
          <StyledIcon icon={chevronBackOutline} onClick={() => history.push('/account')}></StyledIcon>
          <IonTitle style={{ fontSize: '20px', textAlign: 'center' }}>{t('Change Password')}</IonTitle>
        </IonItem>
      </IonHeader>
      <IonContent >
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
                        <IonCol size="12">
                          <IonItem color='light'>
                            <StyledInput
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
                        <IonCol size="12">
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
            <IonCol size="12">
              <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <StyledButton type='submit'>{t('Update')}</StyledButton>
              </div>
            </IonCol>
          </IonRow>
        </form>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          cssClass='my-custom-class'
          header={success ? t('Success!') : t('Failed!')}
          message={success ? t('Change password successfully') : t('Old password is incorrect! Change password failed')}
          buttons={[
            {
              text: t('Back to account'),
              handler: () => {
                setTimeout(() => {
                  history.push('/account');
                }, 0);
              }
            },
            {
              text: t('Close'),
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                setShowAlert(false);
              }
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default ChangePasswordPage;
