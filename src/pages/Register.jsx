import React from 'react';
import RegisterForm from '../components/forms/RegisterForm';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';

function Register() {
  function registerUser({ email, password }) {
    console.log('{email, password} ===', { email, password });
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log('user ===', user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
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
