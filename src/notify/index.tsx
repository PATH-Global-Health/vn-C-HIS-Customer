import React from 'react';
import styled from 'styled-components';
import {

  IonCol,
  IonContent,
  IonPage,
  IonRow,
  isPlatform,
} from '@ionic/react';


import { useTranslation } from 'react-i18next';

const Notify: React.FC = () => {
  const { t } = useTranslation();

  return (
    <IonPage style={isPlatform('ios') ? { paddingTop: 40 } : { paddingTop: 0 }}>
      <IonContent>
        <IonRow className="ion-justify-content-center">
          <IonCol size="12">
            <div style={{ textAlign: 'center', marginTop: '20px', color: '#1145a0', fontSize: '20px', fontWeight: 500 }}>
              {t('This feature is developing')}
            </div>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Notify;
