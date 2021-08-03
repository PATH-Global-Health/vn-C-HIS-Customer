import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import {
  IonAlert,
  IonAvatar,
  IonButton,
  IonCol,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
  IonRow,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import {
  person,
  chevronForwardOutline,
  logOutOutline,
  linkOutline,
  qrCodeOutline,
  lockClosed,
  shieldCheckmark,
  language,
} from 'ionicons/icons';

import { useHistory } from "react-router-dom";

import logo from '@app/assets/img/logo.png'
import avatar from '@app/assets/img/avatar.png';
import { useTranslation } from 'react-i18next';
import { useAuth, useDispatch, useSelector } from '@app/hooks';
import { getProfile } from './profile/profile.slice';


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


const Account: React.FC = () => {
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { logout } = useAuth();
  const [showAlert, setShowAlert] = useState(false);
  const { profile } = useSelector((s) => s.profile);

  const optionFields: OptionProps[] = [
    {
      name: "profile",
      icon: "person",
      label: t('Personal information'),
      color: "#409f4e",
    },
    {
      name: "change-password",
      icon: "change",
      label: t('Change Password'),
      color: "#e13b3b"
    },
    {
      name: "security",
      icon: "security",
      label: t('Security Settings'),
      color: "#f1c248"
    },
    /*   {
        name: "qr",
        icon: "qr",
        label: t('My QR Code'),
        color: "#3ac6e1"
      }, */
  ];
  const getData = useCallback(() => {
    dispatch(getProfile());
  }, [dispatch]);
  useEffect(getData, [getData]);
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
              {profile?.fullname}
            </StyledText>
          </div>
          <div></div>
          <IonNote>
            {profile?.phoneNumber}
          </IonNote>
        </div>

        <div>
          {
            optionFields.map(({ name, icon, label, color, ...otherProps }, idx) => {
              return (
                <IonRow key={idx}>
                  <IonCol size="12" size-sm='3'>
                    <StyledItem color='light'
                      onClick={() => {
                        name === 'change-password' ? history.push('/change-password')
                          : name === 'profile' ? history.push('/profile')
                            : name === 'security' ? history.push('/security-question')
                              : history.push('/account')
                      }}

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
          <IonRow >
            <IonCol size="12" size-sm='3'>
              <StyledItem color='light'
              // onClick={() => { icon === 'change' ? history.push('/change-password') : history.push('/account') }}
              >
                <StyledIcon
                  icon={language}
                  style={{ backgroundColor: "#293978" }}>
                </StyledIcon>
                <StyledText >
                  {t("Language")}
                </StyledText>
                <IonSelect onIonChange={(e) => i18n.changeLanguage(e.detail.value)}>
                  <IonSelectOption value='en'>En</IonSelectOption>
                  <IonSelectOption value='vn'>Vi</IonSelectOption>
                </IonSelect>
              </StyledItem>
            </IonCol>
          </IonRow>
        </div>
        <IonRow className="ion-justify-content-center">
          <IonCol size="12" size-sm='4' size-lg='3'>
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <StyledSocialButton
                type='submit'
                onClick={() => setShowAlert(true)}
              /*  onClick={(): void => {
                 logout();
                 setTimeout(() => {
                   history.push('/');
                   window.location.reload();
                 }, 0);
               }}  */
              >
                <IonIcon icon={logOutOutline} style={{ marginRight: '20px' }} ></IonIcon>
                {t('Logout')}
              </StyledSocialButton>
            </div>
          </IonCol>
        </IonRow>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          cssClass='my-custom-class'
          header={t('Confirm!')}
          message={t('Are you sure you want to sign out?')}
          buttons={[
            {
              text: t('Cancel'),
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                setShowAlert(false);
              }
            },
            {
              text: t('Agree'),
              handler: () => {
                logout();
                setTimeout(() => {
                  history.push('/');
                  window.location.reload();
                }, 0);
              }
            }
          ]}
        />
      </IonContent>
    </>
  );
};

export default Account;
