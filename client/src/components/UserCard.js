import React from 'react';
import Avatar from './Avatar';
import style from '../styles/UserCard.module.scss';

function UserCard({ username, bio, avatar, size = 'medium' }) {
  return (
    <div className={`${style.UserCard} ${style[size]}`}>
      <Avatar src={avatar} alt={`${username}'s avatar`} size={size} />
      <div>
        <div className={style.username}>{username}</div>
        <div className={style.bio}>{bio}</div>
      </div>
    </div>
  );
}

export default UserCard;
