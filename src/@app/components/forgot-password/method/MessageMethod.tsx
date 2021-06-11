import React, { useState } from 'react';
import styled from 'styled-components';

import { IonButton, IonContent, IonCol, IonInput, IonItem, IonRow, IonNote, IonToast, IonIcon } from '@ionic/react';
import { Controller, useForm } from 'react-hook-form';

import { useDispatch } from '@app/hooks';
import { setDataForgotPassword } from '@app/slices/auth';
import authService from '@app/services/auth';
import { useHistory } from 'react-router';
import { phonePortraitOutline } from 'ionicons/icons';
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
interface generateOtpModal {
  username: string,
  phoneNumber: string,
}
const MessageMethod: React.FC = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const { control, handleSubmit } = useForm();
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showFailedToast, setShowFailedToast] = useState(false);
  const handleData = async (data: generateOtpModal): Promise<void> => {
    try {
      const { phoneNumber } = data;
      const params = { username: phoneNumber, phoneNumber: phoneNumber }
      await authService.generateOTP(params);
      setShowSuccessToast(true);
      setTimeout(() => dispatch(setDataForgotPassword({ inputData: phoneNumber, method: 'confirmOTP' })), 1500);
    } catch (error) {
      setShowFailedToast(true);
    }
  }
  return (
    <IonContent >
      <IonToast
        isOpen={showSuccessToast}
        onDidDismiss={() => setShowSuccessToast(false)}
        color='success'
        message={t('Check your phone message to receive the verification code')}
        duration={1000}
        position="top"
        animated={true}
      />
      <IonToast
        isOpen={showFailedToast}
        onDidDismiss={() => setShowFailedToast(false)}
        color='danger'
        message={t('Account does not exist')}
        duration={1000}
        position="top"
        animated={true}
      />
      <IonRow className="ion-justify-content-center">
        <IonCol size='12' size-sm='6'>
          <StyledText >
            {t('Enter the phone number to receive the verification code')}
            <br />
            <IonNote style={{ fontSize: '13px', color: '#9c9999' }}>{t('The phone number must match the registered account number')}</IonNote>
          </StyledText>
        </IonCol>
      </IonRow>
      <form onSubmit={handleSubmit(handleData)}>
        <Controller
          key={'phoneNumber'}
          name={'phoneNumber'}
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <IonRow className="ion-justify-content-center">
              <IonCol size="12" size-sm='3'>
                <StyleWrapperInput color='light' lines='none'>
                  <StyledInput
                    required={true}
                    placeholder={t('PhoneNumber')}
                    onIonBlur={onBlur}
                    value={value}
                    onIonChange={onChange}
                  >
                  </StyledInput>
                  <IonIcon icon={phonePortraitOutline} color='medium' slot='start'></IonIcon>
                </StyleWrapperInput>
              </IonCol>
            </IonRow>
          )}
        />

        <IonRow className="ion-justify-content-center">
          <IonCol size="12" size-sm='3'>
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <StyledButton type='submit' >{t('Confirm')}</StyledButton>
            </div>
          </IonCol>
        </IonRow>
      </form>

    </IonContent>

  );
};

export default MessageMethod;