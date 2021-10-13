import React from 'react';
import styled from 'styled-components';
import {
  IonCol,
  IonContent,
  IonRow,
} from '@ionic/react';

import { useSelector } from '@app/hooks';
import QrCode from 'qrcode.react';
const StyledQR = styled(QrCode)`
  height: 128px;
  width: 128px;
  margin-left: 95px;
  margin-top: 150px;
  font-size: 100px;
  min-width: 220px;
  min-height: 220px;
`;
const GenerateQrCode: React.FC = () => {
  const { profile: data } = useSelector((s) => s.profile);
  return (
    <IonContent >
      <StyledQR value={data?.id ?? ''} />
      <IonRow className="ion-justify-content-center">
        <IonCol size="12">
          <div style={{ textAlign: 'center', marginTop: '20px', color: '#1145a0', fontSize: '13px', fontWeight: 500 }}>
            {data?.id ?? ''}
          </div>
        </IonCol>
      </IonRow>
    </IonContent>
  );
};
export default GenerateQrCode;
