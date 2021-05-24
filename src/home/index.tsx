import React, { useState } from 'react';
import styled from 'styled-components';
import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCol,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonNote,
  IonRow,
} from '@ionic/react';
import {
  chevronForwardOutline,
  searchOutline,
  calendarOutline,
  alarmOutline,
  arrowForwardOutline,
  eyedropOutline,
  newspaperOutline,
} from 'ionicons/icons';

import { useHistory } from "react-router-dom";

import logo from '@app/assets/img/logo.png'
import Slider from 'react-slick';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const StyleWrapperInput = styled(IonItem)`
    background-color: white;
    border: 1px solid #d6d6c2;
    padding-left: 5px;
    margin: 10px 25px 0px 0px;
    border-radius: 10px;
    height: 40px;
    font-size: 18px;
    text-transform: initial;
`;
const StyledInput = styled(IonInput)`
    color: black;
    margin-top: 2px;
`;
const StyledHeader = styled.div`
  color: black;
  font-size: 20px;
  margin-left: 5%;
  margin-top: 5%;
`;
const Card = styled(IonCard)`
  height: 110px;
  background-color: blue;
  width: 90%;
`;
const CardIcon = styled(IonIcon)`
  font-size: 20px;
  color: black;
  background-color: white;
  margin: 10px 0px 5px 10px;
  padding: 8px 8px;
  border-radius: 10px;
  align-item: center;
`;
const CardLabel = styled(IonLabel)`
  margin: -30px 0px 10px 10px;
  font-size: 20px;
  font-weight: 300;
  color: white;
`;
const CardNote = styled(IonNote)`
  font-size: 10px;
  color: #2e2d2d;
  margin-left: 12px;
`
const ResultButton = styled(IonItem)`
  border: 1px solid #bcbcbc;
  border-radius: 10px;
  margin: 0px 15px;
`
const ResultLabel = styled(IonLabel)`
  font-size: 22px;
  font-weight: 500;
`
const ResultIcon = styled(IonIcon)`
  color: #4c9fc8;
  margin-right: 30px;
`
const CardSlider = styled(IonRow)`
  ion-card {
    width: 80%;
    height: 150px;
    background-color: white;
  }
`;
const Menu = styled(IonRow)`
  padding: 0 20px 0 20px;
  ion-item {
    width: 100%;
  }
  ion-note {
    margin: 0 !important;
    font-size: 14px;
  }
  ion-icon {
    font-size: 8px;
  }

  .title {
    font-weight: 700;
    font-size: 18px;
  }
`;


interface OptionProps {
  icon: string;
  label: string;
  note: string
  color: string;
  [otherProps: string]: unknown;
};

const optionFields: OptionProps[] = [
  {
    icon: calendarOutline,
    label: "Đặt lịch",
    note: "Tư vấn, xét nghiệm",
    color: "#4c8dff",
  },
  {
    icon: alarmOutline,
    label: "Lịch hẹn",
    note: "Kiểm tra lịch hẹn ",
    color: "#409f4e"
  },
  {
    icon: searchOutline,
    label: "Nguy cơ",
    note: "Kiểm tra nguy cơ",
    color: "#f1c248"
  },
];
const Home: React.FC = () => {
  const history = useHistory();
  const [searchData, setSearchData] = useState('');
  console.log(searchData);
  return (
    <>
      <IonContent>
        <IonRow className="ion-justify-content-center " >
          <IonCol size="4" size-sm="3">
            <div>
              <img src={logo} alt="logo" width='150px' />
            </div>
          </IonCol>
        </IonRow>
        <StyledHeader>
          <div>
            Xin chào!<b> &nbsp; Đoàn Hoàng</b>
          </div>
          <div>
            <StyleWrapperInput color='light' lines='none'>
              <StyledInput
                placeholder='Tìm kiếm'
                onIonChange={e => setSearchData(e.detail.value!)}
              >
              </StyledInput>
              <IonIcon icon={searchOutline} color='medium' slot='end'></IonIcon>
            </StyleWrapperInput>
          </div>
        </StyledHeader>
        <Menu>
          <IonItem className="ion-no-padding" color="light">
            <IonLabel><span className="title">DỊCH VỤ NỔI BẬT</span></IonLabel>
            <IonNote slot="end">Xem tất cả</IonNote>
            <IonIcon className="ion-align-self-center" slot="end" size="small" icon={chevronForwardOutline} />
          </IonItem>
        </Menu>
        <IonRow className='ion-margin-end'>
          {
            optionFields.map(({ icon, label, color, note, ...otherProps }) => {
              return (
                <IonCol size='4' size-sm='3'>
                  <Card style={{ backgroundColor: color }}>
                    <div>
                      <CardIcon icon={icon} slot='start' />
                    </div>
                    <CardLabel>
                      {label}
                    </CardLabel>
                    <div>
                      <CardNote>{note}</CardNote>
                    </div>
                  </Card>
                </IonCol>

              )
            })
          }
        </IonRow>
        <Menu>
          <IonItem className="ion-no-padding" color="light">
            <IonLabel><span className="title">KẾT QUẢ XÉT NGHIỆM CỦA BẠN</span></IonLabel>
          </IonItem>
        </Menu>
        <IonRow className='ion-margin-top'>
          <IonCol size="12" size-sm='3'>
            <ResultButton color='light'>
              <ResultIcon icon={eyedropOutline} />
              <ResultLabel >
                Xem kết quả xét nghiệm
               </ResultLabel>
              <IonIcon icon={arrowForwardOutline} color='medium'>
              </IonIcon>
            </ResultButton>
          </IonCol>
        </IonRow>
        <IonRow >
          <IonCol size="12" size-sm='3'>
            <ResultButton color='light'>
              <ResultIcon icon={newspaperOutline} />
              <ResultLabel >
                Cập nhật kết quả xét nghiệm
               </ResultLabel>
              <IonIcon icon={arrowForwardOutline} color='medium'>
              </IonIcon>
            </ResultButton>
          </IonCol>
        </IonRow>
        <Menu>
          <IonItem className="ion-no-padding" color="light">
            <IonLabel><span className="title">BÀI VIẾT NỔI BẬT</span></IonLabel>
            <IonNote slot="end">Xem tất cả</IonNote>
            <IonIcon className="ion-align-self-center" slot="end" size="small" icon={chevronForwardOutline} />
          </IonItem>
        </Menu>
        <Slider className="" infinite={false} dots={true} slidesToShow={1.4} slidesToScroll={1} swipeToSlide={true} >
          {
            optionFields.map((item, idx) => {
              return (
                <CardSlider >
                  <IonCard>
                    <IonCardHeader>
                      <img src={`https://placeimg.com/133/200/any?rand=${idx}`} alt="" />
                    </IonCardHeader>
                  </IonCard>
                </CardSlider>
              )
            })
          }
        </Slider>
      </IonContent>
    </>
  );
};

export default Home;
