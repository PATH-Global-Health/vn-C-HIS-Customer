import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider, IonButton, IonIcon } from '@ionic/react';
import styled from 'styled-components';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { arrowBack } from 'ionicons/icons';
import { Hospital } from 'booking/models/hospital';
import { useDispatch, useSelector } from '@app/hooks';
import { getIntervals } from '../slices/workingCalendar';

const HospitalDetail: React.FC = () => {
    const history = useHistory();
    const hospital = useLocation<Hospital>().state;
    const dispatch = useDispatch();
    let dayId = "";
    const d = useSelector((d) => d.dateBooking.dateBooking);
    // const da = Date.parse(useSelector((d) => d.dateBooking.dateBooking));
    const dateByUnitAndServices = useSelector((s) => s.workingCaledar.workingCalendars);

    const getInterval = () => {
        dateByUnitAndServices.map((date) => {
            if (
                new Date(date.date).getDate() === new Date(d).getDate()
                && new Date(date.date).getMonth() === new Date(d).getMonth()
                && new Date(date.date).getFullYear() === new Date(d).getFullYear()
            ) {
                console.log(date.id);
                dispatch(getIntervals(date.id));
            }
        }
        )

    }
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
    const StyledIconRight = styled(IonIcon)`
{
    color: #b3b3b3;
    right: -9px;
    position: absolute;
  }
`

    const StyledLabel = styled(IonLabel)`
{
    font-size: 20px;
  }
`
    const StyledButtonNext = styled(IonButton)`
// width: 300px;
--background: #293978;
// position: absolute;
// bottom: 5px;
// width: 
margin: 16px;
margin-bottom: 80px;
`
    useEffect(() => {
        console.log(hospital)
    })
    return (
        <IonPage>
            <StyledHeader>
                <StyledButtonHeader onClick={() => history.goBack()}><StyledIconRight icon={arrowBack}></StyledIconRight></StyledButtonHeader>
                <StyledLabelHeader>Cơ sở dịch vụ</StyledLabelHeader>
            </StyledHeader>
            {hospital === undefined ? "" :
                <IonContent>
                    <IonList>
                        <IonItem>
                            <StyledLabel position="stacked">Tên cơ sở</StyledLabel>
                            <IonInput value={hospital.name}> </IonInput>
                        </IonItem>
                        <IonItem>
                            <StyledLabel position="stacked">Mã cơ sở</StyledLabel>
                            <IonInput value={hospital.province}> </IonInput>
                        </IonItem>
                        {/* <IonItem>
                        <StyledLabel position="stacked">Tỉnh/Thành phố</StyledLabel>
                        <IonInput value={hospital.province}> </IonInput>
                    </IonItem> */}
                        <IonItem>
                            <StyledLabel position="stacked">Địa chỉ</StyledLabel>
                            <IonInput value={hospital.address}> </IonInput>
                        </IonItem>
                        <IonItem>
                            <StyledLabel position="stacked">Quận/Huyện</StyledLabel>
                            <IonInput value={hospital.district}> </IonInput>
                        </IonItem>
                        <IonItem>
                            <StyledLabel position="stacked">Phường/Xã</StyledLabel>
                            <IonInput value={hospital.ward}> </IonInput>
                        </IonItem>
                        <IonItem>
                            <StyledLabel position="stacked">Email</StyledLabel>
                            <IonInput value={hospital.email}> </IonInput>
                        </IonItem>
                        <IonItem>
                            <StyledLabel position="stacked">Website</StyledLabel>
                            <IonInput value={hospital.website}> </IonInput>
                        </IonItem>
                        <IonItem>
                            <StyledLabel position="stacked">Phone</StyledLabel>
                            <IonInput value={hospital.phone}> </IonInput>
                        </IonItem>
                        {/* <IonItem>
                        <StyledLabel position="stacked">Cơ sở gần bạn</StyledLabel>
                        <IonInput value={text}> </IonInput>
                    </IonItem> */}
                    </IonList>

                </IonContent>
            }
            <StyledButtonNext onClick={() => {
                getInterval()
                history.push("/choosingTime")
            }}>Bước tiếp theo</StyledButtonNext>

        </IonPage>
    );
};

export default HospitalDetail;