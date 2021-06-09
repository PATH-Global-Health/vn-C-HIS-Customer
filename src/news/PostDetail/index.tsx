import React, { useEffect, useRef } from 'react';
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


const CardContent = styled.div`
    margin: -5px -10px;
    img{
      height: 250px;
      width: 100%;
    }
    ion-card{
      height: 100%;
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
    ion-card-content{
      font-size: 15px;
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

const WrapperKeyword = styled.div`
  margin: 5px 0px 10px 10px;
`;
const PostDetail: React.FC = () => {
  const contentRef = useRef<HTMLIonContentElement | null>(null);
  const history = useHistory();
  const date = moment().format();
  const scrollToTop = () => {
    contentRef.current && contentRef.current.scrollToTop();
  }
  return (
    <IonContent ref={contentRef} scrollEvents={true}>
      <CardContent>
        <IonCard color='light'>
          <div className='card-image'>
            <IonIcon icon={chevronBackOutline} className='back-icon' onClick={() => { history.push('/post') }}></IonIcon>
            <img src={img_small} />
          </div>
          <IonCardHeader>
            <IonCardTitle>HIV AIDS</IonCardTitle>
            <IonNote>Đoàn Hoàng</IonNote>
            <IonNote>{date}</IonNote>
          </IonCardHeader>
          <IonCardContent>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
            a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
            Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of
            Lorem Ipsum.
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
            a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
            Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of
            Lorem Ipsum.
            Founded in 1829 on an isthmus between Lake Monona and Lake Mendota, Madison was named the capital is HOANG
            </IonCardContent>

          <IonIcon icon={arrowUpOutline} className='up-icon' onClick={() => scrollToTop()}></IonIcon>
        </IonCard>
      </CardContent>
    </IonContent>
  );
};

export default PostDetail;
