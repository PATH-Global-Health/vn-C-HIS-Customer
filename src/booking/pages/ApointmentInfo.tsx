import React, { useEffect } from 'react';
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
} from '@ionic/react';
import styled from 'styled-components';
import {useSelector } from '@app/hooks';
import 'react-day-picker/lib/style.css';
import { useHistory } from "react-router-dom";
import { arrowBack, text } from 'ionicons/icons';

const ApointmentInfo: React.FC = () => {
    const history = useHistory();

    const bookingModel = useSelector((b) => b.workingCaledar.bookingModelResponse);

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
    const StyledButtonCancel = styled(IonButton)`
// width: 300px;
--background: #eb445a;
// position: absolute;
// bottom: 5px;
// width: 
margin: 16px;
margin-bottom: 80px;
`
    // useEffect(() => {
    //     console.log(bookingModel);
    // }, [])

    return (
        <IonPage>
            {bookingModel.data.interval.id === "" ? <StyledHeader>
                <StyledButtonHeader onClick={() => history.goBack()}><StyledIconRight icon={arrowBack}></StyledIconRight></StyledButtonHeader>
                <StyledLabelHeader>Đặt lịch thất bại</StyledLabelHeader>
            </StyledHeader> :
                <>
                    <StyledHeader>
                        <StyledButtonHeader onClick={() => history.goBack()}><StyledIconRight icon={arrowBack}></StyledIconRight></StyledButtonHeader>
                        <StyledLabelHeader>Thông tin lịch hẹn</StyledLabelHeader>
                    </StyledHeader>
                    {/* {userProfile === undefined ? "" : */}
                    <IonContent>
                        <IonList>
                            <IonItem>
                                <StyledLabel position="stacked">Tên dịch vụ</StyledLabel>
                                <IonInput value={bookingModel.data.service.name}> </IonInput>
                            </IonItem>
                            <IonItem>
                                <StyledLabel position="stacked">Ngày hẹn</StyledLabel>
                                {/* <IonInput value={new Date(bookingModel.date).toDateString()}> </IonInput> */}
                            </IonItem>
                            {/* <IonItem>
                        <StyledLabel position="stacked">Tỉnh/Thành phố</StyledLabel>
                        <IonInput value={hospital.province}> </IonInput>
                    </IonItem> */}
                            <IonItem>
                                <StyledLabel position="stacked">Thời gian hẹn</StyledLabel>
                                <IonInput value={bookingModel.data.interval.from}> </IonInput>
                            </IonItem>
                            <IonItem>
                                <StyledLabel position="stacked">Cơ sở dịch vụ</StyledLabel>
                                <IonInput value={bookingModel.data.unit.name}> </IonInput>
                            </IonItem>

                        </IonList>

                    </IonContent>
                    {/* } */}
                    <StyledButtonCancel>Hủy lịch hẹn</StyledButtonCancel>
                </>
            }
        </IonPage>
    )
};

export default ApointmentInfo;