const client = require('./dbpgrnr.js');
const fs = require('fs');
const copyFrom = require('pg-copy-streams').from;


const csvFilePath = '/Users/Shared/reviews.csv';
const tableName = 'rnr.reviews';

const copyQuery = `COPY ${tableName} FROM STDIN DELIMITER ',' CSV HEADER`;

const fileStream = fs.createReadStream(csvFilePath);

const dbStream = client.query(copyFrom(copyQuery))

fileStream.on('error', (error) => {
    console.error('Error reading CSV file:', error);
    client.end();
});


dbStream.on('finish', () => {
  console.log('Data imported.');
  client.end();
}).on('error', (error) => {
  console.error('Error streaming data:', error);
  client.end();
});

fileStream.pipe(dbStream);

