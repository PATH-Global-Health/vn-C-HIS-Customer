import React from 'react';
import styled from 'styled-components';

import { IonButton, IonCol, IonContent, IonDatetime, IonIcon, IonItem, IonRow } from '@ionic/react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from '@app/hooks';
import { setMethodForgotPassword } from '@app/slices/auth';

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
            Câu hỏi bảo mật :
            <br />
            ngày tháng năm sinh của bạn?
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
                    placeholder="ngày/tháng/năm"
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
            <StyleNoteText >Không xác định? <b onClick={() => back()} style={{ cursor: 'pointer' }} >Chọn phương thức khác</b></StyleNoteText>
          </IonCol>
        </IonRow>
        <IonRow className="ion-justify-content-center">
          <IonCol size="12" size-sm='3'>
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <StyledButton type='submit' onClick={() => dispatch(setMethodForgotPassword('confirmed'))}>XÁC NHẬN</StyledButton>
            </div>
          </IonCol>
        </IonRow>
      </form>

    </IonContent>

  );
};

export default BirthdayMethod;