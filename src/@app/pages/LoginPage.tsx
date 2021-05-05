import React, { useState } from 'react';
import { IonIcon, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider, IonButton, IonGrid, IonRow, IonCol } from '@ionic/react';
import { person, call, lockClosed, phonePortraitOutline } from 'ionicons/icons';
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
`;
const StyledButton = styled(IonButton)`
    width: 300px;
    --background: #293978;
    
`
const StyledHeader = styled.h1`
    font-size: 35px;
    font-weight: 700;
    color: #010100;
    padding-left: 35px;
    margin-top: 50px;
`
const StyledIcon = styled(IonIcon)`
   margin-right: 20px;
   color:#808080;
    
`

const LoginPage: React.FC = () => {
    const [text, setText] = useState<string>();
    const [number, setNumber] = useState<number>();
    return (
        < >
            <IonContent >
                <IonRow >
                    <IonCol >
                        <div style={{ textAlign: 'center', marginTop: '50px' }}>
                            <img width='300px' src={logo} alt="logo" />
                        </div>
                    </IonCol>
                </IonRow>
                <IonRow className="ion-justify-content-center">
                    <IonCol size="12" size-sm='3'>
                        <StyledHeader >Đăng Kí</StyledHeader>
                        <div style={{ fontSize: '14px', color: '#666666', paddingLeft: '35px', marginBottom: '-15px' }}> Vui lòng điền đầy đủ thông tin</div>
                    </IonCol>
                </IonRow>

                <form style={{ paddingLeft: '30px', paddingRight: '30px' }}>
                    <IonRow className="ion-justify-content-center">
                        <IonCol size="12" size-sm='3'>
                            <StyleWrapperInput>
                                <StyledInput placeholder="Tên của bạn">
                                    <StyledIcon icon={person} />
                                </StyledInput>
                            </StyleWrapperInput>
                        </IonCol>
                    </IonRow>
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
                <IonRow className="ion-justify-content-center">
                    <IonCol size="12" size-sm='3'>
                        <StyleText >Đã có tài khoản? <b style={{ cursor: 'pointer' }}>Đăng nhập ngay</b></StyleText>
                    </IonCol>
                </IonRow>
                <IonRow className="ion-justify-content-center">
                    <IonCol size="12" size-sm='3'>
                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
                            <StyledButton>Đăng kí</StyledButton>
                        </div>
                    </IonCol>
                </IonRow>

            </IonContent>
        </>
    );
};

export default LoginPage;
