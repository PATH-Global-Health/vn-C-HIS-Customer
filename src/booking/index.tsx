import React, { useEffect } from 'react';
import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonModal,
  IonPage,
} from '@ionic/react';
import { home } from 'ionicons/icons';
// import Input from '@app/components/InputForm/input';
import logo from '@app/assets/img/logo.png';
// import { useSelector } from '@app/hooks';
// import authService from '@app/services/auth';
// import { useDispatch } from "@app/hooks";
// import { getBookings } from '@app/services/slice';
// import { HomeBooking } from './components';
const User: React.FC = () => {
  return (
    <IonContent>
      <IonItem>
        <div >
          <img width='200px' src={logo} alt="logo" />
        </div>
        <IonLabel>
          <h3> Home Page</h3>
        </IonLabel>
        <IonIcon icon={home} slot="end" />
      </IonItem>
      {/* <HomeBooking></HomeBooking> */}
    </IonContent>
  );
};

export default User;
