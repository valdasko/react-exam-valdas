import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuthCtx } from '../../store/AuthProvider';

function Header() {
  const { isLoggedIn, logout } = useAuthCtx();
  return (
    <header className='py-2'>
      <div className='  max-w-[1200px]  mx-auto w-full  bg-light flex  justify-between items-center'>
        <Link className='font-headers text-[40px]' to={'/'}>
          Logo
        </Link>
        <nav className='my-2 flex gap-6 font-body text-xl'>
          <NavLink className=' hover:bg-secondary hover:text-primary px-2 py-1' to={'/'}>
            Home
          </NavLink>

          {!isLoggedIn && (
            <>
              <NavLink className='rounded-sm hover:bg-secondary hover:text-primary  px-2 py-1' to={'/login'}>
                Login
              </NavLink>
              <NavLink className='rounded-sm hover:bg-secondary hover:text-primary px-2 py-1' to={'/register'}>
                Sign up
              </NavLink>
            </>
          )}
          {isLoggedIn && (
            <>
              <NavLink className='rounded-sm hover:bg-secondary hover:text-primary  px-2 py-1' to={'/shops'}>
                Shops
              </NavLink>
              <NavLink className='rounded-sm hover:bg-secondary hover:text-primary px-2 py-1' to={'/addshop'}>
                Add shop
              </NavLink>
              <button className='rounded-sm hover:bg-secondary hover:text-primary px-2 py-1' onClick={logout}>
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
