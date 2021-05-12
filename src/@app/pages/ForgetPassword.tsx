import React from 'react';
import styled from 'styled-components';

import {
  IonAvatar,
  IonButton,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonRouterOutlet,
  IonRow,
} from '@ionic/react';
import {
  person,
  chevronForwardOutline,
  logOutOutline,
  linkOutline,
  qrCodeOutline,
  lockClosed,
  shieldCheckmark,
  chevronBackOutline,
} from 'ionicons/icons';

import { useHistory } from "react-router-dom";

import logo from '@app/assets/img/logo.png'

const StyledItem = styled(IonItem)`
  margin: 0px 15px;
  --min-height: 20px;
  
`;
const StyledSocialButton = styled(IonButton)`
    border: 0.5px solid #d6d6c2;
    color: #7b7b7b;
    font-weight: 600;
    width: 300px;
    --background: white;
`;
const StyledIcon = styled(IonIcon)`
  margin: 25px 30px 15px 0px;
  padding: 11px 11px;
  font-size: 15px;
  border-radius: 10px;
  color: white;
  align-item: center;
`;
const StyledText = styled(IonLabel)`
  font-size: 22px;
  font-weight: 600;
`
interface OptionProps {
  icon: string;
  label: string;
  color: string;
  [otherProps: string]: unknown;
};

const optionFields: OptionProps[] = [
  {
    icon: "person",
    label: "Thông tin cá nhân",
    color: "#409f4e",
  },
  {
    icon: "update",
    label: "Cập nhật thông tin",
    color: "#6f3391"
  },
  {
    icon: "change",
    label: "Đổi mật khẩu",
    color: "#e13b3b"
  },
  {
    icon: "security",
    label: "Cài đặt bảo mật",
    color: "#f1c248"
  },
  {
    icon: "qr",
    label: "Mã QR của tôi",
    color: "#3ac6e1"
  },
];
const ForgetPassword: React.FC = () => {
  const history = useHistory();
  return (
    <>
      <IonContent>
        <IonHeader className='ion-margin-bottom' >
          <IonItem color='light' style={{ margin: '15px 20px 0px 10px' }}>
            <IonIcon icon={chevronBackOutline} color='dark'></IonIcon>
          </IonItem>
        </IonHeader>
        <IonRow className="ion-justify-content-center">
          <IonCol size='12' size-sm='6'>
            <div style={{ color: 'black', textAlign: 'center' }} >
              CHỌN PHƯƠNG THỨC LẤY LẠI MẬT KHẨU
            </div>
          </IonCol>

        </IonRow>
        <div>
          {
            optionFields.map(({ icon, label, color, ...otherProps }) => {
              return (
                <IonRow >
                  <IonCol size="12" size-sm='3'>
                    <StyledItem color='light'
                    //onClick={() => { icon === 'change' ? history.push('/change-password') : history.push('/ForgetPassword') }}

                    >
                      <StyledIcon
                        icon={
                          icon === 'person' ? person
                            : icon === 'update' ? linkOutline
                              : icon === 'change' ? lockClosed
                                : icon === 'security' ? shieldCheckmark
                                  : qrCodeOutline
                        }
                        style={{ backgroundColor: color }}>
                      </StyledIcon>
                      <StyledText >
                        {label}
                      </StyledText>
                      <IonIcon icon={chevronForwardOutline} color='medium'>
                      </IonIcon>
                    </StyledItem>
                  </IonCol>
                </IonRow>
              )

            })
          }
        </div>
        <IonRow className="ion-justify-content-center">
          <IonCol size="12" size-sm='4' size-lg='3'>
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <StyledSocialButton type='submit' onClick={() => console.log('123123')} >
                <IonIcon icon={logOutOutline} style={{ marginRight: '20px' }} ></IonIcon>
              ĐĂNG XUẤT
              </StyledSocialButton>
            </div>
          </IonCol>
        </IonRow>
      </IonContent>
    </>
  );
};

export default ForgetPassword;
