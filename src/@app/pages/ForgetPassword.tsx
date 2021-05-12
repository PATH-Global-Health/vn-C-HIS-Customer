import React from 'react';
import styled from 'styled-components';

import {
  IonAvatar,
  IonButton,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonRow,
} from '@ionic/react';
import {
  informationCircleOutline,
  mailOutline,
  phonePortraitOutline,
  chevronBackOutline,
} from 'ionicons/icons';

import { useHistory } from "react-router-dom";

import logo from '@app/assets/img/logo.png'

const StyledItem = styled(IonItem)`
  margin: 15px 15px;
  border: 1px solid #b3aeae;
  border-radius: 10px;
  --min-height: 40px;
  
`;

const StyledIcon = styled(IonIcon)`
  margin: 20px 40px 20px 0px;
  padding: 10px 12px;
  font-size: 35px;
  border-radius: 10px;
  color: white;
  align-item: center;
`;
const StyledLabel = styled(IonLabel)`
  font-size: 35px;
  font-weight: 50;
  margin-bottom: 15px;
`;
const StyledText = styled.div`
  color: black;
  text-align: center;
  font-size: 30px;
  font-weight: 600;
  margin: 30px 15px
`;
interface OptionProps {
  icon: string;
  label: string;
  content: string;
  color: string;
  [otherProps: string]: unknown;
};

const optionFields: OptionProps[] = [
  {
    icon: "sms",
    label: "Qua SMS",
    content: "+ 8498822233",
    color: "rgb(91 153 255)",
  },
  {
    icon: "gmail",
    label: "Qua Gmail",
    content: "hoang@gmail.com",
    color: "rgb(91 153 255)"
  },
  {
    icon: "question",
    label: "Câu hỏi bảo mật :",
    content: "Ngày tháng năm sinh",
    color: "rgb(91 153 255)"
  },
];
const ForgetPassword: React.FC = () => {
  const history = useHistory();
  return (
    <>
      <IonContent>
        <IonHeader className='ion-margin-bottom' >
          <IonItem color='light' style={{ margin: '15px 20px 0px 10px' }}>
            <IonIcon icon={chevronBackOutline} color='dark'></IonIcon>
          </IonItem>
        </IonHeader>
        <IonRow className="ion-justify-content-center">
          <IonCol size='12' size-sm='6'>
            <StyledText >
              CHỌN PHƯƠNG THỨC LẤY LẠI MẬT KHẨU
            </StyledText>
          </IonCol>

        </IonRow>
        <div>
          {
            optionFields.map(({ icon, label, content, color, ...otherProps }) => {
              return (
                <IonRow >
                  <IonCol size="12" size-sm='3'>
                    <StyledItem color='light'
                    //onClick={() => { icon === 'change' ? history.push('/change-password') : history.push('/ForgetPassword') }}
                    >
                      <StyledIcon
                        icon={
                          icon === 'sms' ? phonePortraitOutline
                            : icon === 'gmail' ? mailOutline
                              : informationCircleOutline
                        }
                        style={{ backgroundColor: color }}>
                      </StyledIcon>
                      <StyledLabel >
                        {label}
                        <br />
                        {
                          icon === 'question' ? <b>{content}<br /><b>của bạn?</b></b> : <b>{content}</b>
                        }

                      </StyledLabel>


                    </StyledItem>
                  </IonCol>
                </IonRow>
              )

            })
          }
        </div>
      </IonContent>
    </>
  );
};

export default ForgetPassword;
