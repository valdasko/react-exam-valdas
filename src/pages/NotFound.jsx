import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className='min-h-screen '>
      <div className='max-w-[300px] mx-auto grid content-center '>
        <h1 className='mt-20 text-center font-headers text-[50px]'>oops!</h1>
        <p className='mb-2 text-center font-headers text-[30px]'>seems like this page does not exist..</p>
        <Link
          className='font-body mx-auto text-[15px] uppercase hover:text-primary transition-colors bg-secondary text-primary py-2 px-4'
          to={'/'}
        >
          go to home page
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
