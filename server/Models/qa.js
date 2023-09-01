const client = require("../../databases/qa_db");

module.exports = {
  queryFuncObj: {
    getQuestions: (productId, limit = 5) => {
      return `SELECT id as question_id, question_body, question_date, asker_name, question_helpfulness, reported FROM questions WHERE product_id in (${productId.join(',')}) AND reported = false LIMIT ${limit};`
    },
    getAnswers: (questionId, limit = null) => {
      let limitClause = "";
      if (limit !== null) {
        limitClause = `LIMIT ${limit}`;
      }
      return `SELECT id, question_id, body, date, answerer_name, helpfulness FROM answers WHERE question_id in (${questionId.join(',')}) AND reported = false ${limitClause};`
    },
    getAnswerPhotos: (answerId) => {
      return `SELECT * FROM photos WHERE answer_id in (${answerId.join(',')});`
    },
    getDistinctQuestionIds: (productId) => {
      return `SELECT DISTINCT id FROM questions WHERE product_id = (${productId.join(',')});`
    },
    insertQuestion: (product_id, body, date, email, name, helpfulness, reported) => {
      const queryText = `
        INSERT INTO questions(product_id, question_body, question_date, email, asker_name, question_helpfulness, reported)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `;
      const queryParams = [product_id, body, date, email, name, helpfulness, reported];

      return {
        text: queryText,
        values: queryParams,
      };
    }
  },

  queryDb: (...args) => {
    const [queryName, ...restArgs] = args;
    return client.query(queryName(...restArgs))
      .catch((err) => console.log(err));
  },

  // getDistinctQuestionIds: (productId) => {
  //   client.query(`${queries.distinctQuestionIds(productId)}`)
  //     .then((res) => console.log(res.rows))
  //     .catch((err) => console.log(err))
  //     .finally(() => client.end());
  // },
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