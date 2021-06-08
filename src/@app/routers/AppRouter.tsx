import React from 'react';

import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import AppRoute from './AppRoute';

import routes from './routes';

const AppRouter: React.FC = () => (
  <IonApp>
    <IonReactRouter>
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
    </IonReactRouter>
  </IonApp>
);

export default AppRouter;
