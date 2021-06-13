import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import {
  IonBadge,

} from '@ionic/react';

import { useDispatch, useSelector } from '@app/hooks';
import { getTags } from 'news/post/post.slice';



const WrapperKeyword = styled.div`
  margin: 10px 0px 0px 10px;
  ion-badge{
    background-color:#cdf2c6;
    border-radius: 10px;
    padding: 5px;
  }
`;
const TagList: React.FC = () => {

  const dispatch = useDispatch();
  const tagList = useSelector((s) => s.post.tagList);
  const getData = useCallback(() => {
    dispatch(getTags());
  }, [dispatch]);
  useEffect(getData, [getData]);
  return (
    <>
      <WrapperKeyword>
        {
          (tagList || []).map((item, idx) => (
            <IonBadge color='light' className='ion-margin-end'>{item?.description ?? ''}</IonBadge>
          ))
        }

      </WrapperKeyword>
    </>
  );
};

export default TagList;
