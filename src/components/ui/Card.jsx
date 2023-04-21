import React from 'react';

function Card({ item }) {
  return (
    <div className='my-8 rounded shadow-lg shadow-gray-200 dark:shadow-gray-900 bg-white dark:bg-gray-800 duration-300 hover:-translate-y-1'>
      <img src={item.image} className='rounded-t h-72 w-full object-cover' />
      <div className='justify-between p-4 leading-normal font-body'>
        <h3 className='text-[28px] mb-4 font-headers   leading-relaxed text-secondary'>{item.name}</h3>
        <p className='tracking-wide mb-4'>{item.description}</p>
        <p className='mb-4'>{item.town}</p>
        <p className>
          Opened in:
          {item.startyear}
        </p>
      </div>
    </div>
  );
}

export default Card;
