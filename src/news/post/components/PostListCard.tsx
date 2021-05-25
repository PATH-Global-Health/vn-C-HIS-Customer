import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  IonBadge,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
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
  person,
} from 'ionicons/icons';
import { useDispatch, useSelector } from '@app/hooks';
import { getPosts } from 'news/post/post.slice';

import logo from '@app/assets/img/logo.png';
import img from '@app/assets/img/virus.jpg';
import moment from 'moment';

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
const StyledItem = styled(IonItem)`
  margin: 0px 15px;
  --min-height: 20px;
`;
const StyledIcon = styled(IonIcon)`
  margin: 25px 30px 15px 0px;
  padding: 11px 11px;
  font-size: 15px;
  border-radius: 10px;
  color: white;
  align-item: center;
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
const StyledText = styled(IonLabel)`
  font-size: 22px;
  font
`;
const ChildCard = styled(IonItem)`
  border: 1px solid #bcbcbc;
  border-radius: 5px;
  margin: 0px 15px;
`
const CardLabel = styled(IonLabel)`
  font-size: 22px;
  font-weight: 500;
`
const CardImage = styled(IonIcon)`
  color: #4c9fc8;
  margin-right: 30px;
`
const WrapperKeyword = styled.div`
  margin: 5px 0px 10px 10px;
`;
const PostListCard: React.FC = () => {
  const [searchData, setSearchData] = useState('');
  const dispatch = useDispatch();
  const date = moment().format();
  console.log(date);
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
      <Card>
        <IonCard>
          <img src={img} alt="" height='180px' width='100%' />
          <IonCardHeader >
            <IonCardTitle className="main-title">Tiêu đề tin tức</IonCardTitle>
            <IonNote className='main-card'>Vào lúc {date}</IonNote>
            <IonNote className='main-card'>Người đăng</IonNote>
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
      {postList.slice(0, 5).map((p) => (
        <IonRow >
          <IonCol size="12" size-sm='12'>
            <ChildCard color='light' lines='none'>
              <CardImage icon={newspaperOutline} />
              <CardLabel >
                {p.title}
              </CardLabel>
            </ChildCard>
          </IonCol>
        </IonRow>
      ))}
    </IonContent>
  );
};

export default PostListCard;
