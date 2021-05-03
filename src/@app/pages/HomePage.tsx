import React from 'react';
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonThumbnail,
} from '@ionic/react';
import { home } from 'ionicons/icons';

const HomePage: React.FC = () => {
  return (
    <IonContent>
      <IonItem button onClick={() => {}}>
        <IonThumbnail slot="start">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png"
            alt="react-logo"
          />
        </IonThumbnail>
        <IonLabel>
          <h3>Home Page</h3>
          <p>Try to resize to mobile bruh 💻 👉 📱 </p>
          <p>Happy hacking from QM with 🥲</p>
        </IonLabel>
        <IonIcon icon={home} slot="end" />
      </IonItem>
    </IonContent>
  );
};

export default HomePage;
