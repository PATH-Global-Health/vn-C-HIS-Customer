import React, { useEffect, useState } from 'react';
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
import { getDateByServiceId } from '../../booking/slices/date';
import { arrowBack, arrowForward, chatbubble, flash } from 'ionicons/icons';
import { getServiceId } from 'booking/slices/workingCalendar';

const StyledButton = styled(IonButton)`{
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
}
`;

const StyledIconRight = styled(IonIcon)`
{
    color: #b3b3b3;
    right: -9px;
    position: absolute;
  }
`;

const StyledIconLeft = styled(IonIcon)`
{
    color: #b3b3b3;
    left: 5px;
    position: absolute;
  }
`;

const StyledHeader = styled(IonHeader)`
{
  height: 60px;
  border-bottom: 1px solid #b3b3b3;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}
`

const StyledLabelHeader = styled(IonLabel)`
{
  font-weight: bold;
    font-size: 23px;
}
`

const StyledButtonHeader = styled(IonButton)`
{
  --background: white;
  left: 10px;
  position: absolute;
}
`

const StyledContent = styled(IonContent)`
{
  text-align: center;
}
`

const HomeBooking: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  // const serviceIdTest = 'f2490f62-1d28-4edd-362a-08d8a7232229'
  // c1b7411c-52ba-46e4-9a09-08d8b860e829
  return (
    <IonPage>
      <StyledHeader>
        <StyledButtonHeader onClick={() => history.goBack()}><StyledIconRight icon={arrowBack}></StyledIconRight></StyledButtonHeader>
        <StyledLabelHeader>Đặt lịch</StyledLabelHeader>
      </StyledHeader>
      <StyledContent>
        <StyledButton>Đặt Lịch tư vấn
          <StyledIconRight icon={arrowForward}></StyledIconRight>
          <StyledIconLeft icon={chatbubble}></StyledIconLeft>
        </StyledButton>
        <StyledButton onClick={() => {
          dispatch(getServiceId('c1b7411c-52ba-46e4-9a09-08d8b860e829'));
          history.push('/testingAppointment')
        }
        }>Đặt Lịch xét nghiệm
      <StyledIconRight icon={arrowForward}></StyledIconRight>
          <StyledIconLeft icon={flash}></StyledIconLeft>
        </StyledButton>
      </StyledContent>
    </IonPage>
  );
};

export default HomeBooking;