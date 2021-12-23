import React, { useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "@app/hooks";

const AuthPage: React.FC = () => {
  const history = useHistory();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    async function isAuthen() {
      if (history) {
        history.replace((await isAuthenticated()) ? "/home" : "/login");
      }
    }
    isAuthen();
  }, [history]);

  return <div>Loading...</div>;
};

export default AuthPage;
