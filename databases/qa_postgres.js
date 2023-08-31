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
    console.log('Connected SDC_QuestionsAnswers')
  })
  .catch(err => {
    console.log('Error connecting to SDC_QuestionsAnswers', err)
  });

module.exports = client;