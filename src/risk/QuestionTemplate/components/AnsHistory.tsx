import React from 'react';
import styled from 'styled-components';
import { Controller, useForm } from 'react-hook-form';
import {
  IonCol,
  IonContent,
  IonItem,
  IonLabel,
  IonRow,
  IonButton,
  IonRadioGroup,
  IonListHeader,
  IonRadio,
} from '@ionic/react';
import { useDispatch, useSelector } from '@app/hooks';

import { useTranslation } from 'react-i18next';
import { setHandeRisk } from '../question-template.slice';
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

const AnsHistory: React.FC = () => {
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const { surveySession } = useSelector((s) => s.surveySession);
  const userId = useSelector(s => s.auth.token?.userId);

  const handleData = async (data: any): Promise<void> => {
    try {
      const surveySessionResults = Object.entries(data).map((o, i) => {
        return {
          questionId: o[0] ?? '',
          answerId: o?.[1] ?? '',
        }
      })
      const params = {
        questionTemplateId: surveySession?.questionTemplateId ?? '',
        userId: userId ?? '',
        result: '',
        surveySessionResults: surveySessionResults,
      }
      const response = await surveySessionService.createSurveySession(params);
      dispatch(setHandeRisk({
        type: 'result',
        data: response?.surveyResult?.description ?? '',
      }));

    } catch (error) {
      //setShowFailedToast(true);
    }
  };
  return (
    <IonContent>
      <form onSubmit={handleSubmit((d) => handleData(d))} style={{ margin: '10px -10px' }}>
        {
          surveySession?.surveySessionResults?.map((o, i) => (
            <Controller
              key={i}
              name={o?.question?.id}
              control={control}
              defaultValue={o?.answer?.id}
              render={({ field: { onChange, onBlur, value } }) => (
                <WrapperQuestion>
                  <IonRow>
                    <IonCol size="12" >
                      <IonItem color='light' lines='inset' className='group-item'>
                        <IonRadioGroup
                          value={o?.answer?.id}
                          onIonChange={onChange}
                        >
                          <IonItem>{`Câu ${i + 1}: ${o?.question?.description ?? ''} ?`}</IonItem>
                          {
                            o?.question?.answers?.map((ans, idx) => (
                              <IonItem key={idx}>
                                <IonRadio slot="start" value={ans?.id} />
                                <div>{ans?.description ?? ''}</div>
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
        <IonRow className="ion-justify-content-center">
          <IonCol size="12">
            <div style={{ textAlign: 'center', marginTop: '10px', marginBottom: '40px' }}>
              <StyledButton type='submit'>{t('Review the results')}</StyledButton>
            </div>
          </IonCol>
        </IonRow>
      </form>
    </IonContent>
  );
};

export default AnsHistory;
