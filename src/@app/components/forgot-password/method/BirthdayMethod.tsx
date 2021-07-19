import React from 'react';
import styled from 'styled-components';

import { IonButton, IonCol, IonContent, IonDatetime, IonIcon, IonItem, IonRow } from '@ionic/react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from '@app/hooks';
import { setDataForgotPassword } from '@app/slices/auth';
import { useTranslation } from 'react-i18next';

import { calendar } from 'ionicons/icons';

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
const StyledInput = styled(IonDatetime)`
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
const BirthdayMethod: React.FC = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const { control, handleSubmit } = useForm();
  const handleData = (data: any) => {
    dispatch(setDataForgotPassword({ method: 'confirmOTP' }));
  }
  const back = () => {
    dispatch(setDataForgotPassword({}));
  }
  return (
    <IonContent >
      <IonRow className="ion-justify-content-center">
        <IonCol size='12' size-sm='6'>
          <StyledText >
            {t('Secret question') + ' :'}
            <br />
            {t('Your date of birth ?')}
          </StyledText>
        </IonCol>
      </IonRow>
      <form onSubmit={handleSubmit(handleData)}>
        <Controller
          key={'date'}
          name={'date'}
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <IonRow className="ion-justify-content-center">
              <IonCol size="12" size-sm='3'>
                <StyleWrapperInput color='light'>
                  <StyledInput
                    pickerFormat="DDDDD MMMM YYYY"
                    placeholder={t('day/month/year')}
                    displayFormat="MM/DD/YYYY"
                    min="1994-03-14"
                    onIonBlur={onBlur}
                    value={value}
                    onIonChange={onChange}
                  >
                  </StyledInput>
                  <StyledIcon slot="end" icon={calendar} />
                </StyleWrapperInput>
              </IonCol>
            </IonRow>
          )}
        />
        <IonRow className="ion-justify-content-center">
          <IonCol size="12" size-sm='3'>
            <StyleNoteText >{t('Unknown ?')} <b onClick={() => back()} style={{ cursor: 'pointer' }} >{t('Choose another method')}</b></StyleNoteText>
          </IonCol>
        </IonRow>
        <IonRow className="ion-justify-content-center">
          <IonCol size="12" size-sm='3'>
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <StyledButton type='submit'>{t('Confirm')}</StyledButton>
            </div>
          </IonCol>
        </IonRow>
      </form>

    </IonContent>

  );
};

export default BirthdayMethod;