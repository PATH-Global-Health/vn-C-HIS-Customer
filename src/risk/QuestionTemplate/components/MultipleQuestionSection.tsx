import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import {
  IonCol,
  IonContent,
  IonItem,
  IonRow,
  IonButton,
  IonRadioGroup,
  IonCheckbox,
} from '@ionic/react';
import { Question } from 'risk/QuestionTemplate/question-template.model';

const WrapperQuestion = styled.div`
    ion-label{
      --color: black !important;
    }
    ion-item{
      color: black;
      --background: white;
      --border-style: none;
    }
    ion-checkbox{
      --background: white;
      --border-color: #999999;
    }
`;

interface ExtendQuestion extends Question {
  index: number;
}

interface Props {
  data: ExtendQuestion;
  onChange: (ids: string[]) => void;
}

const MultipleQuestionForm: React.FC<Props> = (props) => {
  const { data, onChange: onChangeProp } = props;

  const [answerList, setAnswerList] = useState<string[]>([]);

  const onChange = (answerId: string): void => {
    setAnswerList(
      (al: string[]): string[] => {
        if (al.includes(answerId)) {
          return al.filter((a: string) => a !== answerId);
        } else {
          return [...al, answerId];
        }
      },
    );
  }

  useEffect(() => {
    onChangeProp(answerList);
  }, [answerList]);

  return (
    <>
      <WrapperQuestion>
        <IonRow>
          <IonCol size="12">
            <IonItem color='light' lines='inset' className='group-item'>
              <IonRadioGroup>
                <IonItem>{`Câu ${data.index + 1}: ${data?.description ?? ''} ?`}</IonItem>
                {
                  (data?.answers ?? []).map(({ id, description }, idx) => (
                    <IonItem key={idx}>
                      <IonCheckbox slot="start" value={id} onIonChange={() => onChange(id)} />
                      <div style={{ fontSize: '15px' }}>{description}</div>
                    </IonItem>
                  ))
                }
              </IonRadioGroup>
            </IonItem>
          </IonCol>
        </IonRow>
      </WrapperQuestion>
    </>
  );
};

export default MultipleQuestionForm;
/* tuanl1281 */