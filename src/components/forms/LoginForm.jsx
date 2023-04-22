import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { useAuthCtx } from '../../store/AuthProvider';
import InputError from '../ui/InputError';

function LoginForm({ onLogin, onGoogleLogin }) {
  const { isLoading } = useAuthCtx();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required('Required field'),
      password: Yup.string().min(6).required('Required field'),
    }),
    onSubmit: (values) => {
      console.log('Form values:', values);
      onLogin(values);
    },
  });

  return (
    <div>
      <form className='flex flex-col  gap-4' onSubmit={formik.handleSubmit}>
        <div className='relative'>
          <input
            className='p-2 rounded-xl border w-full'
            id='email'
            type='text'
            name='email'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder='Email'
          />
          {formik.touched.email && formik.errors.email ? <InputError>{formik.errors.email}</InputError> : null}
        </div>
        <div className='relative'>
          <input
            className='p-2 rounded-xl border w-full'
            id='password'
            type='password'
            name='password'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            placeholder='Password'
          />
          {formik.touched.password && formik.errors.password ? <InputError>{formik.errors.password}</InputError> : null}
        </div>
        <button
          disabled={isLoading}
          className='bg-[#323d34] text-white rounded-xl py-2 hover:bg-secondary transition-colors ease-out'
          type='submit'
        >
          Login
        </button>
        <div className='mt-3 grid grid-cols-3 items-center text-gray'>
          <hr />
          <p className='text-center text-sm'>OR</p>
          <hr />
        </div>
        <button
          disabled={isLoading}
          className='bg-white border py-2 w-full rounded-xl mt-5 mb-5 font-body flex justify-center items-center'
          onClick={onGoogleLogin}
        >
          <svg className='mr-3' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48' width='25px' height='25px'>
            <path
              fill='#FFC107'
              d='M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z'
            />
            <path
              fill='#FF3D00'
              d='M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z'
            />
            <path
              fill='#4CAF50'
              d='M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z'
            />
            <path
              fill='#1976D2'
              d='M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z'
            />
          </svg>
          Login with Google
        </button>
      </form>
      <div className='text-sm flex justify-center items-center mt-2 gap-2'>
        <p>Don't have an account?</p>
        <Link
          className='text-sm py-2 px-5 rounded-xl bg-white hover:bg-[#323d34] hover:text-white transition-colors ease-in-out'
          to={'/register'}
        >
          Register
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;
