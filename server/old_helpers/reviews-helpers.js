const axios = require("axios");
const path = require("path");
const multer = require('multer');

require("dotenv").config();

const base_uri = "https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe";
axios.defaults.headers.common["Authorization"] = process.env.AUTH;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../client/dist/Images"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

const reviewsPoster = (data, photos) => {
  const uri = path.join(process.env.API_URI, 'reviews');
  const ph = photos.map((photo) => path.join("/Images", photo.filename));
  data.photos = ph;
  data.characteristics = JSON.parse(data.characteristics);
  data.product_id = JSON.parse(data.product_id);
  data.rating = JSON.parse(data.rating);
  data.recommend = JSON.parse(data.recommend);

  return axios.post(uri, data);
};

module.exports = {
  reviewsPoster,
  upload
}