import React from 'react';
import Avatar from '../Avatar';
import style from './UserCard.module.scss';
import { Link } from 'react-router-dom';

function UserCard({ username, bio, avatar, size = 'medium' }) {
  const PROFILE_LINK = `/profile/${username}`;
  return (
    <div className={`${style.UserCard} ${style[size]}`}>
      <Link to={PROFILE_LINK}>
        <Avatar src={avatar} alt={`${username}'s avatar`} size={size} />
      </Link>
      <div>
        <Link className={style.username} to={PROFILE_LINK}>
          {username}
        </Link>
        <div className={style.bio}>{bio}</div>
      </div>
    </div>
  );
}

export default UserCard;
