import React, { useEffect, useState } from 'react';
import {
  IonButton,
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
import { useHistory, useLocation } from "react-router-dom";
import { arrowBack, arrowForward, filter, menu, podium, search } from 'ionicons/icons';
import { getHospitalBooking } from 'booking/slices/hospital';
import location from '../../@app/mock/locations.json';
import { deburr } from '../../@app/utils/helpers';
import { getUnitTypes } from 'booking/slices/unitType';
import { useTranslation } from 'react-i18next';
import styles from '../css/choosingHospital.module.css';

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
      // margin-right: 10px;
      // font-size: 20px;
      // margin-left: 179px;
      color: black;
      // position: absolute;
      // right: 5px;
    }
    `
const StyledSelect = styled(IonSelect)`
    {
      margin: 10px 32px;
    }
    `
const StyleModal = styled(IonModal)`
    {
      padding-top: 20px;
      padding-bottom: 20px;
    }
`
const StyledButtonCloseModal = styled(IonButton)`
// width: 300px;
--background: #293978;
// position: absolute;
// bottom: 5px;
// width: 
// margin: 16px;
// margin-top: 50px;
`
const ChoosingHospital: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const hospitals = useSelector((h) => h.hospital.hospitals);
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
    <IonPage>
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
            {hospitals.map((hos) => (
              location.filter((lo) => lo.value === hos.province).map(ci => (<IonSelectOption value={ci.value}>{ci.label}</IonSelectOption>))
            ))}
          </IonSelect>
          {city === undefined ? "" :
            <IonSelect className={styles.styledSelect} placeholder={t('District')} onIonChange={e => {
              setDistricts(e.detail.value);
              setTypeSearch("unitTypeCityDistrict")
            }}>
              {hospitals.map((hos) => (
                location.filter((lo) => lo.value === city)[0].districts.filter((di) => di.value === hos.district).map((di) => (
                  <IonSelectOption value={di.value}>{di.label}</IonSelectOption>
                ))
                // location.filter((lo) => lo.value === hos.province).map(ci => (<IonSelectOption value={ci.value}>{ci.label}</IonSelectOption>))
              ))}
              {/* {location.filter((lo) => lo.value === city)[0].districts.map((districts) => (
                <IonSelectOption value={districts.value}>{districts.label}</IonSelectOption>
              ))} */}
            </IonSelect>
          }
          {districts === undefined ? "" :
            <IonSelect className={styles.styledSelect} placeholder={t('Ward')} onIonChange={e => { setWards(e.detail.value); setTypeSearch("unitTypeCityDistrictWard") }}>
              {location.filter((lo) => lo.value === city)[0].districts.filter((dis) => dis.value === districts)[0] !== undefined ?
                hospitals.map((hos) => (
                  location.filter((lo) => lo.value === city)[0].districts.filter((dis) => dis.value === districts)[0].wards
                    .filter((w) => w.value === hos.ward)
                    .map((ward) => (
                      <IonSelectOption value={ward.value}>{ward.label}</IonSelectOption>
                    ))
                )) : ""}
              {/* {location.filter((lo) => lo.value === city)[0].districts.filter((dis) => dis.value === districts)[0] !== undefined ?
                location.filter((lo) => lo.value === city)[0].districts.filter((dis) => dis.value === districts)[0].wards.map((ward) => (
                  <IonSelectOption value={ward.value}>{ward.label}</IonSelectOption>
                )) : ""} */}
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

        {/* {hospitals.map(hospital => (
          <StyledButton
            onClick={() => {
              dispatch(getHospitalBooking(hospital));
              history.push('/hospitalDetail', hospital)
            }}
          >{hospital.name}
            <StyledIconRight icon={arrowForward}></StyledIconRight>
            <StyledIconLeft icon={podium}></StyledIconLeft>
            <StyledImg src={`https://smapi.vkhealth.vn/api/Hospitals/Logo/${hospital.id}`}></StyledImg>
          </StyledButton>
        ))} */}


      </StyledContent>
    </IonPage>
  );
};

export default ChoosingHospital;