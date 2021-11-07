import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { IonIcon, IonContent, IonInput, IonButton, IonRow, IonCol, IonToast, IonText, IonItem } from '@ionic/react';
import { person, lockClosed, phonePortraitOutline } from 'ionicons/icons';

import { useHistory } from 'react-router-dom';
import { Controller, useForm } from "react-hook-form";

import logo from '../assets/img/logo.png';
import authService from '@app/services/auth';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@app/hooks';
//import ReCAPTCHA from 'react-google-recaptcha';

const StyleWrapperInput = styled(IonItem)`
    background-color: white;
    border: 1px solid #d6d6c2;
    padding-left: 5px;
    margin: 12px 0px 3px 0px;
    border-radius: 10px;
    height: 48px;
    font-size: 18px;
    text-transform: initial;
    box-shadow: 1px 3px 3px 0px rgba(0, 0, 0, 0.2)
`;
const StyledInput = styled(IonInput)`
    color: black;
    margin-top: 2px;
`;
const StyleText = styled.div`
    font-size: 15px;
    color: #010100;
    text-align: end;
    margin: 15px 15px;
`;
const StyleNote = styled.div`
  font-size: 14px; 
  color: #666666;
  padding-left: 35px;
  margin-bottom: -15px
`;
const StyledButton = styled(IonButton)`
    width: 300px;
    --background: #293978;
`;
const StyledHeader = styled.h1`
    font-size: 35px;
    font-weight: 700;
    color: #010100;
    padding-left: 35px;
    margin-top: 20px;
`;
const StyledIcon = styled(IonIcon)`
   margin-right: 30px;
   color:#808080;
`;
const ErrorText = styled(IonText)`
   color: #f46a6a;
   margin-left: 5px;
   font-size: 15px;
`;
interface InputProps {
  name: string;
  fieldType: string;
  icon: string;
  label?: string;
  [otherProps: string]: unknown;
};
const RegisterPage: React.FC = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const formFields: InputProps[] = [
    {
      name: "userName",
      fieldType: "input",
      label: t('Username'),
      icon: person,
      placeholder: t('User name'),
    },
    {
      name: "password",
      fieldType: "input",
      type: "password",
      icon: lockClosed,
      label: t('Password'),
      placeholder: t('Password'),
    },
    {
      name: "fullName",
      fieldType: "input",
      label: t('Your name'),
      icon: person,
      placeholder: t('Your name'),
    },
    {
      name: "phoneNumber",
      fieldType: "input",
      label: t('Phone number'),
      type: 'number',
      icon: phonePortraitOutline,
      placeholder: t('PhoneNumber'),
    },
  ];
  const { control, handleSubmit, register, formState: { errors }, trigger, getValues } = useForm();
  const [remember, setRemember] = useState<boolean>(false)
  const [verifyOTPSuccess, setVerifyOTPSucess] = useState<boolean>(false);
  const [verifyOTPFailed, setVerifyOTPFailed] = useState<boolean>(false);
  const [resgistryFailed, setResgistryFailed] = useState<boolean>(false);
  const { login } = useAuth();

  const handleLogin = async (): Promise<void> => {
    const permissionQuery = {};
    try {
      const { userName, password } = getValues();
      await login(userName, password, remember, permissionQuery);
      history.push('/verify-account');
    } catch (error) {
      console.log(error);
    }
  };
  const handleRegistry = async (): Promise<void> => {
    try {
      const { fullName, phoneNumber, password, userName } = getValues();
      const params = { userName: userName, password: password, phoneNumber: phoneNumber, fullName: fullName }
      await authService.createAccount(params);
      await handleLogin();
    } catch (error) {
      setResgistryFailed(true);
    }
  };
  useEffect(() => {
    register(
      'userName',
      {
        required: { value: true, message: t('Username not enter') },
        pattern: { value: /^\S*$/, message: t('Username can not contain spaces') },
        minLength: { value: 4, message: t('Username minimum is 4 characters') },
        maxLength: { value: 35, message: t('Username maximum is 35 characters') },
      }
    );
    register(
      'fullName',
      {
        required: { value: true, message: t('full name not entered') },
        minLength: { value: 4, message: t('Fullname minimum is 4 characters') },
        maxLength: { value: 35, message: t('Fullname maximum is 35 characters') },
      }
    );
    register(
      'phoneNumber',
      {
        //required: { value: true, message: t('No phone number entered') },
        minLength: { value: 10, message: t('Phone numbers with minimum is 10 digits') },
        maxLength: { value: 11, message: t('Phone numbers with up to 11 digits') },
        pattern: { value: /^[0-9\b]+$/, message: t('Phone number is not in the correct format') }
      }
    );
    register(
      'password',
      {
        required: { value: true, message: t('Password not entered') },
        minLength: { value: 8, message: t('Password minimum is 8 characters') },
        maxLength: { value: 12, message: t('Password maximum is 12 characters') },
        validate: value => value === getValues('phoneNumber') ? t('Password is not duplicate with phone number').toString() : true
      }
    );
    register('otp');
  }, [register, t, getValues]);
  return (
    < >
      <IonContent >
        <IonToast
          isOpen={verifyOTPSuccess}
          onDidDismiss={() => setVerifyOTPSucess(false)}
          color='success'
          message={t('Successful authentication!')}
          duration={1000}
          position="top"
          animated={true}
        />
        <IonToast
          isOpen={verifyOTPFailed}
          onDidDismiss={() => setVerifyOTPFailed(false)}
          color='danger'
          message={t('Incorrect code!')}
          duration={1000}
          position="top"
          animated={true}
        />
        <IonToast
          isOpen={resgistryFailed}
          onDidDismiss={() => setResgistryFailed(false)}
          color='danger'
          message={t('Registry failed! This account already exist')}
          duration={1000}
          position="top"
          animated={true}
        />
        <IonRow >
          <IonCol >
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <img width='300px' src={logo} alt="logo" />
            </div>
          </IonCol>
        </IonRow>
        <IonRow className="ion-justify-content-center">
          <IonCol size="12">
            <StyledHeader >{t('Sign up')}</StyledHeader>
            <StyleNote>{t('Please complete all information')}</StyleNote>
          </IonCol>
        </IonRow>
        <form onSubmit={handleSubmit(handleRegistry)} style={{ paddingLeft: '25px', paddingRight: '25px' }}>
          {formFields.map(({ label, name, icon, fieldType, ...otherProps }) => {
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
                              onIonChange={onChange}
                              onIonBlur={() => {
                                trigger(name);
                              }}
                              {...otherProps}>
                              <StyledIcon icon={icon} />
                            </StyledInput>
                          </StyleWrapperInput>
                          {(errors?.userName?.message && name === 'userName') && <ErrorText color='danger'>{(errors?.userName?.message)}</ErrorText>}
                          {(errors?.fullName?.message && name === 'fullName') && <ErrorText color='danger'>{(errors?.fullName?.message)}</ErrorText>}
                          {(errors?.phoneNumber?.message && name === 'phoneNumber') && <ErrorText color='danger'>{(errors?.phoneNumber?.message)}</ErrorText>}
                          {(errors?.password?.message && name === 'password') && <ErrorText color='danger'>{(errors?.password?.message)}</ErrorText>}
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
                          <StyleWrapperInput color='light' lines='none'>
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
            <IonCol size="12" >
              <StyleText >{t('Already have an account') + '?'}<b onClick={() => { history.push('/login') }} style={{ cursor: 'pointer' }} >{t('Login')}</b></StyleText>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center ">
            <IonCol size="12">
              <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <StyledButton type='submit'>{t('Sign up')}</StyledButton>
              </div>
            </IonCol>
          </IonRow>
        </form>
      </IonContent>
    </>
  );
};

export default RegisterPage;

