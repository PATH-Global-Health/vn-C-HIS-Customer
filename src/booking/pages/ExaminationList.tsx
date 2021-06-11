import React, { useEffect, useState } from 'react';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonText,
} from '@ionic/react';
import styled from 'styled-components';
import { useDispatch, useSelector } from '@app/hooks';
import { useHistory } from "react-router-dom";
import { arrowBack, arrowForward, chatbubble, flash, pin } from 'ionicons/icons';
import { getServiceId } from 'booking/slices/workingCalendar';
import { useTranslation } from 'react-i18next';
import { getExaminationList } from '../slices/workingCalendar'
import Slider from 'react-slick';
import moment from 'moment';



const StyledIconRight = styled(IonIcon)`
{
    color: #b3b3b3;
    right: -9px;
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
  position: relative,
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

const ExaminationList: React.FC = () => {
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const examinationList = useSelector((w) => w.workingCaledar.examinationList);

  useEffect(() => {
    dispatch(getExaminationList());
  }, [dispatch])
  return (
    <IonPage>
      <StyledHeader>
        <StyledButtonHeader onClick={() => history.goBack()}><StyledIconRight icon={arrowBack}></StyledIconRight></StyledButtonHeader>
        <StyledLabelHeader>{t('Examination List')} </StyledLabelHeader>
      </StyledHeader>
      <StyledContent>
        <Slider dots={true} slidesToShow={1}>
          {examinationList.data.map((e) => (
            <IonCard>
              <IonItem>
                <IonLabel className="ion-text-wrap">
                  <IonText color='#293978'>
                    <h1>{e.customer.fullname}</h1>
                  </IonText>
                  <h2>{e.customer.email}</h2>
                  <IonText color="#293978">
                    <h2>{e.customer.address}</h2>
                  </IonText>
                  <IonText color="#293978">
                    <h2>{e.customer.phone}</h2>
                  </IonText>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonIcon icon={pin} slot="start" />
                <IonLabel>{e.service.name}</IonLabel>
              </IonItem>
              <IonItem>
                <IonIcon icon={pin} slot="start" />
                <IonLabel>{e.unit.name}</IonLabel>
              </IonItem>
              <IonCardContent>
              <h2>{e.doctor.fullname}</h2>
                <h2>{e.room.name}</h2>
                <h2>{moment(e.date).format("DD-MM-YYYY")}</h2>
                <h2>{e.interval.from}</h2>
              </IonCardContent>
              <IonImg src={`http://202.78.227.94:30111/api/Hospitals/Logo/${e.unit.id}`}></IonImg>
            </IonCard>
          ))}
        </Slider>


      </StyledContent>
    </IonPage>
  );
};

export default ExaminationList;