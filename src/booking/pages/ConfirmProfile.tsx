import React, { useEffect, useState } from 'react';
import {
    IonButton,
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonSelect,
    IonSelectOption,
} from '@ionic/react';
import styled from 'styled-components';
import { useDispatch, useSelector } from '@app/hooks';
import 'react-day-picker/lib/style.css';
import { useHistory } from "react-router-dom";
import { arrowBack, text } from 'ionicons/icons';
import { BookingModel } from 'booking/models/bookingModel';
import location from '../../@app/mock/locations.json';
import { postExaminations } from 'booking/slices/workingCalendar';
import { useTranslation } from 'react-i18next';
import { getUserInfo, putUserProfile } from '../slices/workingCalendar';
import { UserProfile } from 'booking/models/userProfile';
import moment from 'moment';

const ConfirmProfile: React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const StyledIconRight = styled(IonIcon)`
    {
        color: #b3b3b3;
        right: -9px;
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
      margin-bottom: 10px;
    }
    `

    const StyledLabel = styled(IonLabel)`
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
    const StyledLabelHeader = styled(IonLabel)`
{
  font-weight: bold;
    font-size: 23px;
}
`
    const StyledButtonNext = styled(IonButton)`
width: 90%;
--background: #293978;
// position: absolute;
// bottom: 5px;
// width: 
 margin: 18px;
