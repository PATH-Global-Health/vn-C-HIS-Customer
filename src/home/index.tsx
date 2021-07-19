import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonNote,
  IonRow,
} from '@ionic/react';
import {
  chevronForwardOutline,
  searchOutline,
  calendarOutline,
  alarmOutline,
  arrowForwardOutline,
  eyedropOutline,
  newspaperOutline,
} from 'ionicons/icons';

import { useHistory } from "react-router-dom";

import PostCard from "./components/PostCard";
import logo from '@app/assets/img/logo.png';
import img from '@app/assets/img/virus.jpg';

import Slider from 'react-slick';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from '@app/hooks';
import { getPosts } from 'news/post/post.slice';
import { getUserInfo } from 'booking/slices/workingCalendar';

const StyleWrapperInput = styled(IonItem)`
    background-color: white;
    border: 1px solid #d6d6c2;
    padding-left: 5px;
    margin: 10px 25px 0px 0px;
    border-radius: 10px;
    height: 40px;
    font-size: 18px;
    text-transform: initial;
`;
const StyledInput = styled(IonInput)`
    color: black;
    margin-top: 2px;
`;
const StyledHeader = styled.div`
  color: black;
  font-size: 20px;
  margin-left: 5%;
  margin-top: 5%;
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
  margin: -30px 0px 10px 6px;
  font-size: 21px;
  font-weight: 300;
  color: white;
`;
const CardNote = styled(IonNote)`
  font-size: 12px;
  color: #2e2d2d;
  margin-left: 7px;
`
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
`
const CardSlider = styled(IonRow)`
  ion-card {
    width: 80%;
    height: 180px;
    background-color: white;
  }
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
    note: string
    color: string;
    [otherProps: string]: unknown;
  };

  const optionFields: OptionProps[] = [
    {
      name: "booking",
      icon: calendarOutline,
      label: t('Booking'),
      note: t('Consultation') + ',' + t('Testing'),
      color: "#4c8dff",
    },
    {
      name: "examinationList",
      icon: alarmOutline,
      label: t('Schedule'),
      note: t('Check appointment'),
      color: "#409f4e"
    },
    {
      name: "risk",
      icon: searchOutline,
      label: t('Risk'),
      note: t('Risk check'),
      color: "#f1c248"
    },
  ];
  const [searchData, setSearchData] = useState('');
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(50);
  const { data } = useSelector((s) => s.post.postList);
  const userInfo = useSelector((w) => w.workingCaledar.userProfile);
  const history = useHistory();
  const reload = () => {
    window.location.reload();
  }
  const handleTypeService = (name: string) => {
    name === "booking" ? history.push("/homeBooking")
      : name === "examinationList" ? history.push("/examinationList")
        : history.push("/risk");

  }
  const getData = useCallback(() => {
    dispatch(getPosts({
      pageIndex,
      pageSize
    }));
    dispatch(getUserInfo());
  }, [pageIndex, pageSize, dispatch]);
  useEffect(getData, [getData]);
  /* useEffect(() => {
    if (loading === true)
      reload()
  }, [loading]) */

  return (
    <>
      <IonContent>
        <IonRow className="ion-justify-content-center" >
          <IonCol size="4" size-sm="3">
            <div>
              <img src={logo} alt="logo" width='150px' />
            </div>
          </IonCol>
        </IonRow>
        <StyledHeader>
          <div>
            {t('Hello')}<b> &nbsp;{userInfo.fullname}</b>
          </div>
          <div>
            <StyleWrapperInput color='light' lines='none'>
              <StyledInput
                placeholder={t('Search')}
                onIonChange={e => setSearchData(e.detail.value!)}
              >
              </StyledInput>
              <IonIcon icon={searchOutline} color='medium' slot='end'></IonIcon>
            </StyleWrapperInput>
          </div>
        </StyledHeader>
        <Menu>
          <IonItem className="ion-no-padding" color="light">
            <IonLabel><span className="title">{t('Featured Services')}</span></IonLabel>
            <IonNote slot="end">{t('View all')}</IonNote>
            <IonIcon className="ion-align-self-center" slot="end" size="small" icon={chevronForwardOutline} />
          </IonItem>
        </Menu>
        <IonRow className="ion-justify-content-center">
          {
            optionFields.map(({ name, icon, label, color, note }, idx) => {
              return (
                <IonCol key={idx}>
                  <Card
                    style={{ backgroundColor: color }}
                    onClick={() => { handleTypeService(name + "") }}
                  >
                    <div>
                      <CardIcon icon={icon} slot='start' />
                    </div>
                    <CardLabel>
                      {label}
                    </CardLabel>
                    <div>
                      <CardNote>{note}</CardNote>
                    </div>
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
        <IonRow className='ion-margin-top'>
          <IonCol size="12" size-sm='12'>
            <ResultButton color='light' lines='none'>
              <ResultIcon icon={eyedropOutline} />
              <ResultLabel >
                {t('View test results')}
              </ResultLabel>
              <IonIcon icon={arrowForwardOutline} color='medium'>
              </IonIcon>
            </ResultButton>
          </IonCol>
        </IonRow>
        <IonRow >
          <IonCol size="12" size-sm='12'>
            <ResultButton color='light' lines='none'>
              <ResultIcon icon={newspaperOutline} />
              <ResultLabel >
                {t('Update test results')}
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
        <PostCard data={data} />
      </IonContent>
    </>
  );
};

export default Home;
