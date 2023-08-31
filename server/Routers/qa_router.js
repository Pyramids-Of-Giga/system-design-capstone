const express = require("express");
const qaRouter = express.Router();
const { queryFuncObj, queryDb } = require("../Models/qa");

qaRouter.get("questions", (req, res) => {
  console.log('received request');

  const answers = queryDb(1, queryFuncObj.getDistinctQuestionIds)
    .then((res) => queryDb(res.rows, queryFuncObj.getAnswers))
      .then((res) => console.log('answers: ', res.rows))
      .catch((err) => console.log('error retrieving answers'))
    .catch((err) => console.log('error retrieving distinct question ids'))

  const questions = queryDb(1, queryFuncObj.getQuestions)
    .then((res) => console.log('questions: ', res.rows))
    .catch((err) => console.log('error retrieving questions'))

  console.log({questions, answers});

});

module.exports = qaRouter;