// margin-bottom: 80px;
`
    // const userProfile = useSelector((u) => u.auth.userInfo);
    const userInfo = useSelector((w) => w.workingCaledar.userProfile);
    const interval = useSelector((i) => i.workingCaledar.intervalBooking);
    const unitBooking = useSelector((u) => u.hospital.hospitalBooking);
    const workingCalendarBooking = useSelector((w) => w.workingCaledar.workingCalendar);
    const userId = useSelector((t) => t.auth.token?.userId);
    const [fullName, setFullName] = useState<string>(userInfo.fullname);
    const [phoneNumber, setPhoneNumber] = useState<string>(userInfo.phoneNumber);
    const [email, setEmail] = useState<string>(userInfo.email);
    const [address, setAddress] = useState<string>(userInfo.address);
    const [dateOfBirth, setDateOfBirth] = useState<string>(userInfo.dateOfBirth);
    const [gender, setGender] = useState<boolean>(userInfo.gender);
    const [city, setCity] = useState<string>(userInfo.province);
    const [districts, setDistricts] = useState<string>(userInfo.district);
    const [wards, setWards] = useState<string>(userInfo.ward);
    const { t, i18n } = useTranslation();
    const userProfile = {
        fullname: fullName,
        gender: gender,
        dateOfBirth: dateOfBirth,
        phoneNumber: phoneNumber,
        email: email,
        vaccinationCode: "",
        identityCard: "",
        address: address,
        province: city,
        district: districts,
        ward: wards,
        passportNumber: "",
        nation: "",
        id: userInfo.id,
    } as UserProfile
    const bookingModel = {
        interval: {
            id: "",
            from: "",
            to: "",
            numId: 0
        },
        unit: {
            id: "",
            name: "",
            information: "",
            address: "",
            username: "",
        },
        doctor: {
            id: "",
            fullname: "",
        },
        room: {
            id: "",
            name: ""
        },
        service: {
            id: "",
            name: ""
        },
        customer: {
            id: userId,
            fullname: fullName,
            phone: phoneNumber,
            email: email,
            address: address,
            birthDate: dateOfBirth,
            gender: gender,
            provinceCode: city,
            districtCode: districts,
            wardCode: wards,
            ic: "",
            nation: "",
            passportNumber: "",
            vaccinationCode: ""
        },
        contacts: [
            {
                fullname: "",
                phone: "",
                relationship: ""
            }
        ],
        note: "",
        date: "",
        bookedByUser: "",
        exitInformation: {
            destination: "",
            exitingDate: "",
            entryingDate: ""
        }
    } as BookingModel;
    if (interval !== null && unitBooking !== null && workingCalendarBooking !== null) {
        bookingModel.interval.id = interval.id;
        bookingModel.interval.from = interval.from;
        bookingModel.interval.to = interval.to;
        bookingModel.interval.numId = interval.numId;
        bookingModel.unit.id = unitBooking.id;
        bookingModel.unit.name = unitBooking.name;
        bookingModel.unit.information = unitBooking.introduction;
        bookingModel.unit.address = unitBooking.address;
        bookingModel.unit.username = unitBooking.username;
        bookingModel.doctor.id = workingCalendarBooking.doctor.id;
        bookingModel.doctor.fullname = workingCalendarBooking.doctor.description;
        bookingModel.room.id = workingCalendarBooking.room.id;
        bookingModel.room.name = workingCalendarBooking.room.description;

        bookingModel.service.id = workingCalendarBooking.service[0].id;
        bookingModel.service.name = workingCalendarBooking.service[0].description;


        // bookingModel.customer.id = userProfile.id;
        // bookingModel.customer.fullname = userProfile.fullname;
        // bookingModel.customer.phone = userProfile.phoneNumber;
        // bookingModel.customer.email = userProfile.email;
        // bookingModel.customer.address = userProfile.address;
        // bookingModel.customer.birthDate = "2021-06-01T00:58:27.530Z";
        // bookingModel.customer.gender = true;
        // bookingModel.customer.provinceCode = userProfile.province;
        // bookingModel.customer.districtCode = userProfile.district;
        // bookingModel.customer.wardCode = userProfile.ward;


        bookingModel.customer.ic = "";
        bookingModel.customer.nation = "";
        bookingModel.customer.passportNumber = "";
        bookingModel.customer.vaccinationCode = "";
        bookingModel.contacts[0].fullname = "";
        bookingModel.contacts[0].phone = "";
        bookingModel.contacts[0].relationship = "";
        bookingModel.note = "";
        bookingModel.date = workingCalendarBooking.date;
        bookingModel.bookedByUser = "";
        bookingModel.exitInformation.destination = "lieu";
        bookingModel.exitInformation.exitingDate = "2021-06-01T00:58:27.530Z";
        bookingModel.exitInformation.entryingDate = "2021-06-01T00:58:27.530Z";
    }

    useEffect(() => {
        dispatch(getUserInfo())
    }, [])
    return (
        <IonPage>
            <StyledHeader>
                <StyledButtonHeader onClick={() => history.goBack()}><StyledIconRight icon={arrowBack}></StyledIconRight></StyledButtonHeader>
                <StyledLabelHeader>{t('User information')}</StyledLabelHeader>
            </StyledHeader>
            <IonContent>
                <form
                    onSubmit={
                        () => {
                            dispatch(putUserProfile(userProfile));
                            dispatch(postExaminations(bookingModel));
                            // dispatch(getUserInfo());
                            history.push("/apointmentInfo")
                        }}
                >
                    <IonList>
                        <IonItem>
                            <StyledLabel position="stacked">{t('Full name')}</StyledLabel>
                            <IonInput
                                required
                                placeholder={t('Full name')}
                                value={fullName}
                                onIonChange={(e) => setFullName(e.detail.value!)}
                            > </IonInput>
                        </IonItem>
                        <IonItem>
                            <StyledLabel position="stacked">{t('PhoneNumber')}</StyledLabel>
                            <IonInput
                                required
                                placeholder={t('PhoneNumber')}
                                onIonChange={(e) => setPhoneNumber(e.detail.value!)}
                                value={phoneNumber}
                            > </IonInput>
                        </IonItem>
                        <IonItem>
                            <StyledLabel position="stacked">{t('Email')}</StyledLabel>
                            <IonInput
                                required
                                type="email"
                                placeholder={t('Email')}
                                onIonChange={(e) => setEmail(e.detail.value!)}
                                value={email}
                            > </IonInput>
                        </IonItem>
                        <IonItem>
                            <StyledLabel position="stacked">{t('Address')}</StyledLabel>
                            <IonInput
                                required
                                placeholder={t('Address')}
                                onIonChange={(e) => setAddress(e.detail.value!)}
                                value={address}
                            > </IonInput>
                        </IonItem>
                        <IonItem>
                            <StyledLabel position="stacked">{t('Date of birth')}</StyledLabel>
                            <IonInput
                                value={moment(dateOfBirth).format('YYYY-MM-DD') + ""}
                                // value={dateOfBirth + ""}
                                required
                                type="date"
                                onIonChange={(e) => { setDateOfBirth(e.detail.value!); console.log(dateOfBirth) }}
                            > </IonInput>
                        </IonItem>
                        <IonItem>
                            <StyledLabel position="stacked">{t('Gender')}</StyledLabel>
                            <IonSelect value={gender} onIonChange={e => setGender(e.detail.value)}>
                                <IonSelectOption value={true}>{t('Male')}</IonSelectOption>
                                <IonSelectOption value={false}>{t('Female')}</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        <IonItem>
                            <StyledLabel position="stacked">{t('City')}</StyledLabel>
                            <IonSelect value={city}
                                onIonChange={e => {
                                    setCity(e.detail.value);
                                    setDistricts("");
                                    setWards("");
                                }}>
                                {location.map((lo) => (
                                    <IonSelectOption value={lo.value}>{lo.label}</IonSelectOption>
                                ))}
                            </IonSelect>
                        </IonItem>
                        <IonItem>
                            <StyledLabel position="stacked">{t('District')}</StyledLabel>
                            {city === "" || city === undefined ? "" :
                                // districts === undefined ? "" :
                                    <IonSelect
                                        value={districts}
                                        onIonChange={e => {
                                            setDistricts(e.detail.value);
                                            setWards("");
                                        }}>
                                        {location.filter((lo) => lo.value === city)[0].districts.map((districts) => (
                                            <IonSelectOption value={districts.value}>{districts.label}</IonSelectOption>
                                        ))}

                                    </IonSelect>
                            }
                        </IonItem>
                        <IonItem>
                            <StyledLabel position="stacked">{t('Ward')}</StyledLabel>
                            {districts === "" ? "" :
                                <IonSelect value={wards}
                                    onIonChange={e => setWards(e.detail.value)}>
                                    {location.filter((lo) => lo.value === city)[0].districts.filter((dis) => dis.value === districts)[0] !== undefined ?
                                        location.filter((lo) => lo.value === city)[0].districts.filter((dis) => dis.value === districts)[0].wards.map((ward) => (
                                            <IonSelectOption value={ward.value}>{ward.label}</IonSelectOption>
                                        )) : ""}
                                </IonSelect>
                            }
                        </IonItem>
                    </IonList>
                    {/* {wards === "" ? "" : */}
                    <StyledButtonNext disabled={!(Boolean(wards))} type="submit">{t('Make an appointment')}</StyledButtonNext>
                </form>
                {/* <IonInput value="Lieu"></IonInput> */}
            </IonContent>
        </IonPage>
    )
};

export default ConfirmProfile;