import React, { useState, useEffect } from 'react';
import { getUserDetails } from '../api/users';
import defaultAvatar from '../assets/avatar.png';
import style from '../styles/Header.module.scss';

function Header() {
  const [biography, setBiography] = useState('');
  const [avatar, setAvatar] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const ADMIN = 'jab'; // I just hardcoded this b/c I'm the admin / only user

  useEffect(() => {
    async function getAdminInfo() {
      try {
        const response = await getUserDetails(ADMIN);
        const { bio, avatar } = await response.json();
        setBiography(bio);
        setAvatar(avatar);
        setIsLoading(false);
      } catch (error) {}
    }
    getAdminInfo();
  }, []);

  return (
    <header className={style.Header}>
      <div className={style.background}></div>
      <div className={style.descriptionContainer}>
        {isLoading ? null : (
          <div className={style.userCard}>
            <img
              className={style.avatar}
              src={avatar ? avatar : defaultAvatar}
              alt={`${ADMIN}'s avatar`}
            />
            <p className={style.name}>{ADMIN}</p>
            <p className={style.bio}>{biography}</p>
          </div>
        )}
        <h1 className={style.title}>Untitled Blog</h1>
      </div>
    </header>
  );
}

export default Header;
