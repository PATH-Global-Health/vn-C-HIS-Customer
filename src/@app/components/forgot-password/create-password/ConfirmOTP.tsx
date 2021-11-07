import React, { useState } from 'react';
import styled from 'styled-components';

import { IonButton, IonContent, IonCol, IonInput, IonItem, IonRow, IonToast } from '@ionic/react';
import { Controller, useForm } from 'react-hook-form';

import { useDispatch, useSelector } from '@app/hooks';
import { setDataForgotPassword } from '@app/slices/auth';
import authService from '@app/services/auth';
import { useTranslation } from 'react-i18next';

const StyledText = styled.div`
  color: #56575c;
  text-align: center;
  font-size: 20px;
  margin: 20% 15px 10% 15px;
`;
const StyleWrapperInput = styled(IonItem)`
    background-color: white;
    margin: 0px 10% 0px 10%;
    border: 1px solid #d6d6c2;
    border-radius: 10px;
    height: 48px;
    font-size: 18px;
    text-transform: initial;
    box-shadow: 1px 3px 3px 0px rgba(0, 0, 0, 0.2)
`;
const StyledInput = styled(IonInput)`
    color: black;
    margin-top: 2px;
    margin-left: 15px;
    --placeholder-color:#91969c;
`;
const StyledButton = styled(IonButton)`
    width: 300px;
    --background: #293978;
`;
const StyleNoteText = styled.div`
    font-size: 14px;
    color: #010100;
    text-align: end;
    margin-right: 40px;
    margin-top: 20px;
`;

interface confirmOTP {
  email: string,
  otp: string,
}
const ConfirmOTP: React.FC = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { forgotPasswordData: { inputData, method } } = useSelector((state) => state.auth);

  const { control, handleSubmit } = useForm();
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showFailedToast, setShowFailedToast] = useState(false);
  const handleData = async (data: confirmOTP): Promise<void> => {
    try {
      const { otp } = data;
      console.log(method);
      const params = method === 'confirmSmsOTP' ? { phoneNumber: inputData, otp: otp } : { email: inputData, otp: otp };
      const response = await authService.confirmOTP(params);
      setShowSuccessToast(true);
      setTimeout(() => dispatch(setDataForgotPassword({ method: 'confirmed', accessToken: response?.access_token })), 1500);
    } catch (error) {
      setShowFailedToast(true);
    }
  }
  const back = () => {
    dispatch(setDataForgotPassword({}))
  }
  return (
    <IonContent >
      <IonToast
        isOpen={showSuccessToast}
        onDidDismiss={() => setShowSuccessToast(false)}
        color='success'
        message={t('Authentication successful')}
        duration={1000}
        position="top"
        animated={true}
      />
      <IonToast
        isOpen={showFailedToast}
        onDidDismiss={() => setShowFailedToast(false)}
        color='danger'
        message={t('The verification code is not correct')}
        duration={1000}
        position="top"
        animated={true}
      />
      <IonRow className="ion-justify-content-center">
        <IonCol size='12'>
          <StyledText >
            {t('Enter the OTP code to verify the account')}
          </StyledText>
        </IonCol>
      </IonRow>
      <form onSubmit={handleSubmit(handleData)}>
        <Controller
          key={'otp'}
          name={'otp'}
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <IonRow className="ion-justify-content-center">
              <IonCol size="12">
                <StyleWrapperInput color='light' lines='none'>
                  <StyledInput
                    placeholder=""
                    onIonBlur={onBlur}
                    value={value}
                    onIonChange={onChange}
                  >
                  </StyledInput>
                </StyleWrapperInput>
              </IonCol>
            </IonRow>
          )}
        />
        <IonRow className="ion-justify-content-center">
          <IonCol size="12" >
            <StyleNoteText >{t('Code not received') + '?'}<b onClick={() => back()} style={{ cursor: 'pointer' }} >{t('Resend code')}</b></StyleNoteText>
          </IonCol>
        </IonRow>
        <IonRow className="ion-justify-content-center">
          <IonCol size="12" >
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <StyledButton type='submit' >{t('Confirm')}</StyledButton>
            </div>
          </IonCol>
        </IonRow>
      </form>

    </IonContent>

  );
};

export default ConfirmOTP;