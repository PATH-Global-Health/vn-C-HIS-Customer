import React, { useEffect } from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
} from '@ionic/react';
import styled from 'styled-components';
import { useDispatch } from '@app/hooks';
import { useHistory } from "react-router-dom";
import { arrowBack, arrowForward, chatbubble, flash } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';




const StyledHeader = styled(IonHeader)`

  height: 60px;
  border-bottom: 1px solid #b3b3b3;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  position: relative,

`

const StyledLabelHeader = styled(IonLabel)`

  font-weight: bold;
    font-size: 23px;

`

const StyledButtonHeader = styled(IonButton)`

  --background: white;
  left: 10px;
  position: absolute;

`

const StyledContent = styled(IonContent)`
  text-align: center;
  ion-button {
    width: 335px !important;
    text-align: center !important;
    --background: white !important;
    color: black !important;
    border: 1px solid #d7d8da !important;
    border-radius: 11px !important;
    font-size: 18px !important;
    margin-top: 10px !important;
  }
  ion-icon {
    color: #b3b3b3 !important;
    right: 20px !important;
  }

`
const BookingTest: React.FC = () => {
  const history = useHistory();

  return (
    <>
      <StyledContent>
        <IonButton>
          Login
        </IonButton>
        <IonButton>
          Logout
        </IonButton>
      </StyledContent>
    </>
  );
};

export default BookingTest;