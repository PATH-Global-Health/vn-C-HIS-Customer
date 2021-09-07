import React, { useState } from 'react';
import styled from 'styled-components';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import {

  IonButton,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonRow,

} from '@ionic/react';

import { useTranslation } from 'react-i18next';
import { chevronBackOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';
import { useSelector } from '@app/hooks';
import QrCode from 'qrcode.react';
const StyledIcon = styled(IonIcon)`
   font-size: 20px;
`;
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
  const { t } = useTranslation();
  const history = useHistory();
  const { profile: data } = useSelector((s) => s.profile);
  const [qrText, setQrText] = useState({
    encodedText: '',
    encodeData: '',
    textToEncode: ''
  });
  const handleChange = (data: any) => {
    const { value, name } = data.target;

    setQrText({ ...qrText, textToEncode: data });
    console.log(qrText);

  };

  const scanCode = async () => {
    const data = await BarcodeScanner.scan();
    alert(JSON.stringify(data));
    setQrText({ ...qrText, encodedText: data.text });
  };

  const generateCode = () => {
    BarcodeScanner.encode(BarcodeScanner.Encode.TEXT_TYPE, qrText.encodeData)
      .then(data => {
        console.log(data);
        //this.setState({ textToEncode: encodedData });
      }, err => {
        console.log("Error occured : " + err);
      });
  };
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
