import React, { useCallback, useEffect, useState } from 'react';

import styled from 'styled-components';

import { IonIcon, IonContent, IonInput, IonButton, IonRow, IonCol, IonToast, IonItem, IonLabel, IonHeader, IonTitle, IonPage, IonNote, IonSelect, IonSelectOption, IonDatetime, IonText } from '@ionic/react';
import { eyeSharp, eyeOffSharp, chevronBackOutline } from 'ionicons/icons';

import { useHistory } from 'react-router-dom';
import { Controller, useForm } from "react-hook-form";

import authService from '@app/services/auth';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from '@app/hooks';
import { ProfileUM } from '../profile.model';
import moment from 'moment';
import profileService from '../profile.service';
import { getProfile } from '../profile.slice';

const StyledInput = styled(IonInput)`
    color: black;
    margin-top: 2px;
    margin-left: 5px;
    --placeholder-color:#91969c;
`;
const StyledSelect = styled(IonSelect)`
    color: black;
    margin-top: 2px;
    margin-left: 5px;
    --placeholder-color:#91969c;
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
const StyledDatePicker = styled(IonDatetime)`
    color: black;
    margin-top: 2px;
    margin-left: 5px;
    --placeholder-color:#91969c;
`;
const ErrorText = styled(IonText)`
   color: #f46a6a;
   margin-left: 20px;
   font-size: 15px;
