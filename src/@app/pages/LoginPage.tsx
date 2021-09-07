import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { IonIcon, IonContent, IonInput, IonButton, IonRow, IonCol, IonCheckbox, IonToast, IonItem, IonText, IonSelect, IonSelectOption } from '@ionic/react';
import { lockClosed, phonePortraitOutline, eyeOffSharp, eyeSharp, person } from 'ionicons/icons';

import { useAuth } from '@app/hooks';
import { useHistory } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

import logo from '../assets/img/logo.png';
import { useTranslation } from 'react-i18next';
import { } from 'react-redux';
import GoogleAuthen from '@app/components/login/GoogleLogin';
import FacebookAuthen from '@app/components/login/FacebookLogin';

const StyleWrapperInput = styled(IonItem)`
  background-color: white;
  border: 1px solid #d6d6c2;
  padding-left: 5px;
  margin: 12px 0px 3px 0px;
  border-radius: 10px;
  height: 48px;
  font-size: 18px;
  text-transform: initial;
  box-shadow: 1px 3px 3px 0px rgba(0, 0, 0, 0.2);
`;
const StyledInput = styled(IonInput)`
    color: black;
    margin-top: 2px;
`;
const StyleText = styled.div`
    font-size: 15px;
    color: #010100;
    text-align: end;
    margin-right: 20px;
    margin-top: 10px;
    font-weight: 500;
    cursor:pointer;
`;
const StyledButton = styled(IonButton)`
    width: 300px;
    margin-top: 10px;
    --background: #293978;
`;
const StyledSocialSelect = styled(IonSelect)`
    color: black;
    border: 0.5px solid #d6d6c2;
    width: 250px;
    --background: white;
    margin: 0px auto;
`;

const StyledHeader = styled.h1`
    font-size: 35px;
    font-weight: 700;
    color: #010100;
    padding-left: 35px;
    margin-top: 10px;
`;

const ErrorText = styled(IonText)`
   color: #f46a6a;
   margin-left: 5px;
   font-size: 15px;
`;
const StyledIcon = styled(IonIcon)`
   font-size: 20px;
   color: #5d6060;
`;
interface InputProps {
  name: string;
  fieldType: string;
  label?: string;
  icon: string;
  [otherProps: string]: unknown;
};
interface LoginModel {
  username: string;
  password: string;
  remember: boolean;
}

