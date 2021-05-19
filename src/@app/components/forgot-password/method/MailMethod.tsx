import React, { useState } from 'react';
import styled from 'styled-components';

import { IonButton, IonContent, IonCol, IonInput, IonItem, IonRow, IonToast, IonIcon } from '@ionic/react';
import { Controller, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom'

import authService from '@app/services/auth';

import { useDispatch } from '@app/hooks';
import { setDataForgotPassword } from '@app/slices/auth';
import { mailOutline, phonePortraitOutline } from 'ionicons/icons';

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
  username: string,
  email: string,
}
const MailMethod: React.FC = () => {
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm();
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showFailedToast, setShowFailedToast] = useState(false);
  const handleData = async (data: generateOtpModal): Promise<void> => {
    try {
      const { username, email } = data;
      const params = { username: username, email: email }
      await authService.generateOTP(params);
      setShowSuccessToast(true);
      setTimeout(() => dispatch(setDataForgotPassword({ method: 'confirmOTP', inputData: username })), 1500);
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
        message="Kiểm tra email để nhận mã khôi phục !"
        duration={1000}
        position="top"
        animated={true}
      />
      <IonToast
        isOpen={showFailedToast}
        onDidDismiss={() => setShowFailedToast(false)}
        color='danger'
        message="Tài khoản không tồn tại !"
        duration={1000}
        position="top"
        animated={true}
      />
      <IonRow className="ion-justify-content-center">
        <IonCol size='12' size-sm='6'>
          <StyledText >
            Nhập email để nhận mã khôi phục
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
              <IonCol size="12" size-sm='3'>
                <StyleWrapperInput color='light' lines='none'>
                  <StyledInput
                    required={true}
                    type='email'
                    placeholder="Nhập email"
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
        <Controller
          key={'username'}
          name={'username'}
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <IonRow className="ion-justify-content-center">
              <IonCol size="12" size-sm='3'>
                <StyleWrapperInput color='light' lines='none'>
                  <StyledInput
                    required={true}
                    type='number'
                    placeholder="Nhập số điện thoại"
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
              <StyledButton type='submit' /* onClick={() => dispatch(setMethodForgotPassword('confirmed'))} */> XÁC NHẬN</StyledButton>
            </div>
          </IonCol>
        </IonRow>
      </form>

    </IonContent>

  );
};

export default MailMethod;