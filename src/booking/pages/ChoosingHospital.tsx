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
import { arrowBack, arrowForward, menu, podium, search } from 'ionicons/icons';
import { getHospitalBooking } from 'booking/slices/hospital';
import location from '../../@app/mock/locations.json';
import { deburr } from '../../@app/utils/helpers';
import { getUnitTypes } from 'booking/slices/unitType';

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
    height: 50px;
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
}
`
const StyledIcon = styled(IonIcon)`
{
  margin-right: 10px;
  font-size: 20px;
  // margin-left: 179px;
  color: #b3b3b3;
  position: absolute;
  right: 5px;
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
      border: 1px solid #293978;
      border-radius: 10px;
      // width: 15%;
      margin: 0px 17px;
      height: 37px;
    width: 50px;
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
      padding: 10px;
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
  useEffect(() => {
    dispatch(getUnitTypes());
  }, [])
  return (
    <IonPage>
      <StyleModal isOpen={showModal} cssClass='my-custom-class'>
        {show === true ? <div><StyledSelect placeholder="Loại cơ sở" onIonChange={e => { setUnitType(e.detail.value); setTypeSearch("unitType") }}>
          {unitTypes.map((unitType) => (
            <IonSelectOption value={unitType.id}>{unitType.typeName}</IonSelectOption>
          ))}
        </StyledSelect>
          <StyledSelect
            placeholder="Thành phố"
            onIonChange={e => {
              setCity(e.detail.value);
              setDistricts(undefined);
              setTypeSearch("unitTypeCity");
              console.log(districts);
            }}>
            {location.map((lo) => (
              <IonSelectOption value={lo.value}>{lo.label}</IonSelectOption>
            ))}
          </StyledSelect>
          {city === undefined ? "" :
            <StyledSelect placeholder="Quận/Huyện" onIonChange={e => {
              setDistricts(e.detail.value);
              setTypeSearch("unitTypeCityDistrict")
            }}>
              {location.filter((lo) => lo.value === city)[0].districts.map((districts) => (
                <IonSelectOption value={districts.value}>{districts.label}</IonSelectOption>
              ))}
            </StyledSelect>
          }
          {districts === undefined ? "" :
            <StyledSelect placeholder="Phường/Xã" onIonChange={e => { setWards(e.detail.value); setTypeSearch("unitTypeCityDistrictWard") }}>
              {location.filter((lo) => lo.value === city)[0].districts.filter((dis) => dis.value === districts)[0] !== undefined ?
                location.filter((lo) => lo.value === city)[0].districts.filter((dis) => dis.value === districts)[0].wards.map((ward) => (
                  <IonSelectOption value={ward.value}>{ward.label}</IonSelectOption>
                )) : ""}
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
              <StyledImg src={`https://smapi.vkhealth.vn/api/Hospitals/Logo/${hos.id}`}></StyledImg>
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
              <StyledImg src={`https://smapi.vkhealth.vn/api/Hospitals/Logo/${hos.id}`}></StyledImg>
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
              <StyledImg src={`https://smapi.vkhealth.vn/api/Hospitals/Logo/${hos.id}`}></StyledImg>
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
              <StyledImg src={`https://smapi.vkhealth.vn/api/Hospitals/Logo/${hos.id}`}></StyledImg>
            </StyledButton>
          )) : ""}
        </StyledDivRender>
        <StyledButtonCloseModal onClick={() => setShowModal(false)}>Đóng</StyledButtonCloseModal>
      </StyleModal>
      <StyledHeader>
        <StyledButtonHeader onClick={() => history.goBack()}><StyledIconRight icon={arrowBack}></StyledIconRight></StyledButtonHeader>
        <StyledLabelHeader>Danh sách cơ sở </StyledLabelHeader>
      </StyledHeader>

      <StyledContent>
        <StyledDiv>
          <StyledInput onIonChange={e => {
            setTypeSearch("name")
            setHospitalName(e.detail.value!)
          }} placeholder="Search"><StyledIcon icon={search}></StyledIcon></StyledInput>
          <StyledButtonMenu
            onClick={() => { setShow(true); setShowModal(true) }}
          ><StyledIconMenu icon={menu}></StyledIconMenu></StyledButtonMenu>



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
              <StyledImg src={`https://smapi.vkhealth.vn/api/Hospitals/Logo/${hos.id}`}></StyledImg>
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