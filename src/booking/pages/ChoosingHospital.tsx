import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonLabel,
  IonModal,
  IonPage,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import styled from 'styled-components';
import { useDispatch, useSelector } from '@app/hooks';
import { useHistory } from "react-router-dom";
import { arrowBack, arrowForward, filter, podium } from 'ionicons/icons';
import { getHospitalBooking } from 'booking/slices/hospital';
import location from '../../@app/mock/locations.json';
import { deburr } from '../../@app/utils/helpers';
import { getUnitTypes } from 'booking/slices/unitType';
import { useTranslation } from 'react-i18next';
import styles from '../css/choosingHospital.module.css';
import { CityS } from 'booking/models/city';

const StyledContent = styled(IonContent)`
{
  text-align: center;
}
`
const StyledDiv = styled.div`
{
 display: flex;
 justify-content: space-between;
}
`

const StyledIconMenu = styled(IonIcon)`
    {
      color: black;
    }
    `

const StyleModal = styled(IonModal)`
    {
      padding-top: 15%;
      padding-bottom: 20px;
    }
`

const ChoosingHospital: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const hospitals = useSelector((h) => h.hospital.hospitals);
  let listCitySelect: CityS[] = [];

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
      var districts = city.districts.find((item) => item.value === hos.district);
      if(!districts?.wards.find((item) => item.value === hos.ward)){
        districts?.wards.push({value: hos.ward});
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
  const [hospitalName, setHospitalName] = useState<string>("");
  const searchByName = hospitals.filter((hos) => deburr(hos.name).includes(deburr(hospitalName)));
  const searchByUnitType = hospitals.filter((hos) => deburr(hos.unitTypeId).includes(deburr(unitType)));
  const searchByUnitTypeAndCity = hospitals.filter((hos) => deburr(hos.unitTypeId + hos.province).includes(deburr(unitType + city)));
  const searchByUnitTypeAndCityAndDistrict = hospitals.filter((hos) => deburr(hos.unitTypeId + hos.province + hos.district).includes(deburr(unitType + city + districts)));
  const searchByUnitTypeAndCityAndDistrictAndWard = hospitals.filter((hos) => deburr(hos.unitTypeId + hos.province + hos.district + hos.ward).includes(deburr(unitType + city + districts + wards)));
  const [showModal, setShowModal] = useState(false);
  const { t, i18n } = useTranslation();
  useEffect(() => {

    dispatch(getUnitTypes());
  }, [])
  return (
    <IonPage className={styles.styledPage}>
      <StyleModal isOpen={showModal} cssClass='my-custom-class'>
        {show === true ? <div><IonSelect className={styles.styledSelect} placeholder={t('Unit Type')} onIonChange={e => { setUnitType(e.detail.value); setTypeSearch("unitType") }}>
          {unitTypes.map((unitType) => (
            <IonSelectOption value={unitType.id}>{unitType.typeName}</IonSelectOption>
          ))}
        </IonSelect>
          <IonSelect className={styles.styledSelect}
            placeholder={t('City')}
            onIonChange={e => {
              setCity(e.detail.value);
              setDistricts(undefined);
              setTypeSearch("unitTypeCity");
              console.log(districts);
            }}> 
            {listCitySelect.map((hos) => (
              location.filter((lo) => lo.value === hos.value).map(ci => (<IonSelectOption value={ci.value}>{ci.label}</IonSelectOption>))
            ))}
          </IonSelect>

          {city === undefined ? "" :
            <IonSelect className={styles.styledSelect} placeholder={t('District')} onIonChange={e => {
              setDistricts(e.detail.value);
              setTypeSearch("unitTypeCityDistrict")
            }}>
              {listCitySelect.map((hos) => (
                location.filter((lo) => lo.value === city)[0].districts.filter((di) => hos.districts.find(item => item.value === di.value)).map((di) => (
                  <IonSelectOption value={di.value}>{di.label}</IonSelectOption>
                ))
              ))}
            </IonSelect>
          }
          {districts === undefined ? "" :
            <IonSelect className={styles.styledSelect} placeholder={t('Ward')} onIonChange={e => { setWards(e.detail.value); setTypeSearch("unitTypeCityDistrictWard") }}>
              {location.filter((lo) => lo.value === city)[0].districts.filter((dis) => dis.value === districts)[0] !== undefined ?
                listCitySelect.map((hos) => (
                  location.filter((lo) => lo.value === city)[0].districts.filter((dis) => dis.value === districts)[0].wards
                    .filter((w) => hos.districts.find(item => item.wards.find(wa => wa.value === w.value)))
                    .map((ward) => (
                      <IonSelectOption value={ward.value}>{ward.label}</IonSelectOption>
                    ))
                )) : ""}
            </IonSelect>
          }
        </div> : ""}

        <div className={styles.render}>
          {typeSearch === "unitType" ? searchByUnitType.map((hos) => (

            <button
              className={styles.btnCustom}
              onClick={() => {
                dispatch(getHospitalBooking(hos));
                history.push('/hospitalDetail', hos)
              }}
            >{hos.name}
              <IonIcon className={styles.iconRight} icon={arrowForward}></IonIcon>
              <IonIcon className={styles.iconLeft} icon={podium}></IonIcon>
              <IonImg className={styles.img} src={`http://202.78.227.94:30111/api/Hospitals/Logo/${hos.id}`}></IonImg>
            </button>

          )) : ""}


          {typeSearch === "unitTypeCity" ? searchByUnitTypeAndCity.map((hos) => (
            <button
              className={styles.btnCustom}
              onClick={() => {
                dispatch(getHospitalBooking(hos));
                history.push('/hospitalDetail', hos)
              }}
            >{hos.name}
              <IonIcon className={styles.iconRight} icon={arrowForward}></IonIcon>
              <IonIcon className={styles.iconLeft} icon={podium}></IonIcon>
              <IonImg className={styles.img} src={`http://202.78.227.94:30111/api/Hospitals/Logo/${hos.id}`}></IonImg>
            </button>
          )) : ""}

          {typeSearch === "unitTypeCityDistrict" ? searchByUnitTypeAndCityAndDistrict.map((hos) => (
            <button
              className={styles.btnCustom}
              onClick={() => {
                dispatch(getHospitalBooking(hos));
                history.push('/hospitalDetail', hos)
              }}
            >{hos.name}
              <IonIcon className={styles.iconRight} icon={arrowForward}></IonIcon>
              <IonIcon className={styles.iconLeft} icon={podium}></IonIcon>
              <IonImg className={styles.img} src={`http://202.78.227.94:30111/api/Hospitals/Logo/${hos.id}`}></IonImg>
            </button>
          )) : ""}

          {typeSearch === "unitTypeCityDistrictWard" ? searchByUnitTypeAndCityAndDistrictAndWard.map((hos) => (
            <button
              className={styles.btnCustom}
              onClick={() => {
                dispatch(getHospitalBooking(hos));
                history.push('/hospitalDetail', hos)
              }}
            >{hos.name}
              <IonIcon className={styles.iconRight} icon={arrowForward}></IonIcon>
              <IonIcon className={styles.iconLeft} icon={podium}></IonIcon>
              <IonImg className={styles.img} src={`http://202.78.227.94:30111/api/Hospitals/Logo/${hos.id}`}></IonImg>
            </button>
          )) : ""}
        </div>
        <button className={styles.styledButtonCloseModal} onClick={() => { setShowModal(false); setTypeSearch("name") }}>{t('Close')}</button>
      </StyleModal>
      <IonHeader className={styles.header}>
        <button className={styles.btnCustomHeader} onClick={() => history.goBack()}>
          <IonIcon className={styles.iconLeft} icon={arrowBack}></IonIcon>
        </button>
        <IonLabel className={styles.headerLabel}>{t('Service Unit List')}</IonLabel>
      </IonHeader>

      <StyledContent>
        <StyledDiv>
          <IonInput className={styles.styledInput} onIonChange={e => {
            setTypeSearch("name")
            setHospitalName(e.detail.value!)
          }} placeholder="Search">

          </IonInput>
          <button
            className={styles.styledButtonMenu}
            onClick={() => { setShow(true); setShowModal(true) }}
          ><StyledIconMenu icon={filter}></StyledIconMenu></button>

        </StyledDiv>
        <div style={{ margin: "30px 0px" }}>


          {typeSearch === "name" ? searchByName.map((hos) => (
            <button
              className={styles.btnCustom}
              onClick={() => {
                dispatch(getHospitalBooking(hos));
                history.push('/hospitalDetail', hos)
              }}
            >{hos.name}
              <IonIcon className={styles.iconRight} icon={arrowForward}></IonIcon>
              <IonIcon className={styles.iconLeft} icon={podium}></IonIcon>
              <IonImg className={styles.img} src={`http://202.78.227.94:30111/api/Hospitals/Logo/${hos.id}`}></IonImg>
            </button>
          )) : ""}
        </div>
      </StyledContent>
    </IonPage>
  );
};

export default ChoosingHospital;