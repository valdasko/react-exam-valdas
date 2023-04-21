import React from 'react';
import LoginForm from '../components/forms/LoginForm';
import { auth } from '../firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuthCtx } from '../store/AuthProvider';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

function Login() {
  const { login, isLoading, setIsLoading } = useAuthCtx();

  function loginFire({ email, password }) {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log('user ===', user);
        const token = user.uid;
        login(user, token);
        toast.success('Login success');
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
  }
  return (
    <div>
      <h1>login page</h1>
      {isLoading && <h3>Loading..</h3>}
      <LoginForm onLogin={loginFire} />
      <Link to={'/register'}>New user? Sign up</Link>
    </div>
  );
}

export default Login;
