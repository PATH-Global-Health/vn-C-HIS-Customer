import React, { ReactNode, useState, useMemo, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "@app/hooks";

import DefaultLayout from "@app/components/default-layout";
import LoadingPage from "@app/pages/LoadingPage";
import { TOKEN } from "@app/utils/constants";
import { Token } from "@app/models/token";

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

  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  const { isAuthenticated, isRegistered } = useAuth();

  const checkAuthentication = async () => {
    setLoading(true);
    const isAuth = await isAuthenticated();
    setAuthenticated(isAuth);
    setLoading(false);
  }

  useEffect(() => {
    checkAuthentication();
  }, []);

  return (
    <Route
      path={path}
      exact={exact}
      render={(componentProps): JSX.Element => {
        if (loading) {
          return (
            <DefaultLayout>
              <LoadingPage />
            </DefaultLayout>
          )
        } else {
          if ((isPrivate && authenticated) || !isPrivate) {
            if (isRegistered() || isIncognito || !isPrivate) {
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
            } else {
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
          }
          return (
            <Redirect
              to={{
                pathname: '/auth',
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
