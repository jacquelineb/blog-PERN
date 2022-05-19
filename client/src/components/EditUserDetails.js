import React, { useEffect, useState, useRef } from 'react';
import { uploadFileToS3Bucket, deleteFileFromS3Bucket } from '../utils/index';
import defaultAvatar from '../assets/avatar.png';

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
        const response = await fetch(`http://localhost:5000/users/${user}`);
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
      await fetch(`http://localhost:5000/users/bio`, {
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
      await fetch('http://localhost:5000/users/avatar', {
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
      let changesMade = false;
      if (avatar !== originalUserData.current.avatar) {
        const urlToUploadedImage = await uploadFileToS3Bucket(selectedImageFile);
        if (urlToUploadedImage) {
          await updateAvatarUrl(urlToUploadedImage);
          await deleteFileFromS3Bucket(originalUserData.current.avatar.split('/').pop()); // Delete the old avatar from storage
        }
        changesMade = true;
      }
      if (biography !== originalUserData.current.bio) {
        await updateBiography();
        changesMade = true;
      }

      if (changesMade) {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      {isLoading ? null : (
        <div>
          <div>
            <div>
              <img
                src={avatar}
                alt={`${user}'s avatar`}
                onError={(e) => {
                  e.target.src = defaultAvatar;
                  e.target.onError = null; // Avoid infinite loop in case defaultAvatar also caused error
                }}
              />
            </div>
          </div>

          <div>
            <form onSubmit={handleSave}>
              <div>
                <input
                  type='file'
                  id='upload'
                  name='upload'
                  accept='image/jpeg, image/jpg, image/png, image/webp'
                  onChange={(e) => {
                    setSelectedImageFile(e.target.files[0]);
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
              </div>

              <div>
                <div>Biography</div>
                <textarea
                  id='biography'
                  name='biography'
                  type='text'
                  maxLength={BIOGRAPHY_CHAR_LIMIT}
                  value={biography}
                  onChange={(e) => {
                    setBiography(e.target.value);
                  }}
                />
                <p>{`Characters: ${biography.length} / ${BIOGRAPHY_CHAR_LIMIT}`}</p>
              </div>

              <div>
                <button type='submit' id='save'>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default EditUserDetails;
