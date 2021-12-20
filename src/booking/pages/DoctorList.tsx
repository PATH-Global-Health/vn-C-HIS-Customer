import React, { useState, useEffect, useCallback } from "react";
import {
  IonCard,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonSearchbar,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonSpinner,
  IonInfiniteScrollContent,
  IonInfiniteScroll,
  isPlatform,
} from "@ionic/react";
import { useDispatch, useSelector } from "@app/hooks";
import { useHistory } from "react-router-dom";
import { chevronBack, peopleCircleSharp, filter } from "ionicons/icons";
import { useTranslation } from "react-i18next";
import styles from "../css/doctorList.module.css";
import classNames from "classnames/bind";
import { DoctorData } from "booking/models/hospital";
import { getAllDoctor } from "booking/slices/hospital";

const DoctorList: React.FC = () => {
  const dispatch = useDispatch();
  const [textSearch, setTextSearch] = useState("");
  const { t } = useTranslation();
  const history = useHistory();
  const { loading, doctorList } = useSelector((b) => b.hospital);

  const [pageSize, setPageSize] = useState<number>(5);
  var cx = classNames.bind(styles);
  const doctorListSuccess = doctorList?.data;

  const getData = useCallback(() => {
    dispatch(
      getAllDoctor({ pageIndex: 1, pageSize: pageSize, textSearch: textSearch })
    );
  }, [pageSize, textSearch]);

  const fetchData = () => {
    var count = doctorList.totalSize - pageSize;
    if (pageSize <= doctorList.totalSize) {
      Boolean(count < 5)
        ? setPageSize(pageSize + count)
        : setPageSize(pageSize + 5);
    }
  };
  // pageSize <= doctorList.totalPage * 5
  //   ? setPageSize(pageSize + 5)
  //   : console.log();
  // };

  const handleInfiniteScroll = ($event: CustomEvent<void>) => {
    fetchData();
    ($event.target as HTMLIonInfiniteScrollElement).complete();
  };

  useEffect(getData, [getData]);

  return (
    <IonPage style={isPlatform("ios") ? { paddingTop: 40 } : { paddingTop: 0 }}>
      <IonHeader className={styles.header}>
        <IonIcon
          onClick={() => history.replace("/customer-service")}
          className={styles.iconLeft}
          icon={chevronBack}
        ></IonIcon>
        <IonLabel className={styles.headerLabel}>
          {t("List of doctors")}{" "}
        </IonLabel>
      </IonHeader>

      <IonContent className={styles.content}>
        <div className={styles.headerSearch}>
          <IonSearchbar
            onIonChange={(e) => {
              setTextSearch(e.detail.value!);
              setPageSize(5);
            }}
            placeholder={t("Enter CBO Information")}
            className={styles.searchBar}
          ></IonSearchbar>
          {/* <button
            onClick={() => setSearchInput(false)}
            className={styles.btnFilter}
          >
            <IonIcon className={styles.iconFilter} icon={filter}></IonIcon>
          </button> */}
        </div>

        <>
          {doctorListSuccess.map((d) => (
            <div className={styles.styledCardDiv}>
              <IonCard
                onClick={() =>
                  history.replace({
                    pathname: "/doctorDetail",
                    state: d as DoctorData,
                  })
                }
                className={cx("styledCard", {})}
              >
                <div className={cx("styledDivIcon")}>
                  <IonIcon
                    className={styles.styledIcon}
                    icon={peopleCircleSharp}
                  ></IonIcon>
                </div>
                <IonCardHeader className={cx("styledCardHeader")}>
                  <IonCardTitle className={cx("styledCardTitle")}>
                    {d?.fullName}
                  </IonCardTitle>
                  <IonCardSubtitle className={cx("styledSubtitle")}>
                    {d?.phone}
                  </IonCardSubtitle>
                  <IonCardSubtitle className={cx("styledSubtitle")}>
                    {d?.unit[0]?.name}
                  </IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
            </div>
          ))}
          <div>
            <IonInfiniteScroll
              threshold="100px"
              onIonInfinite={(e: CustomEvent<void>) => handleInfiniteScroll(e)}
            >
              <IonInfiniteScrollContent
                loadingSpinner="bubbles"
                loadingText="Loading more data..."
              >
                {loading ? (
                  <IonSpinner
                    name="bubbles"
                    color="primary"
                    style={{ left: "50%" }}
                  ></IonSpinner>
                ) : null}
              </IonInfiniteScrollContent>
            </IonInfiniteScroll>
          </div>
        </>
      </IonContent>
    </IonPage>
  );
};

export default DoctorList;
