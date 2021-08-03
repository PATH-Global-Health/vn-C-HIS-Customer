import React, { useEffect, useRef, useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import styled from 'styled-components';

import { IonIcon, IonContent, IonInput, IonButton, IonRow, IonCol, IonToast, IonText, IonItem } from '@ionic/react';
import { person, lockClosed, phonePortraitOutline, mailOutline } from 'ionicons/icons';

import { useHistory } from 'react-router-dom';
import { Controller, useForm } from "react-hook-form";

import logo from '../assets/img/logo.png';
import authService from '@app/services/auth';
import { useTranslation } from 'react-i18next';


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
    margin-top: 30px;
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
interface RegisterModal {
  username: string;
  password: string;
  phoneNumber: string;
  fullName: string;
  email: string;
}


const RegisterPage: React.FC = () => {
  const history = useHistory();
  const { t, i18n } = useTranslation();
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const formFields: InputProps[] = [
    {
      name: "fullName",
      fieldType: "input",
      label: t('User name'),
      icon: person,
      placeholder: t('User name'),
    },
    {
      name: "phoneNumber",
      fieldType: "input",
      label: t('Phone number'),
      type: 'number',
      icon: phonePortraitOutline,
      placeholder: t('PhoneNumber'),
    },
    {
      name: "email",
      fieldType: "input",
      label: t('Email'),
      type: 'email',
      icon: mailOutline,
      placeholder: t('Email'),
    },
    {
      name: "password",
      fieldType: "input",
      type: "password",
      icon: lockClosed,
      label: t('Password'),
      placeholder: t('Password'),
    },
  ];
  const { control, handleSubmit, register, formState: { errors }, trigger, getValues, setError } = useForm();
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showFailedToast, setShowFailedToast] = useState(false);
  const [passWord, setPasswrod] = useState<string>('');
  const handleRegistry = async (data: RegisterModal): Promise<void> => {
    try {
      const { fullName, phoneNumber, password, email } = data;
      const params = { userName: phoneNumber, password: password, email: email, phoneNumber: phoneNumber, fullName: fullName }
      await authService.createAccount(params);
      setShowSuccessToast(true);
      setTimeout(() => history.push('/login'), 1500);
    } catch (error) {
      setShowFailedToast(true);
    }
  };
  const onChangeCaptcha = (value: any) => {
    console.log(value);
  }

  useEffect(() => {
    register(
      'fullName',
      {
        required: { value: true, message: t('User name not enter') },
        pattern: { value: /^\S*$/, message: t('Username can not contain spaces') },
        minLength: { value: 8, message: t('Username minnimun is 8 characters') },
        maxLength: { value: 35, message: t('Username maximum is 35 characters') },
      }
    );
    register(
      'phoneNumber',
      {
        required: { value: true, message: t('No phone number entered') },
        minLength: { value: 10, message: t('Phone numbers with minnimun is 10 digits') },
        maxLength: { value: 11, message: t('Phone numbers with up to 11 digits') },
        pattern: { value: /^[0-9\b]+$/, message: t('Phone number is not in the correct format') }
      }
    );
    register(
      'email',
      {
        required: { value: true, message: t('Email is not enter') },
        pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: t('The email address is not valid') }
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
  }, [register]);
  return (
    < >
      <IonContent >
        <IonToast
          isOpen={showSuccessToast}
          onDidDismiss={() => setShowSuccessToast(false)}
          color='success'
          message={t('Sign Up Success')}
          duration={1000}
          position="top"
          animated={true}
        />
        <IonToast
          isOpen={showFailedToast}
          onDidDismiss={() => setShowFailedToast(false)}
          color='danger'
          message={t('Registration failed. Registered phone number')}
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
          <IonCol size="12" size-sm='3'>
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
                        <IonCol size="12" size-sm='3'>
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
                          {(errors?.fullName?.message && name === 'fullName') && <ErrorText color='danger'>{(errors?.fullName?.message)}</ErrorText>}
                          {(errors?.phoneNumber?.message && name === 'phoneNumber') && <ErrorText color='danger'>{(errors?.phoneNumber?.message)}</ErrorText>}
                          {(errors?.email?.message && name === 'email') && <ErrorText color='danger'>{(errors?.email?.message)}</ErrorText>}
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
                        <IonCol size="12" size-sm='3'>
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
            <IonCol size="12" size-sm='3'>
              <StyleText >{t('Already have an account') + '?'}<b onClick={() => { history.push('/login') }} style={{ cursor: 'pointer' }} >{t('Login')}</b></StyleText>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" size-sm='3'>
              <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <StyledButton type='submit'>{t('Sign up')}</StyledButton>
              </div>
            </IonCol>
          </IonRow>
        </form>
        <IonRow>
          {/*  <ReCAPTCHA
            //ref={recaptchaRef}
            sitekey="6Lew_9cbAAAAAF2NMLBtcXq_Xp2IG38X2qKz7chA"
            onChange={onChangeCaptcha}
          /> */}
        </IonRow>
      </IonContent>
    </>
  );
};

export default RegisterPage;
