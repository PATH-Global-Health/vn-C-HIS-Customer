import React, { useEffect } from 'react';
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
} from '@ionic/react';
import { home } from 'ionicons/icons';
import logo from '../assets/img/logo.png';
import { getUnitTypes } from '../../booking/slices/unitType';
import { useDispatch} from '@app/hooks';


const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(getUserInfo(`Profiles?userId=cd176cb7-21bf-43e0-e592-08d88a021d74`));
    dispatch(getUnitTypes());
  }, [dispatch])
  return (
    <IonContent>
      <IonItem button onClick={() => { }}>
        <div >
          <img width='200px' src={logo} alt="logo" />
        </div>
        <IonLabel>
          <p>Try to resize to mobile bruh 💻 👉 📱  </p>
          
        </IonLabel>
        <IonIcon icon={home} />
      </IonItem>
    </IonContent>
  );
};

export default HomePage;
