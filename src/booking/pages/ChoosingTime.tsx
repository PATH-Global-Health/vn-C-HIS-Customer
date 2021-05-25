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
import { arrowBack, arrowBackCircle, arrowBackOutline, arrowBackSharp, arrowDown, arrowForward, arrowRedo, arrowUndo, backspace, build, calendar, chatbubble, flag, flash, home, newspaper, people, podium, returnDownBack } from 'ionicons/icons';
import HospitalDetail from 'booking/components/HospitalDetail';
import moment from 'moment';

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
const StyledLabelContent = styled(IonLabel)`
    {
        font-weight: bold;
        font-size: px;
        color: #293978;
        // margin-left: 16px;
        
    }
    `
const StyledButtonNext = styled(IonButton)`
    // width: 300px;
    --background: #293978;
    // position: absolute;
    // bottom: 5px;
    // width: 
    margin: 16px;
    margin-bottom: 80px;
    `

const ChoosingTime: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const serviceIdTest = 'f2490f62-1d28-4edd-362a-08d8a7232229';
  const interval = useSelector((w) => w.workingCaledar.interval);

  return (
    <IonPage>
      <StyledHeader>
        <StyledButtonHeader onClick={() => history.goBack()}><StyledIconRight icon={arrowBack}></StyledIconRight></StyledButtonHeader>
        <StyledLabelHeader>Thời gian xét nghiệm</StyledLabelHeader>
      </StyledHeader>
      <StyledContent>
        <StyledLabelContent>Vui lòng chọn thời gian phù hợp với bạn</StyledLabelContent>

        {interval === undefined ? "" : interval.map((interval) => (
          <StyledButton
            onClick={() => history.push('/hospitalDetail')}
          >
            <StyledIconRight icon={arrowForward}></StyledIconRight>
            <StyledIconLeft icon={podium}></StyledIconLeft>
          </StyledButton>

        ))}
      </StyledContent>
      {/* <IonLabel>{new Date(d).getFullYear()}</IonLabel> */}

      {/* <IonLabel>{dateByUnitAndServices.length}</IonLabel> */}
      <StyledButtonNext onClick={() => history.push("/confirmProfile")}>Bước tiếp theo</StyledButtonNext>
    </IonPage>
  );
};

export default ChoosingTime;