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
import MultipleQuestionSection from './MultipleQuestionSection';
import SingleQuestionSection from './SingleQuestionSection';
import { SurveySessionResult } from 'risk/SurveySession/survey-session.model';

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

const QuestionForm: React.FC = () => {
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const detailData = useSelector((s) => s.risk.questionTemplateDetail);
  const userId = useSelector(s => s.auth.token?.userId);
  const handleData = async (data: any): Promise<void> => {
    try {
      const surveySessionResults = Object.keys(data).reduce((results: SurveySessionResult[], key: string): SurveySessionResult[] => {
        if (data[key]) {
          if (typeof data[key] === "string") {
            return [...results, {
              questionId: key,
              answerId: data[key]
            }];
          } else if (Array.isArray(data[key])) {
            const items = data[key].map((answerId: string) => ({
              questionId: key,
              answerId
            }));
            return [...results, ...items];
          }
        }
        return results;
      }, []);

      const params = {
        questionTemplateId: detailData?.id ?? '',
        userId,
        result: '',
        surveySessionResults,
      }
      const response = await surveySessionService.createSurveySession(params);
      dispatch(setHandeRisk({
        type: 'result',
        data: response?.surveyResult?.description ?? '',
      }));

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <IonContent>
      <form onSubmit={handleSubmit((d) => handleData(d))} style={{ margin: '20px -20px' }}>
        {(detailData?.questions ?? []).map((o, i) => (
          <Controller
            key={i}
            name={o?.id ?? ''}
            control={control}
            render={({ field: { onChange, onBlur, value } }) =>
              o.isMultipleChoice
                ? <MultipleQuestionSection data={{ ...o, index: i }} onChange={(ids: string[]) => onChange(ids)} />
                : <SingleQuestionSection data={{ ...o, index: i }} onChange={(id: string) => onChange(id)} />
            }
          />
        ))}
        <IonRow className="ion-justify-content-center">
          <IonCol size="12">
            <div style={{ textAlign: 'center', marginTop: '10px', marginBottom: '40px' }}>
              <StyledButton type='submit'>{t('View results')}</StyledButton>
            </div>
          </IonCol>
        </IonRow>
      </form>
    </IonContent>
  );
};

export default QuestionForm;