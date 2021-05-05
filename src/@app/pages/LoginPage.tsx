import React, { useState } from 'react';
import { IonIcon, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider, IonButton, IonButtons } from '@ionic/react';
import { person, call, lockClosed, phonePortraitOutline } from 'ionicons/icons';
import logo from '../assets/img/logo.png';
import styled from 'styled-components';
const StyleWrapperInput = styled.div`
    background-color: white;
    border: 1px solid #d6d6c2;
    margin-top: 35px;
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
const WrapperDropzone = styled(IonButton)`
    width: 100%;
    & .dropzone {
        width: 100%;
        & .dz-message {
            width: 100%;
            border: 2px dotted LightGray;
            background-color:#F4F7F0;
            padding: 30px 20px;
            border-radius:5px;
            margin-bottom:10px;
            cursor:pointer;
            & .message {
                text-align: center;
                & svg {
                    padding-top: .5rem;
                    font-size: 50px;
                }
                & .label {
                    display: block;
                    font-weight: bold;
                }
            }
        }
    }
`;
const StyledButton = styled(IonButton)`
    width: 350px;
    & .host{
        .button-solid){
        background: red;
        }
    }
`
const LoginPage: React.FC = () => {
    const [text, setText] = useState<string>();
    const [number, setNumber] = useState<number>();
    return (
        <IonPage >
            <IonHeader className='ion-no-border'>

            </IonHeader>
            <IonContent style={{ backgroundColor: 'white' }}>
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <img width='300px' src={logo} alt="logo" />
                </div>
                <h1 style={{ fontSize: '35px', fontWeight: 700, color: '#010100', paddingLeft: '35px', marginTop: '50px' }}>Đăng Kí</h1>
                <div style={{ fontSize: '14px', color: '#666666', paddingLeft: '35px', marginBottom: '-15px' }}> Vui lòng điền đầy đủ thông tin</div>
                <form style={{ paddingLeft: '30px', paddingRight: '30px' }}>
                    <StyleWrapperInput>
                        <StyledInput placeholder="Tên của bạn">
                            <IonIcon icon={person} style={{ marginRight: '20px', color: '#808080' }} />
                        </StyledInput>
                    </StyleWrapperInput>
                    <StyleWrapperInput>
                        <StyledInput placeholder="Số điện thoại">
                            <IonIcon icon={phonePortraitOutline} style={{ marginRight: '20px', color: '#808080' }} />
                        </StyledInput>
                    </StyleWrapperInput>
                    <StyleWrapperInput>
                        <StyledInput placeholder="Mật khẩu" type='password'>
                            <IonIcon icon={lockClosed} style={{ marginRight: '20px', color: '#808080' }} />
                        </StyledInput>
                    </StyleWrapperInput>
                </form>
                <div style={{ fontSize: '15px', color: '#010100', textAlign: 'end', marginRight: '35px', marginTop: '20px' }}>Đã có tài khoản? <b>Đăng nhập ngay</b></div>
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <StyledButton >Đăng kí</StyledButton>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default LoginPage;
