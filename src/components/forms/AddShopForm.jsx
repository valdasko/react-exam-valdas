import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuthCtx } from '../../store/AuthProvider';
import InputError from '../ui/InputError';

function AddShopForm({ onNewShop }) {
  const { user, isLoading } = useAuthCtx();

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      town: '',
      startyear: '',
      image: '',
      userId: user?.uid,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().min(4).required('Required field'),
      town: Yup.string().min(4).required('Required field'),
      startyear: Yup.number().min(1970).max(2022).required('Required field'),
      description: Yup.string().min(6).required('Required field'),
      image: Yup.string().min(5).required('Required field'),
    }),
    onSubmit: (values) => {
      console.log(values);
      onNewShop(values);
    },
  });

  return (
    <div>
      <form className='flex flex-col  gap-4' onSubmit={formik.handleSubmit}>
        <div className='relative'>
          <input
            className='p-2rounded-xl border w-full'
            type='text'
            id='name'
            placeholder='Shop name'
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name ? <InputError>{formik.errors.name}</InputError> : null}
        </div>
        <div className='relative'>
          <input
            className='p-2 rounded-xl border w-full'
            type='text'
            id='town'
            placeholder='Shop town'
            value={formik.values.town}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.town && formik.errors.town ? <InputError>{formik.errors.town}</InputError> : null}
        </div>
        <div className='relative'>
          <input
            className='p-2 rounded-xl border w-full'
            type='text'
            id='startyear'
            placeholder='Shop start year'
            value={formik.values.startyear}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.startyear && formik.errors.startyear ? (
            <InputError>{formik.errors.startyear}</InputError>
          ) : null}
        </div>
        <div className='relative'>
          <textarea
            className='p-2 rounded-xl border w-full resize-none'
            type='text'
            rows={5}
            id='description'
            placeholder='Description'
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.description && formik.errors.description ? (
            <InputError>{formik.errors.description}</InputError>
          ) : null}
        </div>
        {/* {formik.touched.description && formik.errors.description ? <div>{formik.errors.description}</div> : null} */}
        <div className='relative'>
          <input
            className='p-2 rounded-xl border w-full'
            type='text'
            id='image'
            placeholder='Image url'
            value={formik.values.image}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.image && formik.errors.image ? <InputError>{formik.errors.image}</InputError> : null}
        </div>

        <button
          disabled={isLoading}
          className='bg-[#323d34] text-white rounded-xl py-2 hover:bg-secondary transition-colors ease-out'
          type='submit'
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default AddShopForm;
