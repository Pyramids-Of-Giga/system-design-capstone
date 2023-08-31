const express = require("express");
const qaRouter = express.Router();
const { queryFuncObj, queryDb, queryQuestionsDb } = require("../Models/qa");
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
      const getAnswers = queryDb([productId], queryFuncObj.getDistinctQuestionIds)
        .then((data) => data.rows.map((obj) => obj.id))
        .then((data) => queryDb(data, queryFuncObj.getAnswers))
        .then((data) => answers = data.rows)
        .then(() => answers.map((obj) => formatTime(obj, 'date')))
        .then(() => answers.map((obj) => obj.id))
        .then((data) => queryDb(data, queryFuncObj.getAnswerPhotos))
        .then((data) => photos = data.rows)
        .catch((err) => console.log('error getting answers from db - ', err))

      // get questions async
      const getQuestions = queryQuestionsDb([productId], queryFuncObj.getQuestions, limit)
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

module.exports = qaRouter;
