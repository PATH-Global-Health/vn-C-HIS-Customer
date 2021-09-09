import React, { useState, useEffect } from "react";
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
  IonInfiniteScrollContent,
  IonInfiniteScroll,
  useIonViewWillEnter
} from "@ionic/react";
import { useDispatch, useSelector } from "@app/hooks";
import { useHistory } from "react-router-dom";
import {
  search,
  chatbubbles,
  chevronBack,
  peopleCircleSharp,
  filter,
} from "ionicons/icons";
import { useTranslation } from "react-i18next";
import styles from "../css/doctorList.module.css";
import classNames from 'classnames/bind';
import { deburr } from '../../@app/utils/helpers';
import { Doctor, DoctorData } from "booking/models/hospital";
import { getAllDoctor } from "booking/slices/hospital";


const DoctorList: React.FC = () => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState(false);
  const { t } = useTranslation();
  const history = useHistory();
  const { loading, doctorList } = useSelector((b) => b.hospital);
  const [listRender, setListRender] = useState<DoctorData[]>([]);
  const [disableInfiniteScroll, setDisableInfiniteScroll] = useState<boolean>(false);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [nameSearch, setNameSearch] = useState("")
  var cx = classNames.bind(styles);
  const doctorListSuccess = doctorList?.data;
  const doctorListSearch = doctorListSuccess?.filter(d => deburr(d.fullName +
    d.academicTitle +
    d.email + d.gender +
    d.phone +
    d.title
  ).includes(deburr(nameSearch)));

  const getData = async () => {
    await dispatch(getAllDoctor({ pageIndex: pageIndex, pageSize: 5 }));
    // dispatch(setListDoctorRender(doctorList.data))
    Boolean(doctorList.data.length > 0) ?
      setDisableInfiniteScroll(false)
      : setDisableInfiniteScroll(true);
     setListRender([...listRender, ...doctorList.data]);
    setPageIndex(pageIndex + 1);
  }

  const handleInfiniteScroll = async ($event: CustomEvent<void>) => {
    await getData();
    ($event.target as HTMLIonInfiniteScrollElement).complete();

  }

  useEffect(() => { getData() },[]);

  return (
    loading === true ? <IonSpinner name='bubbles' color='primary' style={{ left: '50%', top: '50%' }}></IonSpinner> :
      <IonPage className={styles.styledPage}>
        {/* {searchInput === false ? */}
        <IonHeader className={styles.header}>
          <IonIcon
            onClick={() => history.goBack()}
            className={styles.iconLeft}
            icon={chevronBack}></IonIcon>
          <IonLabel className={styles.headerLabel}>{t('List of doctors')} </IonLabel>
          {/* <IonIcon
              onClick={() => setSearchInput(true)}
              className={styles.iconRight}
              icon={search}></IonIcon> */}
        </IonHeader>
        {/* : <div className={styles.headerSearch}>
            <IonSearchbar onIonChange={(e) => setNameSearch(e.detail.value!)} placeholder={t('Search')} className={styles.searchBar}></IonSearchbar>
            <button onClick={() => setSearchInput(false)} className={styles.cancelSearch}>Cancel</button>
          </div>} */}
        <IonContent className={styles.content}>

          <div className={styles.headerSearch}>
            <IonSearchbar
              onIonChange={(e) => setNameSearch(e.detail.value!)}
              placeholder={t('Nhập thông tin CBO')}
              className={styles.searchBar}></IonSearchbar>
            <button onClick={() => setSearchInput(false)} className={styles.btnFilter}>
              <IonIcon className={styles.iconFilter} icon={filter}></IonIcon>
            </button>
          </div>

          {/* {searchInput === true ? */}
          <>
            {listRender.map((d) => {
              return (
                <div className={styles.styledCardDiv}>
                  <IonCard
                    onClick={() => history.push({ pathname: '/doctorDetail', state: d as DoctorData })}
                    className={cx('styledCard', {})}
                  >
                    <div
                      className={cx('styledDivIcon',)}
                    >
                      <IonIcon className={styles.styledIcon} icon={peopleCircleSharp}></IonIcon>
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
                      >{d?.phone}</IonCardSubtitle>
                      <IonCardSubtitle
                        className={cx('styledSubtitle')}
                      >{d?.email}</IonCardSubtitle>
                    </IonCardHeader>
                    {/* <IonCardContent
                      className={cx('styledCardContent')}
                    >
                      <p>{d?.email}</p>
                      <p>{d?.phone}</p>
                    </IonCardContent> */}

                  </IonCard>
                  {/* <button onClick={() => {
                    history.push({ pathname: '/doctorDetail', state: d as DoctorData })
                  }} className={styles.btnCancelCard}>{t('Cancel appointment')}</button> */}

                </div>
              )
            }
            )}
            <IonInfiniteScroll
            threshold="100px"
              onIonInfinite={(e: CustomEvent<void>) => handleInfiniteScroll(e)}
              disabled={false}
            >
              <IonInfiniteScrollContent loadingText="Loading more good doctor...">

              </IonInfiniteScrollContent>
            </IonInfiniteScroll>
            {/* <IonLabel className={styles.styledLabel}>{t("Danh sách bác sĩ")}</IonLabel> */}

          </>



        </IonContent>
      </IonPage>
  );
};

export default DoctorList;