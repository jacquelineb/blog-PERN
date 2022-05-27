import React, { useEffect, useState, useRef } from 'react';
import { uploadFileToS3Bucket, deleteFileFromS3Bucket } from '../utils/index';
import defaultAvatar from '../assets/avatar.png';
import style from '../styles/EditUserDetails.module.scss';

function EditUserDetails({ user }) {
  const BIOGRAPHY_CHAR_LIMIT = 160;
  const originalUserData = useRef({});
  const [avatar, setAvatar] = useState('');
  const [biography, setBiography] = useState('');
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getUserData() {
      try {
        const response = await fetch(`/api/users/${user}`);
        const data = await response.json();
        if (data) {
          const { bio, avatar } = data;
          setBiography(bio);
          setAvatar(avatar);
          originalUserData.current = { bio, avatar };
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    getUserData();
  }, [user]);

  useEffect(() => {
    setAvatar(
      selectedImageFile
        ? URL.createObjectURL(selectedImageFile)
        : originalUserData.current.avatar
    );
  }, [selectedImageFile]);

  async function updateBiography() {
    try {
      await fetch(`/api/users/bio`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ bio: biography }),
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function updateAvatarUrl(url) {
    try {
      await fetch('/api/users/avatar', {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ avatar: url }),
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSave(e) {
    try {
      e.preventDefault();
      const promises = [];
      if (avatar !== originalUserData.current.avatar) {
        const urlToUploadedImage = await uploadFileToS3Bucket(selectedImageFile);
        if (urlToUploadedImage) {
          promises.push(updateAvatarUrl(urlToUploadedImage));
          promises.push(
            // Delete the old avatar from storage
            deleteFileFromS3Bucket(originalUserData.current.avatar.split('/').pop())
          );
        }
      }

      if (biography !== originalUserData.current.bio) {
        promises.push(updateBiography());
      }

      if (promises.length) {
        Promise.all(promises).then(() => window.location.reload());
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={style.EditUserDetailsContainer}>
      {isLoading ? null : (
        <form onSubmit={handleSave}>
          <div className={style.avatarChange}>
            <div>
              <img
                className={style.avatar}
                src={avatar}
                alt={`${user}'s avatar`}
                onError={(e) => {
                  e.target.src = defaultAvatar;
                  e.target.onError = null; // Avoid infinite loop in case defaultAvatar also caused error
                }}
              />
            </div>
            <input
              type='file'
              id='upload'
              name='upload'
              accept='image/jpeg, image/jpg, image/png, image/webp'
              onChange={(e) => {
                if (e.target.files[0].size <= 300000) {
                  setSelectedImageFile(e.target.files[0]);
                } else {
                  alert('File size is too big! (Limit 300kb)');
                }
              }}
              hidden
            />

            <button
              type='button'
              onClick={() => {
                document.getElementById('upload').click();
              }}
            >
              Change avatar
            </button>

            <button
              type='button'
              disabled={avatar === originalUserData.current.avatar}
              onClick={() => {
                setSelectedImageFile(null);
              }}
            >
              Reset
            </button>
            <p>Image dimensions of 184px by 184px is recommended.</p>
          </div>

          <div>
            <label htmlFor='biography'>Biography</label>
            <textarea
              className={style.biographyInput}
              id='biography'
              name='biography'
              type='text'
              maxLength={BIOGRAPHY_CHAR_LIMIT}
              value={biography}
              onChange={(e) => {
                setBiography(e.target.value);
              }}
            />
            <p
              className={style.characterLimit}
            >{`Characters: ${biography.length} / ${BIOGRAPHY_CHAR_LIMIT}`}</p>
          </div>

          <button className={style.submitButton} type='submit' id='save'>
            Save
          </button>
        </form>
      )}
    </div>
  );
}

export default EditUserDetails;
