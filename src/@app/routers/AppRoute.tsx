import React, { ReactNode, useMemo } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '@app/hooks';

import DefaultLayout from '@app/components/default-layout';
import { TOKEN } from '@app/utils/constants';
import { Token } from '@app/models/token';

interface Props {
  component: React.FC;
  layout?: React.FC<{ children: ReactNode }>;
  path?: string;
  exact?: boolean;
  isPrivate?: boolean;
  isIncognito?: boolean;
}

const AppRoute: React.FC<Props> = (props) => {
  const {
    component: Component,
    layout: Layout,
    path,
    exact,
    isPrivate = false,
    isIncognito
  } = props;
  const getStorage = (key: string): string =>
    (localStorage.getItem(key) || sessionStorage.getItem(key)) ?? 'null';

  const isRegistered = (): boolean => {
    const token = JSON.parse(getStorage(TOKEN)) as Token;
    if (token?.username?.length < 12) return true;
    return false;
  }

  const { isAuthenticated } = useAuth();
  // const isAuth = useMemo(() => isAuthenticated(), [isAuthenticated]);
  return (
    <Route
      path={path}
      exact={exact}
      render={(componentProps): JSX.Element => {
        if ((isPrivate && isAuthenticated() && (isIncognito || isRegistered())) || !isPrivate) {
          if (Layout) {
            return (
              <Layout>
                <Component />
              </Layout>
            );
          }

          return (
            <DefaultLayout>
              <Component />
            </DefaultLayout>
          );
        }
        else {
          if (!isIncognito && isAuthenticated()) {
            return (
              <Redirect
                to={{
                  pathname: '/incognito',
                  state: {
                    from: componentProps.location,
                  },
                }}
              />
            );
          }
          return (
            <Redirect
              to={{
                pathname: '/',
                state: {
                  from: componentProps.location,
                },
              }}
            />
          );
        }

      }}
    />
  );
};

export default AppRoute;