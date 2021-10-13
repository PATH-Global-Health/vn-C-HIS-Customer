import React, { useRef } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonIcon,
  IonNote,
} from '@ionic/react';
import {
  arrowUpOutline,
  chevronBackOutline,

} from 'ionicons/icons';
import { useHistory } from 'react-router';

import img_small from '@app/assets/img/khau_trang.jpg';
import { useSelector } from '@app/hooks';
import { PostDetail } from '../post/post.model';


const CardContent = styled.div`
    margin: -5px -10px;
    img{
      height: 250px;
      width: 100%;
    }
    ion-card-header{
      margin-left: 5px;
    }
    ion-card-content{
      margin-bottom: -10px;
      font-size: 15px;
    }
    ion-card{
      min-height: 740px;
    }
    ion-note{
      display: block;
      margin: 5px 3px;
      color: #716f6f;
      font-size: 15px
    }
    ion-card-title{
      font-size: 30px;
    }
    .card-image{
      position: relative;
    }
    .back-icon{
      position: absolute;
      top: 15px;
      left: 5px;
      font-size: 25px;
      color: white;
    }
    .up-icon{
      position: fixed;
      bottom: 15px;
      right: 15px;
      font-size: 30px;
      color: #1b1a1a;
      padding: 5px;
      opacity: 0.8;
      background: #dedbd4;
		  border-radius: 999px;
    }
    .up-icon:hover{
      opacity:1.0;
    }

`;

const PostDetailPage: React.FC = () => {
  const parentPostData = useSelector((s) => s.post.parentPostData);
  const detailPostList = useSelector((s) => s.post.postDetail);
  const contentRef = useRef<HTMLIonContentElement | null>(null);
  const history = useHistory();
  const scrollToTop = () => {
    contentRef.current && contentRef.current.scrollToTop();
  }
  const sortByOrder = (arr: PostDetail[]) => {
    return [...arr].sort((a, b) => {
      return a.order - a.order;
    })
  }
  return (
    <IonContent ref={contentRef} scrollEvents={true}>
      <CardContent>
        <IonCard color='light'>
          <div className='card-image'>
            <IonIcon icon={chevronBackOutline} className='back-icon' onClick={() => { history.push('/post') }}></IonIcon>
            <img src={parentPostData?.description !== '' ? parentPostData?.description : img_small} alt='post_image' />
          </div>
          <div>
            <IonCardHeader>
              <IonCardTitle>{parentPostData?.name ?? '...'}</IonCardTitle>
              <IonNote>{parentPostData?.writter ?? '....'}</IonNote>
              <IonNote>{moment(parentPostData?.dateCreated).format('MM/DD/YYYY') ?? '...'}</IonNote>
            </IonCardHeader>
          </div>
          {
            (sortByOrder(detailPostList) || []).map((item, idx) => (
              <div key={idx}>
                {
                  item.type === 0
                    ?
                    <IonCardContent>{item?.content ? <div dangerouslySetInnerHTML={{ __html: item.content }} /> : ''}</IonCardContent>
                    :
                    <IonCardContent>
                      <img src={item.content} alt='' style={{ height: '200px' }} />
                    </IonCardContent>
                }
              </div>
            ))
          }
          <IonIcon icon={arrowUpOutline} className='up-icon' onClick={() => scrollToTop()}></IonIcon>
        </IonCard>
      </CardContent>
    </IonContent>
  );
};

export default PostDetailPage;
