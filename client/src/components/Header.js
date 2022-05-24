import React, { useState, useEffect } from 'react';
import style from '../styles/Header.module.scss';
import defaultAvatar from '../assets/avatar.png';

function Header() {
  const [biography, setBiography] = useState('');
  const [avatar, setAvatar] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const ADMIN = 'jab'; // I just hardcoded this b/c I'm the admin / only user

  useEffect(() => {
    async function getAdminInfo() {
      try {
        const response = await fetch(`http://localhost:5000/users/${ADMIN}`);
        const { bio, avatar } = await response.json();
        setBiography(bio);
        setAvatar(avatar);
        setIsLoading(false);
      } catch (error) {}
    }
    getAdminInfo();
  }, []);

  return (
    <header className={style.container}>
      <div className={style.background}></div>
      <div className={style.userCard}>
        {isLoading ? null : (
          <>
            <div className={style.avatarContainer}>
              <img
                className={style.avatar}
                src={avatar ? avatar : defaultAvatar}
                alt={`${ADMIN}'s avatar`}
              />
            </div>

            <p className={style.name}>{ADMIN}</p>
            <p className={style.bio}>{biography}</p>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