`
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


const UpdateProfile: React.FC = () => {
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { profile: data } = useSelector((s) => s.profile);
  const { control, handleSubmit, register, formState: { errors }, trigger, reset, watch, setValue } = useForm();
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmNewPasswordVisible, setConfirmNewPasswordVisible] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showFailedToast, setShowFailedToast] = useState(false);
  const [showMatchPasswordFailedToast, setShowMatchPasswordFailedToast] = useState(false);

  const formFields: InputProps[] = [
    {
      name: "fullname",
      fieldType: "input",
      type: "number",
      label: t('Full name'),
      placeholder: t('Full name'),
    },
    {
      name: "gender",
      fieldType: "select",
      type: "text",
      label: t('Gender'),
      placeholder: t('Gender'),
    },
    {
      name: "dateOfBirth",
      fieldType: "date",
      type: "text",
      label: t('Date of birth'),
      placeholder: t('Date of birth'),
    },
    {
      name: "phoneNumber",
      fieldType: "input",
      type: "number",
      label: t('Phone number'),
      placeholder: t('Phone number'),
    },
    {
      name: "email",
      fieldType: "input",
      type: "email",
      label: t('Email'),
      placeholder: t('Email'),
    },
    {
      name: "identityCard",
      fieldType: "input",
      type: "number",
      label: t('Identity card'),
      placeholder: t('Identity card'),
    },
    {
      name: "address",
      fieldType: "input",
      type: "text",
      label: t('Address'),
      placeholder: t('Address'),
    },
    {
      name: "province",
      fieldType: "input",
      type: "text",
      label: t('Province/City'),
      placeholder: t('Province/City'),
    },
    {
      name: "district",
      fieldType: "input",
      type: "text",
      label: t('District'),
      placeholder: t('District'),
    },
    {
      name: "ward",
      fieldType: "input",
      type: "text",
      label: t('Ward'),
      placeholder: t('Ward'),
    },
    {
      name: "passportNumber",
      fieldType: "input",
      type: "number",
      label: t('Passport number'),
      placeholder: t('Passport number'),
    },
    {
      name: "nation",
      fieldType: "input",
      type: "text",
      label: t('Nation'),
      placeholder: t('Nation'),
    },
  ];

  const onSubmit = async (data: any): Promise<void> => {
    try {
      await profileService.updateProfile(data);
      setShowSuccessToast(true);
      setTimeout(() => history.push('/profile'), 1500);
    } catch (error) {
      setShowFailedToast(true);
    }
  };

  useEffect(() => {
    register('fullname', { required: { value: true, message: t('full name not enterd') } });
    register('gender', { required: { value: true, message: t('gender not enterd') } });
    register('dateOfBirth', { required: { value: true, message: t('date of birth not enterd') } });
    register('phoneNumber', { required: { value: true, message: t('phone number not enterd') } });
    register('email', {
      required: {
        value: true,
        message: t('email not enterd')
      },
      pattern: {
        value: /\S+@\S+\.\S+/,
        message: t("Entered value does not match email format")
      }
    });
    register('identityCard', { required: { value: true, message: t('identity card not enterd') } });
    register('address', { required: { value: true, message: t('address not enterd') } });
    register('nation', { required: { value: true, message: t('nation name not enterd') } });
  }, [register]);
  useEffect(() => {
    reset({
      ...data,

    });
  }, [data, reset]);
  return (
    <IonPage >
      <IonHeader className='ion-margin-bottom' >
        <IonItem color='light' style={{ margin: '15px 20px 0px 10px' }}>
          <StyledIcon icon={chevronBackOutline} onClick={() => history.push('/account')}></StyledIcon>
          <IonTitle style={{ fontSize: '20px', textAlign: 'center' }}>{t('Update Profile')}</IonTitle>
        </IonItem>
      </IonHeader>
      <IonContent >
        <IonToast
          isOpen={showSuccessToast}
          onDidDismiss={() => setShowSuccessToast(false)}
          color='success'
          message={t('Update profile successfully')}
          duration={1000}
          position="top"
          animated={true}
        />
        <IonToast
          isOpen={showFailedToast}
          onDidDismiss={() => setShowFailedToast(false)}
          color='danger'
          message={t('Update profile failed')}
          duration={1000}
          position="top"
          animated={true}
        />

        <form onSubmit={handleSubmit((d) => onSubmit(d))} style={{ paddingLeft: '10px', paddingRight: '25px' }}>
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
                              onIonBlur={() => {
                                trigger(name);
                              }}
                              value={watch(name) || undefined}
                              onIonChange={onChange}
                              {...otherProps}
                            >
                            </StyledInput>
                          </IonItem>
                          {(errors?.fullname?.message && name === 'fullname') && <ErrorText color='danger'>{(errors?.fullname?.message)}</ErrorText>}
                          {(errors?.phoneNumber?.message && name === 'phoneNumber') && <ErrorText color='danger'>{(errors?.phoneNumber?.message)}</ErrorText>}
                          {(errors?.email?.message && name === 'email') && <ErrorText color='danger'>{(errors?.email?.message)}</ErrorText>}
                          {(errors?.identityCard?.message && name === 'identityCard') && <ErrorText color='danger'>{(errors?.identityCard?.message)}</ErrorText>}
                          {(errors?.address?.message && name === 'address') && <ErrorText color='danger'>{(errors?.address?.message)}</ErrorText>}
                          {(errors?.nation?.message && name === 'nation') && <ErrorText color='danger'>{(errors?.nation?.message)}</ErrorText>}
                        </IonCol>
                      </IonRow>
                    )}
                  />
                )
              }
              case 'select': {
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
                            <StyledSelect
                              onIonBlur={() => {
                                trigger(name)
                              }}
                              value={watch(name)}
                              onIonChange={onChange}
                            >
                              <IonSelectOption value={true}>{t('Male')}</IonSelectOption>
                              <IonSelectOption value={false}>{t('Female')}</IonSelectOption>
                            </StyledSelect>
                          </IonItem>
                          {(errors?.gender?.message && name === 'gender') && <ErrorText color='danger'>{(errors?.gender?.message)}</ErrorText>}
                        </IonCol>
                      </IonRow>
                    )}
                  />
                )
              }
              case 'date': {
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
                            <StyledDatePicker
                              pickerFormat="DDDDD MMMM YYYY"
                              placeholder={t('day/month/year')}
                              displayFormat="MM/DD/YYYY"
                              min="1900-01-01"
                              max={moment().format('YYYY-MM-DD')}
                              onIonBlur={onBlur}
                              value={watch(name) || moment().format('MM/DD/YYYY')}
                              onIonChange={onChange}
                              {...otherProps}
                            >
                            </StyledDatePicker>
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
                            >
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
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" size-sm='3'>
              <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <StyledButton type='submit'>{t('Update')}</StyledButton>
              </div>
            </IonCol>
          </IonRow>
        </form>


      </IonContent>
    </IonPage>
  );
};

export default UpdateProfile;
