import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import {
  IonBadge,
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
  useIonViewWillEnter,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonSpinner,
  IonHeader,
  IonTitle,
  IonButton,
} from '@ionic/react';
import {
  chevronBackOutline,
  eyedropOutline,
  searchOutline,

} from 'ionicons/icons';
import { useDispatch, useSelector } from '@app/hooks';
import { getPostDetail, getPosts, setParentPostData } from 'news/post/post.slice';

import logo from '@app/assets/img/logo.png';
import img from '@app/assets/img/khau_trang.jpg';
import img_small from '@app/assets/img/virus2.jpg';
import moment from 'moment';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import { getLaytests, setLaytestDetail } from 'laytest/laytest.slice';

const StyleWrapperInput = styled(IonItem)`
    position: relative;
    background-color: white;
    border: 1px solid #d6d6c2;
    padding-left: 5px;
    margin: 10px 25px 0px 0px;
    border-radius: 10px;
    height: 40px;
    font-size: 18px;
    text-transform: initial;
    ion-icon{
      color: white;
      background-color:#58b1e8;
      position:absolute;
      margin-bottom: 5px;
      right: -2%;
      padding: 10px 15px 10px 10px;
    }
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
const SearchNote = styled(IonNote)`
  font-size: 13px;
  color: #767676;
  margin: 10px 0px 10px 7px;
`
const Card = styled(IonRow)`
  ion-card {
    width: 100%;
    min-height: 300px;
    border-radius: 5px;
    background-color: white;
    padding: 0;
    margin:0;
  }
  ion-card {
    width: 100%;
    min-height: 240px;
    border-radius: 5px;
    background-color: white;
    padding: 0;
    margin: 15px 15px 0px 15px;
  }
  .main-title  {
    color: black;
    font-size: 28px;
    font-weight: 600;
  }
  .main-card {
    margin-top: 8px;
    font-size: 15px;
    color: #000000;
    display: block;
  }
`;
const ChildCard = styled(IonRow)`
  position: relative;
  ion-item{
    border: 0.5px solid #d5c9c9;
    box-shadow: 1px 2px 2px 0px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    margin: 5px 10px 5px 0px;
    min-width: 100%;
    min-height: 70px;
    background-color:white;
  }
  ion-card {
    width: 100%;
    min-height: 200px;
    border-radius: 5px;
    background-color: white;
    padding: 0;
    margin: 15px 15px 0px 15px;
  }
  img{
    max-width: 140px;
    border-radius: 5px;
    margin: 0px 0px 0px -10px;
    padding: 0
  }
  ion-icon{
    position: absolute;
    left: 5%;
    margin: 25px 30px 15px 0px;
    padding: 8px 8px;
    font-size: 20px;
    border-radius: 10px;
    color: white;
    align-item: center;
  }
  ion-card-header{
    position: absolute;
    left:15%;
  }
  .main-title  {
    color: black;
    font-size: 23px;
    font-family: system-ui;
  }
  .main-card {
    margin-top: 5px;
    font-size: 13px;
    color: #000000;
    display: block;
    font-family: system-ui;
  }
  & .btn{
    font-size: 13px;
    text-transform: capitalize;
    position: absolute !important;
    width: 140px !important;
    height: 40px !important;
    margin: -10px 15px !important;
    right: 0px !important;
    bottom: 10%;
    --background: #293978;
    --border-radius:5px;
  }
`;

const WrapperKeyword = styled.div`
  margin: 5px 0px 10px 10px;
`;
const CustomerLaytest: React.FC = () => {
  const history = useHistory();
  const { t, i18n } = useTranslation();
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const [tagId, setTagId] = useState<string>('');
  const [totalPostLoading, setTotalPostLoading] = useState<number>(5);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { data } = useSelector((s) => s.laytest.laytestList);

  const getData = useCallback(() => {
    dispatch(getLaytests({
      pageIndex,
      pageSize,
    }));
  }, [pageIndex, pageSize, dispatch]);

  async function fetchData() {
    setTimeout(() => { setPageSize(pageSize + 5); setLoading(false) }, 500);
  }
  useIonViewWillEnter(async () => {
    await fetchData();
  });

  async function searchNext($event: CustomEvent<void>) {
    await fetchData();
    setLoading(true);
    ($event.target as HTMLIonInfiniteScrollElement).complete();
  }

  useEffect(getData, [getData]);
  return (
    <IonContent>
      <IonHeader className="header">
        <IonItem color="light" onClick={() => history.push('/home')} >
          <IonIcon icon={chevronBackOutline} color="dark"></IonIcon>
          <IonTitle className="title">
            {t('Laytest result')}
          </IonTitle>
        </IonItem>
      </IonHeader>
      {(data || []).map((o, idx) => (
        <div key={idx} onClick={() => {
          // dispatch(getPostDetail({ postId: p.id }));

        }
        }>

          <IonRow className='ion-justify-content-center' style={{ cursor: 'pointer' }}>
            <IonCol size="12">
              <ChildCard className='card_width'>
                <IonCard color='light' className='item-content'>
                  <IonIcon
                    icon={eyedropOutline}
                    style={{ backgroundColor: "#f77070" }}>
                  </IonIcon>
                  <IonCardHeader>
                    <b className="main-title">{'Kết quả xét nghiệm'}</b>
                    <span></span>
                    <IonNote className='main-card'>{`Mã xét nghiệm: ${o?.result?.code ?? '...'}`}</IonNote>
                    <IonNote className='main-card'>{`Ngày xét nghiệm: ${moment(o?.result?.resultDate).format('MM/DD/YYYY') ?? '...'}`}</IonNote>
                    <IonNote className='main-card'>{`Ngày có kết quả: ${moment(o?.result?.resultDate).format('MM/DD/YYYY') ?? '...'}`}</IonNote>
                    <IonNote className='main-card'>{`Kết quả xét nghiệm: ${o?.result?.resultTesting ?? 'chưa có'}`}</IonNote>
                  </IonCardHeader>
                  <IonButton
                    onClick={() => {
                      dispatch(setLaytestDetail({ data: o }));
                      history.push('/update-laytest')
                    }}
                    className='btn'
                  >
                    {t('Update laytest result')
                    }</IonButton>
                </IonCard>
              </ChildCard>
            </IonCol>
          </IonRow>
        </div>
      ))}
      <div>
        <IonInfiniteScroll threshold="100px"
          onIonInfinite={(e: CustomEvent<void>) => searchNext(e)}>
          <IonInfiniteScrollContent
            loadingSpinner="bubbles"
            loadingText="Loading more data..."
          >
            {loading ? <IonSpinner name='bubbles' color='primary' style={{ left: '50%' }}></IonSpinner> : null}
          </IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </div>
    </IonContent>
  );
};

export default CustomerLaytest;
