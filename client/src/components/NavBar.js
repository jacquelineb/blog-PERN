import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { CreateBlogPost } from './PostTools';
import style from '../styles/NavBar.module.scss';
import Icon from './Icon';

function NavBar() {
  const { authUser, logout } = useAuthContext();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownMenuRef = useRef(null);

  useEffect(() => {
    function handlePageClick(e) {
      // Clicking outside dropdown menu
      if (dropdownMenuRef.current && !dropdownMenuRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }

    if (showDropdown) {
      window.addEventListener('click', handlePageClick);
    }

    return () => {
      window.removeEventListener('click', handlePageClick);
    };
  }, [showDropdown]);

  return (
    <nav className={style.Nav}>
      {!authUser ? (
        <>
          <Link to='/login'>Log in</Link>
          <Link to='/signup'>Sign up</Link>
        </>
      ) : (
        <>
          <button
            className={style.dropdownToggle}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <span>{authUser}</span> <Icon name='chevronDown' size='16' />
          </button>
          <CreateBlogPost />

          {!showDropdown ? null : (
            <div className={style.dropdownMenu} ref={dropdownMenuRef}>
              <Link onClick={() => setShowDropdown(false)} to='/dashboard'>
                Dashboard
              </Link>
              <Link
                onClick={() => {
                  setShowDropdown(false);
                }}
                to={`/profile/${authUser}`}
              >
                View my profile
              </Link>
              <button
                onClick={() => {
                  setShowDropdown(false);
                  logout();
                }}
              >
                Log out
              </button>
            </div>
          )}
        </>
      )}
    </nav>
  );
}

export default NavBar;
