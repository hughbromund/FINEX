const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require("path");
const config = require(path.resolve(__dirname, "../config.json"));

const s3 = new aws.S3({
  accessKeyId: config.s3Bucket.accessKeyId,
  secretAccessKey: config.s3Bucket.secretAccessKey,
  region: config.s3Bucket.region
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(new Error('Invalid Mime Type, only PNG'), false);
  }
}

const upload = multer({
  fileFilter,
  storage: multerS3({
    s3,
    bucket: config.s3Bucket.name,
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: 'TESTING_META_DATA!' });
    },
    key: function (req, file, cb) {
      cb(null, req.user.username)
    }
  })
})

module.exports = upload;