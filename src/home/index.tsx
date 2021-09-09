import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  IonCard,
  IonCol,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
  IonRow,
  IonSpinner,
} from '@ionic/react';
import {
  chevronForwardOutline,
  searchOutline,
  calendarOutline,
  alarmOutline,
  arrowForwardOutline,
  eyedropOutline,
  peopleCircleSharp,
} from 'ionicons/icons';

import { useHistory } from "react-router-dom";

import PostCard from "./components/PostCard";
import logo from '@app/assets/img/logo.png';
import img from '@app/assets/img/virus.jpg';


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from '@app/hooks';
import { getPosts } from 'news/post/post.slice';
import { getUserInfo } from 'booking/slices/workingCalendar';
import { setHandeRisk } from 'risk/QuestionTemplate/question-template.slice';
import { getProfile } from 'account/profile/profile.slice';

const StyledHeader = styled.div`
  color: black;
  font-size: 20px;
  margin-left: 5%;
  margin-top: 10px;
`;
const Card = styled(IonCard)`
  height: 110px;
  background-color: blue;
  margin-inline: 0 !important;
  width: 100%;
`;
const CardIcon = styled(IonIcon)`
  font-size: 20px;
  color: black;
  background-color: white;
  margin: 10px 0px 5px 10px;
  padding: 8px 8px;
  border-radius: 10px;
  align-item: center;
`;
const CardLabel = styled(IonLabel)`
  margin: 0px 0px 10px 6px;
  font-size: 21px;
  font-weight: 300;
  color: white;
  position: absolute;
  left: 5%;
`;
const ResultButton = styled(IonItem)`
  border: 1px solid #bcbcbc;
  border-radius: 10px;
  margin: 0px 15px;
`
const ResultLabel = styled(IonLabel)`
  font-size: 22px;
  font-weight: 500;
`
const ResultIcon = styled(IonIcon)`
  color: #4c9fc8;
  margin-right: 30px;
`;
const Menu = styled(IonRow)`
  padding: 0 10px 0 20px;
  ion-item {
    width: 100%;
  }
  ion-note {
    margin: 0 !important;
    font-size: 14px;
  }
  ion-icon {
    font-size: 8px;
  }

  .title {
    font-weight: 700;
    font-size: 18px;
  }
`;
const Home: React.FC = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  interface OptionProps {
    icon: string;
    label: string;
    color: string;
    [otherProps: string]: unknown;
  };

  const optionFields: OptionProps[] = [
    {
      name: "booking",
      icon: calendarOutline,
      label: t('Dịch vụ'),
      color: "#4c8dff",
    },
    {
      name: "examinationList",
      icon: alarmOutline,
      label: t('Schedule'),
      color: "#409f4e"
    },
    {
      name: "risk",
      icon: searchOutline,
      label: t('Đánh giá nguy cơ'),
      color: "#f1c248"
    },

    {
      name: "doctorList",
      icon: peopleCircleSharp,
      label: t('CBO support'),
      color: "#EB5757"
    },
  ];
  const { postList: { data }, getPostLoading } = useSelector((s) => s.post);
  const userData = useSelector(s => s.auth.userInfo?.data);
  const { profile } = useSelector((s) => s.profile);
  const history = useHistory();

  const handleTypeService = (name: string) => {
    name === "booking" ? history.push("/shomeBooking")
      : name === "examinationList" ? history.push("/examinationList")
      : name === "doctorList" ? history.push("/doctorList")
        : RedirectRiskPage();

  }
  const RedirectRiskPage = () => {
    history.push("/risk");
    dispatch(setHandeRisk({ type: undefined }));
  }
  /*   const getData = useCallback(() => {
      dispatch(getPosts({
        pageIndex,
        pageSize
      }));
      dispatch(getUserInfo());
    }, [pageIndex, pageSize, dispatch]);
    useEffect(getData, [getData]); */

  const getProfileData = useCallback(() => {
    dispatch(getProfile());
    dispatch(getUserInfo());
  }, [dispatch]);
  useEffect(getProfileData, [getProfileData]);

  return (
    <>

      <IonContent>
        <IonRow className="ion-justify-content-center ion-margin-top" >
          <IonCol size="4" size-sm="3">
            <div>
              <img src={logo} alt="logo" width='150px' />
            </div>
          </IonCol>
        </IonRow>
        <StyledHeader>
          <div>
            {t('Hello')}<b> &nbsp;{profile?.fullname ?? ''}</b>
          </div>
        </StyledHeader>
        <Menu className='ion-margin-top'>
          <IonItem className="ion-no-padding" color="light">
            <IonLabel><span className="title">{t('Featured Services')}</span></IonLabel>
            <IonNote slot="end">{t('View all')}</IonNote>
            <IonIcon className="ion-align-self-center" slot="end" size="small" icon={chevronForwardOutline} />
          </IonItem>
        </Menu>
        <IonRow className="ion-justify-content-center">
          {
            optionFields.map(({ name, icon, label, color }, idx) => {
              return (
                <IonCol key={idx}>
                  <Card
                    style={{ backgroundColor: color, cursor: 'pointer' }}
                    onClick={() => { handleTypeService(name + "") }}
                  >
                    <div>
                      <CardIcon icon={icon} slot='start' />
                    </div>
                    <CardLabel>
                      {label}
                    </CardLabel>
                  </Card>
                </IonCol>

              )
            })
          }
        </IonRow>
        <Menu>
          <IonItem className="ion-no-padding" color="light">
            <IonLabel><span className="title">{t('Your test results')}</span></IonLabel>
          </IonItem>
        </Menu>
        <IonRow className='ion-margin-top' style={{ cursor: 'pointer' }}>
          <IonCol size="12" size-sm='12'>
            <ResultButton onClick={() => history.push('/resultExaminations')} color='light' lines='none'>
              <ResultIcon icon={eyedropOutline} />
              <ResultLabel >
                {t('View test results')}
              </ResultLabel>
              <IonIcon icon={arrowForwardOutline} color='medium'>
              </IonIcon>
            </ResultButton>
          </IonCol>
        </IonRow>
        <Menu>
          <IonItem className="ion-no-padding" color="light">
            <IonLabel><span className="title">{t('Featured Posts')}</span></IonLabel>
            <IonNote slot="end" onClick={() => history.push('/post')}>{t('View all')}</IonNote>
            <IonIcon className="ion-align-self-center" slot="end" size="small" icon={chevronForwardOutline} />
          </IonItem>
        </Menu>
        <PostCard />
      </IonContent>
    </>
  );
};

export default Home;
