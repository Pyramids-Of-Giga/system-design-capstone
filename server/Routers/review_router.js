const express = require("express");
const reviewsRouter = express.Router();

reviewsRouter.get("questions", (req, res) => {
  console.log('received request');
});

module.exports = reviewsRouter;