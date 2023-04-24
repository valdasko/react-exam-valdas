import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuthCtx } from '../../store/AuthProvider';
import { Link } from 'react-router-dom';
import InputError from '../ui/InputError';

function RegisterForm({ onRegister }) {
  const { isLoading } = useAuthCtx();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      repeatPassword: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required('Required field'),
      password: Yup.string().min(6).required('Required field'),
      repeatPassword: Yup.string()
        .min(6)
        .required('Required field')
        .oneOf([Yup.ref('password')], 'Passwords must match'),
    }),
    onSubmit: (values) => {
      console.log('Form values:', values);
      const { password } = formik.values;

      onRegister({
        email: values.email,
        password,
      });
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
        <div className='relative'>
          <input
            className='p-2 rounded-xl border w-full'
            id='repeatPassword'
            type='password'
            name='repeatPassword'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.repeatPassword}
            placeholder='Repeat Password'
          />
          {formik.touched.repeatPassword && formik.errors.repeatPassword ? (
            <InputError>{formik.errors.repeatPassword}</InputError>
          ) : null}
        </div>
        <button
          disabled={isLoading}
          className='bg-[#323d34] text-white rounded-xl py-2 mb-5 hover:bg-secondary transition-colors ease-out'
          type='submit'
        >
          Register
        </button>
      </form>
      <div className='text-sm flex justify-center items-center mt-2 gap-2'>
        <p>Already have an account?</p>
        <Link
          className='text-sm py-2 px-5 rounded-xl bg-white hover:bg-[#323d34] hover:text-white transition-colors ease-in-out'
          to={'/login'}
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default RegisterForm;
