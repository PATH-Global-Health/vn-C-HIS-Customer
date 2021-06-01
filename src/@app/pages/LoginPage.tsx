import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { IonIcon, IonContent, IonInput, IonButton, IonRow, IonCol, IonCheckbox, IonToast, IonItem, IonText } from '@ionic/react';
import { lockClosed, phonePortraitOutline, mailOutline, logoFacebook } from 'ionicons/icons';

import useAuth from '@app/hooks/use-auth';
import { useHistory } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

import logo from '../assets/img/logo.png';

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
    margin-right: 20px;
    margin-top: 10px;
    font-weight: 500;
    cursor:pointer;
`;
const StyledButton = styled(IonButton)`
    width: 300px;
    --background: #293978;
`;

const StyledSocialButton = styled(IonButton)`
    border: 0.5px solid #d6d6c2;
    width: 250px;
    --background: white;
`;

const StyledHeader = styled.h1`
    font-size: 35px;
    font-weight: 700;
    color: #010100;
    padding-left: 35px;
    margin-top: 10px;
`;

const StyledIcon = styled(IonIcon)`
  display: flex;
   margin-right: 20px;
   color: #808080;
`;
const StyledSocialText = styled.span`
  color:#010100;
  text-transform: capitalize;
`;
const ErrorText = styled(IonText)`
   color: #f46a6a;
   margin-left: 5px;
   font-size: 15px;
`
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
const formFields: InputProps[] = [
  {
    icon: phonePortraitOutline,
    name: "username",
    fieldType: "input",
    label: "Số điện thoại",
    placeholder: "Số điện thoại",
  },
  {
    icon: lockClosed,
    name: "password",
    fieldType: "input",
    type: "password",
    label: "Mật khẩu",
    placeholder: "Mật khẩu",
  },
];

const LoginPage: React.FC = () => {
  const history = useHistory();
  const { control, handleSubmit, register, formState: { errors }, trigger } = useForm();
  const { login } = useAuth();
  const permissionQuery = {};
  const [remember, setRemember] = useState(true)
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showFailedToast, setShowFailedToast] = useState(false);
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
        required: { value: true, message: "Chưa nhập số điện thoại. " },
        maxLength: { value: 10, message: "Số điện thoại tối đa 10 số. " },
        pattern: { value: /^[0-9\b]+$/, message: "Số điện thoại không đúng định dạng. " }
      }
    );
    register(
      'password',
      {
        required: { value: true, message: "Chưa nhập mật khẩu. " },
        minLength: { value: 5, message: "Mật khẩu tối thiểu 5 kí tự. " },
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
          message="Đăng nhập thành công !"
          duration={1000}
          position="top"
          animated={true}
        />
        <IonToast
          isOpen={showFailedToast}
          onDidDismiss={() => setShowFailedToast(false)}
          color='danger'
          message="Sai mật khẩu hoặc số điện thoại !"
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
            <StyledHeader >ĐĂNG NHẬP</StyledHeader>
            <StyleText >Chưa có tài khoản? <b onClick={() => { history.push('/register') }}>Đăng kí ngay</b></StyleText>
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
                              onIonBlur={() => {
                                trigger(name);
                              }}
                              onIonChange={onChange}
                              {...otherProps}>
                            </StyledInput>
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

          <IonRow className="ion-justify-content-center">
            <IonCol size="12" size-sm='4' size-lg='3'>
              <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <StyledButton type='submit'>ĐĂNG NHẬP</StyledButton>
              </div>
            </IonCol>
          </IonRow>
        </form>
        <IonRow className="ion-justify-content-round">
          <IonCol size='6' size-sm='6'>
            <StyleText >
              <IonCheckbox style={{ margin: '-25px 10px 0px 5px' }} checked={remember} onIonChange={e => setRemember(e.detail.checked)}></IonCheckbox>
            Nhớ mật khẩu</StyleText>
          </IonCol>
          <IonCol size="6" size-sm='2'>
            <StyleText onClick={() => history.push('/forget-password')}>QUÊN MẬT KHẨU?</StyleText>
          </IonCol>
        </IonRow>
        <IonRow className="ion-justify-content-center">
          <IonCol size="12" size-sm='4'>
            <div style={{ textAlign: 'center', marginTop: '10px', color: 'black' }}>
              Hoặc
                        </div>
          </IonCol>
        </IonRow>
        <div>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" size-sm='4'>
              <div style={{ textAlign: 'center' }}>
                <StyledSocialButton>
                  <StyledIcon icon={mailOutline} />
                  <StyledSocialText>Tiếp tục bằng Gmail</StyledSocialText>
                </StyledSocialButton>
              </div>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" size-sm='4'>
              <div style={{ textAlign: 'center' }}>
                <StyledSocialButton >
                  <StyledIcon icon={logoFacebook} style={{ color: '#4267B2' }} />
                  <StyledSocialText>Tiếp tục bằng facebook </StyledSocialText>
                </StyledSocialButton>
              </div>
            </IonCol>
          </IonRow>
        </div>
      </IonContent >
    </>
  );
};

export default LoginPage;

