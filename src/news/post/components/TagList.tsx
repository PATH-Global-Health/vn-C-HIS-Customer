import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import {
  IonBadge,

} from '@ionic/react';

import { useDispatch, useSelector } from '@app/hooks';
import { getTags } from 'news/post/post.slice';


const WrapperKeyword = styled.div`
  margin: 10px 0px 0px 10px;
  # something:target {
    display: none;
  }
  ion-badge{
    background-color:#e2efdf;
    border-radius: 10px;
    padding: 5px;
  }
`;
const StyledIonBadge = styled(IonBadge).attrs(props => ({

}))`
  &:hover {
    background-color: #0d90e1;  
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
        <StyledIonBadge color='light' className='ion-margin-end type' onClick={() => handleFilterTag('none')}>Mới nhất</StyledIonBadge>
        {
          (tagList || []).map((item, idx) => (
            <StyledIonBadge key={idx} id="something" color='light' className='ion-margin-end type' onClick={() => handleFilterTag(item.id)}>{item?.description ?? ''}</StyledIonBadge>
          ))
        }
      </WrapperKeyword>
    </>
  );
};

export default TagList;
