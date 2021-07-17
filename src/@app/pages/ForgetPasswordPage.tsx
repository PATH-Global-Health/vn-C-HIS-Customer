import React from 'react';
import styled from 'styled-components';

import { useHistory } from 'react-router-dom';

import {
  chevronBackOutline,
  mailOutline,
  phonePortraitOutline,
  informationCircleOutline,
} from 'ionicons/icons';

import {
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonRow,
} from '@ionic/react';
import MethodCard, { MethodField } from '@app/components/forgot-password/method/MethodCard';
import MessageMethod from '@app/components/forgot-password/method/MessageMethod';
import { useDispatch, useSelector } from '@app/hooks';
import { setDataForgotPassword } from '@app/slices/auth';
import BirthdayMethod from '@app/components/forgot-password/method/BirthdayMethod';
import CreatePassword from '@app/components/forgot-password/create-password/CreatePassword';
import MailMethod from '@app/components/forgot-password/method/MailMethod';
import ConfirmOTP from '@app/components/forgot-password/create-password/ConfirmOTP';
import { useTranslation } from 'react-i18next';
const StyledText = styled.div`
  color: black;
  text-align: center;
  font-size: 30px;
  font-weight: 600;
  margin: 30px 15px
`;


const ForgetPassword: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { forgotPasswordData: { method } } = useSelector((state) => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();
  const methodField: MethodField[] = [
    {
      name: 'message',
      icon: phonePortraitOutline,
      color: 'rgb(91 153 255)',
      label: 'SMS',
      content: '',
    },
    {
      name: 'mail',
      icon: mailOutline,
      color: 'rgb(91 153 255)',
      label: 'GMAIL',
      content: '',
    },
    {
      name: 'question',
      icon: informationCircleOutline,
      color: 'rgb(91 153 255)',
      label: t('Security question'),
      content: t('Date of birth'),
    },
  ];
  const back = () => {
    if (method === undefined) {
      history.push('/login');
    } else {
      dispatch(setDataForgotPassword({}));
    }
  }

  return (
    <IonContent>
      <IonHeader className="ion-margin-bottom">
        <IonItem color="light" onClick={() => back()}>
          <IonIcon icon={chevronBackOutline} color="dark"></IonIcon>
        </IonItem>
      </IonHeader>
      {(method !== undefined ||
        <div>
          <IonRow className="ion-justify-content-center">
            <IonCol size='12' size-sm='6'>
              <StyledText >
                {t('Choose password recovery method')}
              </StyledText>
            </IonCol>
          </IonRow>
          <MethodCard methods={methodField} />
        </div>
      )}
      {(method === 'question' && <BirthdayMethod />)}
      {(method === 'message' && <MessageMethod />)}
      {(method === 'mail' && <MailMethod />)}
      {(method === 'confirmed' && <CreatePassword />)}
      {(method === 'confirmOTP' && <ConfirmOTP />)}
    </IonContent>
  );
};

export default ForgetPassword;
