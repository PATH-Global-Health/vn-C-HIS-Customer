import React from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
} from '@ionic/react';
import styled from 'styled-components';
import { useDispatch, useSelector } from '@app/hooks';
import { useHistory } from "react-router-dom";
import { getDateByServiceId } from '../slices/date';
import { getHospitalByServiceId } from '../slices/hospital';
import { arrowBack, arrowForward, calendar, podium, } from 'ionicons/icons';
import { getTypeChoosing } from 'booking/slices/date';

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

const TestingAppointment: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const serviceId = useSelector((w) => w.workingCaledar.serviceId)
  return (
    <IonPage>
      <StyledHeader>
        <StyledButtonHeader onClick={() => history.goBack()}><StyledIconRight icon={arrowBack}></StyledIconRight></StyledButtonHeader>
        <StyledLabelHeader>Đặt Lịch Xét nghiệm</StyledLabelHeader>
      </StyledHeader>
      <StyledContent>
        <StyledButton onClick={() => {
          dispatch(getDateByServiceId(serviceId));
          dispatch(getTypeChoosing("apointmentDate"));
          history.push('/apointmentDate')
        }
        }>Thời gian
          <StyledIconRight icon={arrowForward}></StyledIconRight>
          <StyledIconLeft icon={calendar}></StyledIconLeft>
        </StyledButton>
        <StyledButton onClick={() => {
          dispatch(getHospitalByServiceId(serviceId));
          dispatch(getTypeChoosing("choosingHospital"));
          history.push('/choosingHospital')
        }}
        >Cơ sở dịch vụ
      <StyledIconRight icon={arrowForward}></StyledIconRight>
          <StyledIconLeft icon={podium}></StyledIconLeft>
        </StyledButton>
      </StyledContent>
    </IonPage>
  );
};

export default TestingAppointment;