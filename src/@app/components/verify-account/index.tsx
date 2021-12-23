import React, { useCallback, useState, useEffect } from 'react';
import OtpInput from 'react-otp-input';
import styled from 'styled-components';
import {

  IonAlert,
  IonButton,
  IonCol,
  IonContent,
  IonRow,
  IonText,
  IonToast,
} from '@ionic/react';
import OtpModal from '@app/components/otp';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from '@app/hooks';
import { getUserInfo } from '@app/slices/auth';
import authService from '@app/services/auth';
import accountService from 'account/account-data/account.service';

const StyledAlert = styled(IonAlert)`
.alert-title sc-ion-alert-md
    --color:red !important;
  }
`;
const StyledButton = styled(IonButton)`
    width: 300px;
    --background: #293978;
`;
const VerifyAccount: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const userData = useSelector(s => s.auth.userInfo?.data);
  const { register, getValues, setValue } = useForm();
  const [verifyPhoneNumber, setVerifyPhoneNumber] = useState<boolean>(false);
  const [verifyOTP, setVerifyOTP] = useState<boolean>(false);
  const [verifyOTPSuccess, setVerifyOTPSucess] = useState<boolean>(false);
  const [verifyOTPFailed, setVerifyOTPFailed] = useState<boolean>(false);
  const [modalOtp, setShowModalOtp] = useState<boolean>(false);
  const [dataEntry, setDataEntry] = useState<any>({});
  const [showAlert, setShowAlert] = useState(false);
  const [sendPhoneOtpAlert, setSendPhoneOtpAlert] = useState<boolean>(false);

  const sendOTP = async (data: string, type: string): Promise<void> => {
    const params = { phoneNumber: data };
    setDataEntry({ type, data });
    try {
      if (userData?.userInfo?.phoneNumber) {
        await authService.sendPhoneOTP(data);
      }
      else await accountService.sendUpdateOTP(params);
      //await authService.sendPhoneOTP(data);
      setShowModalOtp(true);
    }
    catch (err) {
      setSendPhoneOtpAlert(true);
    }
  }
  const updateUserData = async (data: string, type: string): Promise<void> => {
    setShowModalOtp(false);
    const params = { phoneNumber: getValues('phoneNumber'), otp: data };
    if (userData?.userInfo?.phoneNumber) {
      verifyPhoneOTP(userData?.userInfo?.phoneNumber, data);
    }
    else {
      try {
        await accountService.updateAccount(params);
        // if (profile) {
        //   await profileService.updateProfile({ ...profile, ...params });
        // }
        setVerifyOTPSucess(true);
        setTimeout(() => {
          history.replace('/home')
        }, 1500)
      } catch (error) {
        setVerifyOTPFailed(true);
      }
    }
  }
  const verifyPhoneOTP = async (phoneNumber?: string, otp?: string): Promise<void> => {
    const data = phoneNumber || getValues('phoneNumber');
    authService.verifyPhoneOTP({ phoneNumber: data, otp: otp })
      .then(() => {
        setVerifyOTPSucess(true);
        setTimeout(() => {
          history.replace('/home')
        }, 1500)
      })
      .catch(() => {
        setVerifyOTPFailed(true);
      })
  };
  const handlePhoneAction = (phoneNumber: string): void => {
    if (phoneNumber !== '') {
      sendOTP(phoneNumber, 'phone');
    }
    else {
      setVerifyPhoneNumber(true);
    }
  }
  const submitPhoneNumber = async (phoneNumber: string): Promise<void> => {
    if (phoneNumber) {
      sendOTP(phoneNumber, 'phone');
    }
  }
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
  }, [register]);
  const getData = useCallback(() => {
    dispatch(getUserInfo());
  }, [dispatch]);
  useEffect(getData, [getData, userData?.userInfo?.phoneNumber]);
  return (
    <IonContent>
      <IonRow className="ion-justify-content-center ">
        <IonCol size="12" >
          <div className="ion-align-items-center" style={{ textAlign: 'center', marginTop: '200px', color: '#1145a0', fontSize: '20px', fontWeight: 500 }}>
            <IonText style={{ marginBottom: '30px', color: 'black' }}>{t('Successful account registration? Verify your account now')}</IonText>
          </div>
        </IonCol>
      </IonRow>
      <IonRow className="ion-justify-content-center ">
        <IonCol size="12" >
          <div className="ion-align-items-center" style={{ textAlign: 'center', marginTop: '30px', color: '#1145a0', fontSize: '20px', fontWeight: 500 }}>
            <StyledButton onClick={() => history.replace('/home')}>{t('Ignore')}</StyledButton>
            <StyledButton onClick={() => handlePhoneAction(userData?.userInfo?.phoneNumber ?? '')}>{t('Verify now')}</StyledButton>
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
        isOpen={sendPhoneOtpAlert}
        onDidDismiss={() => setSendPhoneOtpAlert(false)}
        color='danger'
        message={t('This phone number was registered')}
        duration={1000}
        position="top"
        animated={true}
      />
      <OtpModal
        verifyOtp={updateUserData}
        showModal={modalOtp}
        data={dataEntry}
        onClose={() => { setShowModalOtp(false) }}
      />
      <StyledAlert
        isOpen={verifyPhoneNumber}
        onDidDismiss={() => setVerifyPhoneNumber(false)}
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
              submitPhoneNumber(data.phoneNumber);
            }
          }
        ]}
      />
    </IonContent>
  );
};

export default VerifyAccount;
