import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuthCtx } from '../../store/AuthProvider';

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
      name: Yup.string().min(4).required('Shop name is required'),
      town: Yup.string().min(4).required('Town is required'),
      startyear: Yup.number().min(1970).max(2022).required('Start year is required'),
      description: Yup.string().min(6).required('Please enter description'),
      image: Yup.string().min(5).required('Image is required'),
    }),
    onSubmit: (values) => {
      console.log(values);
      onNewShop(values);
    },
  });

  return (
    <div>
      <form className='flex flex-col  gap-4' onSubmit={formik.handleSubmit}>
        <input
          className='p-2 mt-8 rounded-xl border w-full'
          type='text'
          id='name'
          placeholder='Shop name'
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name ? <div>{formik.errors.name}</div> : null}
        <input
          className='p-2 rounded-xl border w-full'
          type='text'
          id='town'
          placeholder='Shop town'
          value={formik.values.town}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.town && formik.errors.town ? <div>{formik.errors.town}</div> : null}
        <input
          className='p-2 rounded-xl border w-full'
          type='text'
          id='startyear'
          placeholder='Shop start year'
          value={formik.values.startyear}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.startyear && formik.errors.startyear ? <div>{formik.errors.startyear}</div> : null}
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
        {formik.touched.description && formik.errors.description ? <div>{formik.errors.description}</div> : null}
        <input
          className='p-2 rounded-xl border w-full'
          type='text'
          id='image'
          placeholder='Image url'
          value={formik.values.image}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.image && formik.errors.image ? <div>{formik.errors.image}</div> : null}

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
