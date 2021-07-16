import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Controller, useForm } from 'react-hook-form';
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
  useIonViewWillEnter,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonSpinner,
  IonButton,
  IonRadioGroup,
  IonListHeader,
  IonRadio,
} from '@ionic/react';
import {
  searchOutline,

} from 'ionicons/icons';
import { useDispatch, useSelector } from '@app/hooks';
import { getPostDetail, getPosts, setParentPostData } from 'news/post/post.slice';

import logo from '@app/assets/img/logo.png';
import img from '@app/assets/img/khau_trang.jpg';
import virus from '@app/assets/img/virus2.jpg';
import moment from 'moment';
import { useHistory } from 'react-router';
import { QuestionTemplate } from '../question-template.model';
import { useTranslation } from 'react-i18next';
import { setHandeRisk } from '../question-template.slice';
import { SurveySession } from 'risk/SurveySession/survey-session.model';
import surveySessionService from 'risk/SurveySession/survey-session.service';

const WrapperQuestion = styled.div`
    ion-label{
      --color: black !important;
    }
    ion-item{
      color: black;
      --background: white;
      --border-style: none;
    }
    ion-radio{
      
    }
   
`;
const StyledButton = styled(IonButton)`
  font-size: 13px;
  text-transform: capitalize;
  width: 340px !important;
  height: 40px !important;
  margin: -5px 15px !important;
  --background: #293978;
  --border-radius:5px;
`

const QuestionForm: React.FC = () => {
  const history = useHistory();
  const { t, i18n } = useTranslation();
  const { control, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const detailData = useSelector((s) => s.risk.questionTemplateDetail);
  const userId = useSelector(s => s.auth.token?.userId);

  /*  const handleData = (data: any) => {
     console.log(data);
     dispatch(setHandeRisk({ type: 'result', data: 'lorem ipsum dolor sit amet consectetur adipiscing elit' }));
   } */
  const handleData = async (data: any): Promise<void> => {
    console.log(data);
    try {
      const surveySessionResults = Object.entries(data).map((o, i) => {
        return {
          questionId: o[0] ?? '',
          answerId: o?.[1] ?? '',
        }
      })
      const params = {
        questionTemplateId: detailData?.id ?? '',
        userId: userId ?? '',
        result: '',
        surveySessionResults: surveySessionResults,
      }
      const response = await surveySessionService.createSurveySession(params);
      dispatch(setHandeRisk({
        type: 'result',
        data: response?.surveyResult?.description ?? '',
      }));
      //setShowSuccessToast(true);
      //setTimeout(() => history.push('/home'), 1500);
    } catch (error) {
      //setShowFailedToast(true);
    }
  };

  return (
    <IonContent>
      {console.log(detailData?.questions.map(i => console.log(i)))}

      <form onSubmit={handleSubmit((d) => handleData(d))}>
        {
          detailData?.questions?.map((o, i) => (
            <Controller
              key={i}
              name={o?.id ?? ''}
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <WrapperQuestion>
                  <IonRow className="">
                    <IonCol size="12" size-sm='3'>
                      <IonItem color='light' lines='inset' className='group-item'>
                        <IonRadioGroup
                          value={value}
                          onIonChange={onChange}
                        >
                          <IonListHeader>
                            <IonLabel>{`Câu ${i + 1}: ${o?.description ?? ''}`}</IonLabel>
                          </IonListHeader>
                          {
                            o?.answers?.map((ans, idx) => (
                              <IonItem key={idx}>
                                <IonLabel>{ans?.description ?? ''}</IonLabel>
                                <IonRadio slot="start" value={ans?.id} />
                              </IonItem>
                            ))
                          }
                        </IonRadioGroup>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                </WrapperQuestion>
              )}
            />
          ))
        }

        {/*  <Controller
          key={'câu 2'}
          name={'câu 2'}
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <WrapperQuestion>
              <IonRow className="ion-justify-content-center">
                <IonCol size="12" size-sm='3'>
                  <IonItem color='light' lines='full'>
                    <IonRadioGroup
                      value={value}
                      onIonChange={onChange}
                    >
                      <IonListHeader>
                        <IonLabel>Câu 2: lorem ipsum dolor sit amet consectetur adipiscing elit</IonLabel>
                      </IonListHeader>
                      <IonItem>
                        <IonLabel>Có</IonLabel>
                        <IonRadio slot="start" value="0" />
                      </IonItem>

                      <IonItem>
                        <IonLabel>Không</IonLabel>
                        <IonRadio slot="start" value="1" />
                      </IonItem>

                    </IonRadioGroup>
                  </IonItem>
                </IonCol>
              </IonRow>
            </WrapperQuestion>
          )}
        /> */}
        <IonRow className="ion-justify-content-center">
          <IonCol size="12" size-sm='3'>
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <StyledButton type='submit'>xem kết quả</StyledButton>
            </div>
          </IonCol>
        </IonRow>
      </form>
    </IonContent>
  );
};

export default QuestionForm;
