import React from 'react';
import styled from 'styled-components';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTab,
} from '@ionic/react';
import { home, newspaper, notifications, person } from 'ionicons/icons';

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
    <IonRouterOutlet >
    </IonRouterOutlet>
  </IonTabs>
);
export default AppMenu;
