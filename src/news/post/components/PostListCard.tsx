import React, { useState, useEffect } from 'react';
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
import { getPosts } from 'news/post/post.slice';

import logo from '@app/assets/img/logo.png';
import img from '@app/assets/img/virus.jpg';
import img_small from '@app/assets/img/virus2.jpg';
import moment from 'moment';
import { useHistory } from 'react-router';
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
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const [searchData, setSearchData] = useState('');
  const dispatch = useDispatch();
  const date = moment().format();
  const postList = useSelector((s) => s.post.postList);
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
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
        <WrapperKeyword>
          <IonBadge color='secondary' className='ion-margin-end'>keyword</IonBadge>
          <IonBadge color='light' className='ion-margin-end'>long keyword</IonBadge>
          <IonBadge color='light'>keyword</IonBadge>
        </WrapperKeyword>
      </StyledHeader>
      <Card>
        <IonCard onClick={() => history.push('/post-detail')}>
          <img src={img} alt="" height='180px' width='100%' />
          <IonCardHeader >
            <IonCardTitle className="main-title">{t('News headlines')}</IonCardTitle>
            <IonNote className='main-card'>{date}</IonNote>
            <IonNote className='main-card'>Đoàn Hoàng</IonNote>
          </IonCardHeader>
        </IonCard>
      </Card>
      {/*    {postList.slice(0, 5).map((p) => (
         <IonCard key={p.id}>
          <IonCardHeader>
            <IonCardSubtitle>PostId: {p.title}</IonCardSubtitle>
            <IonCardTitle>AuthorId: {p.userId}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>{p.body}</IonCardContent>
        </IonCard> 

      ))} */}
      {postList.slice(0, 4).map((p, idx) => (
        <ChildCard key={idx} onClick={() => history.push('/post-detail')}>
          <IonCol size="12" size-sm='12'>
            <IonItem color='light' lines='none' className='item-content'>
              <img src={img_small} slot='start' width='60px' height='60px' />
              <IonLabel>
                <b className="main-title">{t('News headlines')}</b>
                <IonNote className='main-card'>{date}</IonNote>
                <IonNote className='main-card'>Đoàn Hoàng</IonNote>
              </IonLabel>
            </IonItem>
          </IonCol>
        </ChildCard>
      ))}
    </IonContent>
  );
};

export default PostListCard;
