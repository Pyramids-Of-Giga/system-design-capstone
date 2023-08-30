const path = require("path");
const express = require("express");
const app = express();
const axios = require("axios");
<<<<<<< HEAD
const serverdb = require('./databases/dbpgrnr.js');
=======
const client = require('./database/qa_postgres');

>>>>>>> 909d83a (trying to implement ETL)

app.use(express.static(path.join(__dirname, "./client/dist")));
app.use(express.json());

// routers
const QuestionAndAnswersRoutes = require("./server/Routers/qanda-routes");
const productRouter = require("./server/Routers/products-routes");
const reviewsRouter = require("./server/Routers/reviews-routes");
const cartRouter = require("./server/Routers/cart-routes");

// routes
app.use("/qa", QuestionAndAnswersRoutes);
app.use("/products", productRouter);
app.use("/reviews", reviewsRouter);
app.use("/cart", cartRouter);

// chatgpt test
app.post("/customerservice", (req, res) => {
  const systemMessage = {
    role: "system",
    content:
      "Explain like an ecommerce customer service bot. Respond in only 1-2 sentences.",
  };
  const messages = [systemMessage, ...req.body];

  axios
    .post(
      "https://api.openai.com/v1/chat/completions",
      JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: messages,
      }),
      {
        headers: {
          Authorization: `Bearer ${process.env.CHATGPT_API}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((results) => res.send(results.data))
    .catch((err) => console.log("fail", err));
});

// added port into .env
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening at port http://localhost:${port}`);
});
