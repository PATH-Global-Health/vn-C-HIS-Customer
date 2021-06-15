import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import {
  IonBadge,

} from '@ionic/react';

import { useDispatch, useSelector } from '@app/hooks';
import { getTags, setFilter } from 'news/post/post.slice';


const WrapperKeyword = styled.div`
  margin: 10px 0px 0px 10px;
  ion-badge{
    background-color:#cdf2c6;
    hover: {
      background-color: red
    }
    border-radius: 10px;
    padding: 5px;
  }
`;
interface Props {
  handleFilterTag: (id: string) => void;
}
const TagList: React.FC<Props> = ({
  handleFilterTag
}) => {

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
            <IonBadge key={idx} color='light' className='ion-margin-end' onClick={() => handleFilterTag(item.id)}>{item?.description ?? ''}</IonBadge>
          ))
        }

      </WrapperKeyword>
    </>
  );
};

export default TagList;
