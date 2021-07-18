import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonNote,
  IonRow,
  useIonViewWillEnter,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonSpinner,
  IonButton,
} from '@ionic/react';
import { useDispatch, useSelector } from '@app/hooks';

import logo from '@app/assets/img/logo.png';
import img from '@app/assets/img/khau_trang.jpg';
import virus from '@app/assets/img/virus2.jpg';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import { getQuestionTemplates, getQuestionTemplatesDetail, setHandeRisk } from '../question-template.slice';

const Card = styled(IonRow)`
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
  & .title{
    margin-top: -12px;
    font-size: 20px;
    font-weight:600;
    color: #000000;
  }
  ion-card-title {
    color: black;
    font-size: 15px;
    margin-bottom: 5px;
  }
  img{
    border-radius: 5px;
    width: 100%;
    height: 120px;
  }
  & .description{
    color: #8d9199;
    margin-left: 3px;
  }
  & .btn{
    font-size: 13px;
    text-transform: capitalize;
    position: absolute !important;
    width: 140px !important;
    height: 40px !important;
    margin: -5px 15px !important;
    right: 0px !important;
    --background: #293978;
    --border-radius:5px;
  }
  & .done{
    --background: #55abd3;
  }
  
`;

const QuestionTemplatePage: React.FC = () => {
  const history = useHistory();
  const { t, i18n } = useTranslation();
  const userId = useSelector(s => s.auth.token?.userId);

  const [pageIndex, setPageIndex] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(50);
  const [totalPostLoading, setTotalPostLoading] = useState<number>(5);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const { data } = useSelector((s) => s.risk.questionTemplateList);
  const getData = useCallback(() => {
    dispatch(getQuestionTemplates({
      userId,
      pageIndex,
      pageSize
    }));
  }, [pageIndex, pageSize, dispatch]);

  async function fetchData() {

    setTimeout(() => { setTotalPostLoading(totalPostLoading + 5); setLoading(false) }, 500);

  }

  useIonViewWillEnter(async () => {
    await fetchData();
  });

  async function searchNext($event: CustomEvent<void>) {
    await fetchData();
    setLoading(true);
    ($event.target as HTMLIonInfiniteScrollElement).complete();
  }
  const handleClick = useCallback((id: string, type: string) => {
    dispatch(getQuestionTemplatesDetail({ id }));
    dispatch(setHandeRisk({ type }));
  }, [dispatch]);

  useEffect(getData, [getData]);
  return (
    <IonContent>
      {
        (data || []).map((o, i) => (
          <IonRow key={i} className='ion-justify-content-center' >
            <IonCol size="12" size-sm='4' size-lg='3'>
              <Card>
                <IonCard>
                  <img src={virus} alt="" />
                  <IonCardHeader className='card-content' >
                    <IonCardTitle className='title'>{o?.title ?? ''}</IonCardTitle>
                    <IonNote className='description'>{o?.description ?? ''}</IonNote>
                  </IonCardHeader>
                  {
                    o?.isCompleted
                      ? <IonButton className='btn done' >Đã thực hiện</IonButton>
                      : <IonButton className='btn' onClick={() => handleClick(o?.id, 'answer')}>Thực hiện ngay</IonButton>
                  }

                </IonCard>

              </Card>
            </IonCol>
          </IonRow>
        ))
      }

      {/*  <div>
        <IonInfiniteScroll threshold="100px"
          onIonInfinite={(e: CustomEvent<void>) => searchNext(e)}>
          <IonInfiniteScrollContent
            loadingSpinner="bubbles"
            loadingText="Loading more data..."
          >
            {loading === true ? <IonSpinner name='bubbles' color='primary' style={{ left: '50%' }}></IonSpinner> : null}
          </IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </div> */}
    </IonContent>
  );
};

export default QuestionTemplatePage;
