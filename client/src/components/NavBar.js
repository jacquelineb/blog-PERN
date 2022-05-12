import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import style from '../styles/NavBar.module.scss';

function NavBar({ isAuth, currUser, logOut }) {
  return (
    <nav className={style.nav}>
      <Link className={`${style.link} ${style.navHome}`} to='/'>
        HOME
      </Link>
      {isAuth ? (
        <DropdownMenu currUser={currUser} logOut={logOut} />
      ) : (
        <>
          <Link className={style.link} to='/login'>
            LOG IN
          </Link>
          <Link className={style.link} to='/signup'>
            SIGN UP
          </Link>
        </>
      )}
    </nav>
  );
}

function DropdownMenu({ currUser, logOut }) {
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
        className={style.dropdownToggle}
        type='button'
        onClick={() => {
          setDropdownIsActive(!dropdownIsActive);
        }}
      >
        {currUser} ▼
      </button>

      <div
        ref={dropdownItemsRef}
        className={`${style.dropdownContent} ${!dropdownIsActive ? style.inactive : ''}`}
      >
        <Link className={style.dropdownLink} to='/dashboard'>
          Dashboard
        </Link>
        <Link className={style.dropdownLink} to='#' onClick={logOut}>
          Log out
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
