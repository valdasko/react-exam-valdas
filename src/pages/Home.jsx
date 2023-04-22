import React from 'react';
import Container from '../components/ui/Container';
// import Container from '../components/ui/Container';

function Home() {
  return (
    <main>
      <Container>
        <div className='mx-auto'>
          <div className='relative mb-6'>
            <img className='w-full h-80 object-cover bottom-5' src='/public/hero.webp' alt='hero img' />
            <h1 className='font-headers text-center text-[40px] font-normal  text-secondary bg-light absolute left-1/2 transform -translate-x-1/2  bottom-0 bg-opacity-80 rounded-t-xl  uppercase py-8 px-20'>
              shops
              <span className='block font-body text-xl text-center text-[#333]'>Welcome to our shops page</span>
            </h1>
          </div>
        </div>
      </Container>
    </main>
  );
}

export default Home;
