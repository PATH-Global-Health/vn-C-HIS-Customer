import React from 'react';
import styled from 'styled-components';

import {
  IonAvatar,
  IonButton,
  IonCol,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
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
} from 'ionicons/icons';

import { useHistory } from "react-router-dom";

import logo from '@app/assets/img/logo.png'
import avatar from '@app/assets/img/avatar.png';

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
const Home: React.FC = () => {
  const history = useHistory();
  return (
    <>
      <IonContent>
        <IonRow className="ion-justify-content-center " >
          <IonCol size="4" size-sm="3">
            <div>
              <img src={logo} alt="logo" width='150px' />
            </div>
          </IonCol>
        </IonRow>
        <IonRow className="ion-justify-content-center">
          <IonCol size="6" size-sm="4" offset='4'>
            <IonAvatar style={{
              '--border-radius': '50px'
            }}>
              <img src={avatar} width='100px' />
            </IonAvatar>
          </IonCol>
        </IonRow>
        <div style={{ textAlign: 'center', color: 'black' }}>
          <div>
            <StyledText>
              Đoàn Thanh Hoàng
        </StyledText>
          </div>
          <div></div>
          <IonNote>
            0909090812
        </IonNote>
        </div>

        <div>
          {
            optionFields.map(({ icon, label, color, ...otherProps }) => {
              return (
                <IonRow >
                  <IonCol size="12" size-sm='3'>
                    <StyledItem color='light'
                      onClick={() => { icon === 'change' ? history.push('/change-password') : history.push('/home') }}

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
              <StyledSocialButton type='submit' onClick={() => history.push('/login')} >
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

export default Home;
