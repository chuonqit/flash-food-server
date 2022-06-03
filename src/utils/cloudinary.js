const cloudinary = require("cloudinary");

module.exports = async (base64) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(base64, {}, function (error, result) {
      if (error) reject(error);
      resolve(result.secure_url);
    });
  });
};
