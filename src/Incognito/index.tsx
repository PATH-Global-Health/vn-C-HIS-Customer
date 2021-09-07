import React, { useState } from 'react';
import styled from 'styled-components';
import {

  IonAlert,
  IonCol,
  IonContent,
  IonRow,
} from '@ionic/react';


import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { useAuth } from '@app/hooks';

const IncognitoPage: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { logout } = useAuth();
  return (
    <IonContent>
      <IonRow className="ion-justify-content-center">
        <IonCol size="12" size-sm='3'>
          <div style={{ textAlign: 'center', marginTop: '20px', color: '#1145a0', fontSize: '20px', fontWeight: 500 }}>
            <IonAlert
              isOpen={true}
              cssClass='my-custom-class'
              header={t('Account registration required!')}
              message={t('You must be logged in to your account to use this feature')}
              buttons={[
                {
                  text: t('Back'),
                  handler: () => {
                    setTimeout(() => {
                      history.push('/home');
                      window.location.reload();
                    }, 0);
                  }
                },
                {
                  text: t('Create account'),
                  role: 'cancel',
                  cssClass: 'secondary',
                  handler: () => {
                    logout();
                    setTimeout(() => {
                      history.push('/register');
                      window.location.reload();
                    }, 0);
                  }
                },
              ]}
            />
          </div>
        </IonCol>
      </IonRow>
    </IonContent>
  );
};

export default IncognitoPage;
