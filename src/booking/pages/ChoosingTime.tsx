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
  IonListHeader,
  IonModal,
  IonPage,
  IonRadio,
  IonRadioGroup,
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
import { Interval } from 'booking/models/interval';
import { IntervalModel } from 'booking/models/IntervalModel';
import { getInterBooking } from 'booking/slices/workingCalendar';

const StyledButton = styled(IonButton)`{
    ::after{content: ""}
    width: 68px;
    height: 28px;
    --background: white;
    text-align: center;
    color: black;
    border: 1px solid #d7d8da;
    border-radius: 11px;
    // margin-left: 37px;
    position: relative;
    font-family: system-ui;
    font-size: 18px;
    margin: 10px;
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
        color: #a09b9b;
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
    margin-bottom: 200px;
    `
const StyledItem = styled(IonItem)`
    width: 67px;
    height: 28px;
    display: inline-block;
    border: 1px solid black;
    margin: 13px;
    border-radius: 36px;
    --color-checked: black;
    `
const StyledLabel = styled(IonLabel)`
    position: absolute;
    left: -10px;
    `

const ChoosingTime: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const interval = useSelector((w) => w.workingCaledar.interval);
  const [intervalSelected, setIntervalSelected] = useState<IntervalModel>();
  const w = useSelector((w) => w.workingCaledar.workingCalendar);
  let result = false;
  interval.map((interval) => {
    interval.intervals.map((item) => {
      if (item.isAvailable) result = true;
    });
    if (result) {
      <StyledButton>Lieu</StyledButton>
    }
  })
  return (
    <IonPage>
      <StyledHeader>
        <StyledButtonHeader onClick={() => history.goBack()}><StyledIconRight icon={arrowBack}></StyledIconRight></StyledButtonHeader>
        <StyledLabelHeader>Thời gian xét nghiệm</StyledLabelHeader>
      </StyledHeader>
      <StyledContent>
        <StyledLabelContent>Vui lòng chọn thời gian phù hợp với bạn</StyledLabelContent>
        {interval.map((interval) => {
          const intervalAvailable = interval.intervals.filter((inter) => inter.isAvailable)
          if (intervalAvailable.length > 0) {
            return (
              <StyledButton
                onClick={() => {
                  setIntervalSelected(intervalAvailable[0])

                  // console.log(intervalSelected);
                }}
              >
                {interval.from}
              </StyledButton>)
          }


        })}
      </StyledContent>
      <StyledButtonNext onClick={() => {
        dispatch(getInterBooking(intervalSelected))
        history.push("/confirmProfile")
      }}>Xác nhận</StyledButtonNext>
    </IonPage>
  );
};

export default ChoosingTime;