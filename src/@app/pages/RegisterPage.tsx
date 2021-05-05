import React, { useState } from 'react';
import { IonIcon, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider, IonButton, IonButtons } from '@ionic/react';
import StyleInput from './component/StyleInput';
import { person, call, lockClosed, phonePortraitOutline } from 'ionicons/icons';
import logo from '../assets/img/logo.png';
const RegisterPage: React.FC = () => {
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
                    <div
                        style={{
                            backgroundColor: 'white',
                            border: '1px solid #d6d6c2',
                            marginTop: '35px',
                            height: '48px',
                            fontSize: '18px',
                            textTransform: 'initial',
                            boxShadow: '1px 8px 8px 0px rgba(0, 0, 0, 0.05)',
                        }}>
                        <IonInput style={{ color: 'black', marginTop: '2px', marginLeft: '40px' }} placeholder="Tên của bạn">
                            <IonIcon icon={person} style={{ marginRight: '20px' }} />
                        </IonInput>
                    </div>
                    <div
                        style={{
                            backgroundColor: 'white',
                            border: '1px solid #d6d6c2',
                            marginTop: '25px',
                            height: '48px',
                            fontSize: '18px',
                            textTransform: 'initial',
                            boxShadow: '1px 8px 8px 0px rgba(0, 0, 0, 0.05)',

                        }}>
                        <IonInput style={{ color: 'black', marginTop: '2px', marginLeft: '40px' }} placeholder="Số điện thoại">
                            <IonIcon icon={phonePortraitOutline} style={{ marginRight: '20px' }} />
                        </IonInput>
                    </div>
                    <div
                        style={{
                            backgroundColor: 'white',
                            border: '1px solid #d6d6c2',
                            marginTop: '25px',
                            height: '48px',
                            fontSize: '18px',
                            textTransform: 'initial',
                            boxShadow: '1px 8px 8px 0px rgba(0, 0, 0, 0.05)',

                        }}>
                        <IonInput style={{ color: 'black', marginTop: '2px', marginLeft: '40px' }} placeholder="Mật khẩu">
                            <IonIcon icon={lockClosed} style={{ marginRight: '20px' }} />
                        </IonInput>
                    </div>
                </form>
                <div style={{ fontSize: '15px', color: '#010100', textAlign: 'end', marginRight: '35px', marginTop: '20px' }}>Đã có tài khoản? <b>Đăng nhập ngay</b></div>
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <IonButton style={{ width: '300px', }} color='primary'>Đăng kí</IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default RegisterPage;
