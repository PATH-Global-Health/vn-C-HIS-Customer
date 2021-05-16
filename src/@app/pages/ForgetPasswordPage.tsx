import React from 'react';
import styled from 'styled-components';

import { useHistory } from 'react-router-dom';

import {
  chevronBackOutline,
  mailOutline,
  phonePortraitOutline,
  informationCircleOutline,
} from 'ionicons/icons';

import {
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonRow,
} from '@ionic/react';
import MethodCard, { MethodField } from '@app/components/forgot-password/method/MethodCard';
import MessageMethod from '@app/components/forgot-password/method/MessageMethod';
import { useDispatch, useSelector } from '@app/hooks';
import { setMethodForgotPassword } from '@app/slices/auth';
import BirthdayMethod from '@app/components/forgot-password/method/BirthdayMethod';
import CreatePassword from '@app/components/forgot-password/create-password/CreatePassword';

const StyledText = styled.div`
  color: black;
  text-align: center;
  font-size: 30px;
  font-weight: 600;
  margin: 30px 15px
`;
const methodField: MethodField[] = [
  {
    name: 'message',
    icon: phonePortraitOutline,
    color: 'rgb(91 153 255)',
    label: 'Tin nhắn',
    content: '(+84) 98822233',
  },
  {
    name: 'mail',
    icon: mailOutline,
    color: 'rgb(91 153 255)',
    label: 'Hộp thư điện tử',
    content: 'hoang@gmail.com',
  },
  {
    name: 'question',
    icon: informationCircleOutline,
    color: 'rgb(91 153 255)',
    label: 'Câu hỏi bảo mật',
    content: 'Ngày tháng năm sinh ?',
  },
];

const ForgetPassword: React.FC = () => {
  const { methodForgotPassword } = useSelector((state) => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();

  const back = () => {
    if (methodForgotPassword === null) {
      history.push('/login');
    } else {
      dispatch(setMethodForgotPassword(null));
    }
  }

  return (
    <IonContent>
      <IonHeader className="ion-margin-bottom">
        <IonItem color="light" onClick={() => back()}>
          <IonIcon icon={chevronBackOutline} color="dark"></IonIcon>
        </IonItem>
      </IonHeader>
      {(methodForgotPassword === null &&
        <div>
          <IonRow className="ion-justify-content-center">
            <IonCol size='12' size-sm='6'>
              <StyledText >
                CHỌN PHƯƠNG THỨC LẤY LẠI MẬT KHẨU
            </StyledText>
            </IonCol>
          </IonRow>
          <MethodCard methods={methodField} />
        </div>
      )}
      {(methodForgotPassword === 'question' && <BirthdayMethod />)}
      {(methodForgotPassword === 'message' && <MessageMethod />)}
      {(methodForgotPassword === 'mail' && <CreatePassword />)}
      {(methodForgotPassword === 'confirmed' && <CreatePassword />)}
    </IonContent>
  );
};

export default ForgetPassword;
