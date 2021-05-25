import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from '../../@app/hooks';
import {
  IonButton,
  IonContent,
  IonDatetime,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonRedirect,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import styled from 'styled-components';
import { useDispatch, useSelector } from '@app/hooks';
import { getUserInfo } from '../../@app/slices/auth';
import { useHistory } from "react-router-dom";
import { getDateByServiceId } from '../slices/date';
// import workingCalendars from '../services/workingCalendars';
import { arrowBack, arrowBackCircle, arrowBackOutline, arrowBackSharp, arrowDown, arrowForward, arrowRedo, arrowUndo, backspace, chatbubble, flag, flash, home, newspaper, people, returnDownBack } from 'ionicons/icons';

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

const MakingApointment: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const serviceIdTest = 'f2490f62-1d28-4edd-362a-08d8a7232229'
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
          dispatch(
            getDateByServiceId(serviceIdTest)
            
            );
          history.push('/testingApointment')
        }
        }>Đặt Lịch xét nghiệm
      <StyledIconRight icon={arrowForward}></StyledIconRight>
          <StyledIconLeft icon={flash}></StyledIconLeft>
        </StyledButton>
      </StyledContent>
    </IonPage>
  );
};

export default MakingApointment;