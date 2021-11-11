import React, { useEffect, useState, useCallback } from 'react';

import styled from 'styled-components';

import { IonIcon, IonContent, IonInput, IonButton, IonRow, IonCol, IonItem, IonLabel, IonHeader, IonTitle, IonPage, IonSelect, IonSelectOption, IonDatetime, IonText, IonAlert, IonToast } from '@ionic/react';
import { chevronBackOutline } from 'ionicons/icons';

import { useHistory } from 'react-router-dom';
import { Controller, useForm } from "react-hook-form";

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from '@app/hooks';
import moment from 'moment';
import location from '@app/mock/locations.json';
import nation from '@app/mock/nations.json';
import accountService from '../account.service';
import OtpModal from '@app/components/otp';
import profileService from 'account/profile/profile.service';
import { getProfile } from 'account/profile/profile.slice';
import { getUserInfo } from '@app/slices/auth';
const StyledInput = styled(IonInput)`
    color: black;
    margin-top: 2px;
    margin-left: 5px;
    --placeholder-color:#91969c;
`;
const StyledButton = styled(IonButton)`
    margin-left: 20px;
    width: 150px;
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
const gender = [
  { value: true, label: 'Male' },
  { value: false, label: 'Female' }
];
const UpdateAccount: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { profile } = useSelector((s) => s.profile);
  const userData = useSelector(s => s.auth.userInfo?.data);

  const { control, handleSubmit, register, formState: { errors }, trigger, reset, watch, getValues } = useForm();
  const [modalOtp, setShowModalOtp] = useState<boolean>(false);
  const [dataEntry, setDataEntry] = useState<any>({});
  const [showAlert, setShowAlert] = useState(false);
  const [success, setSuccess] = useState(false);
  const [sendPhoneOtpAlert, setSendPhoneOtpAlert] = useState<boolean>(false);
  const [sendMailOtpAlert, setSendMailOtpAlert] = useState<boolean>(false);

  const formFields: InputProps[] = [
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
      type: "text",
      label: t('Email'),
      placeholder: t('Email'),
    },
  ];

  const sendOTP = async (data: string, type: string): Promise<void> => {
    const params = type === 'phone' ? { phoneNumber: data } : { email: data };
    setDataEntry({ type, data });
    try {
      await accountService.sendUpdateOTP(params);
      setShowModalOtp(true);
    }
    catch (err) {
      type === 'phone' ? setSendPhoneOtpAlert(true) : setSendMailOtpAlert(true)
    }
  }
  const updateUserData = async (data: string, type: string): Promise<void> => {
    setShowModalOtp(false);
    const params = type === 'phone' ? { phoneNumber: getValues('phoneNumber'), otp: data } : { email: getValues('email'), otp: data };
    try {
      await accountService.updateAccount(params);
      if (profile) {
        await profileService.updateProfile({ ...profile, ...params });
      }
      getData();
      setSuccess(true);
      setShowAlert(true);
    } catch (error) {
      getData();
      setSuccess(false);
      setShowAlert(true);
    }
  }
  const onSubmit = async (data: any): Promise<void> => {
    if (data.phoneNumber !== userData?.userInfo?.phoneNumber) {
      sendOTP(data.phoneNumber, 'phone');
    }
    else if (data.email !== userData?.userInfo?.email) {
      sendOTP(data.email, 'email');
    }
  };
  const getData = useCallback(() => {
    dispatch(getProfile());
    dispatch(getUserInfo());
  }, [dispatch]);
  useEffect(getData, [getData]);
  useEffect(() => {
    register(
      'email',
      {
        //required: { value: true, message: t('Email is not enter') },
        pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: t('The email address is not valid') }
      }
    );
    register('phoneNumber',
      {
        minLength: { value: 10, message: t('Phone numbers with minimum is 10 digits') },
        maxLength: { value: 11, message: t('Phone numbers with up to 11 digits') },
        pattern: { value: /^[0-9\b]+$/, message: t('Phone number is not in the correct format') }
      }
    );
  }, [register, t]);
  useEffect(() => {
    reset({
      ...userData?.userInfo,
    });
  }, [userData?.userInfo, reset]);
  return (
    <IonPage >
      <IonHeader className='ion-margin-bottom' >
        <IonItem color='light' style={{ margin: '15px 20px 0px 10px' }}>
          <StyledIcon icon={chevronBackOutline} onClick={() => history.push('/account')}></StyledIcon>
          <IonTitle style={{ fontSize: '20px', textAlign: 'center' }}>{t('Account information')}</IonTitle>
        </IonItem>
      </IonHeader>
      <IonContent >
        <form onSubmit={handleSubmit((d) => onSubmit(d))} style={{ paddingLeft: '10px', paddingRight: '25px' }}>
          {formFields.map(({ label, name, fieldType, ...otherProps }) => {
            switch (fieldType) {
              case 'input': {
                return (
                  <>
                    <Controller
                      key={name}
                      name={name}
                      control={control}
                      rules={
                        name === 'email' ? {
                          pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: t('The email address is not valid') }
                        }
                          : name === 'phoneNumber' ? {
                            minLength: { value: 10, message: t('Phone numbers with minimum is 10 digits') },
                            maxLength: { value: 11, message: t('Phone numbers with up to 11 digits') },
                            pattern: { value: /^[0-9\b]+$/, message: t('Phone number is not in the correct format') }
                          }
                            : undefined
                      }
                      render={({ field: { onChange, onBlur, value } }) => (
                        <IonRow>
                          <StyledLabel >
                            {label}
                          </StyledLabel>
                          <IonCol size="12">
                            <IonItem color='light'>
                              <StyledInput
                                onIonBlur={(e) => {
                                  trigger(name);
                                }}
                                readonly={name === 'id' ? true : false}
                                value={watch(name) || undefined}
                                onIonChange={onChange}
                                {...otherProps}
                              >
                              </StyledInput>
                            </IonItem>
                            {(errors?.email?.message && name === 'email') && <ErrorText color='danger'>{(errors?.email?.message)}</ErrorText>}
                            {(errors?.phoneNumber?.message && name === 'phoneNumber') && <ErrorText color='danger'>{(errors?.phoneNumber?.message)}</ErrorText>}
                          </IonCol>
                        </IonRow>
                      )}
                    />
                    <div style={{ textAlign: 'right', marginTop: '10px' }}>
                      <StyledButton type='submit'>{t('Update')}</StyledButton>
                    </div>
                  </>
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
                        <IonCol size="12">
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

        </form>
        <OtpModal
          verifyOtp={updateUserData}
          showModal={modalOtp}
          data={dataEntry}
          onClose={() => { setShowModalOtp(false); getData() }}
        />
        <IonToast
          isOpen={sendPhoneOtpAlert}
          onDidDismiss={() => setSendPhoneOtpAlert(false)}
          color='danger'
          message={t('This phone number was registered')}
          duration={1000}
          position="top"
          animated={true}
        />
        <IonToast
          isOpen={sendMailOtpAlert}
          onDidDismiss={() => setSendMailOtpAlert(false)}
          color='danger'
          message={t('This mail was registered')}
          duration={1000}
          position="top"
          animated={true}
        />
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          cssClass='my-custom-class'
          header={success ? t('Success!') : t('Failed!')}
          message={success ? t('Update account successfully') : t('Incorrect code! Update account failed')}
          buttons={[
            {
              text: t('Back to account'),
              handler: () => {
                setTimeout(() => {
                  history.push('/account');
                }, 0);
              }
            },
            {
              text: t('Close'),
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                setShowAlert(false);
              }
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default UpdateAccount;
