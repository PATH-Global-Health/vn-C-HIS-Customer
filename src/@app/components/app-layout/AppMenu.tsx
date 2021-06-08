import React from 'react';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
} from '@ionic/react';
import { home, newspaper, people } from 'ionicons/icons';

export const AppMenu: React.FC = () => (
  <IonTabs>
    <IonTabBar slot="bottom">
      <IonTabButton tab="home" href="/">
        <IonIcon icon={home} />
        <IonLabel>Home</IonLabel>
      </IonTabButton>

      <IonTabButton tab="post" href="/post">
        <IonIcon icon={newspaper} />
        <IonLabel>Post</IonLabel>
      </IonTabButton>
      <IonTabButton tab="user" href="/user">
        <IonIcon icon={people} />
        <IonLabel>User</IonLabel>
      </IonTabButton>
    </IonTabBar>
    <IonRouterOutlet></IonRouterOutlet>
  </IonTabs>
);

export default AppMenu;
