import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { IonAlert, IonButton, IonCol, IonContent, IonDatetime, IonIcon, IonInput, IonItem, IonRow, IonToast } from '@ionic/react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from '@app/hooks';
import { setDataForgotPassword } from '@app/slices/auth';
import { useTranslation } from 'react-i18next';

import { calendar } from 'ionicons/icons';
import securityQuestionService from 'account/security-question/security-question.service';

const StyledText = styled.div`
  color: black;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
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
const StyledIcon = styled(IonIcon)`
   font-size: 20px;
`;
const StyledAlertForm = styled(IonAlert)`
  --color:#FF0000!important;
  --background: red !important;
  .pass{
    color: black !important;
  }
`
const SecurityQuestionMehod: React.FC = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showFailedToast, setShowFailedToast] = useState(false);
  const { control, handleSubmit, register, formState: { errors }, trigger, getValues, setValue } = useForm();
  const { questionDetail } = useSelector((s) => s.securityQuestion);
  const onSubmit = async (data: any): Promise<void> => {
    const { username, answer } = getValues();
    let params = {
      username: username,
      securityQuestionId: questionDetail?.data?.id,
      securityQuestionAnswer: answer,
    };
    try {
      const response = await securityQuestionService.confirmSecurityQuestion(params);
      setShowSuccessToast(true);
      setTimeout(() => dispatch(setDataForgotPassword({ method: 'confirmed', accessToken: response?.access_token })), 1500);
    } catch (error) {
      setShowFailedToast(true);
    }
  };
  const back = () => {
    dispatch(setDataForgotPassword({}));
  }
  useEffect(() => {
    register('answer', { required: { value: true, message: t('Answer not entered') } });
    register('username', { required: { value: true, message: t('Phone number not entered') } });
  }, [register]);
  return (
    <IonContent >
      <IonToast
        isOpen={showSuccessToast}
        onDidDismiss={() => setShowSuccessToast(false)}
        color='success'
        message={t('Confirm secutiry question successfully')}
        duration={1000}
        position="top"
        animated={true}
      />
      <IonToast
        isOpen={showFailedToast}
        onDidDismiss={() => setShowFailedToast(false)}
        color='danger'
        message={t('Confirm secutiry question failed')}
        duration={1000}
        position="top"
        animated={true}
      />
      <IonRow className="ion-justify-content-center">
        <IonCol size='12'>
          <StyledText >
            {t('Security question') + ' :'}
            <br />
            {questionDetail?.data?.question}
          </StyledText>
        </IonCol>
      </IonRow>
      <form onSubmit={handleSubmit((d) => onSubmit(d))}>
        <Controller
          key={'answer'}
          name={'answer'}
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <IonRow className="ion-justify-content-center">
              <IonCol size="12">
                <StyleWrapperInput color='light'>
                  <StyledInput
                    placeholder={t('Enter secutiry question answer')}
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
        <StyledAlertForm
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          cssClass='my-custom-class'
          header={t('Enter user name')}
          inputs={[
            {
              name: 'username',
              type: 'text',
              placeholder: t('User name'),
              cssClass: 'pass',
              attributes: {
                maxlength: 10,
                inputmode: 'decimal'
              }
            }
          ]}
          buttons={[
            {
              text: t('Cancel'),
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                console.log('Confirm Cancel');
              }
            },
            {
              text: t('Confirm'),
              handler: (data) => {
                setValue('username', data.username);
                onSubmit(data.username);
              }
            }
          ]}
        />
        <IonRow className="ion-justify-content-center">
          <IonCol size="12">
            <StyleNoteText >{t('Unknown ?')} <b onClick={() => back()} style={{ cursor: 'pointer' }} >{t('Choose another method')}</b></StyleNoteText>
          </IonCol>
        </IonRow>
        <IonRow className="ion-justify-content-center">
          <IonCol size="12">
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <StyledButton onClick={() => setShowAlert(true)}>{t('Confirm')}</StyledButton>
            </div>
          </IonCol>
        </IonRow>
      </form>

    </IonContent>

  );
};

export default SecurityQuestionMehod;