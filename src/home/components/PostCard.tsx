import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonNote,
  IonRow,
} from '@ionic/react';


import { useHistory } from "react-router-dom";

import logo from '@app/assets/img/logo.png'
import img from '@app/assets/img/virus.jpg'

import Slider from 'react-slick';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Post } from 'home/home.model';
import { useDispatch } from '@app/hooks';
import { getPostDetail, getPosts, setParentPostData } from 'news/post/post.slice';


const CardSlider = styled(IonRow)`
  ion-card {
    width: 80%;
    height: 220px;
    background-color: white;
  }

  ion-card-title {
    color: black;
    font-size: 15px;
    margin-bottom: 10px;
  }
  img{
    border-radius: 5px;
    width: 100%;
    height: 120px;
  }
`;
interface Props {
  data: Post[];
}
const PostCard: React.FC<Props> = ({ data }) => {
  const dispatch = useDispatch();
  const history = useHistory();
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

  return (
    <>
      <Slider infinite={false} dots={true} slidesToShow={1.3} slidesToScroll={1} swipeToSlide={true} autoplay={true} >
        {
          formatArr(reverseArr(data)).slice(0, 6).map((p, idx) => {
            return (
              <CardSlider key={idx}>
                <IonCard onClick={() => {
                  dispatch(getPostDetail({ postId: p.id }));
                  dispatch(setParentPostData({ data: p }));
                  history.push('/post-detail');
                }}
                >
                  <img src={p?.description !== '' ? p.description : logo} alt="" />
                  <IonCardHeader className='card-content' >
                    <IonCardTitle >{p?.name ?? '...'}</IonCardTitle>
                    <IonNote>{moment(p?.dateCreated).format('DD/MM/YYYY') ?? ''}</IonNote>
                  </IonCardHeader>
                </IonCard>
              </CardSlider>
            )
          })
        }
      </Slider>
    </>
  );
};

export default PostCard;