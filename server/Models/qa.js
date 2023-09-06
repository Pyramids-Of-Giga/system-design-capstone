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
    },
    insertAnswer: (question_id, body, date, name, email, helpfulness, reported) => {
      const queryText = `
        INSERT INTO answers(question_id, body, date, answerer_name, email, reported, helpfulness)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id;
      `;
      const queryParams = [question_id, body, date, name, email, helpfulness, reported];

      return {
        text: queryText,
        values: queryParams,
      };
    },
    insertPhotos: (answer_id, url) => {
      const queryText = `
        INSERT INTO photos(answer_id, url)
        VALUES ($1, $2);
      `;
      const queryParams = [answer_id, url];

      return {
        text: queryText,
        values: queryParams,
      };
    },
    updateHelpfulness: (table, column_name, id_name, id_value) => {
      const where_clause = `${id_name} = ${id_value}`;
      return `UPDATE ${table} SET ${column_name} = ${column_name} + 1 WHERE ${where_clause}`
    },
    updateReport: (table, id_name, id_value) => {
      const where_clause = `${id_name} = ${id_value}`;
      return `UPDATE ${table} SET reported = TRUE WHERE ${where_clause};`
    },
    seedQuery: (table, columns, filePath) => {
      return `COPY ${table} (${columns.join(',')})
      FROM '${filePath}' WITH DELIMITER ',' CSV HEADER;`
    },
    createTablesQuery: () => {
      return `CREATE SCHEMA IF NOT EXISTS questions_answers;
      CREATE TABLE IF NOT EXISTS questions(
        id SERIAL PRIMARY KEY,
        product_id INT,
        question_body VARCHAR(1000),
        question_date BIGINT,
        email VARCHAR(60),
        asker_name VARCHAR(60),
        question_helpfulness INT,
        reported BOOLEAN
        );
      CREATE TABLE IF NOT EXISTS answers(
        id SERIAL PRIMARY KEY,
        question_id INT,
        body VARCHAR(1000),
        date BIGINT,
        answerer_name VARCHAR(60),
        email VARCHAR(60),
        reported BOOLEAN,
        helpfulness INT,
          FOREIGN KEY(question_id)
            REFERENCES questions(id)
        );
      CREATE TABLE IF NOT EXISTS photos(
        id SERIAL PRIMARY KEY,
        answer_id INT,
        url VARCHAR,
          FOREIGN KEY(answer_id)
            REFERENCES answers(id)
      );`
    }
   },

  queryDb: (...args) => {
    const [queryName, ...restArgs] = args;
    return client.query(queryName(...restArgs))
      .catch((err) => console.log(err));
  },
}
