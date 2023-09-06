const client = require('./qa_db.js');
const { queryFuncObj } = require("../server/Models/qa.js");
require('dotenv').config();

const createTables = () => {
   return new Promise((resolve, reject) => {
     client.query(queryFuncObj.createTablesQuery())
      .then(() => {
        console.log('Successfully created schema and tables.');
        resolve();
      })
      .catch((err) => {
        console.log('Error created schema and tables.');
        reject();
      })
   })
};

const seedTables = (table, columns, filePath) => {
  return new Promise((resolve, reject) => {
    client.query(queryFuncObj.seedQuery(table, columns, filePath))
      .then(() => {
        console.log(`Successfully seeded ${table}.`);
        resolve();
      })
      .catch((err) => {
        console.log(`Issue seeding ${table} - ${err}`);
        reject(err);
      })
  });
};

const execute = async() => {
  try {
    await createTables();
    await seedTables("questions", ["id", "product_id", "question_body", "question_date", "asker_name", "email", "reported", "question_helpfulness"], process.env.QUESTION_DATA_PATH);

    await seedTables('answers', ["id", "question_id", "body", "date", "answerer_name", "email", "reported", "helpfulness"], process.env.ANSWER_DATA_PATH);

    await seedTables('photos', ["id", "answer_id", "url"], process.env.PHOTO_DATA_PATH);

    await client.end();
  }

  catch {
    console.log('Error with creation and seeding process - ', err);
  }
};

execute();
