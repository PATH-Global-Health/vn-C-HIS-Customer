import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import OtpInput from 'react-otp-input';
import {
  IonAlert,
  IonAvatar,
  IonButton,
  IonCol,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonModal,
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
  informationCircleOutline,
} from 'ionicons/icons';

import { useHistory } from "react-router-dom";

import logo from '@app/assets/img/logo.png'
import avatar from '@app/assets/img/avatar.png';
import { useTranslation } from 'react-i18next';
import { useAuth, useDispatch, useSelector } from '@app/hooks';
import { getProfile } from './profile/profile.slice';
import { getUserInfo } from '@app/slices/auth';
import authService from '@app/services/auth';
import { useForm } from 'react-hook-form';


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
const StyledOtpInput = styled(OtpInput)`
  margin: auto;
  text-align: center;
  margin-top: 220px;
  input{
    padding: 10px;
    color: #3e3c3c !important;
    background-color:white;
    font-weight:600;  
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
  const [showModal, setShowModal] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>('');
  const { register, formState: { errors }, getValues, setValue } = useForm();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [verifyCode, setVerifyCode] = useState<boolean>(false);
  const [verifyOTPSuccess, setVerifyOTPSucess] = useState<boolean>(false);
  const [verifyOTPFailed, setVerifyOTPFailed] = useState<boolean>(false);
  const [updatePhoneNumberFailed, setUpdatePhoneNumberFailed] = useState<boolean>(false);
  const [verifyOTP, setVerifyOTP] = useState<boolean>(false);
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
    {
      name: "qr",
      icon: "qr",
      label: t('My QR Code'),
      color: "#3ac6e1"
    },
  ];
  const sendOTP = async (phoneNumber: string): Promise<void> => {
    try {
      await authService.sendPhoneOTP(phoneNumber);
      setVerifyOTP(true);
    }
    catch (err) {
      console.log(err);
    }
  }
  const handleVerifyAccount = (phoneNumber: string) => {
    if (phoneNumber !== '') {
      sendOTP(phoneNumber)
    }
    else {
      setVerifyCode(true);
    }
  }
  const handlePhoneAction = async (): Promise<void> => {
    const phoneNumber = getValues('phoneNumber');
    try {
      await authService.updatePhoneNumber({ fullName: '', phoneNumber: phoneNumber });
      sendOTP(phoneNumber);
      setVerifyOTP(true);
    }
    catch {
      setUpdatePhoneNumberFailed(true);
    }
  }
  const verifyPhoneOTP = async (otp: string): Promise<void> => {
    authService.verifyPhoneOTP({ phoneNumber: getValues('phoneNumber'), otp: otp })
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
  useEffect(getData, [getData, userData?.userInfo?.phoneNumber]);
  useEffect(() => {
    register(
      'phoneNumber',
      {
        required: { value: true, message: t('No phone number entered') },
        minLength: { value: 10, message: t('Phone numbers with minimum is 10 digits') },
        maxLength: { value: 11, message: t('Phone numbers with up to 11 digits') },
        pattern: { value: /^[0-9\b]+$/, message: t('Phone number is not in the correct format') }
      }
    );
    register('otp');
  }, [register, t]);
  return (
    <>
      <IonContent>
        <IonRow className="ion-justify-content-center" >
          <IonCol size="4" >
            <div>
              <img src={logo} alt="logo" width='150px' />
            </div>
          </IonCol>
        </IonRow>
        <IonRow className="ion-justify-content-center">
          <IonCol size="2" >
            <IonAvatar style={{
              '--border-radius': '50px'
            }}>
              <img src={avatar} width='100px' alt='' />
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
                <IonRow key={idx} style={{ cursor: 'pointer' }}>
                  <IonCol size="12" >
                    <StyledItem color='light'
                      onClick={() => {
                        name === 'change-password' ? history.push('/change-password')
                          : name === 'profile' ? history.push('/profile')
                            : name === 'security' ? history.push('/security-question')
                              : name === 'qr' ? history.push('/qr-code')
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
            <IonCol size="12">
              <StyledItem color='light'>
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
        <IonRow className="ion-justify-content-center" style={{ display: userData?.userInfo?.isConfirmed ? 'none' : '' }} >
          <IonCol size="12">
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <StyledSocialButton
                color='danger'
                type='submit'
                onClick={() => handleVerifyAccount(userData?.userInfo?.phoneNumber ?? '')}
              >
                <IonIcon icon={informationCircleOutline} style={{ marginRight: '20px' }} ></IonIcon>
                {t('Xác thực tài khoản')}
              </StyledSocialButton>
            </div>
          </IonCol>
        </IonRow>
        <IonRow className="ion-justify-content-center">
          <IonCol size="12">
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <StyledSocialButton
                type='submit'
                onClick={() => setShowAlert(true)}
              // onClick={() => setShowModal(true)}
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
        <IonToast
          isOpen={updatePhoneNumberFailed}
          onDidDismiss={() => setUpdatePhoneNumberFailed(false)}
          color='danger'
          message={t('This phone number is already registered!')}
          duration={1000}
          position="top"
          animated={true}
        />
        <StyledAlert
          isOpen={verifyCode}
          onDidDismiss={() => setVerifyCode(false)}
          cssClass='my-custom-class'
          header={t('Verify account')}
          message={t('Enter your phone number to continue')}
          inputs={[
            {
              name: 'phoneNumber',
              type: 'number',
              placeholder: t('Phone number'),
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
                setValue('phoneNumber', data.phoneNumber);
                handlePhoneAction();
              }
            }
          ]}
        />
        <IonAlert
          isOpen={verifyOTP}
          onDidDismiss={() => setVerifyOTP(false)}
          cssClass='my-custom-class'
          header={'Nhập mã OTP'}
          message={t('To verify your account, please enter the OTP code sent to phone number') + ` ${getValues('phoneNumber') || userData?.userInfo?.phoneNumber}`}
          inputs={[
            {
              name: 'otp',
              type: 'number',
              placeholder: t('Mã OTP'),
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
                //setValue('otp', data.otp);
                verifyPhoneOTP(data?.otp);
              }
            }
          ]} />

        <IonModal isOpen={showModal} >
          <StyledOtpInput
            inputStyle={{
              width: '2.7rem',
              height: '2.7rem',
              marginRight: '10px',
              fontSize: '1rem',
              color: 'black',
              borderRadius: 4,
              border: '2px solid rgba(0,0,0,0.3)',
            }}
            value={otp}
            onChange={(otp: any) => setOtp(otp)}
            numInputs={6}
            separator={<span style={{ color: 'black' }}>-</span>}
          />
        </IonModal>
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
