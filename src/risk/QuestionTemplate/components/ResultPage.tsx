import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Controller, useForm } from 'react-hook-form';
import {

  IonButton,
  IonCol,
  IonContent,
  IonItem,
  IonRow,
  IonText,
} from '@ionic/react';
import {
  searchOutline,

} from 'ionicons/icons';
import { useDispatch, useSelector } from '@app/hooks';
import { getPostDetail, getPosts, setParentPostData } from 'news/post/post.slice';

import { useHistory } from 'react-router';
import { QuestionTemplate } from '../question-template.model';
import { useTranslation } from 'react-i18next';
import { setHandeRisk } from 'risk/QuestionTemplate/question-template.slice';

const Wrapper = styled(IonRow)`
    ion-label{
      --color: black !important;
    }
    ion-item{
      display: flex !important;
      justify-content: center !important;
      color: black;
      --background: white;
      --border-style: none;
      & .title{
        text-align: center !important;
        margin-left: 23% !important;
        margin: 0px 10px;
        font-size: 20px;
        color: #1145a0;
        font-weight: 500;
      }
      & .content{
        margin-top:10px;
        margin-bottom: 20px;
      }
    }
`;
const StyledButton = styled(IonButton)`
  font-size: 13px;
  bottom: 20px !important;
  text-transform: capitalize;
  width: 340px !important;
  height: 40px !important;
  margin: -5px 15px !important;
  --background: #293978;
  --border-radius:5px;
`

const ResultPage: React.FC = () => {
  const history = useHistory();
  const { t, i18n } = useTranslation();
  const { control, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const { handleRisk: { data } } = useSelector((state) => state.risk);

  return (
    <IonContent>
      <Wrapper className="ion-margin-top">
        <IonCol size="12" size-sm='3'>
          <IonItem color='light' lines='none' className='group-item'>
            <IonText className='title'>{data}</IonText>
          </IonItem>
          <IonItem color='light' lines='none' className='group-item'>
            <IonText className='content'>{'Mời bạn tiếp tục tham gia tìm hiểu các nguy cơ sức khỏe cùng chủ để hoặc các chủ đề liên quan để bảo vệ sức khỏe cho bản thân và gia đình'}</IonText>
          </IonItem>
        </IonCol>
      </Wrapper>
      <IonRow className="ion-justify-content-center">
        <IonCol size="12" size-sm='3'>
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <StyledButton onClick={() => dispatch(setHandeRisk({ type: undefined }))}>Tiếp tục</StyledButton>
          </div>
        </IonCol>
      </IonRow>
    </IonContent>
  );
};

export default ResultPage;
