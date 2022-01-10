import React, { useEffect, useState } from "react";
import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonLabel,
  IonModal,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  isPlatform,
} from "@ionic/react";
import styled from "styled-components";
import { useDispatch, useSelector } from "@app/hooks";
import { useHistory } from "react-router-dom";
import { chevronBack, filter } from "ionicons/icons";
import location from "../../@app/mock/locations.json";
import { deburr } from "../../@app/utils/helpers";
import { getUnitTypes } from "booking/slices/unitType";
import { useTranslation } from "react-i18next";
import styles from "../css/choosingHospital.module.css";
import { CityS } from "booking/models/city";
import HospitalItem from "booking/components/HospitalItem";

const StyledContent = styled(IonContent)`
   {
    text-align: center;
  }
`;
const StyledDiv = styled.div`
   {
    display: flex;
    justify-content: space-between;
  }
`;

const StyledIconMenu = styled(IonIcon)`
   {
    color: black;
  }
`;

const StyleModal = styled(IonModal)`
   {
    padding-top: 15%;
    padding-bottom: 20px;
  }
`;

const ChoosingHospital: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const typeChoosing = useSelector((d) => d.dateBooking.typeChoosing);
  const hospitalGetAll = useSelector((h) => h.hospital.hospitals);
  const hospitals = hospitalGetAll
    .filter((h) => h.isDeleted === false)
    .sort((a, b) => a.username.localeCompare(b.username));

  const loading = useSelector((b) => b.hospital.loading);
  let listCitySelect: CityS[] = [];
  const serviceId = useSelector((w) => w.workingCaledar.serviceId);
  hospitals.map((hos) => {
    var city = listCitySelect.find((item) => item.value === hos.province);
    if (!city) {
      listCitySelect.push({ value: hos.province, districts: [] });
    }
  });
  hospitals.map((hos) => {
    var city = listCitySelect.find((item) => item.value === hos.province);
    if (city) {
      var districts = city.districts;
      if (!districts.find((item) => item.value === hos.district)) {
        districts.push({ value: hos.district, wards: [] });
      }
    }
  });
  hospitals.map((hos) => {
    var city = listCitySelect.find((item) => item.value === hos.province);
    if (city) {
      var districts = city.districts.find(
        (item) => item.value === hos.district
      );
      if (!districts?.wards.find((item) => item.value === hos.ward)) {
        districts?.wards.push({ value: hos.ward });
      }
    }
  });
  const [show, setShow] = useState<boolean>(false);
  const unitTypes = useSelector((u) => u.unitType.unitTypes);
  const [unitType, setUnitType] = useState<string>("");
  const [typeSearch, setTypeSearch] = useState<string>("name");
  const [city, setCity] = useState();
  const [districts, setDistricts] = useState();
  const [wards, setWards] = useState();
  const [textSearch, setTextSearch] = useState<string>("");
  const searchByText = hospitals.filter((hos) =>
    deburr(
      hos.name +
      hos.address +
      location.find((item) => item.value === hos.province)?.label +
      location
        .find((item) => item.value === hos.province)
        ?.districts.find((di) => di.value === hos.district)?.label +
      location
        .find((item) => item.value === hos.province)
        ?.districts.find((di) => di.value === hos.district)
        ?.wards.find((w) => w.value === hos.ward)?.label
    ).includes(deburr(textSearch))
  );
  const searchByUnitType = hospitals.filter((hos) =>
    deburr(hos.unitTypeId).includes(deburr(unitType))
  );
  const searchByUnitTypeAndCity = hospitals.filter((hos) =>
    deburr(hos.unitTypeId + hos.province).includes(deburr(unitType + city))
  );
  const searchByUnitTypeAndCityAndDistrict = hospitals.filter((hos) =>
    deburr(hos.unitTypeId + hos.province + hos.district).includes(
      deburr(unitType + city + districts)
    )
  );
  const searchByUnitTypeAndCityAndDistrictAndWard = hospitals.filter((hos) =>
    deburr(hos.unitTypeId + hos.province + hos.district + hos.ward).includes(
      deburr(unitType + city + districts + wards)
    )
  );
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    dispatch(getUnitTypes());
  }, []);
  return (
    <>
      {serviceId === "" ? (
        history.replace("/home")
      ) : loading === true ? (
        <IonSpinner
          name="bubbles"
          color="primary"
          style={{ left: "50%", top: "50%" }}
        ></IonSpinner>
      ) : (
        <IonPage
          style={isPlatform("ios") ? { paddingTop: 40 } : { paddingTop: 0 }}
        >
          <StyleModal
            isOpen={showModal}
            cssClass="my-custom-class"
            swipeToClose={false}
            onDidDismiss={() => {
              setShowModal(false);
              setTypeSearch("name");
            }}
          >
            {show === true ? (
              <div>
                <IonSelect
                  className={styles.styledSelect}
                  placeholder={t("Unit Type")}
                  onIonChange={(e) => {
                    setUnitType(e.detail.value);
                    setTypeSearch("unitType");
                  }}
                >
                  {unitTypes.map((unitType) => (
                    <IonSelectOption value={unitType.id}>
                      {unitType.typeName}
                    </IonSelectOption>
                  ))}
                </IonSelect>
                <IonSelect
                  className={styles.styledSelect}
                  placeholder={t("City")}
                  onIonChange={(e) => {
                    setCity(e.detail.value);
                    setDistricts(undefined);
                    setTypeSearch("unitTypeCity");
                  }}
                >
                  {listCitySelect.map((hos) =>
                    location
                      .filter((lo) => lo.value === hos.value)
                      .map((ci) => (
                        <IonSelectOption value={ci.value}>
                          {ci.label}
                        </IonSelectOption>
                      ))
                  )}
                </IonSelect>

                {city === undefined ? (
                  ""
                ) : (
                  <IonSelect
                    className={styles.styledSelect}
                    placeholder={t("District")}
                    onIonChange={(e) => {
                      setDistricts(e.detail.value);
                      setTypeSearch("unitTypeCityDistrict");
                    }}
                  >
                    {listCitySelect.map((hos) =>
                      location
                        .filter((lo) => lo.value === city)[0]
                        .districts.filter((di) =>
                          hos.districts.find((item) => item.value === di.value)
                        )
                        .map((di) => (
                          <IonSelectOption value={di.value}>
                            {di.label}
                          </IonSelectOption>
                        ))
                    )}
                  </IonSelect>
                )}
                {districts === undefined ? (
                  ""
                ) : (
                  <IonSelect
                    className={styles.styledSelect}
                    placeholder={t("Ward")}
                    onIonChange={(e) => {
                      setWards(e.detail.value);
                      setTypeSearch("unitTypeCityDistrictWard");
                    }}
                  >
                    {location
                      .filter((lo) => lo.value === city)[0]
                      .districts.filter((dis) => dis.value === districts)[0] !==
                      undefined
                      ? listCitySelect.map((hos) =>
                        location
                          .filter((lo) => lo.value === city)[0]
                          .districts.filter(
                            (dis) => dis.value === districts
                          )[0]
                          .wards.filter((w) =>
                            hos.districts.find((item) =>
                              item.wards.find((wa) => wa.value === w.value)
                            )
                          )
                          .map((ward) => (
                            <IonSelectOption value={ward.value}>
                              {ward.label}
                            </IonSelectOption>
                          ))
                      )
                      : ""}
                  </IonSelect>
                )}
              </div>
            ) : (
              ""
            )}

            <StyledContent>
              {typeSearch === "unitType"
                ? searchByUnitType.map((hos) => <HospitalItem hospital={hos} />)
                : ""}

              {typeSearch === "unitTypeCity"
                ? searchByUnitTypeAndCity.map((hos) => (
                  <HospitalItem hospital={hos} />
                ))
                : ""}

              {typeSearch === "unitTypeCityDistrict"
                ? searchByUnitTypeAndCityAndDistrict.map((hos) => (
                  <HospitalItem hospital={hos} />
                ))
                : ""}

              {typeSearch === "unitTypeCityDistrictWard"
                ? searchByUnitTypeAndCityAndDistrictAndWard.map((hos) => (
                  <HospitalItem hospital={hos} />
                ))
                : ""}
            </StyledContent>
            <button
              className={styles.styledButtonCloseModal}
              onClick={() => {
                setShowModal(false);
                setTypeSearch("name");
              }}
            >
              {t("Close")}
            </button>
          </StyleModal>

          <StyledContent>
            <IonHeader className={styles.header}>
              <button
                className={styles.btnCustomHeader}
                onClick={() => {
                  if (typeChoosing === "apointmentDate") {
                    history.replace("/apointmentDate");
                    // history.replace("/testingAppointment");
                  } else {
                    history.replace("/testingAppointment");
                  }
                }}
              >
                <IonIcon
                  className={styles.iconLeft}
                  icon={chevronBack}
                ></IonIcon>
              </button>
              <IonLabel className={styles.headerLabel}>
                {t("Service Unit List")}
              </IonLabel>
            </IonHeader>
            <StyledDiv>
              <IonInput
                className={styles.styledInput}
                onIonChange={(e) => {
                  setTypeSearch("name");
                  setTextSearch(e.detail.value!);
                }}
                placeholder="Search"
              ></IonInput>
              <button
                className={styles.styledButtonMenu}
                onClick={() => {
                  setShow(true);
                  setShowModal(true);
                }}
              >
                <StyledIconMenu icon={filter}></StyledIconMenu>
              </button>
            </StyledDiv>
            <div style={{ margin: "30px 0px" }}>
              {typeSearch === "name"
                ? searchByText.map((hos) => <HospitalItem hospital={hos} />)
                : ""}
            </div>
          </StyledContent>
        </IonPage>
      )}
    </>
  );
};

export default ChoosingHospital;
