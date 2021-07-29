import React from "react";
import { IonButton, IonCol, IonContent, IonHeader, IonIcon, IonRow, IonText, IonTitle } from "@ionic/react";
import styled from 'styled-components';
import { useHistory } from "react-router";
import { useAuth } from "@app/hooks";
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { gapi } from 'gapi-script';
import { mailOutline } from "ionicons/icons";
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

  const signIn = async (): Promise<void> => {
    GoogleAuth.init();
    const result = await GoogleAuth.signIn();
    console.log(result);
    try {
      const { idToken } = result?.authentication;
      loginWithGoogle(idToken).then(() => { history.push('/') });
    } catch (error) {
    }

  }
  //923539945042-fqqsifc7ngsrb379fcooi8bu87m2quca.apps.googleusercontent.com
  //1056103441390-ijfcpmon449hqnh5ijq3pbnmr9ocdmi1.apps.googleusercontent.com
  return (
    <div>
      <StyledIconSocial onClick={() => signIn()} icon={mailOutline} color='primary' />
    </div>
  )

}
export default GoogleAuthen