import React, { useCallback, useEffect, useState } from 'react';

import styled from 'styled-components';

import { IonIcon, IonContent, IonInput, IonButton, IonRow, IonCol, IonToast, IonItem, IonLabel, IonHeader, IonTitle, IonPage, IonNote } from '@ionic/react';
import { eyeSharp, eyeOffSharp, chevronBackOutline } from 'ionicons/icons';

import { useHistory } from 'react-router-dom';
import { Controller, useForm } from "react-hook-form";

import authService from '@app/services/auth';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from '@app/hooks';
import { getProfile } from '../profile.slice';
import moment from 'moment';

const StyledInput = styled(IonInput)`
    color: #454543;
    margin-top: 2px;
    margin-left: 5px;
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


const Personal: React.FC = () => {
  const { t, i18n } = useTranslation();
  const formFields: InputProps[] = [
    {
      name: "fullname",
      fieldType: "input",
      type: "text",
      label: t('Full name'),
    },
    {
      name: "gender",
      fieldType: "input",
      type: "text",
      label: t('Gender'),
    },
    {
      name: "dateOfBirth",
      fieldType: "input",
      type: "text",
      label: t('Date of birth'),
    },
    {
      name: "phoneNumber",
      fieldType: "input",
      type: "number",
      label: t('Phone number'),
    },
    {
      name: "email",
      fieldType: "input",
      type: "text",
      label: t('Email'),
    },
    {
      name: "identityCard",
      fieldType: "input",
      type: "text",
      label: t('Identity card'),
    },
    {
      name: "address",
      fieldType: "input",
      type: "text",
      label: t('Address'),
    },
    {
      name: "province",
      fieldType: "input",
      type: "text",
      label: t('Province/City'),
    },
    {
      name: "district",
      fieldType: "input",
      type: "text",
      label: t('District'),
    },
    {
      name: "ward",
      fieldType: "input",
      type: "text",
      label: t('Ward'),
    },
    {
      name: "passportNumber",
      fieldType: "input",
      type: "text",
      label: t('Passport number'),
    },
    {
      name: "nation",
      fieldType: "input",
      type: "text",
      label: t('Nation'),
    },
  ];
  const { control, handleSubmit, register, formState: { errors }, trigger, reset, watch } = useForm();
  const history = useHistory();
  const dispatch = useDispatch();
  const { profile } = useSelector((s) => s.profile);

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

  const getData = useCallback(() => {
    dispatch(getProfile());
  }, [dispatch]);
  useEffect(getData, [getData]);
  useEffect(() => {
    register('fullname', { required: { value: true, message: t('full name not enterd') } });
    register('gender', { required: { value: true, message: t('gender not enterd') } });
    register('dateOfBirth', { required: { value: true, message: t('date of birth not enterd') } });
    register('phoneNumber', { required: { value: true, message: t('phone number not enterd') } });
    register('email', { required: { value: true, message: t('email not enterd') } });
    register('identityCard', { required: { value: true, message: t('identity card not enterd') } });
    register('address', { required: { value: true, message: t('address not enterd') } });
    register('nation', { required: { value: true, message: t('nation name not enterd') } });
  }, [register]);
  useEffect(() => {
    reset({
      ...profile,
      gender: profile?.gender ? "Nam" : 'Nữ',
      dateOfBirth: ((profile?.dateOfBirth ?? '') !== '') ? moment(profile?.dateOfBirth).format('DD/MM/YYYY') : moment().format('DD/MM/YYYY'),

    });
  }, [profile, reset]);
  return (
    <IonPage >
      <IonHeader className='ion-margin-bottom' >
        <IonItem color='light' style={{ margin: '15px 20px 0px 10px' }}>
          <StyledIcon icon={chevronBackOutline} onClick={() => history.push('/account')}></StyledIcon>
          <IonTitle style={{ fontSize: '20px', textAlign: 'center' }}>{t('Personal Information')}</IonTitle>
        </IonItem>
      </IonHeader>
      <IonContent >
        {
          formFields.map(({ label, name, fieldType, ...otherProps }) => (
            <IonRow >
              <StyledLabel >
                {label}
              </StyledLabel>
              <IonCol size="12" size-sm='3'>
                <IonItem color='light'>
                  <StyledInput
                    onIonBlur={() => {
                      trigger(name);
                    }}
                    value={watch(name) || ''}
                    {...otherProps}
                  >
                  </StyledInput>
                </IonItem>
              </IonCol>
            </IonRow>
          ))
        }

      </IonContent>
    </IonPage>
  );
};

export default Personal;
