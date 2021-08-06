import React, { ReactNode, useMemo } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '@app/hooks';

import DefaultLayout from '@app/components/default-layout';

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
    isIncognito,
  } = props;

  const { isAuthenticated } = useAuth();
  // const isAuth = useMemo(() => isAuthenticated(), [isAuthenticated]);
  return (
    <Route
      path={path}
      exact={exact}
      render={(componentProps): JSX.Element => {
        if ((isPrivate && isAuthenticated()) || !isPrivate || isIncognito) {
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
          if (!isIncognito) {
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