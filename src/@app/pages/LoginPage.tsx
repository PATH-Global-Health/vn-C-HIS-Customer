import React, { useState } from 'react';

import styled from 'styled-components';

import { IonIcon, IonContent, IonInput, IonButton, IonRow, IonCol, IonCheckbox, IonToast } from '@ionic/react';
import { lockClosed, phonePortraitOutline, mailOutline, logoFacebook } from 'ionicons/icons';

import useAuth from '@app/hooks/use-auth';
import { useHistory } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

import logo from '../assets/img/logo.png';


const StyleWrapperInput = styled.div`
    background-color: white;
    border: 1px solid #d6d6c2;
    margin-top: 10px;
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
interface InputProps {
  name: string;
  fieldType: string;
  label?: string;
  [otherProps: string]: unknown;
};
interface LoginModel {
  username: string;
  password: string;
  remember: boolean;
}
const formFields: InputProps[] = [
  {
    name: "username",
    fieldType: "input",
    label: "Số điện thoại",
    placeholder: "Số điện thoại",
  },
  {
    name: "password",
    fieldType: "input",
    type: "password",
    label: "Mật khẩu",
    placeholder: "Mật khẩu",
  },
];

const LoginPage: React.FC = () => {
  const history = useHistory();
  const { control, handleSubmit } = useForm();
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
          {formFields.map(({ label, name, fieldType, ...otherProps }) => {
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
                          <StyleWrapperInput>
                            <StyledInput
                              required={true}
                              onIonBlur={onBlur}
                              value={value}
                              onIonChange={onChange}
                              {...otherProps}>
                              {name === 'phoneNumber' ? <StyledIcon icon={phonePortraitOutline} /> : <StyledIcon icon={lockClosed} />}
                            </StyledInput>
                          </StyleWrapperInput>
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
            <StyleText >QUÊN MẬT KHẨU?</StyleText>
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

