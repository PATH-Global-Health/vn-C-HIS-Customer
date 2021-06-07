import React from 'react';
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonThumbnail,
} from '@ionic/react';
import { home } from 'ionicons/icons';
import logo from '../assets/img/logo.png';

const HomePage: React.FC = () => {
  return (
    <IonContent>
      <IonItem button onClick={() => { }}>
        <div >
          <img width='200px' src={logo} alt="logo" />
        </div>
        <IonLabel>
          <p>Try to resize to mobile bruh 💻 👉 📱 </p>
        </IonLabel>
        <IonIcon icon={home} slot="end" />
      </IonItem>
    </IonContent>
  );
};

export default HomePage;
