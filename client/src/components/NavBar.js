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
    <nav className={style.nav}>
      {!authUser ? (
        <>
          <Link className={style.link} to='/login'>
            Log in
          </Link>
          <Link className={style.link} to='/signup'>
            Sign up
          </Link>
        </>
      ) : (
        <>
          <button
            className={style.dropdownToggle}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <span>{authUser}</span> <Icon name='chevronDown' size='16' />
          </button>

          <div
            className={style.dropdownMenu}
            style={{ display: showDropdown ? 'block' : 'none' }}
            ref={dropdownMenuRef}
          >
            <Link className={style.dropdownLink} to='/dashboard'>
              Dashboard
            </Link>
            <Link className={style.dropdownLink} to={`/profile/${authUser}`}>
              View my profile
            </Link>
            <CreateBlogPost />
            <button className={`${style.logoutBtn} ${style.dropdownLink}`} onClick={logout}>
              Log out
            </button>
          </div>
        </>
      )}
    </nav>
  );
}

export default NavBar;
