import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { IonButton, IonCol, IonContent, IonIcon, IonInput, IonItem, IonNote, IonRow, IonText, IonToast } from '@ionic/react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from '@app/hooks';

import { lockClosed, eyeOffSharp, eyeSharp } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import authService from '@app/services/auth';
import { useHistory } from 'react-router';
import { setDataForgotPassword } from '@app/slices/auth';

const StyledText = styled.div`
  color: black;
  text-align: center;
  font-size: 19px;
  font-weight: 600;
  margin: 20% 15px 10% 15px;
`;
const StyleWrapperInput = styled(IonItem)`
    background-color: white;
    margin: 0px 10% 20px 10%;
    border: 1px solid #d6d6c2;
    border-radius: 10px;
    height: 48px;
    font-size: 18px;
    text-transform: initial;
    box-shadow: 1px 3px 3px 0px rgba(0, 0, 0, 0.2)
`;
const StyledInput = styled(IonInput)`
    color: black;
    margin-top: 2px;
    margin-left: 15px
`;
const StyledButton = styled(IonButton)`
    width: 300px;
    --background: #293978;
`;
const StyledIcon = styled(IonIcon)`
   font-size: 20px;
`;
const ErrorText = styled(IonText)`
   color: #f46a6a;
   margin-top: 15px;
   margin-left: 45px;
   font-size: 15px;
`;
interface InputProps {
  name: string;
  fieldType: string;
  label?: string;
  placeholder: string;
  [otherProps: string]: unknown;
};
interface PasswordModel {
  newPassword: string;
  confirmNewPassword: string;
}

const CreatePassword: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { t, i18n } = useTranslation();
  const formFields: InputProps[] = [
    {
      name: "newPassword",
      fieldType: "input",
      type: "password",
      label: "Mật khẩu",
      placeholder: t('New password'),
    },
    {
      name: "confirmNewPassword",
      fieldType: "input",
      type: "password",
      label: "Mật khẩu",
      placeholder: t('Confirm new password'),
    },
  ];
  const { control, handleSubmit, register, formState: { errors }, trigger, getValues } = useForm();
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmNewPasswordVisible, setConfirmNewPasswordVisible] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showFailedToast, setShowFailedToast] = useState(false);
  const handleCreatePassword = async (data: PasswordModel): Promise<void> => {
    try {
      let params = { newPassword: data.newPassword };
      await authService.resetPassword(params);
      setShowSuccessToast(true);
      setTimeout(() => { dispatch(setDataForgotPassword({ method: undefined, accessToken: undefined })); history.replace('/login') }, 1500);
    } catch (error) {
      setShowFailedToast(true);
    }
  }
  useEffect(() => {
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
        validate: value => value !== getValues('newPassword') ? t('Confirm new password is not match').toString() : true
      }
    );
  }, [register]);
  return (
    <IonContent >
      <IonToast
        isOpen={showSuccessToast}
        onDidDismiss={() => setShowSuccessToast(false)}
        color='success'
        message={t('Reset password successfully')}
        duration={1000}
        position="top"
        animated={true}
      />
      <IonToast
        isOpen={showFailedToast}
        onDidDismiss={() => setShowFailedToast(false)}
        color='danger'
        message={t('Reset password failed')}
        duration={1000}
        position="top"
        animated={true}
      />
      <IonRow className="ion-justify-content-center">
        <IonCol size='12'>
          <StyledText >
            {t('Please reset new password')}
            <br />
            <IonNote className='ion-margin-end' color='medium' style={{ fontSize: '13px' }}>{t('Generate a new password that does not match the last 3 passwords')}</IonNote>
          </StyledText>
        </IonCol>
      </IonRow>
      <form onSubmit={handleSubmit(handleCreatePassword)}>
        {formFields.map(({ label, name, fieldType, placeholder, ...otherProps }) => {
          switch (fieldType) {
            case 'input': {
              return (
                <Controller
                  key={name}
                  name={name}
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <IonRow className="ion-justify-content-center">
                      <IonCol size="12">
                        <StyleWrapperInput color='light' lines='none'>
                          <StyledInput
                            required={true}
                            onIonBlur={() => {
                              trigger(name)
                            }}
                            value={value}
                            onIonChange={onChange}
                            placeholder={placeholder}
                            type={
                              name === "newPassword" ? newPasswordVisible === true ? "text" : "password"
                                : confirmNewPasswordVisible === true ? "text" : "password"
                            }

                          >
                          </StyledInput>
                          <StyledIcon icon={lockClosed} slot='start' className='ion-margin-end' />
                          {
                            name === "newPassword" ?
                              <StyledIcon slot="end" icon={newPasswordVisible === true ? eyeOffSharp : eyeSharp} onClick={() => setNewPasswordVisible(!newPasswordVisible)} />
                              : <StyledIcon slot="end" icon={confirmNewPasswordVisible === true ? eyeOffSharp : eyeSharp} onClick={() => setConfirmNewPasswordVisible(!confirmNewPasswordVisible)} />
                          }
                        </StyleWrapperInput>
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
                        <StyleWrapperInput>
                          <StyledInput
                            onIonBlur={onBlur}
                            value={value}
                            onIonChange={(event: any) => {
                              onChange(event);
                            }}
                            {...otherProps}>
                          </StyledInput>
                        </StyleWrapperInput>
                      </IonCol>
                    </IonRow>
                  )}
                />
              )
            }
          }
        })}

        <IonRow className="ion-justify-content-center">
          <IonCol size="12">
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <StyledButton type='submit'>{t('Update')}</StyledButton>
            </div>
          </IonCol>
        </IonRow>
      </form>
    </IonContent>

  );
};

export default CreatePassword;