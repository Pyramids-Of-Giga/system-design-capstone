// require('dotenv').config();
// const path = require('path');
// const express = require('express');
// const axios = require('axios');

// const cartRouter = express.Router();
// axios.defaults.headers.common["Authorization"] = process.env.AUTH;

// // get cart
// cartRouter.get('/', (req, res) => {
//   axios.get(path.join(process.env.API_URI, 'cart'))
//     .then((result) => { console.log(result.data) })
//     .catch((err) => res.status(400).send(err))
// });

// // add to cart
// cartRouter.post('/', (req, res) => {
//   axios.post(path.join(process.env.API_URI, 'cart'), req.body)
//     .then(() => { res.status(201).send() })
//     .catch((err) => res.status(400).send(err));
// });

// module.exports = cartRouter;
