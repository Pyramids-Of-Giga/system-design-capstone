const client = require("../../databases/qa_db");

const queries = {
  questions: (productId) => {
    return `SELECT id as question_id, question_body, question_date, asker_name, question_helpfulness, reported FROM questions WHERE product_id = ${productId} AND reported = false`
  },
  answers: (questionId) => {
    return `SELECT * FROM answers WHERE question_id in (${questionId.join(',')}) AND reported = false`
  },
}

const getDistinctQuestionIds = (productId) => {
  client.query(`SELECT DISTINCT id FROM questions WHERE product_id = ${productId}`)
    .then((res) => console.log(res.rows))
    .catch((err) => console.log(err))
    .finally(() => client.end());
}

const getQuestions = (productId) => {
  client.query(`${queries.questions(productId)}`)
    .then((res) => console.log(res.rows))
    .catch((err) => console.log(err))
    .finally(() => client.end());
}

const getAnswers = (questionId) => {
  client.query(`${queries.answers(questionId)}`)
    .then((res) => console.log(res.rows))
    .catch((err) => console.log(err))
    .finally(() => client.end());
}

const getQuestionsAndAnswers = (productId) => {
  client.query(
  `WITH question_res as
  (  SELECT id as question_id,question_body,question_date, asker_name,question_helpfulness,reported
      FROM questions
      WHERE product_id = ${productId}
      AND reported = false
  )

  WITH answer_res as
  (

  )
  `)
    .then((res) => console.log(res.rows))
    .catch((err) => console.log(err))
    .finally(() => client.end());
}

// getDistinctQuestionIds(1);
// getQuestions(1);
getAnswers([1,2]);
// getQuestionsAndAnswers(1);