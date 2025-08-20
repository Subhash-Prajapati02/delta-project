// cloudinary/index.js
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("@fluidjs/multer-cloudinary");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Set up storage for multer
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "wanderlust_DEV",
    allowedFormats: ["png", "jpg", "jpeg"], // allowed file formats
  },
});

module.exports = {
  cloudinary,
  storage,
};
