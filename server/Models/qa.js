const client = require("../../databases/qa_db");

module.exports = {
  queryFuncObj: {
    getQuestions: (productId) => {
      return `SELECT id as question_id, question_body, question_date, asker_name, question_helpfulness, reported FROM questions WHERE product_id = ${productId} AND reported = false`
    },
    getAnswers: (questionId) => {
      return `SELECT * FROM answers WHERE question_id in (${questionId.join(',')}) AND reported = false`
    },
    getDistinctQuestionIds: (productId) => {
      return `SELECT DISTINCT id FROM questions WHERE product_id = ${productId}`
    }
  },

  queryDb: (id, query) => {
    client.query(`${query(id)}`)
      // .then((res) => console.log(res.rows))
      .catch((err) => console.log(err))
      .finally(() => client.end());
  },

  // getDistinctQuestionIds: (productId) => {
  //   client.query(`${queries.distinctQuestionIds(productId)}`)
  //     .then((res) => console.log(res.rows))
  //     .catch((err) => console.log(err))
  //     .finally(() => client.end());
  // },

  // getQuestions: (productId) => {
  //   console.log('hello');
  //   client.query(`${queries.questions(productId)}`)
  //     .then((res) => console.log(res.rows))
  //     .catch((err) => console.log(err))
  //     .finally(() => client.end());
  // },

  // getAnswers: (questionId) => {
  //   client.query(`${queries.answers(questionId)}`)
  //     .then((res) => console.log(res.rows))
  //     .catch((err) => console.log(err))
  //     .finally(() => client.end());
  // }
}

const getQuestionsAndAnswers = (productId) => {
  client.query(
  `WITH question_res as
  ( SELECT id as question_id, question_body, question_date, asker_name, question_helpfulness, reported FROM questions WHERE product_id = 1 AND reported = false ),

  distinctQuestionIds as
  ( SELECT DISTINCT question_id FROM question_res ),

  answer_res as
  ( SELECT * FROM answers WHERE question_id IN ( SELECT * FROM distinctQuestionIds) )

  SELECT question_res.question_id,
  ARRAY_AGG (
    CONCAT(
	  '{answer_id: ', answer_res.id,
	  ', body: ', answer_res.body,
      ', date: ', answer_res.date,
	  ', answerer_name: ', answer_res.body,
      ', helpfulness: ', answer_res.body,
	  '}'
    )
  ) answers
  FROM question_res
  INNER JOIN answer_res
  ON question_res.question_id = answer_res.question_id
  GROUP BY question_res.question_id;`)
    .then((res) => console.log(res.rows))
    .catch((err) => console.log(err))
    .finally(() => client.end());
}

// const queries = {
//   questions: (productId) => {
//     return `SELECT id as question_id, question_body, question_date, asker_name, question_helpfulness, reported FROM questions WHERE product_id = ${productId} AND reported = false`
//   },
//   answers: (questionId) => {
//     return `SELECT * FROM answers WHERE question_id in (${questionId.join(',')}) AND reported = false`
//   },
//   distinctQuestionIds: (productId) => {
//     return `SELECT DISTINCT id FROM questions WHERE product_id = ${productId}`
//   }
// }

// getDistinctQuestionIds(1);
// getQuestions(1);
// getAnswers([1,2]);
// getQuestionsAndAnswers(1);