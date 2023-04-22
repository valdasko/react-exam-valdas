import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuthCtx } from '../../store/AuthProvider';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import Container from '../ui/Container';

function Header() {
  const { isLoggedIn, logout } = useAuthCtx();

  const scrollPosition = useScrollPosition();
  function classNames(...clases) {
    return clases.filter(Boolean).join(' ');
  }

  // className='sticky top-0 z-50  shadow-sm bg-white'
  return (
    <header
      className={classNames(
        scrollPosition > 0 ? 'shadow bg-white text-[#333]' : 'shadow:none',
        'transition ease-out sticky top-0 z-50 bg-light text-secondary '
      )}
    >
      <Container>
        <div className='mx-auto w-full flex  justify-between items-center '>
          <Link className='font-headers text-[40px] hover:text-primary transition-colors' to={'/'}>
            Logo
          </Link>
          <nav className='my-2 flex gap-6 font-body text-xl'>
            <NavLink className='hover:text-primary px-2 py-1' to={'/'}>
              Home
            </NavLink>

            {!isLoggedIn && (
              <>
                <NavLink className='hover:text-primary transition-colors  px-2 py-1' to={'/login'}>
                  Login
                </NavLink>
                <NavLink className='hover:text-primary transition-colors px-2 py-1' to={'/register'}>
                  Sign up
                </NavLink>
              </>
            )}
            {isLoggedIn && (
              <>
                <NavLink className='hover:text-primary transition-colors  px-2 py-1' to={'/shops'}>
                  Shops
                </NavLink>
                <NavLink className='hover:text-primary transition-colors px-2 py-1' to={'/addshop'}>
                  Add shop
                </NavLink>
                <button className='hover:text-primary transition-colors px-2 py-1' onClick={logout}>
                  Logout
                </button>
              </>
            )}
          </nav>
        </div>
      </Container>
    </header>
  );
}

export default Header;
