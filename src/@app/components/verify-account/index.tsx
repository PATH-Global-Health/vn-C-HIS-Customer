import React, { useCallback, useState, useEffect } from 'react';
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

import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from '@app/hooks';
import { getUserInfo } from '@app/slices/auth';
import authService from '@app/services/auth';

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
  const { register, getValues, setValue } = useForm();
  const [verifyPhoneNumber, setVerifyPhoneNumber] = useState<boolean>(false);
  const [verifyOTP, setVerifyOTP] = useState<boolean>(false);
  const [verifyOTPSuccess, setVerifyOTPSucess] = useState<boolean>(false);
  const [verifyOTPFailed, setVerifyOTPFailed] = useState<boolean>(false);
  const [updatePhoneNumberFailed, setUpdatePhoneNumberFailed] = useState<boolean>(false);
  const userData = useSelector(s => s.auth.userInfo?.data);

  const sendOTP = async (phoneNumber: string): Promise<void> => {
    try {
      await authService.sendPhoneOTP(phoneNumber);
      setVerifyOTP(true);
    }
    catch (err) {
      console.log(err);
    }
  }
  const verifyPhoneOTP = async (phoneNumber?: string, otp?: string): Promise<void> => {
    const data = phoneNumber || getValues('phoneNumber');
    authService.verifyPhoneOTP({ phoneNumber: data, otp: otp })
      .then(() => {
        setVerifyOTPSucess(true);
        setTimeout(() => {
          history.push('/home')
        }, 1500)
      })
      .catch(() => {
        setVerifyOTPFailed(true);
      })
  };
  const handlePhoneAction = (phoneNumber: any): void => {
    if (phoneNumber !== '') {
      sendOTP(phoneNumber)
    }
    else {
      if (getValues('phoneNumer')) {
        sendOTP(getValues('phoneNumer'));
      }
      else {
        setVerifyPhoneNumber(true);
      }
    }
  }
  const updatePhoneNumber = async (phoneNumber: string): Promise<void> => {
    try {
      await authService.updatePhoneNumber({ fullName: '', phoneNumber: phoneNumber });
      await authService.sendPhoneOTP(phoneNumber);
      setVerifyOTP(true);
    }
    catch {
      setUpdatePhoneNumberFailed(true);
    }
  }
  useEffect(() => {
    register(
      'phoneNumber',
      {
        required: { value: true, message: t('No phone number entered') },
        minLength: { value: 10, message: t('Phone numbers with minnimun is 10 digits') },
        maxLength: { value: 11, message: t('Phone numbers with up to 11 digits') },
        pattern: { value: /^[0-9\b]+$/, message: t('Phone number is not in the correct format') }
      }
    );
    register('otp');
  }, [register]);
  const getData = useCallback(() => {
    dispatch(getUserInfo());
  }, [dispatch]);
  useEffect(getData, [getData, userData?.userInfo?.phoneNumber]);
  return (
    <IonContent>
      {console.log(userData?.userInfo?.isConfirmed)}
      <IonRow className="ion-justify-content-center ">
        <IonCol size="12" >
          <div className="ion-align-items-center" style={{ textAlign: 'center', marginTop: '200px', color: '#1145a0', fontSize: '20px', fontWeight: 500 }}>
            <IonText style={{ marginBottom: '30px', color: 'black' }}>Đăng kí tài khoản thành công</IonText>
          </div>
        </IonCol>
      </IonRow>
      <IonRow className="ion-justify-content-center ">
        <IonCol size="12" >
          <div className="ion-align-items-center" style={{ textAlign: 'center', marginTop: '30px', color: '#1145a0', fontSize: '20px', fontWeight: 500 }}>
            <StyledButton onClick={() => history.push('/home')}>Bỏ Qua</StyledButton>
            <StyledButton onClick={() => handlePhoneAction(userData?.userInfo?.phoneNumber)}>Xác thực ngay</StyledButton>
          </div>
        </IonCol>
      </IonRow>
      <IonToast
        isOpen={updatePhoneNumberFailed}
        onDidDismiss={() => setUpdatePhoneNumberFailed(false)}
        color='danger'
        message={t('This phone number is already registered!')}
        duration={1000}
        position="top"
        animated={true}
      />
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
        isOpen={verifyPhoneNumber}
        onDidDismiss={() => setVerifyPhoneNumber(false)}
        cssClass='my-custom-class'
        header={'Nhập số điện thoại'}
        message={'Nhập số điện thoại của bạn để tiếp tục'}
        inputs={[
          {
            name: 'phoneNumber',
            type: 'number',
            placeholder: t('Số điện thoại'),
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
              updatePhoneNumber(data.phoneNumber);
            }
          }
        ]}
      />
      <IonAlert
        isOpen={verifyOTP}
        onDidDismiss={() => setVerifyOTP(false)}
        cssClass='my-custom-class'
        header={'Nhập mã OTP'}
        message={t('To verify your account, please enter the OTP code sent to phone number') + ` ${userData?.userInfo?.phoneNumber || getValues('phoneNumber')}`}
        inputs={[
          {
            name: 'otp',
            type: 'number',
            placeholder: t('Số điện thoại'),
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
              verifyPhoneOTP(userData?.userInfo?.phoneNumber, data?.otp);
            }
          }
        ]} />

    </IonContent>
  );
};

export default VerifyAccount;
