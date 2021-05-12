import React, { useState } from 'react';

import styled from 'styled-components';

import { IonIcon, IonContent, IonInput, IonButton, IonRow, IonCol, IonToast, IonItem, IonLabel, IonHeader, IonToolbar, IonTitle, IonPage, IonNote } from '@ionic/react';
import { eyeSharp, eyeOffSharp, chevronBackOutline } from 'ionicons/icons';

import { useHistory } from 'react-router-dom';
import { Controller, useForm } from "react-hook-form";

import logo from '../assets/img/logo.png';
import authService from '@app/services/auth';

const StyledInput = styled(IonInput)`
    color: black;
    margin-top: 2px;
    margin-left: 15px
`;
const StyleText = styled.div`
    font-size: 15px;
    color: #010100;
    text-align: end;
    margin-right: 35px;
    margin-top: 20px;
`;
const StyledButton = styled(IonButton)`
    margin-left: 20px;
    width: 300px;
    --background: #293978;
    
`;
const StyledLabel = styled(IonLabel)`
    font-size: 18px;
    font-weight: 700;
    color: #010100;
    padding-left: 25px;
    padding-top: 15px;
`;
const StyledIcon = styled(IonIcon)`
   font-size: 20px;
`;


interface InputProps {
  name: string;
  fieldType: string;
  label?: string;
  [otherProps: string]: unknown;
};
interface ChangePasswordModal {
  oldPassword: string,
  newPassword: string,
  confirmNewPassword: string,
}
const formFields: InputProps[] = [
  {
    name: "oldPassword",
    fieldType: "input",
    type: "password",
    label: "Nhập mật khẩu cũ",
    placeholder: "Mật khẩu cũ",
  },
  {
    name: "newPassword",
    fieldType: "input",
    type: "password",
    label: "Nhập mật khẩu mới",
    placeholder: "Mật khẩu mới",
  },
  {
    name: "confirmNewPassword",
    fieldType: "input",
    type: "password",
    label: "Nhập lại mật khẩu mới",
    placeholder: "Nhập lại mật khẩu mới",
  },
];

const ChangePasswordPage: React.FC = () => {
  const history = useHistory();
  const { control, handleSubmit } = useForm();

  const [newPassword, setNewPassword] = useState(null);
  const [confirmNewPassword, setConfirmNewPassword] = useState(null);
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmNewPasswordVisible, setConfirmNewPasswordVisible] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showFailedToast, setShowFailedToast] = useState(false);
  const [showMatchPasswordFailedToast, setShowMatchPasswordFailedToast] = useState(false);

  const handleChangePassword = async (data: ChangePasswordModal): Promise<void> => {
    try {
      const { oldPassword, newPassword, confirmNewPassword } = data;
      if (newPassword && confirmNewPassword && newPassword !== confirmNewPassword) {
        console.log('fa', showMatchPasswordFailedToast);
        setShowMatchPasswordFailedToast(true);
      }
      else {
        const params = { oldPassword: oldPassword, newPassword: newPassword };
        await authService.changePassword(params);
        setShowSuccessToast(true);
        setTimeout(() => history.push('/login'), 1500);
      }
    } catch (error) {
      setShowFailedToast(true);
    }
  };
  return (
    <IonPage >
      <IonHeader className='ion-margin-bottom' >
        <IonItem color='light' style={{ margin: '15px 20px 0px 10px' }}>
          <StyledIcon icon={chevronBackOutline}></StyledIcon>
          <IonTitle style={{ fontSize: '20px', textAlign: 'center' }}>Đổi Mật Khẩu</IonTitle>
        </IonItem>
      </IonHeader>
      <IonContent >
        <IonToast
          isOpen={showSuccessToast}
          onDidDismiss={() => setShowSuccessToast(false)}
          color='success'
          message="Đổi mật khẩu thành công !"
          duration={1000}
          position="top"
          animated={true}
        />
        <IonToast
          isOpen={showFailedToast}
          onDidDismiss={() => setShowFailedToast(false)}
          color='danger'
          message="Mật khẩu cũ không đúng !"
          duration={1000}
          position="top"
          animated={true}
        />
        <IonToast
          isOpen={showMatchPasswordFailedToast}
          onDidDismiss={() => setShowMatchPasswordFailedToast(false)}
          color='danger'
          message="Mật khẩu mới không khớp !"
          duration={1000}
          position="top"
          animated={true}
        />

        <form onSubmit={handleSubmit(handleChangePassword)} style={{ paddingLeft: '10px', paddingRight: '25px' }}>
          {formFields.map(({ label, name, fieldType, ...otherProps }) => {
            switch (fieldType) {
              case 'input': {
                return (
                  <Controller
                    key={name}
                    name={name}
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <IonRow >
                        <StyledLabel >
                          {label}
                        </StyledLabel>
                        <IonCol size="12" size-sm='3'>
                          <IonItem color='light'>
                            <StyledInput
                              required={true}
                              onIonBlur={onBlur}
                              value={value}
                              onIonChange={onChange}
                              type={
                                name === "oldPassword" ? oldPasswordVisible === true ? "text" : "password"
                                  : name === "newPassword" ? newPasswordVisible === true ? "text" : "password"
                                    : confirmNewPasswordVisible === true ? "text" : "password"
                              }
                            >
                            </StyledInput>
                            {
                              name === "oldPassword" ?
                                <StyledIcon slot="end" icon={oldPasswordVisible === true ? eyeOffSharp : eyeSharp} onClick={() => setOldPasswordVisible(!oldPasswordVisible)} />
                                : name === "newPassword" ?
                                  <StyledIcon slot="end" icon={newPasswordVisible === true ? eyeOffSharp : eyeSharp} onClick={() => setNewPasswordVisible(!newPasswordVisible)} />
                                  : <StyledIcon slot="end" icon={confirmNewPasswordVisible === true ? eyeOffSharp : eyeSharp} onClick={() => setConfirmNewPasswordVisible(!confirmNewPasswordVisible)} />
                            }

                          </IonItem>
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
                          <IonItem color='light' >
                            <StyledInput
                              onIonBlur={onBlur}
                              value={value}
                              onIonChange={(event: any) => {
                                onChange(event);
                              }}
                              {...otherProps}>
                            </StyledInput>
                          </IonItem>
                        </IonCol>
                      </IonRow>
                    )}
                  />
                )
              }
            }
          })}
          <IonNote style={{ fontSize: '10px', paddingLeft: '25px', color: '#a6a3a3' }}>Mật khẩu gồm 8 chữ số, bao gồm chữ hoa, chữ thường...</IonNote>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" size-sm='3'>
              <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <StyledButton type='submit'>CẬP NHẬT</StyledButton>
              </div>
            </IonCol>
          </IonRow>
        </form>


      </IonContent>
    </IonPage>
  );
};

export default ChangePasswordPage;
