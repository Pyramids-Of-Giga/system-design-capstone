const { Pool } = require('pg');
const fs = require('fs');
const csvParser = require('csv-parser');

const batchSize = 100;
let batch = [];

// create pool
const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  password: 'giga',
  database: 'SDC_QuestionsAnswers',
  max: 100,
});

// example of data obj:
// {
//   id: '49312',
//   product_id: '14067',
//   body: 'Voluptas accusantium voluptatem.',
//   date_written: '1608218269689',
//   asker_name: 'Sydni53',
//   asker_email: 'Misael.Bosco@gmail.com',
//   reported: '0',
//   helpful: '12'
// }
const copyQuery = `
COPY questions("product_id", "question_body", "question_date", "asker_name", "email", "question_helpfulness", "reported")
FROM '/Users/kurtvardeman/bootcamp/rfe2307/projects/system-design-capstone/docs/sdc_seed_data/questions.csv' WITH DELIMITER ',' CSV HEADER;
`;

pool.query(copyQuery)
  .then((res) => console.log('success!'))
  .catch((err) => console.log('failure! ', err))
  .finally(() => pool.end());

// old

// let badArray = [];
// let counter = 0;
// // read csv file

// fs.createReadStream('/Users/kurtvardeman/bootcamp/rfe2307/projects/system-design-capstone/docs/sdc_seed_data/questions.csv')
//   // extract
//   .pipe(csvParser())
//   .on('data', (data) => {

//     batch.push(data);

//     if (batch.length >= batchSize) {
//       processBatch(batch);
//       batch = [];
//       console.log({counter});
//     }

//   })
//   .on('end', () => {
//     if (batch.length > 0) {
//       processBatch(batch);
//     }
//     console.log('fin - ', {badcounter, counter});
//     pool.end()
//   });

// const processBatch = async (batch) => {
//   const promises = batch.map(async (data) => {
//     const transformedData = transformQuestionData(data);
//     try {
//       await pool.query(
//         `INSERT INTO questions ("product_id", "question_body", "question_date", "asker_name", "question_helpfulness", "reported")
//         VALUES ($1, $2, $3, $4, $5, $6)`,
//         [
//           transformedData.product_id,
//           transformedData.body,
//           transformedData.date_written,
//           transformedData.asker_name,
//           transformedData.helpful,
//           transformedData.reported,
//         ]
//       );
//       counter++;
//     } catch (error) {
//       badArray.push(error);
//     }
//   });

//   await Promise.all(promises);
// }

// const transformQuestionData = (data) => {
//   delete data.id;
//   // product_id => convert to int
//   data.product_id = Number(data.product_id);
//   // date_written => convert to UTC time
//   data.date_written = new Date(Number(data.date_written));
//   // reported => string to bool
//   data.reported = data.reported === '1';
//   // helpful => integer
//   data.helpful = Number(data.helpful);
//   // console.log(data);
//   return data;
// }
