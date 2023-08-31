const express = require("express");
const productRouter = express.Router();

productRouter.get("questions", (req, res) => {
  console.log('received request');
});

module.exports = productRouter;