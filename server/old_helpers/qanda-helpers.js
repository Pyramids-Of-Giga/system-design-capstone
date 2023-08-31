const axios = require("axios");
const path = require("path");

require("dotenv").config();

const base_uri = "https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe";
axios.defaults.headers.common["Authorization"] = process.env.AUTH;

//  coded for product_id=37324 via App.tsx
const questionsFetcher = (productId) => {
  const uri = `${base_uri}/qa/questions/?product_id=${productId}&page=1&count=100`;
  return axios.get(uri);
};

const answersFetcher = (questionId) => {
  const uri = `${base_uri}/qa/questions/${questionId}/answers?page=1&count=100`;
  return axios.get(uri);
};

const questionsPoster = (data) => {
  const uri = `${base_uri}/qa/questions/`;
  return axios.post(uri, data);
};

const answersPoster = (questionId, data, photos) => {
  const ph = photos.map((photo) => path.join("/Images", photo.filename));
  const uri = `${base_uri}/qa/questions/${questionId}/answers`;
  return axios.post(uri, { ...data, photos: ph });
};

const markQuestionHelpful = (questionId) => {
  const uri = `${base_uri}/qa/questions/${questionId}/helpful`;
  return axios.put(uri);
};

const markAnswerHelpful = (answerId) => {
  const uri = `${base_uri}/qa/answers/${answerId}/helpful`;
  return axios.put(uri);
};

const reportQuestion = (questionId) => {
  const uri = `${base_uri}/qa/questions/${questionId}/report`;
  return axios.put(uri);
};

const reportAnswer = (answerId) => {
  const uri = `${base_uri}/qa/answers/${answerId}/report`;
  return axios.put(uri);
};

module.exports = {
  questionsFetcher,
  answersFetcher,
  questionsPoster,
  answersPoster,
  markQuestionHelpful,
  markAnswerHelpful,
  reportQuestion,
  reportAnswer,
};
