import React, {useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonSearchbar,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonModal,
  IonSpinner,
} from "@ionic/react";
import { useDispatch, useSelector } from "@app/hooks";
import { useHistory } from "react-router-dom";
import {
  search,
  chatbubbles,
  chevronBack,
} from "ionicons/icons";
import { useTranslation } from "react-i18next";
import styles from "../css/doctorList.module.css";
import classNames from 'classnames/bind';
import { deburr } from '../../@app/utils/helpers';
import { Doctor } from "booking/models/hospital";


const DoctorList: React.FC = () => {
  const [searchInput, setSearchInput] = useState(false);
  const { t } = useTranslation();
  const history = useHistory();
  const { loading, doctorList } = useSelector((b) => b.hospital);
  const [nameSearch, setNameSearch] = useState("")
  var cx = classNames.bind(styles);
  const doctorListSuccess = doctorList.filter(d => d.isDeleted === false);
  const doctorListSearch = doctorListSuccess.filter(d => deburr(d.fullName +
    d.academicTitle +
    d.email + d.gender +
    d.phone +
    d.title
  ).includes(deburr(nameSearch)));

  return (
    loading === true ? <IonSpinner name='bubbles' color='primary' style={{ left: '50%', top: '50%' }}></IonSpinner> :
      <IonPage className={styles.styledPage}>
        {searchInput === false ?
          <IonHeader className={styles.header}>
            <IonIcon
              onClick={() => history.goBack()}
              className={styles.iconLeft}
              icon={chevronBack}></IonIcon>
            <IonLabel className={styles.headerLabel}>{t('List of doctors')} </IonLabel>
            <IonIcon
              onClick={() => setSearchInput(true)}
              className={styles.iconRight}
              icon={search}></IonIcon>
          </IonHeader>
          : <div className={styles.headerSearch}>
            <IonSearchbar onIonChange={(e) => setNameSearch(e.detail.value!)} placeholder={t('Search')} className={styles.searchBar}></IonSearchbar>
            <button onClick={() => setSearchInput(false)} className={styles.cancelSearch}>Cancel</button>
          </div>}
        <IonContent className={styles.content}>

          {searchInput === true ?
            <>
              {/* <IonLabel className={styles.styledLabel}>{t("Danh sách bác sĩ")}</IonLabel> */}
              {doctorListSearch.map((d) =>
                <div className={styles.styledCardDiv}>
                  <IonCard
                    className={cx('styledCardAids', {})}
                  >
                    <div
                      className={cx('styledDivIconBlood',)}
                    >
                      <IonIcon className={styles.styledIcon} icon={chatbubbles}></IonIcon>
                    </div>
                    <IonCardHeader
                      className={cx('styledCardHeader')}
                    >
                      <IonCardTitle
                        className={cx('styledCardTitle',)}
                      >{d?.fullName}
                      </IonCardTitle>
                      <IonCardSubtitle
                        className={cx('styledSubtitle')}
                      >{d?.title}</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent
                      className={cx('styledCardContent')}
                    >
                      <p>{d?.email}</p>
                      <p>{d?.phone}</p>
                    </IonCardContent>

                  </IonCard>
                  <button onClick={() => {
                    history.push({ pathname: '/doctorDetail', state: d as Doctor })
                  }} className={styles.btnCancelCard}>{t('Cancel appointment')}</button>

                </div>
              )}

            </> :
            <>
              <div className={styles.styledDivUpcoming}>
                {doctorListSuccess.map((d) =>
                  <div className={styles.styledCardDiv}>
                    <IonCard
                      className={cx('styledCardAids', {})}
                    >
                      <div
                        className={cx('styledDivIconBlood',)}
                      >
                        <IonIcon className={styles.styledIcon} icon={chatbubbles}></IonIcon>
                      </div>
                      <IonCardHeader
                        className={cx('styledCardHeader')}
                      >
                        <IonCardTitle
                          className={cx('styledCardTitle',)}
                        >{d?.fullName}
                        </IonCardTitle>
                        <IonCardSubtitle
                          className={cx('styledSubtitle')}
                        >{d?.title}</IonCardSubtitle>
                      </IonCardHeader>
                      <IonCardContent
                        className={cx('styledCardContent')}
                      >
                        <p>{d?.email}</p>
                        <p>{d?.phone}</p>
                      </IonCardContent>

                    </IonCard>
                    <button onClick={() => {
                      history.push({ pathname: '/doctorDetail', state: d as Doctor })
                    }} className={styles.btnCancelCard}>{t('View detail')}</button>

                  </div>
                )}
              </div>
            </>
          }
        </IonContent>
      </IonPage>
  );
};

export default DoctorList;