import React, { useEffect, useState } from 'react';
import {
  IonButton,
  IonContent,
  IonDatetime,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import styled from 'styled-components';
import { useDispatch, useSelector } from '@app/hooks';
import { getUserInfo } from '../../@app/slices/auth';

const StyledButton = styled(IonButton)`
    width: 300px;
    --background: #293978;
    text-align: center;
`;
const HomeBooking: React.FC = () => {
  const dispatch = useDispatch();
  const [showModalClinic, setShowModalClinic] = useState(false);
  const [showModalUser, setShowModalUser] = useState(false);

  const userInfo = useSelector((u) => u.auth.userInfo);
  const unitTypes = useSelector((c) => c.unitType.unitTypes);
  const token = useSelector((t) => t.auth.token);
  const [clinicName, setClinicName] = useState<string>();
  const [clinicType, setClinicType] = useState<string>();
  const [city, setCity] = useState<string>();
  const [district, setDistrict] = useState<string>();
  const [ward, setWard] = useState<string>();

  const [workingDate, setWorkingDate] = useState<string>();

  const getClinicInfo = () => {
    const bookingService = {
      user: userInfo,
      clinicInfo: {
        name: clinicName,
        type: clinicType,
        ci: city,
        di: district,
        wa: ward,
      },
      date: workingDate,
    }
    setShowModalClinic(false);
    console.log(bookingService);
    // console.log(serviceForm[0].id)
  }


  useEffect(() => {
    console.log(clinicType);
    // dispatch(getUserInfo(`Profiles?userId=`+`${token?.userId}`));
  }, [dispatch])
  return (
    <IonContent>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Booking Service</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* <form> */}
          <IonList>
            <IonItemDivider>Tester</IonItemDivider>
            <IonInput onClick={() => setShowModalUser(!showModalUser)}></IonInput>
            <IonItemDivider>Clinic</IonItemDivider>
            <IonInput onClick={() => setShowModalClinic(!showModalClinic)}></IonInput>
            <IonItemDivider >Working Date</IonItemDivider>
            <IonItem>
            <IonDatetime onIonChange={e => setWorkingDate(e.detail.value!)} displayFormat="MM DD YY h:mm A"></IonDatetime>
            </IonItem>
          </IonList>
          <StyledButton onClick={() => getClinicInfo()}>Submit</StyledButton>
        {/* </form> */}

        <IonModal isOpen={showModalUser} cssClass='my-custom-class'>
          <IonPage>
            <IonHeader>
              <IonToolbar>
                <IonTitle>{userInfo?.fullname}</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <IonList>
                <IonItemDivider>FullName</IonItemDivider>
                <IonItem>
                  <IonInput value={userInfo?.fullname}></IonInput>
                </IonItem>

                <IonItemDivider>Address</IonItemDivider>
                <IonItem>
                  <IonInput value={userInfo?.address}></IonInput>
                </IonItem>

                <IonItemDivider>Email</IonItemDivider>
                <IonItem>
                  <IonInput value={userInfo?.email}></IonInput>
                </IonItem>

                <IonItemDivider>PhoneNumber</IonItemDivider>
                <IonItem>
                  <IonInput value={userInfo?.phoneNumber}></IonInput>
                </IonItem>
              </IonList>
            </IonContent>
            <StyledButton onClick={() => setShowModalUser(false)}>Add</StyledButton>

          </IonPage>
        </IonModal>

        <IonModal isOpen={showModalClinic} cssClass='my-custom-class'>
          <IonPage>
            <IonHeader>
              <IonToolbar>
                <IonTitle>Clinic</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <IonList>
                <IonItemDivider>Clinic Name</IonItemDivider>
                <IonItem>
                  <IonInput value={clinicName} onIonChange={e => setClinicName(e.detail.value!)}></IonInput>
                </IonItem>

                <IonItemDivider>Clinic Type</IonItemDivider>
                <IonItem>
                  <IonSelect value={clinicType} onIonChange={e => setClinicType(e.detail.value)}>
                    {unitTypes.map((clinicType) => (
                      <IonSelectOption value={clinicType.id}>{clinicType.typeName}</IonSelectOption>
                    ))}

                  </IonSelect>
                </IonItem>

                <IonItemDivider>Province/City</IonItemDivider>
                <IonItem>
                  <IonInput value={city} onIonChange={e => setCity(e.detail.value!)}></IonInput>
                </IonItem>

                <IonItemDivider>District</IonItemDivider>
                <IonItem>
                  <IonInput value={district} onIonChange={e => setDistrict(e.detail.value!)}></IonInput>
                </IonItem>
                <IonItemDivider>Ward</IonItemDivider>
                <IonItem>
                  <IonInput value={ward} onIonChange={e => setWard(e.detail.value!)}></IonInput>
                </IonItem>
              </IonList>
            </IonContent>
            <StyledButton onClick={() => getClinicInfo()}>Add</StyledButton>

          </IonPage>
        </IonModal>

      </IonContent>
    </IonContent>
  );
};

export default HomeBooking;