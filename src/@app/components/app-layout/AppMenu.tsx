import React from 'react';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonRouterLink,
} from '@ionic/react';
import { home, newspaper, notifications, person } from 'ionicons/icons';
import Home from 'pages';
import { Route } from 'react-router';

export const AppMenu: React.FC = () => (

  <IonTabs>
    <IonTabBar
      slot="bottom"
      style={{
        '--border': '1px solid #b4b4b4'

      }}
    >
      <IonTabButton tab="home" href="/home">
        <IonIcon icon={home} />
        <IonLabel>Trang chủ</IonLabel>
      </IonTabButton>

      <IonTabButton tab="post" href="/news">
        <IonIcon icon={newspaper} />
        <IonLabel>Tin tức</IonLabel>
      </IonTabButton>

      <IonTabButton tab="post" href="/notify">
        <IonIcon icon={notifications} />
        <IonLabel>Thông báo</IonLabel>
      </IonTabButton>

      <IonTabButton tab="post" selected={true} href="/account">
        <IonIcon icon={person} />
        <IonLabel>Tài khoản</IonLabel>
      </IonTabButton>
    </IonTabBar>
    <IonRouterOutlet>
      <Route exact path="/home" component={Home} />
    </IonRouterOutlet>
  </IonTabs>
);
export default AppMenu;
