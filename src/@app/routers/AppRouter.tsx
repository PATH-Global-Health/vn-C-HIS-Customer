import React from 'react';

import { home, newspaper, notifications, person } from 'ionicons/icons';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import AppRoute from './AppRoute';

import { useSelector } from '@app/hooks';
import routes from './routes';
import { useTranslation } from 'react-i18next';

const AppRouter: React.FC = () => {
  const { appMenu } = useSelector((state) => state.global);
  const { t } = useTranslation();
  return (
    <IonApp style={{ margin: '0 auto', maxWidth: '430px' }}>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            {routes.map((r) => (
              <AppRoute
                key={r.path || '404'}
                path={r.path}
                exact={r.exact}
                component={r.component}
                isPrivate={r.isPrivate}
                isIncognito={r.isIncognito}
                layout={r.layout}
              />
            ))}
          </IonRouterOutlet>
          <IonTabBar style={appMenu ? { '--border': '1px solid #b4b4b4', cursor: 'pointer' } : { '--border': '1px solid #b4b4b4', 'display': 'none' }} slot="bottom">
            <IonTabButton tab="home" href="/home">
              <IonIcon icon={home} />
              <IonLabel>{t('Home')}</IonLabel>
            </IonTabButton>
            <IonTabButton tab="post" href="/post">
              <IonIcon icon={newspaper} />
              <IonLabel>{t('News')}</IonLabel>
            </IonTabButton>

            <IonTabButton tab="notify" href="/notify">
              <IonIcon icon={notifications} />
              <IonLabel>{t('Notification')}</IonLabel>
            </IonTabButton>

            <IonTabButton tab="acount" href="/account">
              <IonIcon icon={person} />
              <IonLabel>{t('Account')}</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  )
};

export default AppRouter;