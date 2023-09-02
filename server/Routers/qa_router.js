const express = require("express");
const qaRouter = express.Router();
const { queryFuncObj, queryDb } = require("../Models/qa");
const { formatTime, filterArray, nestObj } = require("../helpers/qa_helpers");

qaRouter.get("/questions", (req, res) => {
  let { productId = 1, page = 1, count = 5} = req.query;
  // is there a better way to convert from string to number? JSON.parse?
  productId = Number(productId);
  page = Number(page);
  count = Number(count);
  const limit = page * count;
  let questions;
  let answers;
  let photos;

  // Product ID => Question ID(s) => Answer ID(s) => Photos
  let getParallelQueries = () => {
    return new Promise((resolve, reject) => {
      const getAnswers = queryDb(queryFuncObj.getDistinctQuestionIds, [productId])
        .then((data) => data.rows.map((obj) => obj.id))
        .then((data) => queryDb(queryFuncObj.getAnswers, data))
        .then((data) => answers = data.rows)
        .then(() => answers.map((obj) => formatTime(obj, 'date')))
        .then(() => answers.map((obj) => obj.id))
        .then((data) => queryDb(queryFuncObj.getAnswerPhotos, data))
        .then((data) => {
          if (data === undefined) {
            photos = [];
          } else {
            photos = data.rows;
          }
        })
        .catch((err) => console.log('error getting answers from db - ', err))

      // get questions async
      const getQuestions = queryDb(queryFuncObj.getQuestions, [productId], limit)
        .then((data) => questions = data.rows)
        .then(() => questions.map((obj) => formatTime(obj, 'question_date')))
        .catch((err) => console.log('error getting questions from db'));

      Promise.all([getAnswers, getQuestions])
        .then(() => resolve(questions, answers, photos))
        .catch((err) => reject(err));
    });
  }

  getParallelQueries()
    // .then(() => console.log({questions, answers, photos}))
    .then(() => nestObj(answers, photos, 'id', 'answer_id', 'photos'))
    .then((data) => nestObj(questions, data, 'question_id', 'question_id', 'answers'))
    .then((data) => {
      return filterArray(data, page, count)
    })
    .then((data) => {
      return (
        {
          product_id: productId.toString(),
          results: data
        }
      )
    })
    .then((data) => res.status(200).send(data))
});

qaRouter.get("/questions/:question_id/answers", (req, res) => {
  let { page = 1, count = 5} = req.query;
  let { question_id } = req.params;
  page = Number(page);
  count = Number(count);
  const limit = page * count;
  let answers;
  let photos;
  queryDb(queryFuncObj.getAnswers, [question_id], limit)
    .then((data) => answers = data.rows)
    .then(() => answers.map((obj) => formatTime(obj, 'date')))
    .then(() => answers.map((obj) => obj.id))
    .then((data) => queryDb(queryFuncObj.getAnswerPhotos, data))
    .then((data) => {
      if (data === undefined) {
        photos = [];
      } else {
        photos = data.rows;
      }
    })
    .then(() => nestObj(answers, photos, 'id', 'answer_id', 'photos'))
    .then((data) => {
      return filterArray(data, page, count)
    })
    .then((data) => {
      return (
        {
          question: question_id.toString(),
          page: page,
          count: count,
          results: data
        }
      )
    })
    .then((data) => res.status(200).send(data))
    .catch((err) => console.log('error getting answers from db - ', err))

});

qaRouter.post("/questions", (req, res) => {
  const { body, name, email, product_id } = req.body;
  const helpfulness = 0;
  const reported = false;
  const date = new Date().getTime();
  queryDb(queryFuncObj.insertQuestion, product_id, body, date, email, name, helpfulness, reported)
    .then((data) => res.status(200).send('Successfully stored question.'))
    .catch((err) => res.status(400).send(err))
  });

// come back to this to refactor without setTimeout
qaRouter.post("/questions/:question_id/answers", (req, res) => {
  const { body, name, email, photos } = req.body;
  let { question_id } = req.params;
  question_id = Number(question_id);
  const helpfulness = 0;
  const reported = false;
  const date = new Date().getTime();
  queryDb(queryFuncObj.insertAnswer, question_id, body, date, name, email, reported, helpfulness)
    .then((data) => {
      if (photos.length === 0) {
        return;
      }
      for (var i = 0; i < photos.length; i++) {
        // console.log(data.rows[0].id);
        // console.log('photos at i:', photos);
        // console.log('what i pass to query: ', photos[i].url);
        setTimeOut(insertPhoto, 100);
        queryDb(queryFuncObj.insertPhotos, data.rows[0].id, photos[i].url)
      }
    })
    .then(() => res.status(200).send('Successfully stored answer.'))
    .catch((err) => res.status(400).send(err))
});

qaRouter.put("/questions/:question_id/helpful", (req, res) => {
  const { question_id } = req.params;
  queryDb(queryFuncObj.updateHelpfulness, 'questions', 'question_helpfulness', 'id', question_id)
    .then(() => res.status(200).send('Successfully updated helpfulness.'))
    .catch((err) => res.status(400).send(err))
});

qaRouter.put("/questions/:question_id/report", (req, res) => {
  const { question_id } = req.params;
  // console.log(question_id);
  // console.log(queryFuncObj.updateReport('questions', 'id', question_id));
  queryDb(queryFuncObj.updateReport, 'questions', 'id', question_id)
    .then(() => res.status(200).send('Successfully reported.'))
    .catch((err) => res.status(400).send(err))
});

qaRouter.put("/answers/:answer_id/helpful", (req, res) => {
  const { answer_id } = req.params;
  queryDb(queryFuncObj.updateHelpfulness, 'answers', 'helpfulness', 'id', answer_id)
    .then(() => res.status(200).send('Successfully updated helpfulness.'))
    .catch((err) => res.status(400).send(err))
  });

qaRouter.put("/answers/:answer_id/report", (req, res) => {
  const { answer_id } = req.params;
  queryDb(queryFuncObj.updateReport, 'answers', 'id', answer_id)
    .then(() => res.status(200).send('Successfully reported.'))
    .catch((err) => res.status(400).send(err))
});

module.exports = qaRouter;
