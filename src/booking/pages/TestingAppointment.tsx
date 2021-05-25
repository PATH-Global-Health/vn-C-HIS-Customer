import React, { useEffect, useState } from 'react';
import {
    IonButton,
    IonContent,
    IonDatetime,
    IonHeader,
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
import hospital, { getHospitalByServiceIdAndDate } from '../slices/hospital';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import hospitalServices from '../services/hospitals';
import { text } from 'ionicons/icons';
import moment from 'moment';

const StyledButton = styled(IonButton)`
    width: 300px;
    --background: #293978;
    text-align: center;
`;
const TestingAppointment: React.FC = () => {
    const [date, setDate] = useState<string>("none");
    const [dateNew, setDateNew] = useState<Date>(new Date());
    const dispatch = useDispatch();
    const test = () => {
        dispatch(getHospitalByServiceIdAndDate(date + ""));
    }

    const [showModalClinic, setShowModalClinic] = useState(false);
    const [showModalUser, setShowModalUser] = useState(false);
    const [loading, setLoading] = useState(false);

    const userInfo = useSelector((u) => u.auth.userInfo);
    const unitTypes = useSelector((c) => c.unitType.unitTypes);
    const token = useSelector((t) => t.auth.token);
    const hos = useSelector((h) => h.hospital.hospitals);
    const dateBookings = useSelector((d) => d.dateBooking.dateBookings);
    
    const minDate = dateBookings[0];
    const maxDate = dateBookings[dateBookings.length - 1];

    const [clinicName, setClinicName] = useState<string>();
    const [clinicType, setClinicType] = useState<string>();
    const [city, setCity] = useState<string>();
    const [district, setDistrict] = useState<string>();
    const [ward, setWard] = useState<string>();


    const [value, onChange] = useState(new Date(2021, 5, 22));

    const getClinicInfo = () => {
        const bookingService = {
            user: userInfo,
            hospital: {
                dateCreated: hos[0].dateCreated,
                dateUpdated: hos[0].dateUpdated,
                id: hos[0].id,
                username: hos[0].username,
                name: hos[0].name,
                unitTypeId: hos[0].unitTypeId,
                address: hos[0].address,
                province: hos[0].province,
                district: hos[0].district,
                ward: hos[0].ward,
                website: hos[0].website,
                phone: hos[0].phone,
                email: hos[0].email,
                introduction: hos[0].introduction,
            },
            date: date,
        }
        setShowModalClinic(false);
        console.log(bookingService);
    }
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
                    <IonItemDivider >Working Date</IonItemDivider>
                    <IonItem>
                        <DayPicker
                        onDayClick={() => console.log('lieu')}                   
                        disabledDays={(day:Date) => !dateBookings.map(ad => moment(ad).format('YYYY-MM-DD')).includes(moment(day).format('YYYY-MM-DD'))}></DayPicker>
                    </IonItem>
                    <IonItem>
                        <IonLabel>{dateBookings[1]}</IonLabel>
                    </IonItem>

                    {date === "none" ? null :
                        <>
                            <IonItemDivider>Clinic</IonItemDivider>
                            <IonInput onClick={() => setShowModalClinic(!showModalClinic)}></IonInput>
                            <IonItemDivider>Tester</IonItemDivider>
                            <IonInput onClick={() => setShowModalUser(!showModalUser)}></IonInput>
                        </>
                    }

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
                {hos.length === 0 ? "" :
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
                                        {/* {hos ? null : */}
                                        <IonInput value={hos[0].name} onIonChange={e => setClinicName(e.detail.value!)}></IonInput>
                                        {/* } */}
                                    </IonItem>

                                    {/* <IonItemDivider>Clinic Type</IonItemDivider> */}
                                    {/* <IonItem>
                                    <IonSelect value={clinicType} onIonChange={e => setClinicType(e.detail.value)}>
                                        {unitTypes.map((unitType) => (
                                            <IonSelectOption value={unitType.id}>{unitType.typeName}</IonSelectOption>
                                        ))}

                                    </IonSelect> */}
                                    <IonItem>
                                        <IonInput value={hos[0].province} onIonChange={e => setClinicName(e.detail.value!)}></IonInput>
                                    </IonItem>

                                    <IonItemDivider>Province/City</IonItemDivider>
                                    <IonItem>
                                        <IonInput value={hos[0].province} onIonChange={e => setCity(e.detail.value!)}></IonInput>
                                    </IonItem>

                                    <IonItemDivider>District</IonItemDivider>
                                    <IonItem>
                                        <IonInput value={hos[0].district} onIonChange={e => setDistrict(e.detail.value!)}></IonInput>
                                    </IonItem>
                                    <IonItemDivider>Ward</IonItemDivider>
                                    <IonItem>
                                        <IonInput value={hos[0].ward} onIonChange={e => setWard(e.detail.value!)}></IonInput>
                                    </IonItem>
                                </IonList>
                            </IonContent>
                            <StyledButton onClick={() => getClinicInfo()}>Add</StyledButton>

                        </IonPage>
                    </IonModal>
                }
            </IonContent>
        </IonContent>

    );
};

export default TestingAppointment;