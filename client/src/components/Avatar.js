import React from 'react';
import style from '../styles/Avatar.module.scss';
import defaultAvatar from '../assets/avatar.png';

function Avatar({ src, alt, size = 'medium' }) {
  return (
    <img
      className={`${style.Avatar} ${style[size]}`}
      src={src ? src : defaultAvatar}
      alt={alt}
    />
  );
}

export default Avatar;
