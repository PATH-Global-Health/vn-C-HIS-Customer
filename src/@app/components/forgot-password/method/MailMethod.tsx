import React, { useState } from 'react';
import styled from 'styled-components';

import { IonButton, IonContent, IonCol, IonInput, IonItem, IonRow, IonToast, IonIcon } from '@ionic/react';
import { Controller, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom'

import authService from '@app/services/auth';

import { useDispatch } from '@app/hooks';
import { setDataForgotPassword } from '@app/slices/auth';
import { mailOutline, phonePortraitOutline } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';

const StyledText = styled.div`
  color: black;
  text-align: center;
  font-size: 20px;
  margin: 20% 15px 5% 15px;
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
  email: string,
}
const MailMethod: React.FC = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const { control, handleSubmit } = useForm();
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showFailedToast, setShowFailedToast] = useState(false);
  const handleData = async (data: generateOtpModal): Promise<void> => {
    try {
      const { email } = data;
      const params = { email: email }
      await authService.generateOTP(params);
      setShowSuccessToast(true);
      setTimeout(() => dispatch(setDataForgotPassword({ method: 'confirmEmailOTP', inputData: email })), 1500);
    } catch (error: any) {
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
        message={t('Check your email to get the recovery code')}
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
        <IonCol size='12'>
          <StyledText >
            {t('Enter email to receive the recovery code')}
          </StyledText>

        </IonCol>
      </IonRow>
      <form onSubmit={handleSubmit(handleData)}>
        <Controller
          key={'email'}
          name={'email'}
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <IonRow className="ion-justify-content-center ion-margin-bottom">
              <IonCol size="12">
                <StyleWrapperInput color='light' lines='none'>
                  <StyledInput
                    required={true}
                    type='email'
                    placeholder={t('Enter email')}
                    onIonBlur={onBlur}
                    inputmode='email'
                    value={value}
                    onIonChange={onChange}
                  >
                  </StyledInput>
                  <IonIcon icon={mailOutline} color='medium' slot='start'></IonIcon>
                </StyleWrapperInput>
              </IonCol>
            </IonRow>
          )}
        />
        <IonRow className="ion-justify-content-center">
          <IonCol size="12">
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <StyledButton type='submit' /* onClick={() => dispatch(setMethodForgotPassword('confirmed'))} */>{t('Confirm')}</StyledButton>
            </div>
          </IonCol>
        </IonRow>
      </form>

    </IonContent>

  );
};

export default MailMethod;