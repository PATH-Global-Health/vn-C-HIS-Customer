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
  IonToast,
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
import { getUserInfo } from '@app/slices/auth';
import authService from '@app/services/auth';


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
`;
const StyledAlert = styled(IonAlert)`
.alert-title sc-ion-alert-md
    --color:red !important;
  }
`;
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
  const [verifyCode, setVerifyCode] = useState(false);
  const [verifyOTPSuccess, setVerifyOTPSucess] = useState<boolean>(false);
  const [verifyOTPFailed, setVerifyOTPFailed] = useState<boolean>(false);
  const { profile } = useSelector((s) => s.profile);
  const userData = useSelector(s => s.auth.userInfo?.data);
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
  const handlePhoneAction = async (phone?: string): Promise<void> => {
    try {
      await authService.sendPhoneOTP(phone);
    }
    catch (err) {
      console.log(err);
    }
  }
  const verifyPhoneOTP = async (otp: string): Promise<void> => {
    authService.verifyPhoneOTP({ phoneNumber: userData?.userInfo?.phoneNumber, otp: otp })
      .then(() => {
        setVerifyOTPSucess(true);

      })
      .catch(() => {
        setVerifyOTPFailed(true);
      })
  };
  const getData = useCallback(() => {
    dispatch(getProfile());
    dispatch(getUserInfo());
  }, [dispatch]);
  useEffect(getData, [getData]);

  useEffect(() => {
    if (userData?.userInfo) {
      if (!userData.userInfo?.isConfirmed) {
        handlePhoneAction(userData.userInfo.phoneNumber);
        setVerifyCode(true);
      }
    }
  }, [userData]);
  return (
    <>
      {console.log(userData?.userInfo?.isConfirmed)}

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
        <IonToast
          isOpen={verifyOTPSuccess}
          onDidDismiss={() => setVerifyOTPSucess(false)}
          color='success'
          message={t('Successful authentication!')}
          duration={1000}
          position="top"
          animated={true}
        />
        <IonToast
          isOpen={verifyOTPFailed}
          onDidDismiss={() => setVerifyOTPFailed(false)}
          color='danger'
          message={t('Incorrect code!')}
          duration={1000}
          position="top"
          animated={true}
        />
        <StyledAlert
          isOpen={verifyCode}
          cssClass='my-custom-class'
          header={t('Unverified account')}
          message={
            t('To verify your account, please enter the OTP code sent to phone number') + ` ${userData?.userInfo?.phoneNumber}`
          }
          inputs={[
            {
              name: 'otp',
              type: 'number',
              placeholder: t('verification code'),
              cssClass: 'pass',
              attributes: {
                inputmode: 'decimal'
              }
            }
          ]
          }
          buttons={[
            {
              text: t('Skip'),
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                console.log('Confirm Cancel');
              }
            },
            {
              text: t('Confirm'),
              handler: (data) => {
                verifyPhoneOTP(data?.otp);
              }
            }
          ]}
        />
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
                  history.push('/login');
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
