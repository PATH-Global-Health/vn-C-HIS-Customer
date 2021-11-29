import React from 'react';
import styled from 'styled-components';
import {
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonRow,
  IonTitle,
} from '@ionic/react';

import { useTranslation } from 'react-i18next';
import { chevronBackOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';
import GenerateQrCode from './components/GenerateQrCode';
const StyledIcon = styled(IonIcon)`
   font-size: 20px;
`;
const QrCode: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  return (
    <IonContent>
      <IonHeader className='ion-margin-bottom' >
        <IonItem color='light' style={{ margin: '15px 20px 0px 10px' }}>
          <StyledIcon icon={chevronBackOutline} onClick={() => history.push('/account')}></StyledIcon>
          <IonTitle style={{ fontSize: '20px', textAlign: 'center' }}>{t('My QR Code')}</IonTitle>
        </IonItem>
      </IonHeader>
      <GenerateQrCode />
    </IonContent>
  );
};

export default QrCode;
