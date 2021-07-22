import React, { useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '@app/hooks';

const AuthPage: React.FC = () => {
  const history = useHistory();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (history) {
      history.push(isAuthenticated() ? '/home' : '/login');
    }
  }, [history]);

  return <div>Loading...</div>;
};

export default AuthPage;
