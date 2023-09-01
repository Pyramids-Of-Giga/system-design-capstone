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
    .then((data) => res.status(200).send(data));
});

qaRouter.get("/questions/:question_id/answers", (req, res) => {
  let { page = 1, count = 5} = req.query;
  let { question_id } = req.params;
  // is there a better way to convert from string to number? JSON.parse?
  page = Number(page);
  count = Number(count);
  const limit = page * count;
  let answers;
  let photos;
  // queryDbLimit([question_id], queryFuncObj.getAnswersOnly, limit) // old
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
  console.log({product_id, body, date, email, name, helpfulness, reported})
  queryDb(queryFuncObj.insertQuestion, product_id, body, date, email, name, helpfulness, reported, )
    .then((data) => res.status(200).send('Successfully stored question.'))
    .catch((err) => res.status(400).send(err))
});

qaRouter.post("questions/:question_id/answers", (req, res) => {

});

qaRouter.put("questions/:question_id/helpful", (req, res) => {

});

qaRouter.put("questions/:question_id/report", (req, res) => {

});

qaRouter.put("answers/:answer_id/helpful", (req, res) => {

});

qaRouter.put("answers/:answer_id/report", (req, res) => {

});

module.exports = qaRouter;
