import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function AddShopForm() {
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      town: '',
      startyear: '',
      image: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().min(4).required('Shop name is required'),
      town: Yup.string().min(4).required('Town is required'),
      startyear: Yup.number().min(1970).max(2022).required('Start year is required'),
      description: Yup.string().min(6).required('Please enter description'),
      image: Yup.string().min(5).required('Image is required'),
    }),
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <input
          type='text'
          id='name'
          placeholder='Shop name'
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name ? <div>{formik.errors.name}</div> : null}
        <input
          type='text'
          id='town'
          placeholder='Shop town'
          value={formik.values.town}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.town && formik.errors.town ? <div>{formik.errors.town}</div> : null}
        <input
          type='text'
          id='startyear'
          placeholder='Shop start year'
          value={formik.values.startyear}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.startyear && formik.errors.startyear ? <div>{formik.errors.startyear}</div> : null}
        <textarea
          type='text'
          id='description'
          placeholder='Description'
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.description && formik.errors.description ? <div>{formik.errors.description}</div> : null}
        <input
          type='text'
          id='image'
          placeholder='Image url'
          value={formik.values.image}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.image && formik.errors.image ? <div>{formik.errors.image}</div> : null}

        <button type='submit'>Add</button>
      </form>
    </div>
  );
}

export default AddShopForm;
