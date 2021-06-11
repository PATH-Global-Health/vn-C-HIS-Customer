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
import { useSelector, useDispatch } from '@app/hooks';
import 'react-day-picker/lib/style.css';
import { useHistory } from "react-router-dom";
import { arrowBack, text } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import { getUserInfo } from '../slices/workingCalendar';
const ApointmentInfo: React.FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const bookingModel = useSelector((b) => b.workingCaledar.bookingModelResponse);
    const examinationSuccess = useSelector((b) => b.workingCaledar.examinationSuccess);
    const { t, i18n } = useTranslation();
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
    useEffect(() => {
        dispatch(getUserInfo())
    }, [])
    return (
        <IonPage>
            {examinationSuccess === false ? <StyledHeader>
                <StyledButtonHeader onClick={() => history.goBack()}><StyledIconRight icon={arrowBack}></StyledIconRight></StyledButtonHeader>
                <StyledLabelHeader>{t('Make an appointment failed')}</StyledLabelHeader>
            </StyledHeader> :
                <>
                    <StyledHeader>
                        <StyledButtonHeader onClick={() => history.goBack()}><StyledIconRight icon={arrowBack}></StyledIconRight></StyledButtonHeader>
                        <StyledLabelHeader>{t('Appointment information')}</StyledLabelHeader>
                    </StyledHeader>
                    {/* {userProfile === undefined ? "" : */}
                    <IonContent>
                        <IonList>
                            <IonItem>
                                <StyledLabel position="stacked">{t('Service name')}</StyledLabel>
                                <IonInput value={bookingModel.data.service.name}> </IonInput>
                            </IonItem>
                            <IonItem>
                                <StyledLabel position="stacked">{t('Appointment date')}</StyledLabel>
                                <IonInput value={new Date(bookingModel.data.date).toDateString()}> </IonInput>
                            </IonItem>
                            {/* <IonItem>
                        <StyledLabel position="stacked">Tỉnh/Thành phố</StyledLabel>
                        <IonInput value={hospital.province}> </IonInput>
                    </IonItem> */}
                            <IonItem>
                                <StyledLabel position="stacked">{t('Appointment time')}</StyledLabel>
                                <IonInput value={bookingModel.data.interval.from}> </IonInput>
                            </IonItem>
                            <IonItem>
                                <StyledLabel position="stacked">{t('Service Unit')}</StyledLabel>
                                <IonInput value={bookingModel.data.unit.name}> </IonInput>
                            </IonItem>

                        </IonList>

                    </IonContent>
                    {/* } */}
                    <StyledButtonCancel>{t('Cancel appointment')}</StyledButtonCancel>
                </>
            }
        </IonPage>
    )
};

export default ApointmentInfo;