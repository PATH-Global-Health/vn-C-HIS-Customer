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
} from '@ionic/react';
import {
  searchOutline,

} from 'ionicons/icons';
import { useDispatch, useSelector } from '@app/hooks';
import { getPostDetail, getPosts, setParentPostData } from 'news/post/post.slice';

import logo from '@app/assets/img/logo.png';
import img from '@app/assets/img/virus.jpg';
import img_small from '@app/assets/img/virus2.jpg';
import moment from 'moment';
import { useHistory } from 'react-router';
import { Post } from '../post.model';

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
    height: 300px;
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
    color: #646464;
    display: block;
  }
`;
const ChildCard = styled(IonRow)`
  ion-item{
    border: 1px solid #bcbcbc;
    border-radius: 10px;
    margin: 5px 1%;
    background-color:white;
  }
  img{
    margin: 20px 20px 20px 0px;
    border-radius: 5px;
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
    color: #646464;
    display: block;
  }
`;

const WrapperKeyword = styled.div`
  margin: 5px 0px 10px 10px;
`;
const PostListCard: React.FC = () => {
  const history = useHistory();
  const [searchData, setSearchData] = useState('');
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(100);
  const dispatch = useDispatch();
  const date = moment().format();
  const { data } = useSelector((s) => s.post.postList);
  console.log(data);
  const reverseArr = (arr: Post[]) => {
    let result = [];
    for (let i = arr.length - 1; i >= 0; i--) {
      result.push(arr[i]);
    }
    return result;
  }
  const getData = useCallback(() => {
    dispatch(getPosts({
      pageIndex,
      pageSize
    }));
  }, [pageIndex, pageSize, dispatch]);
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
              placeholder='Tìm kiếm'
              onIonChange={e => setSearchData(e.detail.value!)}
            >
            </StyledInput>
            <IonIcon icon={searchOutline} color='medium' slot='end'></IonIcon>
          </StyleWrapperInput>
        </div>
        <div className="ion-margin-top">
          <SearchNote>TỪ KHÓA PHỔ BIẾN</SearchNote>
        </div>
        <WrapperKeyword>
          <IonBadge color='secondary' className='ion-margin-end'>keyword</IonBadge>
          <IonBadge color='light' className='ion-margin-end'>long keyword</IonBadge>
          <IonBadge color='light'>keyword</IonBadge>
        </WrapperKeyword>
      </StyledHeader>

      {reverseArr(data).slice(0, 7).map((p, idx) => (
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
                  <img src={img} alt="" height='180px' width='100%' />
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
                    <img src={img_small} slot='start' width='60px' height='60px' alt='' />
                    <IonLabel>
                      <b className="main-title">{p?.name ?? '...'}</b>
                      <IonNote className='main-card'>{moment(p?.dateCreated).format('MM/DD/YYYY') ?? '...'}</IonNote>
                      <IonNote className='main-card'>{p?.writter ?? '...'}</IonNote>
                    </IonLabel>
                  </IonItem>
                </IonCol>
              </ChildCard>
          }
        </div>
      ))}
    </IonContent>
  );
};

export default PostListCard;
