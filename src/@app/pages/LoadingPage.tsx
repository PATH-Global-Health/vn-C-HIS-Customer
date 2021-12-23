import React from 'react';
import { IonContent, IonLoading } from '@ionic/react';

const LoadingPage: React.FC = () => {
  return (
    <IonContent>
      <IonLoading
        isOpen
        message="Vui lòng đợi..."
      />
    </IonContent>
  )
};

export default LoadingPage;