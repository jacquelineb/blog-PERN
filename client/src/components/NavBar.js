import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { CreateBlogPost } from './PostTools';
import style from '../styles/NavBar.module.scss';

function NavBar() {
  const { authUser, logout } = useAuthContext();
  return (
    <nav className={style.nav}>
      {!authUser ? (
        <div>
          <Link className={style.link} to='/login'>
            Log in
          </Link>
          <Link className={style.link} to='/signup'>
            Sign up
          </Link>
        </div>
      ) : (
        <DropdownMenu user={authUser} logout={logout} />
      )}
    </nav>
  );
}

function DropdownMenu({ user, logout }) {
  const dropdownItemsRef = useRef(null);
  const [dropdownIsActive, setDropdownIsActive] = useState(false);

  useEffect(() => {
    function handlePageClick(e) {
      // Clicking outside dropdown menu
      if (dropdownItemsRef.current && !dropdownItemsRef.current.contains(e.target)) {
        setDropdownIsActive(false);
      }
    }

    if (dropdownIsActive) {
      window.addEventListener('click', handlePageClick);
    }

    return () => {
      window.removeEventListener('click', handlePageClick);
    };
  }, [dropdownIsActive]);

  return (
    <div className={style.dropdownMenuContainer}>
      <button
        type='button'
        className={style.dropdownToggle}
        onClick={() => {
          setDropdownIsActive(!dropdownIsActive);
        }}
      >
        {user} ⮟
      </button>

      <div
        ref={dropdownItemsRef}
        className={`${style.dropdownContent} ${!dropdownIsActive ? style.inactive : ''}`}
      >
        <Link className={style.dropdownLink} to='/dashboard'>
          Dashboard
        </Link>
        <Link className={style.dropdownLink} to={`/profile/${user}`}>
          View my profile
        </Link>
        <CreateBlogPost />
        <button className={`${style.logoutBtn} ${style.dropdownLink}`} onClick={logout}>
          Log out
        </button>
      </div>
    </div>
  );
}

export default NavBar;
