import React from 'react';
import { IonContent, IonHeader, IonIcon, IonItem, IonPage, IonTitle, isPlatform } from '@ionic/react';
import { chevronBackOutline } from 'ionicons/icons';
import styled from 'styled-components';
import { useDispatch, useSelector } from '@app/hooks';
import { useHistory } from 'react-router';
import QuestionForm from './components/QuestionForm';
import { setHandeRisk } from './question-template.slice';
import ResultPage from './components/ResultPage';
import QuestionTemplatePage from './components/QuestionTemplate';
import AnsHistory from './components/AnsHistory';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const back = () => {
    if (type === undefined) {
      history.push('/home')
    }
    else {
      dispatch(setHandeRisk({}));
    }
  }

  return (
    <IonPage style={isPlatform('ios') ? { paddingTop: 40 } : { paddingTop: 0 }}>
      <IonContent>
        <Header>
          <IonHeader className="header">
            <IonItem color="light" onClick={() => back()} >
              <IonIcon icon={chevronBackOutline} color="dark"></IonIcon>
              <IonTitle className="title">
                {
                  type === undefined ? t('Learn the risk')
                    : type === 'answer' ? t('Reply form')
                      : type === 'ans-history' ? t('Reply history') : t('Result')
                }
              </IonTitle>
            </IonItem>
          </IonHeader>
        </Header>
        {(type !== undefined || <QuestionTemplatePage />)}
        {(type === 'answer' && <QuestionForm />)}
        {(type === 'ans-history' && <AnsHistory />)}
        {(type === 'result' && <ResultPage />)}
      </IonContent>

    </IonPage>

  )

};

export default RiskPage;
