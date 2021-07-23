import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,

  IonRow,
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
