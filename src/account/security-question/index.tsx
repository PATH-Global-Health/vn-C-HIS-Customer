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

const Home: React.FC = () => {


  return (
    <>
      <IonContent>
        <IonRow className="ion-justify-content-center">
          <IonCol size="12" size-sm='3'>
            <div style={{ textAlign: 'center', marginTop: '20px', color: '#1145a0', fontSize: '20px', fontWeight: 500 }}>
              'Tính năng đang phát triển'
            </div>
          </IonCol>
        </IonRow>
      </IonContent>
    </>
  );
};

export default Home;
