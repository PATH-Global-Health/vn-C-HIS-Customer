import React from 'react';
import styled from 'styled-components';
import {

  IonButton,
  IonCol,
  IonContent,
  IonItem,
  IonRow,
  IonText,
} from '@ionic/react';

import { useDispatch, useSelector } from '@app/hooks';

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
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { handleRisk: { data } } = useSelector((state) => state.risk);

  return (
    <IonContent>
      <IonRow className="ion-justify-content-center">
        <IonCol size="12">
          <div style={{ textAlign: 'center', marginTop: '20px', color: '#1145a0', fontSize: '20px', fontWeight: 500 }}>
            {data}
          </div>
        </IonCol>
      </IonRow>
      <Wrapper className="ion-margin-top">
        <IonCol size="12">
          <IonItem color='light' lines='none' className='group-item'>
            <IonText className='content'>{'Mời bạn tiếp tục tham gia tìm hiểu các nguy cơ sức khỏe cùng chủ để hoặc các chủ đề liên quan để bảo vệ sức khỏe cho bản thân và gia đình'}</IonText>
          </IonItem>
        </IonCol>
      </Wrapper>
      <IonRow className="ion-justify-content-center">
        <IonCol size="12" >
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <StyledButton onClick={() => dispatch(setHandeRisk({ type: undefined }))}>{t('Continue')}</StyledButton>
          </div>
        </IonCol>
      </IonRow>
    </IonContent>
  );
};

export default ResultPage;
