import React, { useState } from 'react';
import styled from 'styled-components';

import { IonButton, IonCol, IonContent, IonIcon, IonInput, IonItem, IonNote, IonRow } from '@ionic/react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from '@app/hooks';

import { lockClosed, eyeOffSharp, eyeSharp } from 'ionicons/icons';

const StyledText = styled.div`
  color: black;
  text-align: center;
  font-size: 19px;
  font-weight: 600;
  margin: 20% 15px 10% 15px;
`;
const StyleWrapperInput = styled(IonItem)`
    background-color: white;
    margin: 0px 10% 20px 10%;
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
    margin-left: 15px
`;
const StyledButton = styled(IonButton)`
    width: 300px;
    --background: #293978;
`;
const StyledIcon = styled(IonIcon)`
   font-size: 20px;
`;
interface InputProps {
  name: string;
  fieldType: string;
  label?: string;
  placeholder: string;
  [otherProps: string]: unknown;
};
interface PasswordModel {
  newPassword: string;
  confirmNewPassword: string;
}
const formFields: InputProps[] = [
  {
    name: "newPassword",
    fieldType: "input",
    type: "password",
    label: "Mật khẩu",
    placeholder: "Mật khẩu mới",
  },
  {
    name: "confirmNewPassword",
    fieldType: "input",
    type: "password",
    label: "Mật khẩu",
    placeholder: "Nhập lại mật khẩu mới",
  },
];
const CreatePassword: React.FC = () => {
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm();
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmNewPasswordVisible, setConfirmNewPasswordVisible] = useState(false);
  const handleCreatePassword = (data: PasswordModel) => {
    try {

    } catch (error) {
    }
  }

  return (
    <IonContent >
      <IonRow className="ion-justify-content-center">
        <IonCol size='12' size-sm='6'>
          <StyledText >
            VUI LÒNG ĐẶT LẠI MẬT KHẨU MỚI
            <br />
            <IonNote className='ion-margin-end' color='medium' style={{ fontSize: '13px' }}>Tạo lại mật khẩu mới, không trùng với 3 mật khẩu gần nhất</IonNote>
          </StyledText>
        </IonCol>
      </IonRow>
      <form onSubmit={handleSubmit(handleCreatePassword)}>
        {formFields.map(({ label, name, fieldType, placeholder, ...otherProps }) => {
          switch (fieldType) {
            case 'input': {
              return (
                <Controller
                  key={name}
                  name={name}
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <IonRow className="ion-justify-content-center">
                      <IonCol size="12" size-sm='3'>
                        <StyleWrapperInput color='light' lines='none'>
                          <StyledInput
                            required={true}
                            onIonBlur={onBlur}
                            value={value}
                            onIonChange={onChange}
                            placeholder={placeholder}
                            type={
                              name === "newPassword" ? newPasswordVisible === true ? "text" : "password"
                                : confirmNewPasswordVisible === true ? "text" : "password"
                            }

                          >
                          </StyledInput>
                          <StyledIcon icon={lockClosed} slot='start' className='ion-margin-end' />
                          {
                            name === "newPassword" ?
                              <StyledIcon slot="end" icon={newPasswordVisible === true ? eyeOffSharp : eyeSharp} onClick={() => setNewPasswordVisible(!newPasswordVisible)} />
                              : <StyledIcon slot="end" icon={confirmNewPasswordVisible === true ? eyeOffSharp : eyeSharp} onClick={() => setConfirmNewPasswordVisible(!confirmNewPasswordVisible)} />
                          }
                        </StyleWrapperInput>
                      </IonCol>
                    </IonRow>
                  )}
                />

              )
            }
            default: {
              return (
                <Controller
                  key={name}
                  name={name}
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <IonRow className="ion-justify-content-center">
                      <IonCol size="12" size-sm='3'>
                        <StyleWrapperInput>
                          <StyledInput
                            onIonBlur={onBlur}
                            value={value}
                            onIonChange={(event: any) => {
                              onChange(event);
                            }}
                            {...otherProps}>
                          </StyledInput>
                        </StyleWrapperInput>
                      </IonCol>
                    </IonRow>
                  )}
                />
              )
            }
          }
        })}

        <IonRow className="ion-justify-content-center">
          <IonCol size="12" size-sm='3'>
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <StyledButton type='submit'>CẬP NHẬT</StyledButton>
            </div>
          </IonCol>
        </IonRow>
      </form>
    </IonContent>

  );
};

export default CreatePassword;