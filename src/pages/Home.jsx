import React from 'react';
import Container from '../components/ui/Container';
import escalators from '../assets/escalators.mp4';
import { Link } from 'react-router-dom';
import { useAuthCtx } from '../store/AuthProvider';

function Home() {
  const { isLoggedIn } = useAuthCtx();

  return (
    <section className='min-h-screen md:min-h-[80vh] '>
      <Container>
        <div className='mx-auto mt-8 '>
          <div className='md:relative mb-6 w-full py-8 md:py-0'>
            <video
              src={escalators}
              className='w-full h-[30rem] rounded-bl-[12rem] rounded-tr-[5rem] object-cover object-center hidden md:flex'
              autoPlay
              loop
              muted
            />

            <h1 className='font-headers text-center text-[40px] font-normal  text-secondary bg-light md:absolute md:left-1/2 md:transform md:-translate-x-1/2  md:bottom-0 bg-opacity-80 rounded-t-xl  uppercase py-8 px-20'>
              Home
              {isLoggedIn && (
                <span className='block font-body text-xl text-center text-[#333]'>
                  You can{' '}
                  <Link className='font-bold hover:text-primary transition-colors duration-300' to={'/addshop'}>
                    add shop
                  </Link>{' '}
                  or go to{' '}
                  <Link className='font-bold hover:text-primary transition-colors duration-300' to={'/shops'}>
                    shops page
                  </Link>
                </span>
              )}
              {!isLoggedIn && (
                <span className='block font-body text-xl text-center text-[#333]'>
                  <Link className='font-bold hover:text-primary transition-colors duration-300' to={'/login'}>
                    login
                  </Link>{' '}
                  or{' '}
                  <Link className='font-bold hover:text-primary transition-colors duration-300' to={'/register'}>
                    sign up
                  </Link>{' '}
                  to continue
                </span>
              )}
            </h1>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Home;
