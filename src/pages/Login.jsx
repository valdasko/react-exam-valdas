import React from 'react';
import LoginForm from '../components/forms/LoginForm';
import { auth, googleProvider } from '../firebase/firebase';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useAuthCtx } from '../store/AuthProvider';
import { toast } from 'react-hot-toast';

function Login() {
  const { login, setIsLoading } = useAuthCtx();

  function loginFire({ email, password }) {
    const toastId = toast.loading();

    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const token = user.uid;
        login(user, token);
        setIsLoading(false);
        toast.dismiss(toastId);
        toast.success('Welcome');
        // ...
      })
      .catch((error) => {
        toast.dismiss(toastId);
        const errorCode = error.code;
        console.log('errorCode ===', errorCode);
        const errorMessage = error.message;
        console.log('errorMessage ===', errorMessage);
        if (errorCode === 'auth/wrong-password') {
          toast.error('Wrong email or password');
        } else if (errorCode === 'auth/user-not-found') {
          toast.error('User does not exist');
        } else {
          toast.error(errorCode);
        }
        setIsLoading(false);
      });
  }

  function loginWithGoogle() {
    setIsLoading(true);

    const loginGooglePromise = signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        login(user);
        console.log('user ===', user);
        setIsLoading(false);

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
        setIsLoading(false);
        // ...
      });
    toast.promise(loginGooglePromise, {
      loading: 'Loading',
      success: 'Welcome',
      error: 'Error',
    });
  }

  return (
    <section className='min-h-screen flex items-center justify-center'>
      <div className='bg-primary flex rounded-2xl shadow-lg max-w-5xl p-5'>
        <div className='md:w-1/2 px-8'>
          <h2 className='font-bold font-headers text-secondary text-4xl'>Login</h2>
          <p className='font-body text-md mt-4 mb-8'>Login if You are already a member</p>
          <LoginForm onLogin={loginFire} onGoogleLogin={loginWithGoogle} />
        </div>

        {/* image */}
        <div className='w-1/2 md:block hidden '>
          <img className='rounded-2xl ' src='/public/login1.jpg' alt='login image' />
        </div>
      </div>
    </section>
  );
}

export default Login;
