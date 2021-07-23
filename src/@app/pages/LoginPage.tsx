import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { IonIcon, IonContent, IonInput, IonButton, IonRow, IonCol, IonCheckbox, IonToast, IonItem, IonText, IonSelect, IonSelectOption, IonModal } from '@ionic/react';
import { lockClosed, phonePortraitOutline, mailOutline, logoFacebook, language, eyeOffSharp, eyeSharp } from 'ionicons/icons';

import useAuth from '@app/hooks/use-auth';
import { useHistory } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

import logo from '../assets/img/logo.png';
import { useTranslation } from 'react-i18next';
import Facebook from '@app/components/login/FacebookLogin';
import GoogleAuthen from '@app/components/login/GoogleLogin';

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
const StyledIconSocial = styled(IonIcon)`
  margin: 15px 20px 10px 15px;
  padding: 15px 15px;
  font-size: 20px;
  border: 1px solid #9dabdd;
  border-radius: 50px;
  color: black;
  align-item: center;
`;
const StyledGoogleAuthen = styled.div`
  margin: 15px 20px 10px 15px;
  padding: 15px 15px;
  font-size: 20px;
  border: 1px solid #9dabdd;
  border-radius: 50px;
  color: black;
  align-item: center;
`;
const StyledIcon = styled(IonIcon)`
   font-size: 20px;
   color: #5d6060;
`;
const StyledModal = styled(IonModal)`
  & .my-custom-class{
    --background:  white !important;
  }
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
      icon: phonePortraitOutline,
      name: "username",
      fieldType: "input",
      label: t('PhoneNumber'),
      placeholder: t('PhoneNumber'),
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
  const { login } = useAuth();
  const permissionQuery = {};
  const [remember, setRemember] = useState(true)
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showFailedToast, setShowFailedToast] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleLogin = async (data: LoginModel): Promise<void> => {
    try {
      const { username, password } = data;
      await login(username, password, remember, permissionQuery);
      setShowSuccessToast(true);
      setTimeout(() => history.push('/home'), 1500);
    } catch (error) {
      setShowFailedToast(true);
    }
  };
  useEffect(() => {
    register(
      'username',
      {
        required: { value: true, message: t('No phone number entered') },
        maxLength: { value: 10, message: t('Phone numbers with up to 10 digits') },
        pattern: { value: /^[0-9\b]+$/, message: t('Phone number is not in the correct format') }
      }
    );
    register(
      'password',
      {
        required: { value: true, message: t('Password not entered') },
        minLength: { value: 8, message: t('Password minimum 8 characters') },
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
          message={t('Wrong password or phone number')}
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
          <IonCol size="12" size-sm='4' size-md='5' size-lg='4'>
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
                        <IonCol size="12" size-sm='4' size-lg='3'>
                          <StyleWrapperInput color='light' lines='none'>
                            <StyledInput
                              value={value}
                              type={
                                name === "password" ? passwordVisible === true ? "text" : "password" : 'number'
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
                        <IonCol size="12" size-sm='4' size-lg='3'>
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
            <IonCol size='6' size-sm='6'>
              <StyleText >
                <IonCheckbox style={{ margin: '-25px 10px 0px 5px' }} checked={remember} onIonChange={e => setRemember(e.detail.checked)}></IonCheckbox>
                {t('Remember password')}</StyleText>
            </IonCol>
            <IonCol size="6" size-sm='2'>
              <StyleText onClick={() => history.push('/forget-password')}>{t('Forgot password')}</StyleText>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" size-sm='4' size-lg='3'>
              <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <StyledButton type='submit'>{t('Login')}</StyledButton>
              </div>
            </IonCol>
          </IonRow>
        </form>
        <IonRow className="ion-justify-content-center">
          <IonCol size="12" size-sm='4'>
            <div style={{ textAlign: 'center', marginTop: '10px', color: '#496fb0' }}>
              {t('ignore')}
            </div>
          </IonCol>
        </IonRow>
        <IonRow className="ion-justify-content-center">
          <IonCol size="12" size-sm='4'>
            <div style={{ textAlign: 'center', marginTop: '10px', color: 'black' }}>
              {t('Or continue with')}
            </div>
          </IonCol>
        </IonRow>
        <div>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" size-sm='4'>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                {/* <StyledIconSocial icon={phonePortraitOutline} color='primary' /> */}
                <StyledIconSocial icon={logoFacebook} color='primary' onClick={() => setShowModal(true)} />
                <div><GoogleAuthen /></div>
              </div>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" size-sm='4'>
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
        <IonModal isOpen={showModal} cssClass='my-custom-class'>
          <Facebook />
          <IonButton onClick={() => setShowModal(false)}>{t('Close Modal')}</IonButton>
        </IonModal>
      </IonContent >
    </>
  );
};

export default LoginPage;

