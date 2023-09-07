const path = require("path");
const express = require("express");
const app = express();
const axios = require("axios");
// const handlers = require('./Models/reviews.js');
// const reviewsRouter = require('./Routers/review_router.js');

// const serverdb = require('../databases/dbpgrnr.js');
// const productdb = require('../databases/products/products_db.js');

app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(express.json());
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// const productRouter = require("./Routers/product_router");
const qaRouter = require("./Routers/qa_router");

// app.use("/products", productRouter);
// app.use("/reviews", reviewsRouter);
app.use("/qa", qaRouter);

app.get(`/${process.env.LOADERIO_KEY}`, (req, res) => {
  res.send(`${process.env.LOADERIO_KEY}`);
});

// added port into .env
// const port = process.env.PORT || 5000;
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening at port http://localhost:${port}`);
});
