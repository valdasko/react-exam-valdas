import React from 'react';
import LoginForm from '../components/forms/LoginForm';
import { auth } from '../firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuthCtx } from '../store/AuthProvider';
import { Link } from 'react-router-dom';

function Login() {
  const { login } = useAuthCtx();

  function loginFire({ email, password }) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log('prisijungti pavyko');
        login(user);

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.warn('errorMessage ===', errorMessage);
      });
  }
  return (
    <div>
      <h1>login page</h1>
      <LoginForm onLogin={loginFire} />
      <Link to={'/register'}>New user? Sign up</Link>
    </div>
  );
}

export default Login;
