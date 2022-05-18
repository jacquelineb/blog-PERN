import React, { useEffect, useState } from 'react';
import { CreateBlogPost } from './BlogPostTransactions';
import defaultAvatar from '../assets/avatar.png';

function Dashboard({ user }) {
  const [biography, setBiography] = useState('');
  const [avatar, setAvatar] = useState('');
  const BIOGRAPHY_CHAR_LIMIT = 160;

  useEffect(() => {
    async function getUserData() {
      try {
        const response = await fetch(`http://localhost:5000/users/${user}`);
        const data = await response.json();
        if (data) {
          const { bio, avatar } = data;
          setBiography(bio);
          setAvatar(avatar);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getUserData();
  }, [user]);

  function handleBioChange(e) {
    if (e.target.value.length <= 160) {
      setBiography(e.target.value);
    }
  }

  async function handleSaveBio(e) {
    try {
      e.preventDefault();
      const response = await fetch(`http://localhost:5000/users/bio`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ bio: biography }),
      });

      if (response.status === 200) {
        // notify user that the biography was successfully updated
      }
    } catch (error) {
      console.error(error);
    }
  }

  function clickHiddenUploadBtn(e) {
    e.target.previousSibling.click();
  }

  function handleUpload(e) {
    // upload the image to some server
    // get the url of uploaded image
    // save url of image to user table
    // setAvatar(url of the uploaded image)
  }

  return (
    <>
      <h1>{`${user}'s Dashboard`}</h1>
      <CreateBlogPost />

      <div>
        <div>
          <img src={avatar ? avatar : defaultAvatar} alt={`${user}'s avatar`} />
        </div>
        <div>
          <input
            type='file'
            id='image'
            name='image'
            accept='image/jpeg, image/jpg, image/png, image/webp'
            onInput={handleUpload}
            hidden
            style={{ resize: 'none' }}
          />
          <button type='button' onClick={clickHiddenUploadBtn}>
            Change avatar
          </button>
        </div>
      </div>
      <div>
        <form onSubmit={handleSaveBio}>
          <div>Biography</div>
          <div>
            <textarea
              id='biography'
              name='biography'
              type='text'
              value={biography}
              onChange={handleBioChange}
            />
          </div>
          <p>{`Characters: ${biography.length} / ${BIOGRAPHY_CHAR_LIMIT}`}</p>
          <div>
            <button type='submit'>Save</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Dashboard;
