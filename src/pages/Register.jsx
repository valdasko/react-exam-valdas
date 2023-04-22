import React from 'react';
import RegisterForm from '../components/forms/RegisterForm';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useAuthCtx } from '../store/AuthProvider';
import { toast } from 'react-hot-toast';

function Register() {
  const { register, setIsLoading, isLoading } = useAuthCtx();

  function registerUser({ email, password }) {
    setIsLoading(true);

    const registerPromise = createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        register(user);
        // ...
        setIsLoading(false);
        toast.success('Registration completed');
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/email-already-in-use') {
          toast.error('A user with this email already exists');
        }
        const errorMessage = error.message;
        setIsLoading(false);

        // ..
      });
    // toast.promise(registerPromise, {
    //   loading: 'Loading',
    //   success: 'Registration completed',
    //   error: 'Error when trying to register',
    // });
  }

  return (
    <section className='min-h-[93.4vh] flex items-center justify-center'>
      <div className='bg-primary flex rounded-2xl shadow-lg max-w-5xl p-5'>
        <div className='md:w-1/2 px-8'>
          <h2 className='font-bold font-headers text-secondary text-2xl'>Register</h2>
          <p className='font-body text-sm mt-4'>Create An Account if You haven't Already</p>
          <RegisterForm onRegister={registerUser} />
        </div>

        {/* image */}
        <div className='w-1/2 md:block hidden '>
          <img className='rounded-2xl ' src='/public/login.jpg' alt='login image' />
        </div>
      </div>
    </section>
  );
}
export default Register;
