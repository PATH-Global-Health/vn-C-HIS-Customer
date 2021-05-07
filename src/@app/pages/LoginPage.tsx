import React from 'react';

import styled from 'styled-components';
import { IonIcon, IonContent, IonInput, IonButton, IonRow, IonCol, IonCheckbox } from '@ionic/react';
import { lockClosed, phonePortraitOutline, mailOutline, logoFacebook, logoInstagram } from 'ionicons/icons';

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
    margin-right: 35px;
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
   margin-right: 20px;
   color: #808080;
`;
const StyledSocialText = styled.span`
  color:#010100;
  text-transform: capitalize;
`;
const LoginPage: React.FC = () => {
  return (
    <>
      <IonContent >
        <IonRow >
          <IonCol >
            <div style={{ textAlign: 'center', marginTop: '30px' }}>
              <img width='300px' src={logo} alt="logo" />
            </div>
          </IonCol>
        </IonRow>
        <IonRow className="ion-justify-content-center">
          <IonCol size="12" size-sm='3'>
            <StyledHeader >ĐĂNG NHẬP</StyledHeader>
            <StyleText>Chưa có tài khoản? <b>Đăng kí ngay</b></StyleText>
          </IonCol>
        </IonRow>

        <form style={{ paddingLeft: '30px', paddingRight: '30px' }}>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" size-sm='3'>
              <StyleWrapperInput>
                <StyledInput placeholder="Số điện thoại">
                  <StyledIcon icon={phonePortraitOutline} />
                </StyledInput>
              </StyleWrapperInput>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" size-sm='3'>
              <StyleWrapperInput>
                <StyledInput placeholder="Mật khẩu" type='password'>
                  <StyledIcon icon={lockClosed} />
                </StyledInput>
              </StyleWrapperInput>
            </IonCol>
          </IonRow>

        </form>
        <IonRow className="ion-justify-content-round">
          <IonCol size='6' size-sm='6'>
            <StyleText ><IonCheckbox style={{ margin: '-25px 10px 0px 5px' }} checked={true}></IonCheckbox>Nhớ mật khẩu</StyleText>
          </IonCol>
          <IonCol size="6" size-sm='2'>
            <StyleText >QUÊN MẬT KHẨU?</StyleText>
          </IonCol>
        </IonRow>
        <IonRow className="ion-justify-content-center">
          <IonCol size="12" size-sm='3'>
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <StyledButton>ĐĂNG NHẬP</StyledButton>
            </div>
          </IonCol>
        </IonRow>
        <IonRow className="ion-justify-content-center">
          <IonCol size="12" size-sm='3'>
            <div style={{ textAlign: 'center', marginTop: '10px', color: 'black' }}>
              Hoặc
                        </div>
          </IonCol>
        </IonRow>
        <div>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" size-sm='3'>
              <div style={{ textAlign: 'center' }}>
                <StyledSocialButton>
                  <StyledIcon icon={mailOutline} />
                  <StyledSocialText>Tiếp tục bằng Gmail</StyledSocialText>
                </StyledSocialButton>
              </div>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" size-sm='3'>
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