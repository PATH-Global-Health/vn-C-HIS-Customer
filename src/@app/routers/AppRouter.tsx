import React from 'react';

import { home, newspaper, notifications, person } from 'ionicons/icons';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import AppRoute from './AppRoute';

import { useSelector } from '@app/hooks';
import routes from './routes';

const AppRouter: React.FC = () => {
  const { appMenu } = useSelector((state) => state.global);
  return (
    <IonApp>
      <IonReactRouter>
        {/* {appMenu && (
          <IonTabs>
            <IonRouterOutlet>
              {routes.map((r) => (
                <AppRoute
                  key={r.path || '404'}
                  path={r.path}
                  exact={r.exact}
                  component={r.component}
                  isPrivate={r.isPrivate}
                  layout={r.layout}
                />
              ))}
            </IonRouterOutlet>
            <IonTabBar slot="bottom" style={{ '--border': '1px solid #b4b4b4' }}>
              <IonTabButton tab="home" href="/home">
                <IonIcon icon={home} />
                <IonLabel>Trang chủ</IonLabel>
              </IonTabButton>
              <IonTabButton tab="news" href="/news">
                <IonIcon icon={newspaper} />
                <IonLabel>Tin tức</IonLabel>
              </IonTabButton>

              <IonTabButton tab="notify" href="/notify">
                <IonIcon icon={notifications} />
                <IonLabel>Thông báo</IonLabel>
              </IonTabButton>

              <IonTabButton tab="acount" selected={true} href="/account">
                <IonIcon icon={person} />
                <IonLabel>Tài khoản</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        )}
        {appMenu || (
          <IonRouterOutlet>
            {routes.map((r) => (
              <AppRoute
                key={r.path || '404'}
                path={r.path}
                exact={r.exact}
                component={r.component}
                isPrivate={r.isPrivate}
                layout={r.layout}
              />
            ))}
          </IonRouterOutlet>
        )} */}
        <IonTabs>
          <IonRouterOutlet>
            {routes.map((r) => (
              <AppRoute
                key={r.path || '404'}
                path={r.path}
                exact={r.exact}
                component={r.component}
                isPrivate={r.isPrivate}
                layout={r.layout}
              />
            ))}
          </IonRouterOutlet>
          <IonTabBar style={appMenu ? { '--border': '1px solid #b4b4b4' } : { '--border': '1px solid #b4b4b4', 'display': 'none' }} slot="bottom">
            <IonTabButton tab="home" href="/home">
              <IonIcon icon={home} />
              <IonLabel>Trang chủ</IonLabel>
            </IonTabButton>
            <IonTabButton tab="news" href="/news">
              <IonIcon icon={newspaper} />
              <IonLabel>Tin tức</IonLabel>
            </IonTabButton>

            <IonTabButton tab="notify" href="/notify">
              <IonIcon icon={notifications} />
              <IonLabel>Thông báo</IonLabel>
            </IonTabButton>

            <IonTabButton tab="acount" selected={true} href="/account">
              <IonIcon icon={person} />
              <IonLabel>Tài khoản</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  )
};

export default AppRouter;
