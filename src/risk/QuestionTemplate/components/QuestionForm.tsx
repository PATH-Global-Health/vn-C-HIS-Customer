import React from 'react';
import styled from 'styled-components';
import { Controller, useForm } from 'react-hook-form';
import {
  IonCol,
  IonContent,
  IonItem,
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
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const detailData = useSelector((s) => s.risk.questionTemplateDetail);
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
        questionTemplateId: detailData?.id ?? '',
        userId: userId,
        result: '',
        surveySessionResults: surveySessionResults,
      }
      const response = await surveySessionService.createSurveySession(params);
      dispatch(setHandeRisk({
        type: 'result',
        data: response?.surveyResult?.description ?? '',
      }));

    } catch (error) {
      console.log(error);
      //setShowFailedToast(true);
    }
  };

  return (
    <IonContent>
      <form onSubmit={handleSubmit((d) => handleData(d))} style={{ margin: '20px -20px' }}>
        {
          detailData?.questions?.map((o, i) => (
            <Controller
              key={i}
              name={o?.id ?? ''}
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <WrapperQuestion>
                  <IonRow className="">
                    <IonCol size="12">
                      <IonItem color='light' lines='inset' className='group-item'>
                        <IonRadioGroup
                          value={value}
                          onIonChange={onChange}
                        >
                          <IonListHeader>
                            <IonItem>{`Câu ${i + 1}: ${o?.description ?? ''} ?`}</IonItem>
                          </IonListHeader>
                          {
                            o?.answers?.map((ans, idx) => (
                              <IonItem key={idx}>
                                <IonItem>{ans?.description ?? ''}</IonItem>
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
        <IonRow className="ion-justify-content-center">
          <IonCol size="12">
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <StyledButton type='submit'>{t('View results')}</StyledButton>
            </div>
          </IonCol>
        </IonRow>
      </form>
    </IonContent>
  );
};

export default QuestionForm;
