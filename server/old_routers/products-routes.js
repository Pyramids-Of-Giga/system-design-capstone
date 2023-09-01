// require('dotenv').config();
// const path = require('path');
// const express = require('express');
// const axios = require('axios');

// const productRouter = express.Router();
// axios.defaults.headers.common["Authorization"] = process.env.AUTH;
// // get all products - specify count to absurd number - useful for product search feature (extra)
// productRouter.get('/', (req, res) => {
//   axios.get(
//     // add the base api url to .env for this to work
//     path.join(process.env.API_URI, 'products'),
//     {
//       params: {
//         count: 9999,
//       },
//     },
//   )
//     .then((products) => res.status(200).send(products.data))
//     .catch((err) => res.status(400).send(err));
// });

// // get one product
// productRouter.get('/:product_id', (req, res) => {
//   axios.get(
//     path.join(process.env.API_URI, 'products', req.params.product_id),
//   )
//     .then((product) => res.status(200).send(product.data))
//     .catch((err) => res.status(400).send(err));
// });

// // get product styles
// productRouter.get('/:product_id/styles', (req, res) => {
//   axios.get(
//     path.join(process.env.API_URI, 'products', req.params.product_id, 'styles'),
//   )
//     .then((styles) => res.status(200).send(styles.data))
//     .catch((err) => res.status(400).send(err));
// });

// // get related products
// productRouter.get('/:product_id/related', (req, res) => {
//   axios.get(
//     path.join(process.env.API_URI, 'products', req.params.product_id, 'related'),
//   )
//     .then((related) => res.status(200).send(related.data))
//     .catch((err) => res.status(400).send(err));
// });

// module.exports = productRouter;
