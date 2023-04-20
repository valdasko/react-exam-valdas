import React from 'react';
import RegisterForm from '../components/forms/RegisterForm';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useAuthCtx } from '../store/AuthProvider';
import { toast } from 'react-hot-toast';

function Register() {
  const { register } = useAuthCtx();

  function registerUser({ email, password }) {
    console.log('{email, password} ===', { email, password });
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // console.log('user ===', user);
        register(user);
        toast.success('Registration completed');
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        toast.error(errorCode);
        const errorMessage = error.message;
        console.warn(errorMessage);
        // ..
      });
  }

  return (
    <div>
      <h1>REgister page</h1>
      <RegisterForm onRegister={registerUser} />
      <Link to={'/login'}>Already have an account? Log in</Link>
    </div>
  );
}

export default Register;
