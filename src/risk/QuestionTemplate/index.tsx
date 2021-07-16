import { IonContent, IonHeader, IonIcon, IonItem, IonTitle } from '@ionic/react';
import { chevronBackOutline } from 'ionicons/icons';
import styled from 'styled-components';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from '@app/hooks';
import { useHistory } from 'react-router';
import QuestionForm from './components/QuestionForm';
import { setHandeRisk } from './question-template.slice';
import ResultPage from './components/ResultPage';
import QuestionTemplatePage from './components/QuestionTemplate';

const Header = styled.div`
    & .header{
      margin-left: -10px;
      height: 40px;
      
    }
    & .title{
      font-weight: 600;
      text-align: center;
      margin: 10px 0px !important
    }
`
const RiskPage: React.FC = () => {
  const { handleRisk: { type } } = useSelector((state) => state.risk);
  const history = useHistory();
  const dispatch = useDispatch();
  const back = () => {
    if (type === undefined) {
      history.push('/home')
    }
    else {
      dispatch(setHandeRisk({}));
    }
  }

  return (
    <IonContent>
      <Header>
        <IonHeader className="header">
          <IonItem color="light" onClick={() => back()} >
            <IonIcon icon={chevronBackOutline} color="dark"></IonIcon>
            <IonTitle className="title">
              {type === undefined ? 'Tìm Hiểu Nguy Cơ'
                : type === 'answer' ? 'Biểu Mẫu 1' : 'Kết Quả'}
            </IonTitle>
          </IonItem>
        </IonHeader>
      </Header>
      {(type !== undefined || <QuestionTemplatePage />)}
      {(type === 'answer' && <QuestionForm />)}
      {(type === 'result' && <ResultPage />)}
    </IonContent>

  )

};

export default RiskPage;
