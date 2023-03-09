import React, { useEffect, useState, useRef } from 'react';
import { useAuthContext } from '../../../../context/AuthContext';
import { uploadFileToS3Bucket, deleteFileFromS3Bucket } from '../../../../services/storage';
import { getUserDetails, updateUserBiography, updateUserAvatar } from '../../api/users';
import convertObjectUrlToFile from '../../../../utils/convertObjectUrlToFile';
import Avatar from '../Avatar';
import ImageCropper from '../../../../components/ImageCropper';
import Modal from '../../../../components/Modal';
import style from './ProfileEditor.module.scss';

const BIOGRAPHY_CHAR_LIMIT = 160;

function ProfileEditor() {
  const { authUser } = useAuthContext();
  const originalUserData = useRef({});
  const [avatar, setAvatar] = useState('');
  const [biography, setBiography] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showImageCropper, setShowImageCropper] = useState(false);
  const uploadedImage = useRef(null);

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

  async function handleSave(e) {
    e.preventDefault();
    try {
      const promises = [];
      if (avatar !== originalUserData.current.avatar) {
        const croppedImageFile = await convertObjectUrlToFile(avatar);
        URL.revokeObjectURL(avatar);
        const urlToUploadedImage = await uploadFileToS3Bucket(croppedImageFile);
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

  if (isLoading) {
    return null;
  }

  return (
    <div className={style.ProfileEditor}>
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
                if (e.target.files[0].size <= 1000000) {
                  uploadedImage.current = e.target.files[0];
                  setShowImageCropper(true);
                } else {
                  alert('File size is too big! (Limit 1MB)');
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
                setAvatar(originalUserData.current.avatar);
                URL.revokeObjectURL(uploadedImage.current);
                uploadedImage.current = null;
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

      <Modal
        active={showImageCropper}
        handleClose={() => {
          URL.revokeObjectURL(uploadedImage.current);
          uploadedImage.current = null;
          setShowImageCropper(false);
        }}
        title=''
        content={
          <ImageCropper
            image={uploadedImage.current && URL.createObjectURL(uploadedImage.current)}
            onApply={(croppedImg) => {
              setAvatar(croppedImg);
              setShowImageCropper(false);
            }}
          />
        }
      />
    </div>
  );
}

export default ProfileEditor;
