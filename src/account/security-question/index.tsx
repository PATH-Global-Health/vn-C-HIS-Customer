import React from 'react';
import {
  IonContent,
} from '@ionic/react';
import CreateModal from './components/CreateModal';

const Home: React.FC = () => {
  return (
    <>
      <IonContent>
        <CreateModal />
      </IonContent>
    </>
  );
};

export default Home;