const LoginPage: React.FC = () => {
  const history = useHistory();
  const { t, i18n } = useTranslation();
  const formFields: InputProps[] = [
    {
      icon: person,
      name: "username",
      fieldType: "input",
      label: t('username'),
      placeholder: t('Tên đăng nhập'),
    },
    {
      icon: lockClosed,
      name: "password",
      fieldType: "input",
      label: t('Password'),
      placeholder: t('Password'),
    },
  ];
  const { control, handleSubmit, register, formState: { errors }, trigger } = useForm();
  const { login, loginWithIncognito } = useAuth();
  const permissionQuery = {};
  const [errorCode, setErrorCode] = useState<string>('');
  const [remember, setRemember] = useState(true)
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showFailedToast, setShowFailedToast] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const handleLogin = async (data: LoginModel): Promise<void> => {
    setSubmitting(true);
    try {
      const { username, password } = data;
      await login(username, password, remember, permissionQuery);
      setSubmitting(false);
      setShowSuccessToast(true);
      setTimeout(() => history.push('/home'), 1500);
    } catch (error) {
      setErrorCode(error.message);
      setSubmitting(false);
      setShowFailedToast(true);
    }
  };
  const handleLoginWithIncognito = async (): Promise<void> => {
    try {
      await loginWithIncognito();
      history.push('/home');
    }
    catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    register(
      'username',
      {
        required: { value: true, message: t('Tên đăng nhập chưa nhập') },
        //pattern: { value: /^[0-9\b]+$/, message: t('Tên đăng nhập không chứa khoảng trắng') }
      }
    );
    register(
      'password',
      {
        required: { value: true, message: t('Password not entered') },
        minLength: { value: 8, message: t('Password minimum is 8 characters') },
        maxLength: { value: 12, message: t('Password maximum is 12 characters') },
      }
    );
  }, [register]);
  return (
    <>
      <IonContent >
        <IonToast
          isOpen={showSuccessToast}
          onDidDismiss={() => setShowSuccessToast(false)}
          color='success'
          message={t('Login successfully')}
          duration={1000}
          position="top"
          animated={true}
        />
        <IonToast
          isOpen={showFailedToast}
          onDidDismiss={() => setShowFailedToast(false)}
          color='danger'
          message={
            errorCode === 'INCORRECT_USERNAME_PASSWORD' ?
              t('Wrong password, please check again!')
              :
              t('This account does not exist, please create a new one!')
          }
          duration={1000}
          position="top"
          animated={true}
        />
        <IonRow >
          <IonCol >
            <div style={{ textAlign: 'center', marginTop: '30px' }}>
              <img width='300px' src={logo} alt="logo" />
            </div>
          </IonCol>
        </IonRow>
        <IonRow className="ion-justify-content-center">
          <IonCol size="12" >
            <StyledHeader >{t('Login')}</StyledHeader>
            <StyleText >{t('No account') + '? '}<b onClick={() => { history.push('/register') }}>{t('Register now')}</b></StyleText>
          </IonCol>
        </IonRow>

        <form onSubmit={handleSubmit(handleLogin)} style={{ paddingLeft: '30px', paddingRight: '30px' }}>
          {formFields.map(({ label, name, fieldType, icon, ...otherProps }) => {
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
                              value={value}
                              type={
                                name === "password" ? passwordVisible === true ? "text" : "password" : 'text'
                              }
                              onIonBlur={() => {
                                trigger(name);
                              }}
                              onIonChange={onChange}
                              {...otherProps}>
                            </StyledInput>
                            {
                              name === "password" ?
                                <StyledIcon slot="end" icon={passwordVisible === true ? eyeOffSharp : eyeSharp} onClick={() => setPasswordVisible(!passwordVisible)} /> : null
                            }
                            <IonIcon icon={icon} color='medium' slot='start'></IonIcon>
                          </StyleWrapperInput>
                          {(errors?.username?.message && name === 'username') && <ErrorText >{(errors?.username?.message)}</ErrorText>}
                          {(errors?.password?.message && name === 'password') && <ErrorText >{(errors?.password?.message)}</ErrorText>}
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
                        <IonCol size="12" >
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
          <IonRow className="ion-justify-content-round">
            <IonCol size='6' >
              <StyleText >
                <IonCheckbox style={{ margin: '-25px 10px 0px 5px' }} checked={remember} onIonChange={e => setRemember(e.detail.checked)}></IonCheckbox>
                {t('Remember password')}</StyleText>
            </IonCol>
            <IonCol size="6">
              <StyleText onClick={() => history.push('/forget-password')}>{t('Forgot password')}</StyleText>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12">
              <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <StyledButton type='submit' disabled={submitting}>{t('Login')}</StyledButton>
              </div>
            </IonCol>
          </IonRow>
        </form>
        <IonRow className="ion-justify-content-center">
          <IonCol size="12">
            <div onClick={() => handleLoginWithIncognito()} style={{ textAlign: 'center', marginTop: '10px', color: '#496fb0', fontSize: '17px' }}>
              {t('Anonymous login')}
            </div>
          </IonCol>
        </IonRow>
        <IonRow className="ion-justify-content-center">
          <IonCol size="12">
            <div style={{ textAlign: 'center', marginTop: '10px', color: 'black' }}>
              {t('Or continue with')}
            </div>
          </IonCol>
        </IonRow>
        <div>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" >
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div><FacebookAuthen /></div>
                <div><GoogleAuthen /></div>
              </div>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" >
              <div style={{ textAlign: 'center' }}>
                <StyledSocialSelect
                  placeholder={t('Language')}
                  onIonChange={(e) => i18n.changeLanguage(e.detail.value)}
                >
                  <IonSelectOption value='en'>En</IonSelectOption>
                  <IonSelectOption value='vn'>Vi</IonSelectOption>
                </StyledSocialSelect>
              </div>
            </IonCol>
          </IonRow>
        </div>
      </IonContent >
    </>
  );
};

export default LoginPage;

