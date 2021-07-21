import { useAuth } from "@app/hooks";
import React from "react";
import FacebookLogin from "react-facebook-login-typed";
import { useHistory } from "react-router";

interface FacebookLoginInfo {
  id: string;
  userID: string;
  accessToken: string;
  name?: string | undefined;
  email?: string | undefined;
  picture?: {
    data: {
      height?: number | undefined,
      is_silhouette?: boolean | undefined,
      url?: string | undefined,
      width?: number | undefined,
    },
  } | undefined;
}
/* interface FacebookFailureResponse {
  status?: string | undefined;
} */
const Facebook: React.FC = () => {
  const { loginWithFacebook } = useAuth();
  const history = useHistory();
  const responseFacebook = async (response: FacebookLoginInfo): Promise<void> => {
    try {
      const { accessToken } = response;
      await loginWithFacebook(accessToken);
      history.push('/shome');
    } catch (error) {
    }
  };
  const componentClicked = () => console.log("clicked");
  //open_ngkscbp_user@tfbnw.net
  //Zqa1234@
  return (
    <FacebookLogin
      appId="2778304269053147"
      autoLoad={true}
      fields='name,email,picture'
      callback={responseFacebook}
      render={renderProps => (
        <button onClick={componentClicked}>...</button>
      )}
    />
  )

}
export default Facebook