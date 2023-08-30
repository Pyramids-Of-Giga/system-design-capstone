const client = require('./db');


async function createSchemaIfNotExists(schemaName) {
  const query = `CREATE SCHEMA IF NOT EXISTS ${schemaName}`;
  return client.query(query)
    .then(() => {
      console.log(`Schema "${schemaName}" created or already exists`);
    })
    .catch(error => {
      console.error('Error creating schema:', error);
    });
}

createSchemaIfNotExists('reviews');
