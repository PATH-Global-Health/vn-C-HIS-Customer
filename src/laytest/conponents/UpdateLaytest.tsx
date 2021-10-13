import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { IonIcon, IonContent, IonInput, IonButton, IonRow, IonCol, IonItem, IonLabel, IonHeader, IonTitle, IonPage, IonSelect, IonSelectOption, IonText, IonAlert } from '@ionic/react';
import { chevronBackOutline } from 'ionicons/icons';

import { useHistory } from 'react-router-dom';
import { Controller, useForm } from "react-hook-form";

import { useTranslation } from 'react-i18next';
import { useSelector } from '@app/hooks';
import LaytestService from 'laytest/laytest.service';
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
    ::part(icon) {
      position: absolute;
      right: 6%;
      color: #666666;
      opacity: 1;
    }
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
const ErrorText = styled(IonText)`
   color: #f46a6a;
   margin-left: 20px;
   font-size: 15px;
`
interface InputProps {
  name: string;
  fieldType: string;
  label?: string;
  key: string;
  [otherProps: string]: unknown;
};
const resultTesting = [
  { value: 'Âm tính', label: 'Âm tính' },
  { value: 'Dương tính', label: 'Dương tính' },
  { value: 'Chưa xác định', label: 'Chưa xác định' }
];
const UpdateLaytest: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const laytestDetail = useSelector((s) => s.laytest.laytestDetail);
  const { control, handleSubmit, register, formState: { errors }, trigger, reset, watch } = useForm();
  const [showAlert, setShowAlert] = useState(false);
  const [success, setSuccess] = useState(false);

  const formFields: InputProps[] = [
    {
      name: "result.code",
      fieldType: "input",
      type: "text",
      label: t('Laytest code'),
      key: 'code',
      placeholder: t('Laytest code'),
    },
    {
      name: "customer.fullname",
      fieldType: "input",
      type: "text",
      label: t('Full name'),
      key: 'fullName',
      placeholder: t(''),
    },
    {
      name: "result.resultTesting",
      fieldType: "select",
      key: "resultTesting",
      type: "text",
      label: t('Result testing'),
      placeholder: t('Result testing'),
    },

  ];

  const onSubmit = async (data: any): Promise<void> => {
    try {
      await LaytestService.updateLaytest({ id: data.id, resultTesting: data.result?.resultTesting });
      setSuccess(true);
      setShowAlert(true);
    } catch (error) {
      setSuccess(false);
      setShowAlert(true);
    }
  };

  useEffect(() => {
    register('resultTesting');
  }, [register]);
  useEffect(() => {
    reset({
      ...laytestDetail,
    });
  }, [laytestDetail, reset]);
  return (
    <IonPage >
      <IonHeader className="header">
        <IonItem color="light" onClick={() => history.push('/laytest')} >
          <IonIcon icon={chevronBackOutline} color="dark"></IonIcon>
          <IonTitle className="title">
            {t('Update laytest result')}
          </IonTitle>
        </IonItem>
      </IonHeader>
      <IonContent >
        <form onSubmit={handleSubmit((d) => onSubmit(d))} style={{ paddingLeft: '10px', paddingRight: '25px' }}>
          {formFields.map(({ label, name, fieldType, key, ...otherProps }) => {
            switch (fieldType) {
              case 'input': {
                return (
                  <Controller
                    key={name}
                    name={name}
                    control={control}
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
                              value={watch(name)}
                              readonly
                            >
                            </StyledInput>
                          </IonItem>
                          {(errors?.fullname?.message && name === 'fullname') && <ErrorText color='danger'>{(errors?.fullname?.message)}</ErrorText>}
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
                        <IonCol size="12">
                          <IonItem color='light'>
                            <StyledSelect
                              cancelText={t('Cancel')}
                              okText={t('Okay')}
                              onIonBlur={() => {
                                trigger(name)
                              }}
                              value={watch(name)}
                              onIonChange={onChange}
                            >
                              {
                                resultTesting.map((i, idx) => (
                                  <IonSelectOption key={idx} value={i.value}>{t(i.label)}</IonSelectOption>
                                ))
                              }
                            </StyledSelect>
                          </IonItem>
                          {(errors?.gender?.message && name === 'gender') && <ErrorText color='danger'>{(errors?.gender?.message)}</ErrorText>}
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
          <IonRow className="ion-justify-content-center">
            <IonCol size="12">
              <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <StyledButton type='submit'>{t('Update')}</StyledButton>
              </div>
            </IonCol>
          </IonRow>
        </form>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          cssClass='my-custom-class'
          header={success ? t('Success!') : t('Failed!')}
          message={success ? t('Update result laytest successfully') : t('Update result laytest failed')}
          buttons={[
            {
              text: t('Back to laytest history'),
              handler: () => {
                setTimeout(() => {
                  history.push('/laytest');
                  window.location.reload();
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

export default UpdateLaytest;
