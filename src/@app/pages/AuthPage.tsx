import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '@app/hooks';

const AuthPage: React.FC = () => {
  const history = useHistory();
  const { isAuthenticated } = useAuth();

  const isAuth = async () => {
    const auth = await isAuthenticated();
    if (history) {
      history.replace(auth ? '/home' : '/login');
    }
  }

  useEffect(() => {
    isAuth();
  }, [history, isAuthenticated]);

  return <div>Loading...</div>;
};

export default AuthPage;
