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
import { getServiceId } from 'booking/slices/workingCalendar';
import { useTranslation } from 'react-i18next';
import { getUserInfo } from '../slices/workingCalendar';

const StyledButton = styled(IonButton)`
    ::after{content: ""}
    width: 335px;
    --background: white;
    text-align: center;
    color: black;
    border: 1px solid #d7d8da;
    border-radius: 11px;
    // margin-left: 37px;
    position: relative;
    font-family: system-ui;
    font-size: 18px;
    margin-top: 10px;
`;

const StyledIconRight = styled(IonIcon)`
    color: #b3b3b3;
    right: -9px;
    position: absolute;
`;

const StyledIconLeft = styled(IonIcon)`
    color: #b3b3b3;
    left: 5px;
    position: absolute;
`;

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
  --background: none;
  left: 10px;
  position: absolute;
`

const StyledContent = styled(IonContent)`
  text-align: center;
`

const HomeBooking: React.FC = () => {
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserInfo());
  }, [])
  return (
    <IonPage>
      <StyledHeader>
        <StyledButtonHeader onClick={() => history.goBack()}><StyledIconRight icon={arrowBack}></StyledIconRight></StyledButtonHeader>
        <StyledLabelHeader>{t('Booking')} </StyledLabelHeader>
      </StyledHeader>
      <StyledContent>
        <StyledButton onClick={() => {
          dispatch(getServiceId('9f9e8dd3-890e-4ae5-2952-08d92b03ae12'));
          history.push('/testingAppointment');
        }}>{t('Schedule a consultation')}
          <StyledIconRight icon={arrowForward}></StyledIconRight>
          <StyledIconLeft icon={chatbubble}></StyledIconLeft>
        </StyledButton>
        <StyledButton onClick={() => {
          dispatch(getServiceId('f2490f62-1d28-4edd-362a-08d8a7232229'));
          history.push('/testingAppointment')
        }
        }>{t('Schedule a test')}
          <StyledIconRight icon={arrowForward}></StyledIconRight>
          <StyledIconLeft icon={flash}></StyledIconLeft>
        </StyledButton>
      </StyledContent>
    </IonPage>
  );
};

export default HomeBooking;