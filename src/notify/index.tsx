import React from 'react';
import styled from 'styled-components';
import {

  IonCol,
  IonContent,
  IonRow,
} from '@ionic/react';


import { useTranslation } from 'react-i18next';

const Notify: React.FC = () => {
  const { t } = useTranslation();

  return (
    <IonContent>
      <IonRow className="ion-justify-content-center">
        <IonCol size="12">
          <div style={{ textAlign: 'center', marginTop: '20px', color: '#1145a0', fontSize: '20px', fontWeight: 500 }}>
            {t('This feature is developing')}
          </div>
        </IonCol>
      </IonRow>
    </IonContent>
  );
};

export default Notify;
