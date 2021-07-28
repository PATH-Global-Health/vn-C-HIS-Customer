import { IonButton, IonCol, IonContent, IonHeader, IonIcon, IonRow, IonText, IonTitle } from "@ionic/react";
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
  const signIn = async (): Promise<void> => {
    //const result = await Plugin.GoogleAuth.signIn();
    //console.info('result', result);
    /*  if (result) {
       history.push({
         pathname: '/home',
         state: { name: result.name || result.displayName, image: result.imageUrl, email: result.email }
       });
     } */

  }
  //923539945042-fqqsifc7ngsrb379fcooi8bu87m2quca.apps.googleusercontent.com
  //1056103441390-ijfcpmon449hqnh5ijq3pbnmr9ocdmi1.apps.googleusercontent.com
  return (
    <div>
      <GoogleLogin
        clientId="923539945042-fqqsifc7ngsrb379fcooi8bu87m2quca.apps.googleusercontent.com"
        render={renderProps => (
          <StyledIconSocial onClick={renderProps.onClick} icon={mailOutline} color='primary' />
        )}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>

    /*  <IonContent className="ion-padding">
       <IonRow>
         <IonCol className="text-center">
           <IonText className="title">
             Google Login in Capacitor app
           </IonText>
         </IonCol>
       </IonRow>
       <IonRow>
         <IonCol className="text-center">
           <IonText className="text-center">
             By Enappd Team
           </IonText>
         </IonCol>
       </IonRow>
 
       <IonButton className="login-button" onClick={() => signIn()} expand="block" fill="solid" color="danger">
         Login with Google
       </IonButton> 
     </IonContent >*/
  )

}
export default GoogleAuthen