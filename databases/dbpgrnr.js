const {Pool} = require ('pg');


const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  password: 'hr',
  database: 'rnr'
});

pool.connect()
  .then(() => {
    console.log('Connected to RnR PG')
  })
  .catch(err => {
    console.log('Error connecting to RNR PG', err)
  })


module.exports = pool;
