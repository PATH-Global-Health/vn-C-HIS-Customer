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
} from '@ionic/react';
import {
  searchOutline,

} from 'ionicons/icons';
import { useDispatch, useSelector } from '@app/hooks';
import { getPostDetail, getPosts, setParentPostData } from 'news/post/post.slice';
import TagList from './TagList'

import logo from '@app/assets/img/logo.png';
import img from '@app/assets/img/khau_trang.jpg';
import img_small from '@app/assets/img/virus2.jpg';
import moment from 'moment';
import { useHistory } from 'react-router';
import { Post } from '../post.model';
import { useTranslation } from 'react-i18next';

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
  ion-item{
    border: 1px solid #d5c9c9;
    box-shadow: 1px 1px 1px 0px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    margin: 5px 1%;
    background-color:white;
  }
  img{
    max-width: 140px;
    border-radius: 5px;
    margin: 0px 0px 0px -10px;
    padding: 0
  }
  ion-label{
    margin-top: 8px;
  }
  .main-title  {
    color: black;
    font-size: 22px;
  }
  .main-card {
    margin-top: 5px;
    font-size: 12px;
    color: #000000;
    display: block;
  }
`;

const WrapperKeyword = styled.div`
  margin: 5px 0px 10px 10px;
`;
const PostListCard: React.FC = () => {
  const history = useHistory();
  const { t, i18n } = useTranslation();
  const [searchData, setSearchData] = useState('');
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(50);
  const [tagId, setTagId] = useState<string>('');
  const [totalPostLoading, setTotalPostLoading] = useState<number>(5);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const { data } = useSelector((s) => s.post.postList);
  const reverseArr = (arr: Post[]) => {
    let result = [];
    for (let i = arr.length - 1; i >= 0; i--) {
      result.push(arr[i]);
    }
    return result;
  }
  const formatArr = (arr: Post[]) => {
    return arr.map((item) => {
      const parse = /data:(.*)/i.exec(item.description);

      return {
        id: item.id,
        name: item.name,
        dateCreated: item.dateCreated,
        writter: item.writter,
        description: parse !== null ? parse[0] : '',
        tags: item.tags,
        category: item.category
      }
    })
  }
  const FilterByTagId = (arr: Post[], id?: string) => {
    let result = []
    if (id) {
      if (id !== 'none') {
        result = arr.filter(item => item?.tags[0]?.id === id)
        return formatArr(reverseArr(result));
      }
      else return formatArr(reverseArr(arr));
    }
    return formatArr(reverseArr(arr));
  }
  const getData = useCallback(() => {
    dispatch(getPosts({
      pageIndex,
      pageSize
    }));
  }, [pageIndex, pageSize, dispatch]);


  async function fetchData() {

    setTimeout(() => { setTotalPostLoading(totalPostLoading + 5); setLoading(false) }, 500);

  }
  const handleFilterTag = (id: string): void => {
    if (id) {
      setTagId(id);
    }
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

      <IonRow className="ion-justify-content-center" >
        <IonCol size="4" size-sm="3">
          <div>
            <img src={logo} alt="logo" width='150px' />
          </div>
        </IonCol>
      </IonRow>
      <StyledHeader>
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
        <div className="ion-margin-top">
          <SearchNote>{t('Popular keywords')}</SearchNote>
        </div>
        <TagList handleFilterTag={(id: string) => { handleFilterTag(id) }} />
      </StyledHeader>
      {FilterByTagId(data, tagId).slice(0, totalPostLoading).map((p, idx) => (
        <div key={idx} onClick={() => {
          dispatch(getPostDetail({ postId: p.id }));
          dispatch(setParentPostData({ data: p }));
          history.push('/post-detail')
        }
        }>
          {
            idx === 0 ?
              <Card>
                <IonCard>
                  <img src={p?.description !== '' ? p.description : logo} alt="" height='180px' width='100%' />
                  <IonCardHeader >
                    <IonCardTitle className="main-title">{p?.name ?? '...'}</IonCardTitle>
                    <IonNote className='main-card'>{moment(p?.dateCreated).format('MM/DD/YYYY') ?? '...'}</IonNote>
                    <IonNote className='main-card'>{p?.writter ?? '...'}</IonNote>
                  </IonCardHeader>
                </IonCard>
              </Card>
              :
              <ChildCard>
                <IonCol size="12" size-sm='12'>
                  <IonItem color='light' lines='none' className='item-content'>
                    <img src={p?.description !== '' ? p.description : logo} slot='start' alt='' />
                    {/* <IonLabel></IonLabel> */}
                    <IonCardHeader>
                      {/* <b className="main-title">{p?.name ?? '...'}</b> */}
                      <IonCardTitle className='main-card'>{p?.name ?? '...'}</IonCardTitle>
                      <IonNote className='main-card'>{moment(p?.dateCreated).format('MM/DD/YYYY') ?? '...'}</IonNote>
                      <IonNote className='main-card'>{p?.writter ?? '...'}</IonNote>
                    </IonCardHeader>
                  </IonItem>
                </IonCol>
              </ChildCard>
          }
        </div>
      ))}
      <div>
        <IonInfiniteScroll threshold="100px"
          onIonInfinite={(e: CustomEvent<void>) => searchNext(e)}>
          <IonInfiniteScrollContent
            loadingSpinner="bubbles"
            loadingText="Loading more data..."
          >
            {loading === true ? <IonSpinner name='bubbles' color='primary' style={{ left: '50%' }}></IonSpinner> : null}
          </IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </div>
    </IonContent>
  );
};

export default PostListCard;
