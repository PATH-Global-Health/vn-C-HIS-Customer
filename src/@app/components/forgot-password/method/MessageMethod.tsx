import React from 'react';
import styled from 'styled-components';

import { IonButton, IonContent, IonCol, IonInput, IonItem, IonRow } from '@ionic/react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from '@app/hooks';
import { setMethodForgotPassword } from '@app/slices/auth';

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

const MailMethod: React.FC = () => {
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm();
  const handleData = (data: any) => {
    console.log(data);
  }
  const back = () => {
    dispatch(setMethodForgotPassword(null))
  }
  return (
    <IonContent >
      <IonRow className="ion-justify-content-center">
        <IonCol size='12' size-sm='6'>
          <StyledText >
            Nhập mã code đã được gửi qua số điện thoại:
            <br />
            <b style={{ color: '#000000' }}>(+84) 988108345</b>
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
          <IonCol size="12" size-sm='3'>
            <StyleNoteText >Không nhận được mã code? <b onClick={() => back()} style={{ cursor: 'pointer' }} >Gửi lại mã</b></StyleNoteText>
          </IonCol>
        </IonRow>
        <IonRow className="ion-justify-content-center">
          <IonCol size="12" size-sm='3'>
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <StyledButton type='submit' onClick={() => dispatch(setMethodForgotPassword('confirmed'))}> XÁC NHẬN</StyledButton>
            </div>
          </IonCol>
        </IonRow>
      </form>

    </IonContent>

  );
};

export default MailMethod;