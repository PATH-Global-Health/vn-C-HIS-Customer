import React from 'react';
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
} from '@ionic/react';
import { home } from 'ionicons/icons';
import Input from '@app/components/InputForm/input';
import logo from '@app/assets/img/logo.png'
const Home: React.FC = () => {
  return (
    <IonContent>
      <IonItem button onClick={() => { }}>
        <div >
          <img width='200px' src={logo} alt="logo" />
        </div>
        <IonLabel>
          <h3> Home Page</h3>
        </IonLabel>
        <IonIcon icon={home} slot="end" />
      </IonItem>
      <div style={{ color: 'black', textAlign: "center" }}> Welcomeeeee.......</div>
    </IonContent>
  );
};

export default Home;
