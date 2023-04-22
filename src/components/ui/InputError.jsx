import React from 'react';

function InputError({ children }) {
  return (
    <div className='text-light sm:mt-1 xl:mt-0 xl:absolute text-sm xl:-left-[8rem] xl:top-3 font-body bg-secondary py-1 px-3 rounded '>
      {children}
    </div>
  );
}

export default InputError;
