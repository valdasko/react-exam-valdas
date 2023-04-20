import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuthCtx } from '../../store/AuthProvider';

function Header() {
  const { isLoggedIn, logout } = useAuthCtx();
  return (
    <div>
      <div>
        <Link to={'/'}>Logo</Link>
        <nav>
          <NavLink to={'/'}>Home</NavLink>
          {!isLoggedIn && (
            <>
              <NavLink to={'/login'}>Login</NavLink>
              <NavLink to={'/register'}>Sign up</NavLink>
            </>
          )}
          {isLoggedIn && (
            <>
              <NavLink to={'/shops'}>Shops</NavLink>
              <NavLink to={'/addshop'}>Add shop</NavLink>
              <button onClick={logout}>Logout</button>
            </>
          )}
        </nav>
      </div>
    </div>
  );
}

export default Header;
