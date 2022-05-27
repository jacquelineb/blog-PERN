async function uploadFileToS3Bucket(file) {
  try {
    const s3BucketUrl = await generateUploadUrl();
    const response = await fetch(s3BucketUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: file,
    });

    if (response.status === 200) {
      const urlToUploadedFile = s3BucketUrl.split('?')[0];
      return urlToUploadedFile;
    }
  } catch (error) {
    console.error(error);
  }
}

async function deleteFileFromS3Bucket(key) {
  try {
    const response = await fetch(`/api/storage/${key}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

async function generateUploadUrl() {
  const response = await fetch('/api/storage/uploadUrl', {
    method: 'GET',
    credentials: 'include',
  });
  const url = await response.json();
  return url;
}

export { uploadFileToS3Bucket, deleteFileFromS3Bucket };
