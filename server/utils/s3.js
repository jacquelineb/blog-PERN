if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const S3 = require('aws-sdk/clients/s3');
const { v4: uuidv4 } = require('uuid');

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4',
});

async function generateUploadURL() {
  try {
    const imageName = uuidv4();
    const params = {
      Bucket: bucketName,
      Key: imageName,
      Expires: 60,
    };

    const uploadURL = await s3.getSignedUrlPromise('putObject', params);
    return uploadURL;
  } catch (error) {
    console.error(error);
  }
}

async function deleteObject(key) {
  try {
    const params = {
      Bucket: bucketName,
      Key: key,
    };

    return await s3.deleteObject(params).promise();
  } catch (error) {
    console.error(error);
  }
}

exports.generateUploadURL = generateUploadURL;
exports.deleteObject = deleteObject;
