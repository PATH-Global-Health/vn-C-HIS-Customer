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
    box-shadow: 1px 8px 8px 0px
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
    --background: #001a80;
    
`
const StyledIcon = styled(IonIcon)`
   margin-right: 20px;
   color:#808080;
    
`
const RegisterPage: React.FC = () => {
    const [text, setText] = useState<string>();
    const [number, setNumber] = useState<number>();
    return (
        < >
            <IonContent >
                <IonRow>
                    <IonCol>
                        <div style={{ textAlign: 'center', marginTop: '50px' }}>
                            <img width='300px' src={logo} alt="logo" />
                        </div>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <h1 style={{ fontSize: '35px', fontWeight: 700, color: '#010100', paddingLeft: '35px', marginTop: '50px' }}>Đăng Kí</h1>
                        <div style={{ fontSize: '14px', color: '#666666', paddingLeft: '35px', marginBottom: '-15px' }}> Vui lòng điền đầy đủ thông tin</div>
                    </IonCol>
                </IonRow>

                <form style={{ paddingLeft: '30px', paddingRight: '30px' }}>
                    <IonRow>
                        <IonCol size="12" size-md>
                            <StyleWrapperInput>
                                <StyledInput placeholder="Tên của bạn">
                                    <StyledIcon icon={person} />
                                </StyledInput>
                            </StyleWrapperInput>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="12" size-md>
                            <StyleWrapperInput>
                                <StyledInput placeholder="Số điện thoại">
                                    <StyledIcon icon={phonePortraitOutline} />
                                </StyledInput>
                            </StyleWrapperInput>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="12" size-md>
                            <StyleWrapperInput>
                                <StyledInput placeholder="Mật khẩu" type='password'>
                                    <StyledIcon icon={lockClosed} />
                                </StyledInput>
                            </StyleWrapperInput>
                        </IonCol>
                    </IonRow>

                </form>
                <IonRow>
                    <IonCol size="12" size-md>
                        <StyleText>Đã có tài khoản? <b>Đăng nhập ngay</b></StyleText>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol size="12" size-md>
                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
                            <StyledButton>Đăng kí</StyledButton>
                        </div>
                    </IonCol>
                </IonRow>

            </IonContent>
        </>
    );
};

export default RegisterPage;
