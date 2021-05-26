import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from '../../@app/hooks';
import {
  IonButton,
  IonContent,
  IonDatetime,
  IonHeader,
  IonIcon,
  IonImg,
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
import { useHistory, useLocation } from "react-router-dom";
import { getDateByServiceId } from '../slices/date';
import { arrowBack, arrowBackCircle, arrowBackOutline, arrowBackSharp, arrowDown, arrowForward, arrowRedo, arrowUndo, backspace, build, calendar, chatbubble, flag, flash, home, newspaper, people, podium, returnDownBack } from 'ionicons/icons';
import HospitalDetail from 'booking/components/HospitalDetail';
import { getHospitalBooking } from 'booking/slices/hospital';

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

const StyledImg = styled(IonImg)`
{
    left: -15px;
    width: 50px;
    height: 50px;
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

const ChoosingHospital: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const serviceIdTest = 'f2490f62-1d28-4edd-362a-08d8a7232229';
  const hospitals = useSelector((h) => h.hospital.hospitals);

  const date = useLocation().state;
  return (
    <IonPage>
      <StyledHeader>
        <StyledButtonHeader onClick={() => history.goBack()}><StyledIconRight icon={arrowBack}></StyledIconRight></StyledButtonHeader>
        <StyledLabelHeader>Danh sách cơ sở</StyledLabelHeader>
        {/* <StyledHeader>{typeChoosing}</StyledHeader> */}
      </StyledHeader>
      <StyledContent>
        {hospitals.map(hospital => (
          <StyledButton
            onClick={() => {
              dispatch(getHospitalBooking(hospital));
              history.push('/hospitalDetail', hospital)
            }}
          >{hospital.name}
            <StyledIconRight icon={arrowForward}></StyledIconRight>
            <StyledIconLeft icon={podium}></StyledIconLeft>
            <StyledImg src={`https://smapi.vkhealth.vn/api/Hospitals/Logo/${hospital.id}`}></StyledImg>
          </StyledButton>
        ))}


      </StyledContent>
    </IonPage>
  );
};

export default ChoosingHospital;