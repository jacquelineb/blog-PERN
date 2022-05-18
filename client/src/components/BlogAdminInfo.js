import React, { useState, useEffect } from 'react';
import defaultAvatar from '../assets/avatar.png';

function BlogAdminInfo() {
  const [biography, setBiography] = useState('');
  const [avatar, setAvatar] = useState('');
  const ADMIN = 'jab'; // I just hardcoded this b/c I'm the admin / only user
  useEffect(() => {
    async function getAdminInfo() {
      try {
        const response = await fetch(`http://localhost:5000/users/${ADMIN}`);
        const { bio, avatar } = await response.json();
        setBiography(bio);
        setAvatar(avatar);
      } catch (error) {}
    }
    getAdminInfo();
  }, []);

  return (
    <div>
      <p>{ADMIN}</p>
      <div>
        <img src={avatar ? avatar : defaultAvatar} alt={`${ADMIN}'s avatar`} />
      </div>
      <div>
        <p>{biography}</p>
      </div>
    </div>
  );
}

export default BlogAdminInfo;
