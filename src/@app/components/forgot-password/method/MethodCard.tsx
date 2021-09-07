import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';

import {
  IonRow,
  IonCol,
  IonIcon,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import { useDispatch, useSelector } from '@app/hooks';
import { setDataForgotPassword } from '@app/slices/auth';
import { getQuestionDetail, getQuestions } from 'account/security-question/security-question.slice';

export interface MethodField {
  name: string;
  icon: string;
  color: string;
  label: string;
  content: string;
  [key: string]: unknown;
}

interface Props {
  methods: MethodField[];
}

const StyledItem = styled(IonItem)`
  margin: 15px 15px;
  border: 1px solid #b3aeae;
  border-radius: 10px;
  --min-height: 40px;
  
`;

const StyledLabel = styled(IonLabel)`
  font-size: 35px;
  font-weight: 50;
  margin-bottom: 15px;
`;

const StyledIcon = styled(IonIcon)`
  margin: 20px 40px 20px 0px;
  padding: 10px 12px;
  font-size: 35px;
  border-radius: 10px;
  color: white;
  align-item: center;
`;
const StyledSelect = styled(IonSelect)`
    color: black;
    margin-top: 2px;
    margin-left: 5px;
    --placeholder-color:#91969c;
`;
const MethodCard: React.FC<Props> = ({ methods }) => {
  const dispatch = useDispatch();

  const handeChange = useCallback((method: string) => {
    dispatch(setDataForgotPassword({ method }));
  }, [dispatch]);
  const handeSecurityQuestion = useCallback((id: string) => {
    dispatch(getQuestionDetail({ id }));
    dispatch(setDataForgotPassword({ method: 'question' }));
  }, [dispatch]);
  const { data } = useSelector((s) => s.securityQuestion.questions);
  const getData = useCallback(() => {
    dispatch(getQuestions());
  }, [dispatch]);
  useEffect(getData, [getData]);
  return (
    <>
      {(methods || []).map(({ name, icon, color, label, content }, index) => (
        <div key={index}>
          {
            name === 'question' ?
              <IonRow >
                <IonCol size="12">
                  <StyledItem color="light" >
                    <StyledIcon icon={icon} style={{ backgroundColor: color, minWidth: '35px' }} />
                    <div style={{ fontSize: '19px', fontWeight: 50, minWidth: '200px' }}>
                      <b>{label}</b>
                      <br />
                    </div>
                    <StyledSelect
                      onIonChange={(e) => handeSecurityQuestion(e.detail?.value)}
                    >
                      {data?.map(item => (
                        <IonSelectOption key={item?.id} value={item?.id}>{item?.question}</IonSelectOption>
                      ))}
                    </StyledSelect>
                  </StyledItem>

                </IonCol>
              </IonRow>
              :
              <IonRow key={index}>
                <IonCol size="12">
                  <StyledItem color="light" onClick={() => handeChange(name)}>
                    <StyledIcon icon={icon} style={{ backgroundColor: color }} />
                    <StyledLabel style={{ fontSize: '18px' }}>
                      <b>{label}</b>
                      <br />
                      {content}
                    </StyledLabel>
                  </StyledItem>
                </IonCol>
              </IonRow>
          }
        </div>
      ))}
    </>
  )
};

export default MethodCard;