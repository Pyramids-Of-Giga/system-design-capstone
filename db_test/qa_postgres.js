const {Client} = require ('pg');

const client = new Client({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  password: 'giga',
  database: 'SDC_QuestionsAnswers'
});

client.connect()
  .then(() => {
    console.log('Connected to RnR PG')
  })
  .catch(err => {
    console.log('Error connecting to RNR PG', err)
  });

module.exports = client;