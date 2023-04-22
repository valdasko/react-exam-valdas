import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuthCtx } from '../../store/AuthProvider';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import Container from '../ui/Container';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';

const linksData = [
  { index: 1, title: 'Home', link: '/' },
  { index: 2, title: 'Login', link: '/login' },
  { index: 3, title: 'Sign up', link: '/register' },
];
const privateLinksData = [
  { index: 1, title: 'Home', link: '/' },
  { index: 2, title: 'Shops', link: '/shops' },
  { index: 3, title: 'Add shop', link: '/addshop' },
];

function Header() {
  const { isLoggedIn, logout } = useAuthCtx();

  const scrollPosition = useScrollPosition();

  const [open, setOpen] = useState(false);

  function classNames(...clases) {
    return clases.filter(Boolean).join(' ');
  }

  function isActive(pathname) {
    return location.pathname === pathname;
  }

  const handleMenu = () => {
    setOpen((prev) => !prev);
  };

  // className='sticky top-0 z-50  shadow-sm bg-white'
  return (
    <header
      className={classNames(
        scrollPosition > 0 ? 'shadow bg-white text-[#333]' : 'shadow:none',
        'transition ease-out sticky top-0 z-50 bg-light text-secondary '
      )}
    >
      <Container>
        <div className='mx-auto w-full px-3 md:px-0 flex  justify-between items-center '>
          <Link
            className='font-headers text-primary text-3xl md:text-[40px] hover:text-secondary transition-colors duration-700'
            to={'/'}
          >
            Logo
          </Link>
          <nav className='hidden my-2 md:flex gap-6 font-body text-xl'>
            {!isLoggedIn &&
              linksData.map(({ index, title, link }) => (
                <NavLink
                  key={index}
                  to={link}
                  className={`hover:text-primary transition-colors duration-300 ${
                    isActive(link) ? 'text-primary' : ''
                  } px-2 py-1`}
                >
                  {title}
                </NavLink>
              ))}
            {isLoggedIn && (
              <>
                {privateLinksData.map(({ index, title, link }) => (
                  <NavLink
                    key={index}
                    to={link}
                    className={`hover:text-primary transition-colors duration-300 ${
                      isActive(link) ? 'text-primary' : ''
                    } px-2 py-1`}
                  >
                    {title}
                  </NavLink>
                ))}
                <button className='hover:text-primary transition-colors duration-300 px-2 py-1' onClick={logout}>
                  Logout
                </button>
              </>
            )}
          </nav>
          {/* Burger menu */}
          <div className='-mr-2 flex md:hidden'>
            <button
              onClick={handleMenu}
              type='button'
              className='text-2xl inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-secondary focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-white'
            >
              <span className='sr-only'>Open main menu</span>
              {open === true ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </Container>
      {/* mobile menu */}
      {open ? (
        <div className='md:hidden '>
          <div className='ox-2 pt-2 pb-3 space-y-1 sm:px-3 text-center '>
            {!isLoggedIn &&
              linksData.map(({ index, title, link }) => (
                <NavLink
                  key={index}
                  to={link}
                  className={`hover:text-primary transition-colors duration-300 ${
                    isActive(link) ? 'text-primary' : ''
                  } px-2 py-1 block`}
                >
                  {title}
                </NavLink>
              ))}
            {isLoggedIn && (
              <>
                {privateLinksData.map(({ index, title, link }) => (
                  <NavLink
                    key={index}
                    to={link}
                    className={`hover:text-primary transition-colors duration-300 ${
                      isActive(link) ? 'text-primary' : ''
                    } px-2 py-1 block`}
                  >
                    {title}
                  </NavLink>
                ))}
                <button className='hover:text-primary transition-colors duration-300 px-2 py-1' onClick={logout}>
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      ) : null}
      <div></div>
    </header>
  );
}

export default Header;
