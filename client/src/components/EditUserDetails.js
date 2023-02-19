import React, { useEffect, useState, useRef } from 'react';
import { useAuthContext } from '../context/AuthContext.js';
import { uploadFileToS3Bucket, deleteFileFromS3Bucket } from '../api/storage.js';
import { getUserDetails, updateUserBiography, updateUserAvatar } from '../api/users.js';
import Avatar from './Avatar.js';
import style from '../styles/EditUserDetails.module.scss';

const BIOGRAPHY_CHAR_LIMIT = 160;

function EditUserDetails() {
  const { authUser } = useAuthContext();
  const originalUserData = useRef({});
  const [avatar, setAvatar] = useState('');
  const [biography, setBiography] = useState('');
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getUserData() {
      try {
        const userData = await getUserDetails(authUser);
        if (userData) {
          setBiography(userData.bio);
          setAvatar(userData.avatar);
          originalUserData.current = { bio: userData.bio, avatar: userData.avatar };
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    getUserData();
  }, [authUser]);

  useEffect(() => {
    if (selectedImageFile) {
      setAvatar(URL.createObjectURL(selectedImageFile));
    } else {
      setAvatar(originalUserData.current.avatar);
    }
  }, [selectedImageFile]);

  async function handleSave(e) {
    e.preventDefault();
    try {
      const promises = [];
      if (avatar !== originalUserData.current.avatar) {
        const urlToUploadedImage = await uploadFileToS3Bucket(selectedImageFile);
        if (urlToUploadedImage) {
          promises.push(updateUserAvatar(urlToUploadedImage));
          promises.push(
            // Delete the old avatar from storage
            deleteFileFromS3Bucket(originalUserData.current.avatar.split('/').pop())
          );
        }
      }

      if (biography !== originalUserData.current.bio) {
        promises.push(updateUserBiography(biography));
      }

      if (promises.length) {
        Promise.all(promises).then(() => window.location.reload());
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={style.EditUserDetails}>
      {isLoading ? null : (
        <form onSubmit={handleSave}>
          <div className={style.avatarChange}>
            <Avatar src={avatar} alt={`${authUser}'s avatar`} size='large' />
            <div>
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
                  URL.revokeObjectURL(avatar);
                  setSelectedImageFile(null);
                }}
              >
                Reset
              </button>
            </div>
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
