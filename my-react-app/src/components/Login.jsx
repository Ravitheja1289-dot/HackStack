import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID"; // Replace with actual Client ID

function Login() {
  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <GoogleLogin
        onSuccess={(response) => console.log(response)}
        onError={() => console.log('Login Failed')}
      />
    </GoogleOAuthProvider>
  );
}

export default Login;
