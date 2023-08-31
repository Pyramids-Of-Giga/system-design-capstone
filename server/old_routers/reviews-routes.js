require('dotenv').config();
const path = require('path');
const express = require('express');
const axios = require('axios');

const utils = require("../helpers/reviews-helpers.js");

const reviewsRouter = express.Router();
axios.defaults.headers.common["Authorization"] = process.env.AUTH;

reviewsRouter.get('/:product_id/:sort/:count/:page', (req, res) => {
  axios.get(
    path.join(process.env.API_URI, 'reviews'),
    {
      params: {
        product_id: req.params.product_id,
        sort: req.params.sort || 'newest',
        count: req.params.count || 5,
        page: req.params.page || 1,
      },
    },
  )
    .then((product) => res.status(200).send(product.data))
    .catch((err) => res.status(400).send(err));
});

reviewsRouter.get('/meta/:product_id', (req, res) => {
  axios.get(
    path.join(process.env.API_URI, 'reviews/meta'),
    {
      params: {
        product_id: req.params.product_id,
      },
    },
  )
    .then((reviewsMeta) => res.status(200).send(reviewsMeta.data))
    .catch((err) => res.status(400).send(err));
});

reviewsRouter.post("/newreview",
  utils.upload.array('imageFiles'),
  (req, res) => {
    utils.reviewsPoster(req.body, req.files)
    .then((result) => res.status(200).send('Success.'))
    .catch((err) => res.status(400).send(err));
  }
);

reviewsRouter.put('/:review_id/helpful', (req, res) => {
  axios.put(
    path.join(process.env.API_URI, `reviews/${req.params.review_id}/helpful`),
  )
  .then((result) => res.status(200).send('Success.'))
  .catch((err) => res.status(400).send(err));
})

reviewsRouter.put('/:review_id/report', (req, res) => {
  axios.put(
    path.join(process.env.API_URI, `reviews/${req.params.review_id}/report`),
  )
  .then((result) => res.status(200).send('Success.'))
  .catch((err) => res.status(400).send(err));
})

module.exports = reviewsRouter;
