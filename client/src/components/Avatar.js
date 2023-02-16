import React from 'react';
import style from '../styles/Avatar.module.scss';
import defaultAvatar from '../assets/avatar.png';

function Avatar({ src, alt, size = 'medium' }) {
  return (
    <img
      className={`${style.Avatar} ${style[size]}`}
      src={src ? src : defaultAvatar}
      alt={alt}
      onError={(e) => {
        e.target.src = defaultAvatar; // If error with the image src, set src to default avatar
        e.target.onError = null; // Avoid infinite loop in case defaultAvatar also caused error
      }}
    />
  );
}

export default Avatar;
