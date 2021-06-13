import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import {
  IonBadge,

} from '@ionic/react';

import { useDispatch, useSelector } from '@app/hooks';
import { getPostDetail, getPosts, setParentPostData } from 'news/post/post.slice';



const WrapperKeyword = styled.div`
  margin: 5px 0px 10px 10px;
`;
const TagList: React.FC = () => {

  const dispatch = useDispatch();
  /* const { data } = useSelector((s) => s.post.postList);
  const getData = useCallback(() => {
    dispatch(getPosts({
      pageIndex,
      pageSize
    }));
  }, [pageIndex, pageSize, dispatch]);


  useEffect(getData, [getData]); */
  return (
    <>
      <WrapperKeyword>
        <IonBadge color='secondary' className='ion-margin-end'>keyword</IonBadge>
        <IonBadge color='light' className='ion-margin-end'>long keyword</IonBadge>
        <IonBadge color='light'>keyword</IonBadge>
      </WrapperKeyword>
    </>
  );
};

export default TagList;
