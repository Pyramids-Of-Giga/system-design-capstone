const { getReviews, getMeta, postReview, updateHelpfulness, toggleReportStatus, toggleRecommendStatus } = require('../Models/reviews.js');
const express = require('express');
const reviewsRouter = express.Router();

reviewsRouter.get('/:product_id/:sort/:count/:page', (req, res) => {
  const { product_id, sort, count, page } = req.params;


  const numericCount = parseInt(count, 10) || 5;
  const numericPage = parseInt(page, 10) || 1;
  const offset = (numericPage - 1) * numericCount;

  getReviews(product_id, sort || 'newest', numericCount, offset)
  .then((reviews) => {
      const rRows = reviews.rows;
      const output = {
        product: String(product_id),
        page: numericPage,
        count: numericCount,
        results: reviews.rows.map(rev => {
          var revdate = new Date(parseInt(rev.date));
          return {
            review_id: rev.review_id,
            rating: parseInt(rev.rating),
            summary: rev.summary,
            response: rev.response,
            body: rev.body,
            date: revdate.toISOString(),
            reviewer_name: rev.reviewer_name,
            helpfulness: parseInt(rev.helpfulness),
            photos: rev.photos[0].id ? rev.photos : []
          }
        })
      }
      res.json(output)
  })
  .catch((err) => {
      console.error(err);
      res.status(500).send('Error fetching reviews.');
  });
});

reviewsRouter.get('/meta/:product_id', (req, res) => {
  const { product_id } = req.params;
  getMeta(product_id)
    .then((metaData) => {
      var ratingsMeta =
      {
        product_id: String(product_id),
        ratings: metaData.rows[0].ratings,
        recommended: metaData.rows[0].recommended,
        characteristics: metaData.rows[0].characteristics,
      }

      res.json(ratingsMeta)
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error fetching meta data');
  });
});

reviewsRouter.post('/newreview', (req, res) => {
  const { product_id, rating, summary, body, recommend, reviewer_name, reviewer_email, photos, characteristics} = req.body;
  postReview(product_id, rating, summary, body, recommend, reviewer_name, reviewer_email, photos, characteristics)
  .then(() => {
    res.status(201).send('Review added successfully');
  })
  .catch(err => {
    console.error(err);
    res.status(500).send('Error adding review');
  });
});

reviewsRouter.put('/:review_id/helpful', (req, res) => {
  const { review_id } = req.params;
  updateHelpfulness(review_id)
  .then(() => {
    res.status(200).send('Helpfulness added');
  })
  .catch(err => {
    console.error(err);
    res.status(500).send('Error updating helpfulness');
  });
});

reviewsRouter.put('/:review_id/report', (req, res) => {
  const { review_id } = req.params;
  toggleReportStatus(review_id)
    .then(() => {
      res.status(200).send('Report status toggled successfully');
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error toggling report status');
    });
});

reviewsRouter.put('/:review_id/recommend', (req, res) => {
  const { recommend } = req.params;
  toggleRecommendStatus(recommend)
    .then(() => {
      res.status(200).send('Report status toggled successfully');
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error toggling report status');
    });
});

module.exports = reviewsRouter;

