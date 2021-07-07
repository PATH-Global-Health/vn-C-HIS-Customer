import React, { useEffect, useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonSearchbar,
  IonAlert,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import { useDispatch, useSelector } from "@app/hooks";
import { useHistory } from "react-router-dom";
import {
  chevronBack,
  search,
  analytics,
  chatbubble,
  chatbubbles,
} from "ionicons/icons";
import { useTranslation } from "react-i18next";
import { getExaminationList } from "../slices/workingCalendar";
import moment from "moment";
import styles from "../css/examinationList.module.css";
import classNames from 'classnames/bind';


const ExaminationList: React.FC = () => {
  const [searchInput, setSearchInput] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showAlertCancel, setShowAlertCancel] = useState(false);
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("upcoming");
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const examinationList = useSelector((w) => w.workingCaledar.examinationList);
  const [showDetail, setSowdetail] = useState(false);
  var cx = classNames.bind(styles);

  useEffect(() => {
    dispatch(getExaminationList());
  }, [dispatch]);
  return (
    <IonPage className={styles.styledPage}>

      <IonAlert
        isOpen={showAlertCancel}
        cssClass='my-custom-class'
        onDidDismiss={() => setShowAlertCancel(false)}
        // header={`<strong>Lieu</strong>`}
        // subHeader={'Subtitle'}
        message={`<strong class=${styles.styledMessage}>Bạn có muốn chắc hủy lịch hẹn.</strong>`}
        buttons={[
          {
            text: 'Chắc chắn',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
              setShowAlertSuccess(true);
            }
          },
          {
            text: 'Đóng',
            handler: () => {
              console.log('Confirm Ok');
            }
          }
        ]}
      />

      <IonAlert
        isOpen={showAlertSuccess}
        cssClass='my-custom-class'
        onDidDismiss={() => setShowAlertSuccess(false)}
        // header={`<strong>Lieu</strong>`}
        // subHeader={'Subtitle'}
        message={`<strong class=${styles.styledMessage}>Lịch hẹn đã được hủy thành công.</strong>`}
        buttons={[
          {
            text: 'Đóng',
            handler: () => {
              console.log('Confirm Ok');
            }
          }
        ]}
      />
      {searchInput === false ?
        <IonHeader className={styles.header}>
          <IonIcon
            onClick={() => history.goBack()}
            className={styles.iconLeft}
            icon={chevronBack}></IonIcon>
          <IonLabel className={styles.headerLabel}>{t('Lịch hẹn')} </IonLabel>
          <IonIcon
            onClick={() => setSearchInput(true)}
            className={styles.iconRight}
            icon={search}></IonIcon>
          <ul className={styles.styledMenu}>
            <li
              className={cx({ 'styledLiSelected': selectedMenu === "upcoming" })}
              onClick={() => setSelectedMenu("upcoming")}>SẮP TỚI</li>
            <li
              className={cx({ 'styledLiSelected': selectedMenu === "history" })}
              onClick={() => setSelectedMenu("history")}>LỊCH SỬ</li>
          </ul>
        </IonHeader>
        : <div className={styles.headerSearch}>
          <IonSearchbar placeholder={t('Search')} className={styles.searchBar}></IonSearchbar>
          <button onClick={() => setSearchInput(false)} className={styles.cancelSearch}>Cancel</button>
        </div>}
      <IonContent className={styles.content}>

        {searchInput === true ?
          <>
            <IonLabel className={styles.styledLabel}>{t("Các lịch hẹn sắp tới của bạn")}</IonLabel>
            <IonCard className={styles.styledCardBlood}>
              <div className={styles.styledDivIconBlood}>
                <IonIcon className={styles.styledIcon} icon={analytics}></IonIcon>
              </div>
              <IonCardHeader className={styles.styledCardHeaderBlood}>
                <IonCardTitle className={styles.styledCardTitleBlood}>Xét nghiệm máu</IonCardTitle>
                <IonCardSubtitle className={styles.styledSubtitleBlood}>Vào lúc 9:00, Thứ 5 ngày 19</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent className={styles.styledCardContentBlood}>
                <p>Tại trung tâm abc</p>
                <p>1232 xa lo ha noi, p thao dien, quan 2</p>
              </IonCardContent>
              <button onClick={() => setShowAlertCancel(true)} className={styles.btnCancelCard}>Hủy lịch hẹn</button>
            </IonCard>

            <IonCard>
              <div className={styles.styledDivIconAids}>
                <IonIcon className={styles.styledIcon} icon={chatbubbles}></IonIcon>
              </div>
              <IonCardHeader className={styles.styledCardHeader}>
                <IonCardTitle className={styles.styledCardTitle}>Tư vấn Aids</IonCardTitle>
                <IonCardSubtitle className={styles.styledSubtitle}>Vào lúc 9:00, Thứ 5 ngày 19</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent className={styles.styledCardContent}>
                <p>Tại trung tâm abc</p>
                <p>1232 xa lo ha noi, p thao dien, quan 2</p>
              </IonCardContent>
              <button onClick={() => setShowAlertCancel(true)} className={styles.btnCancelCard}>Hủy lịch hẹn</button>
            </IonCard>
          </> :
          <>
            {selectedMenu === "upcoming" ?
              <div className={styles.styledDivUpcoming}>
                <IonCard className={styles.styledCardBlood}>
                  <div className={styles.styledDivIconBlood}>
                    <IonIcon className={styles.styledIcon} icon={analytics}></IonIcon>
                  </div>
                  <IonCardHeader className={styles.styledCardHeaderBlood}>
                    <IonCardTitle className={styles.styledCardTitleBlood}>Xét nghiệm máu</IonCardTitle>
                    <IonCardSubtitle className={styles.styledSubtitleBlood}>Vào lúc 9:00, Thứ 5 ngày 19</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent className={styles.styledCardContentBlood}>
                    <p>Tại trung tâm abc</p>
                    <p>1232 xa lo ha noi, p thao dien, quan 2</p>
                  </IonCardContent>
                  <button onClick={() => setShowAlertCancel(true)} className={styles.btnCancelCard}>Hủy lịch hẹn</button>
                </IonCard>

                <IonCard>
                  <div className={styles.styledDivIconAids}>
                    <IonIcon className={styles.styledIcon} icon={chatbubbles}></IonIcon>
                  </div>
                  <IonCardHeader className={styles.styledCardHeader}>
                    <IonCardTitle className={styles.styledCardTitle}>Tư vấn Aids</IonCardTitle>
                    <IonCardSubtitle className={styles.styledSubtitle}>Vào lúc 9:00, Thứ 5 ngày 19</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent className={styles.styledCardContent}>
                    <p>Tại trung tâm abc</p>
                    <p>1232 xa lo ha noi, p thao dien, quan 2</p>
                  </IonCardContent>
                  <button onClick={() => setShowAlertCancel(true)} className={styles.btnCancelCard}>Hủy lịch hẹn</button>
                </IonCard>
              </div> :
              <div className={styles.styledDivHistory}>
                <IonCard className={styles.styledCardHistory}>
                  <div className={styles.styledDivIconHistory}>
                    <IonIcon className={styles.styledIconHistory} icon={analytics}></IonIcon>
                  </div>
                  <IonCardHeader className={styles.styledCardHeader}>
                    <IonCardTitle className={styles.styledCardTitle}>Xét nghiệm máu</IonCardTitle>
                    <IonCardSubtitle className={styles.styledSubtitle}>Vào lúc 9:00, Thứ 5 ngày 19</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent className={styles.styledCardContent}>
                    <p>Tại trung tâm abc</p>
                    <p>1232 xa lo ha noi, p thao dien, quan 2</p>
                  </IonCardContent>
                  <button onClick={() => history.push('/evaluate')} className={styles.btnEvaluate}>ĐÁNH GiÁ</button>
                </IonCard>

                <IonCard className={styles.styledCardHistory}>
                  <div className={styles.styledDivIconHistory}>
                    <IonIcon className={styles.styledIconHistory} icon={chatbubbles}></IonIcon>
                  </div>
                  <IonCardHeader className={styles.styledCardHeader}>
                    <IonCardTitle className={styles.styledCardTitle}>Tư vấn Aids</IonCardTitle>
                    <IonCardSubtitle className={styles.styledSubtitle}>Vào lúc 9:00, Thứ 5 ngày 19</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent className={styles.styledCardContent}>
                    <p>Tại trung tâm abc</p>
                    <p>1232 xa lo ha noi, p thao dien, quan 2</p>
                  </IonCardContent>
                  <button onClick={() => history.push('/evaluate')} className={styles.btnEvaluate}>ĐÁNH GIÁ</button>
                </IonCard>
              </div>
            }
          </>
        }
        {/* <button onClick={() => setShowModal(true)} className={styles.btnCreate}>
          <IonIcon icon={add}></IonIcon>
        </button> */}

        {/* {examinationList.data.map((e,index) => (
          <IonCard className={styles.customCard} key={index}>
            <IonCardHeader className={styles.cardHeader}>
              <IonCardSubtitle className={styles.customSubtitleCard}>
                {moment(e.date).format("DD-MM-YYYY")} | {e.interval.from}
              </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <IonGrid>
                <IonRow>
                  <IonCol size="4">
                    <IonAvatar>
                      <img
                        src={`http://202.78.227.94:30111/api/Hospitals/Logo/${e.unit.id}`}
                      />
                    </IonAvatar>
                  </IonCol>
                  <IonCol size="8">
                    <IonText className={styles.customText}>
                      <IonIcon icon={person} className={styles.customIcon} />
                      <h4>{e.customer.fullname} </h4>
                    </IonText>

                    <IonText className={styles.customText}>
                      <IonIcon icon={mail} className={styles.customIcon} />
                      <h5>
                        {e.customer.email.length > 15
                          ? e.customer.email.substring(0, 15) + "..."
                          : e.customer.email}
                      </h5>
                    </IonText>
                    <IonText className={styles.customText}>
                      <IonIcon icon={call} className={styles.customIcon} />
                      <h5>{e.customer.phone}</h5>
                    </IonText>
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol size="4">{e.unit.name}</IonCol>
                  <IonCol size="8">
                    <IonText className={styles.customText}>
                      <IonIcon icon={medkit} className={styles.customIcon} />
                      <h2>{e.service.name}</h2>
                    </IonText>
                  </IonCol>                  
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>
        ))} */}
      </IonContent>
    </IonPage>
  );
};

export default ExaminationList;