import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function RegisterForm({ onRegister }) {
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
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor='email'>Email</label>
        <input
          id='email'
          type='text'
          name='email'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input
          id='password'
          type='password'
          name='password'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}
      </div>
      <div>
        <label htmlFor='password'>Repeat password</label>
        <input
          id='repeatPassword'
          type='password'
          name='repeatPassword'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.repeatPassword}
        />
        {formik.touched.repeatPassword && formik.errors.repeatPassword ? (
          <div>{formik.errors.repeatPassword}</div>
        ) : null}
      </div>
      <button type='submit'>Register</button>
    </form>
  );
}

export default RegisterForm;
