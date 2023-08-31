const {Client} = require ('pg');


const client = new Client({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  password: 'hr',
  database: 'rnr'
});

client.connect()
  .then(() => {
    console.log('Connected to RnR PG')
  })
  .catch(err => {
    console.log('Error connecting to RNR PG', err)
  })


module.exports = client;
