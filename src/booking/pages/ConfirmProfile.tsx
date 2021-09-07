import React, { useEffect, useState } from 'react';
import {
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
	IonSpinner,
} from '@ionic/react';
import { useDispatch, useSelector } from '@app/hooks';
import 'react-day-picker/lib/style.css';
import { useHistory } from "react-router-dom";
import { chevronBack } from 'ionicons/icons';
import { BookingModel } from 'booking/models/bookingModel';
import location from '../../@app/mock/locations.json';
import { postExaminations } from 'booking/slices/workingCalendar';
import { useTranslation } from 'react-i18next';
import { getUserInfo, putUserProfile } from '../slices/workingCalendar';
import { UserProfile } from 'booking/models/userProfile';
import moment from 'moment';
import styles from '../css/confirmProfile.module.css';

const ConfirmProfile: React.FC = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const userInfo = useSelector((w) => w.workingCaledar.userProfile);
	const interval = useSelector((i) => i.workingCaledar.intervalBooking);
	const unitBooking = useSelector((u) => u.hospital.hospitalBooking);
	const workingCalendarBooking = useSelector((w) => w.workingCaledar.workingCalendar);
	const loading = useSelector((w) => w.workingCaledar.loading);
	const userId = useSelector((t) => t.auth.token?.userId);
	const [fullName, setFullName] = useState<string>(userInfo.fullname);
	const [phoneNumber, setPhoneNumber] = useState<string>(userInfo.phoneNumber);
	const [email, setEmail] = useState<string>(userInfo.email);
	const [address, setAddress] = useState<string>(userInfo.address);
	const [dateOfBirth, setDateOfBirth] = useState<string>(userInfo.dateOfBirth);
	const [gender, setGender] = useState<boolean>(userInfo.gender);
	const [city, setCity] = useState(userInfo.province);
	const [districts, setDistricts] = useState(userInfo.district);
	const [wards, setWards] = useState(userInfo.ward);
	const { t } = useTranslation();
	const serviceId = useSelector((w) => w.workingCaledar.serviceId);
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
		<>
			{serviceId === "" ? history.push('/home') :
				loading === true ? <IonSpinner name='bubbles' color='primary' style={{ left: '50%', top: '50%' }}></IonSpinner> :
					<IonPage className={styles.styledPage}>
						<IonHeader className={styles.header}>
							<button
								className={styles.btnCustomHeader}
								onClick={() => history.goBack()}><IonIcon className={styles.iconLeft} icon={chevronBack}></IonIcon></button>
							<IonLabel className={styles.headerLabel}>{t('User information')}</IonLabel>
						</IonHeader>
						<IonContent>
							<form
								onSubmit={
									() => {
										dispatch(putUserProfile(userProfile));
										dispatch(postExaminations(bookingModel));
										history.push("/apointmentInfo")
									}}
							>
								<IonList>
									<IonItem>
										<IonLabel className={styles.styledLabel} position="stacked">{t('Full name')}</IonLabel>
										<IonInput
											required
											placeholder={t('Full name')}
											value={fullName}
											onIonChange={(e) => setFullName(e.detail.value!)}
										> </IonInput>
									</IonItem>
									<IonItem>
										<IonLabel className={styles.styledLabel} position="stacked">{t('PhoneNumber')}</IonLabel>
										<IonInput
											required
											placeholder={t('PhoneNumber')}
											onIonChange={(e) => setPhoneNumber(e.detail.value!)}
											value={phoneNumber}
										> </IonInput>
									</IonItem>
									<IonItem>
										<IonLabel className={styles.styledLabel} position="stacked">{t('Email')}</IonLabel>
										<IonInput
											required
											type="email"
											placeholder={t('Email')}
											onIonChange={(e) => setEmail(e.detail.value!)}
											value={email}
										> </IonInput>
									</IonItem>
									<IonItem>
										<IonLabel className={styles.styledLabel} position="stacked">{t('Address')}</IonLabel>
										<IonInput
											required
											placeholder={t('Address')}
											onIonChange={(e) => setAddress(e.detail.value!)}
											value={address}
										> </IonInput>
									</IonItem>
									<IonItem>
										<IonLabel className={styles.styledLabel} position="stacked">{t('Date of birth')}</IonLabel>
										<IonInput
											value={moment(dateOfBirth).format('YYYY-MM-DD') + ""}
											max={moment(new Date()).format('YYYY-MM-DD')}
											required
											type="date"
											onIonChange={(e) => { setDateOfBirth(e.detail.value!); console.log(moment(new Date()).format('YYYY-MM-DD')) }}
										> </IonInput>
									</IonItem>
									<IonItem>
										<IonLabel className={styles.styledLabel} position="stacked">{t('Gender')}</IonLabel>
										<IonSelect value={gender} onIonChange={e => setGender(e.detail.value)}>
											<IonSelectOption value={true}>{t('Male')}</IonSelectOption>
											<IonSelectOption value={false}>{t('Female')}</IonSelectOption>
										</IonSelect>
									</IonItem>
									<IonItem>
										<IonLabel className={styles.styledLabel} position="stacked">{t('City')}</IonLabel>
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
										<IonLabel className={styles.styledLabel} position="stacked">{t('District')}</IonLabel>
										{districts === undefined ? "" :
											<IonSelect
												value={districts}
												onIonChange={e => {
													setDistricts(e.detail.value);
													setWards("");
												}}>
												{Boolean(location.find((lo) => lo.value === city)) === true ?
													location.filter((lo) => lo.value === city)[0].districts.map((districts) => (
														<IonSelectOption value={districts.value}>{districts.label}</IonSelectOption>
													)) : ""}

											</IonSelect>
										}
									</IonItem>
									<IonItem>
										<IonLabel className={styles.styledLabel} position="stacked">{t('Ward')}</IonLabel>
										{districts === null || districts === undefined ? "" :
											<IonSelect
												value={wards}
												onIonChange={e => setWards(e.detail.value)}>
												{Boolean(location.find((lo) => lo.value === city)) === true &&
													location.filter((lo) => lo.value === city)[0].districts.filter((dis) => dis.value === districts)[0] !== undefined ?
													location.filter((lo) => lo.value === city)[0].districts.filter((dis) => dis.value === districts)[0].wards.map((ward) => (
														<IonSelectOption value={ward.value}>{ward.label}</IonSelectOption>
													)) : ""}
											</IonSelect>
										}
									</IonItem>
								</IonList>
								<button
									className={styles.styledButtonSubmit}
									disabled={!(Boolean(wards)) || moment(new Date()).format('YYYY-MM-DD') === moment(dateOfBirth).format('YYYY-MM-DD')}
									type="submit">{t('Make an appointment')}</button>
							</form>
						</IonContent>
					</IonPage>
			}
		</>
	)
};

export default ConfirmProfile;