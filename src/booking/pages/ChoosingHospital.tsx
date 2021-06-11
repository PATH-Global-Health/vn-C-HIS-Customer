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

const StyledButton = styled(IonButton)`{
    ::after{content: ""}
    width: 351px;
    --background: white;
    text-align: center;
    color: black;
    border: 1px solid #d7d8da;
    border-radius: 11px;
    // margin-left: 37px;
    position: relative;
    font-family: system-ui;
    font-size: 18px;
    margin-top: 10px;
}
`;

const StyledButtonSearchName = styled(IonButton)`{
  ::after{content: ""}
  width: 70%;
  --background: white;
  text-align: center;
  color: black;
  border: 1px solid #d7d8da;
  border-radius: 11px;
  margin-left: -75px;
  position: relative;
  font-family: system-ui;
  font-size: 18px;
  // margin-top: 10px;
}
`;

const StyledIconRight = styled(IonIcon)`
{
    color: #b3b3b3;
    right: -9px;
    position: absolute;
  }
`;

const StyledImg = styled(IonImg)`
{
    left: -15px;
    width: 50px;
    height: 55px;
    position: absolute;
  }
`;

const StyledIconLeft = styled(IonIcon)`
{
    color: #b3b3b3;
    left: 5px;
    position: absolute;
  }
`;

const StyledHeader = styled(IonHeader)`
{
  height: 60px;
  border-bottom: 1px solid #b3b3b3;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}
`

const StyledLabelHeader = styled(IonLabel)`
{
  font-weight: bold;
    font-size: 23px;
}
`

const StyledButtonHeader = styled(IonButton)`
{
  --background: white;
  left: 10px;
  position: absolute;
}
`

const StyledContent = styled(IonContent)`
{
  text-align: center;
}
`
const StyledInput = styled(IonInput)`
{
  // width: 75%;
  height: 37px;
  border: 1px solid #b3b3b3;
  border-radius: 10px;
  margin-left: 10px;
  margin-right: 10px;
}
`
const StyledDiv = styled.div`
{
 display: flex;
 justify-content: space-between;
}
`
const StyledDivRender = styled.div`
{
  position: absolute;
  top: 25%;
  left: 9px;
}
`

const StyledButtonMenu = styled(IonButton)`
    {
      --background: white;
      // left: 10px;
      // position: absolute;
      // border: 1px solid #293978;
      border-radius: 10px;
      // width: 15%;
      margin: 0px 17px;
      height: 30px;
      width: 50px;
      position: absolute;
      right: -16px;
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
        {show === true ? <div><StyledSelect placeholder={t('Unit Type')} onIonChange={e => { setUnitType(e.detail.value); setTypeSearch("unitType") }}>
          {unitTypes.map((unitType) => (
            <IonSelectOption value={unitType.id}>{unitType.typeName}</IonSelectOption>
          ))}
        </StyledSelect>
          <StyledSelect
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
          </StyledSelect>
          {city === undefined ? "" :
            <StyledSelect placeholder={t('District')} onIonChange={e => {
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
            </StyledSelect>
          }
          {districts === undefined ? "" :
            <StyledSelect placeholder={t('Ward')} onIonChange={e => { setWards(e.detail.value); setTypeSearch("unitTypeCityDistrictWard") }}>
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
            </StyledSelect>
          }
        </div> : ""}

        <StyledDivRender>
          {typeSearch === "unitType" ? searchByUnitType.map((hos) => (

            <StyledButton
              onClick={() => {
                dispatch(getHospitalBooking(hos));
                history.push('/hospitalDetail', hos)
              }}
            >{hos.name}
              <StyledIconRight icon={arrowForward}></StyledIconRight>
              <StyledIconLeft icon={podium}></StyledIconLeft>
              <StyledImg src={`http://202.78.227.94:30111/api/Hospitals/Logo/${hos.id}`}></StyledImg>
            </StyledButton>

          )) : ""}


          {typeSearch === "unitTypeCity" ? searchByUnitTypeAndCity.map((hos) => (
            <StyledButton
              onClick={() => {
                dispatch(getHospitalBooking(hos));
                history.push('/hospitalDetail', hos)
              }}
            >{hos.name}
              <StyledIconRight icon={arrowForward}></StyledIconRight>
              <StyledIconLeft icon={podium}></StyledIconLeft>
              <StyledImg src={`http://202.78.227.94:30111/api/Hospitals/Logo/${hos.id}`}></StyledImg>
            </StyledButton>
          )) : ""}

          {typeSearch === "unitTypeCityDistrict" ? searchByUnitTypeAndCityAndDistrict.map((hos) => (
            <StyledButton
              onClick={() => {
                dispatch(getHospitalBooking(hos));
                history.push('/hospitalDetail', hos)
              }}
            >{hos.name}
              <StyledIconRight icon={arrowForward}></StyledIconRight>
              <StyledIconLeft icon={podium}></StyledIconLeft>
              <StyledImg src={`http://202.78.227.94:30111/api/Hospitals/Logo/${hos.id}`}></StyledImg>
            </StyledButton>
          )) : ""}

          {typeSearch === "unitTypeCityDistrictWard" ? searchByUnitTypeAndCityAndDistrictAndWard.map((hos) => (
            <StyledButton
              onClick={() => {
                dispatch(getHospitalBooking(hos));
                history.push('/hospitalDetail', hos)
              }}
            >{hos.name}
              <StyledIconRight icon={arrowForward}></StyledIconRight>
              <StyledIconLeft icon={podium}></StyledIconLeft>
              <StyledImg src={`http://202.78.227.94:30111/api/Hospitals/Logo/${hos.id}`}></StyledImg>
            </StyledButton>
          )) : ""}
        </StyledDivRender>
        <StyledButtonCloseModal onClick={() => { setShowModal(false); setTypeSearch("name") }}>{t('Close')}</StyledButtonCloseModal>
      </StyleModal>
      <StyledHeader>
        <StyledButtonHeader onClick={() => history.goBack()}><StyledIconRight icon={arrowBack}></StyledIconRight></StyledButtonHeader>
        <StyledLabelHeader>{t('Service Unit List')}</StyledLabelHeader>
      </StyledHeader>

      <StyledContent>
        <StyledDiv>
          <StyledInput onIonChange={e => {
            setTypeSearch("name")
            setHospitalName(e.detail.value!)
          }} placeholder="Search">
            <StyledButtonMenu
              onClick={() => { setShow(true); setShowModal(true) }}
            ><StyledIconMenu icon={filter}></StyledIconMenu></StyledButtonMenu>
          </StyledInput>

        </StyledDiv>
        <div style={{ margin: "30px 0px" }}>


          {typeSearch === "name" ? searchByName.map((hos) => (
            <StyledButton
              onClick={() => {
                dispatch(getHospitalBooking(hos));
                history.push('/hospitalDetail', hos)
              }}
            >{hos.name}
              <StyledIconRight icon={arrowForward}></StyledIconRight>
              <StyledIconLeft icon={podium}></StyledIconLeft>
              <StyledImg src={`http://202.78.227.94:30111/api/Hospitals/Logo/${hos.id}`}></StyledImg>
            </StyledButton>
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