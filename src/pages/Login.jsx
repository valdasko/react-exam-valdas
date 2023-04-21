import React from 'react';
import LoginForm from '../components/forms/LoginForm';
import { auth, googleProvider } from '../firebase/firebase';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useAuthCtx } from '../store/AuthProvider';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

function Login() {
  const { login, isLoading, setIsLoading } = useAuthCtx();

  function loginFire({ email, password }) {
    setIsLoading(true);
    const loginWithEmailPromise = signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log('user ===', user);
        const token = user.uid;
        login(user, token);
        setIsLoading(false);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        toast.error(errorCode);
        // const errorMessage = error.message;
        // console.warn('errorMessage ===', errorMessage);
        setIsLoading(false);
      });
    toast.promise(loginWithEmailPromise, {
      loading: 'Loading',
      success: 'Welcome back',
      error: 'Error when loging in',
    });
  }

  function loginWithGoogle() {
    const loginGooglePromise = signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        login(user);
        console.log('user ===', user);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.warn(errorMessage);
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
    toast.promise(loginGooglePromise, {
      loading: 'Loading',
      success: 'Welcome',
      error: 'Error when loging in',
    });
  }

  return (
    <div>
      <h1>login page</h1>
      {isLoading && <h3>Loading..</h3>}
      <LoginForm onLogin={loginFire} />
      <button onClick={loginWithGoogle}>Log in with Google account</button>
      <Link to={'/register'}>New user? Sign up</Link>
    </div>
  );
}

export default Login;
