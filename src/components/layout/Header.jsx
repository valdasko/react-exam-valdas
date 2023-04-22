import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuthCtx } from '../../store/AuthProvider';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import Container from '../ui/Container';

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
  function classNames(...clases) {
    return clases.filter(Boolean).join(' ');
  }

  function isActive(pathname) {
    return location.pathname === pathname;
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
          <Link
            className='font-headers text-primary text-[40px] hover:text-secondary transition-colors duration-700'
            to={'/'}
          >
            Logo
          </Link>
          <nav className='my-2 flex gap-6 font-body text-xl'>
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
        </div>
      </Container>
    </header>
  );
}

export default Header;
