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
    color: black !important;
    font-weight: 600;
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
  const { formState: { errors }, trigger, reset, watch } = useForm();
  const history = useHistory();
  const dispatch = useDispatch();
  const { profile } = useSelector((s) => s.profile);


  const getData = useCallback(() => {
    dispatch(getProfile());
  }, [dispatch]);
  useEffect(getData, [getData]);
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
                    disabled
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
