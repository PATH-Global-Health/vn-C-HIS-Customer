import { IonIcon } from "@ionic/react";
import React from "react";
import styled from 'styled-components';
import GoogleLogin from 'react-google-login';
import { mailOutline } from "ionicons/icons";
import { useHistory } from "react-router";
import { useAuth } from "@app/hooks";

const StyledIconSocial = styled(IonIcon)`
  margin: 15px 20px 10px 15px;
  padding: 15px 15px;
  font-size: 20px;
  border: 1px solid #9dabdd;
  border-radius: 50px;
  color: black;
  align-item: center;
`;

const GoogleAuthen: React.FC = () => {
  const { loginWithGoogle } = useAuth();
  const history = useHistory();
  const responseGoogle = (response: any): void => {
    try {
      const { tokenId } = response;
      loginWithGoogle(tokenId).then(() => { history.push('/') });
    } catch (error) {
    }
  };
  return (
    <div>
      <GoogleLogin
        clientId="1056103441390-ijfcpmon449hqnh5ijq3pbnmr9ocdmi1.apps.googleusercontent.com"
        render={renderProps => (
          <StyledIconSocial onClick={renderProps.onClick} icon={mailOutline} color='primary' />
        )}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  )

}
export default GoogleAuthen