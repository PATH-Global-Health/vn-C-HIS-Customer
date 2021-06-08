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
import { postExaminations } from 'booking/slices/workingCalendar'

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
    const interval = useSelector((i) => i.workingCaledar.intervalBooking);
    const unitBooking = useSelector((u) => u.hospital.hospitalBooking);
    const workingCalendarBooking = useSelector((w) => w.workingCaledar.workingCalendar);
    const userId = useSelector((t) => t.auth.token?.userId);
    const [fullName, setFullName] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [dateOfBirth, setDateOfBirth] = useState<string>("");
    const [gender, setGender] = useState<boolean>(false);
    const [city, setCity] = useState<string>("79");
    const [districts, setDistricts] = useState<string>("760");
    const [wards, setWards] = useState<string>("26740");

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

    return (
        <IonPage>
            <StyledHeader>
                <StyledButtonHeader onClick={() => history.goBack()}><StyledIconRight icon={arrowBack}></StyledIconRight></StyledButtonHeader>
                <StyledLabelHeader>Thông tin người dùng</StyledLabelHeader>
            </StyledHeader>
            <IonContent>
                <form
                    onSubmit={
                        () => {
                            dispatch(postExaminations(bookingModel));
                            history.push("/apointmentInfo")
                        }}
                >
                    <IonList>
                        <IonItem>
                            <StyledLabel position="stacked">Tên người dùng</StyledLabel>
                            <IonInput
                                required
                                placeholder="Tên người dùng"
                                onIonChange={(e) => setFullName(e.detail.value!)}
                            > </IonInput>
                        </IonItem>
                        <IonItem>
                            <StyledLabel position="stacked">Số điện thoại</StyledLabel>
                            <IonInput
                                required
                                placeholder="Số điện thoại"
                                onIonChange={(e) => setPhoneNumber(e.detail.value!)}
                            > </IonInput>
                        </IonItem>
                        <IonItem>
                            <StyledLabel position="stacked">Email</StyledLabel>
                            <IonInput
                                required
                                type="email"
                                placeholder="Email"
                                onIonChange={(e) => setEmail(e.detail.value!)}
                            > </IonInput>
                        </IonItem>
                        <IonItem>
                            <StyledLabel position="stacked">Địa chỉ</StyledLabel>
                            <IonInput
                                required
                                placeholder="Địa chỉ"
                                onIonChange={(e) => setAddress(e.detail.value!)}
                            > </IonInput>
                        </IonItem>
                        <IonItem>
                            <StyledLabel position="stacked">Ngày sinh</StyledLabel>
                            <IonInput
                                required
                                type="date"
                                placeholder="Ngày sinh"
                                onIonChange={(e) => { setDateOfBirth(e.detail.value!); console.log(dateOfBirth) }}
                            > </IonInput>
                        </IonItem>
                        <IonItem>
                            <StyledLabel position="stacked">Giới tính</StyledLabel>
                            <IonSelect onIonChange={e => setGender(e.detail.value)}>
                                <IonSelectOption value={true}>Nam</IonSelectOption>
                                <IonSelectOption value={false}>Nữ</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        <IonItem>
                            <StyledLabel position="stacked">Tỉnh/Thành phố</StyledLabel>
                            <IonSelect
                                onIonChange={e => {
                                    setCity(e.detail.value);
                                }}>
                                {location.map((lo) => (
                                    <IonSelectOption value={lo.value}>{lo.label}</IonSelectOption>
                                ))}
                            </IonSelect>
                        </IonItem>
                        <IonItem>
                            <StyledLabel position="stacked">Quận/Huyện</StyledLabel>
                            <IonSelect
                                onIonChange={e => {
                                    setDistricts(e.detail.value);
                                }}>
                                {location.filter((lo) => lo.value === city)[0].districts.map((districts) => (
                                    <IonSelectOption value={districts.value}>{districts.label}</IonSelectOption>
                                ))}
                            </IonSelect>
                        </IonItem>
                        <IonItem>
                            <StyledLabel position="stacked">Phường/Xã</StyledLabel>
                            <IonSelect
                                onIonChange={e => setWards(e.detail.value)}>
                                {location.filter((lo) => lo.value === city)[0].districts.filter((dis) => dis.value === districts)[0] !== undefined ?
                                    location.filter((lo) => lo.value === city)[0].districts.filter((dis) => dis.value === districts)[0].wards.map((ward) => (
                                        <IonSelectOption value={ward.value}>{ward.label}</IonSelectOption>
                                    )) : ""}
                            </IonSelect>
                        </IonItem>
                    </IonList>
                    <StyledButtonNext type="submit">Đặt lịch</StyledButtonNext>
                </form>
            </IonContent>
        </IonPage>
    )
};

export default ConfirmProfile;