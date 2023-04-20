import React from 'react';
import { NavLink, Link } from 'react-router-dom';

function Header() {
  const isUserLoggedIn = false;

  return (
    <div>
      <div>
        <Link to={'/'}>Logo</Link>
        <nav>
          <NavLink to={'/'}>Home</NavLink>
          {!isUserLoggedIn && (
            <>
              <NavLink to={'/login'}>Login</NavLink>
              <NavLink to={'/register'}>Sign up</NavLink>
            </>
          )}
          {isUserLoggedIn && (
            <>
              <NavLink to={'/shops'}>Shops</NavLink>
              <NavLink to={'/addshop'}>Add shop</NavLink>
            </>
          )}
        </nav>
      </div>
    </div>
  );
}

export default Header;
