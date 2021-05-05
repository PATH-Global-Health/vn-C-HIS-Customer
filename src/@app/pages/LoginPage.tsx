import React, { useState } from 'react';
import { IonIcon, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider, IonButton, IonGrid, IonRow, IonCol, IonCheckbox } from '@ionic/react';
import { person, call, lockClosed, phonePortraitOutline, mailOutline, logoFacebook } from 'ionicons/icons';
import logo from '../assets/img/logo.png';
import styled from 'styled-components';
const StyleWrapperInput = styled.div`
    background-color: white;
    border: 1px solid #d6d6c2;
    margin-top: 20px;
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
    margin-top: 20px;
    font-weight: 500;
    cursor:pointer;
`;
const StyledButton = styled(IonButton)`
    width: 300px;
    --background: #293978;
    
`
const StyledSocialButton = styled(IonButton)`
    border: 0.5px solid #d6d6c2;
    width: 250px;
    --background: white;
`
const StyledHeader = styled.h1`
    font-size: 35px;
    font-weight: 700;
    color: #010100;
    padding-left: 35px;
    margin-top: 30px;
`
const StyledIcon = styled(IonIcon)`
   margin-right: 20px;
   color:#808080;
    
`
const StyledWrapper = styled.div`
    padding-left: 35px;
    padding-right: 35px;
`
const LoginPage: React.FC = () => {
    const [text, setText] = useState<string>();
    const [number, setNumber] = useState<number>();
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
                    <IonCol offset="1" size='6' size-sm='5'>
                        <StyleText ><IonCheckbox style={{ marginTop: '-15px', marginRight: '10px' }} checked={true}></IonCheckbox>Nhớ mật khẩu</StyleText>
                    </IonCol>
                    <IonCol size="5" size-sm='2'>
                        <StyleText >QUÊN MẬT KHẨU?</StyleText>
                    </IonCol>
                </IonRow>
                <IonRow className="ion-justify-content-center">
                    <IonCol size="12" size-sm='3'>
                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
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
                <StyledWrapper>
                    <IonRow className="ion-justify-content-center">
                        <IonCol size="12" size-sm='3'>
                            <div style={{ textAlign: 'center' }}>
                                <StyledSocialButton >
                                    <StyledIcon icon={mailOutline} />
                                    <span style={{ color: 'black' }}>Tiếp tục bằng Gmail</span>
                                </StyledSocialButton>
                            </div>
                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                        <IonCol size="12" size-sm='3'>
                            <div style={{ textAlign: 'center' }}>
                                <StyledSocialButton >
                                    <StyledIcon icon={logoFacebook} style={{ color: '#0066ff' }} />
                                    <span style={{ color: 'black' }}>Tiếp tục bằng facebook</span>
                                </StyledSocialButton>
                            </div>
                        </IonCol>
                    </IonRow>
                </StyledWrapper>

            </IonContent >
        </>
    );
};

export default LoginPage;
