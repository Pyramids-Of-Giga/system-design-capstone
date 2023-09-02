const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const reviewsRouter = require('./server/Routers/review_router.js');


app.use(express.json());
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});
app.use('/reviews', reviewsRouter);


app.get('/', (req, res) => {
  res.send('Server is running')
});

app.listen(PORT, () => {
  console.log('Listening')
});