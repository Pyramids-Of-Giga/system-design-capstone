const pool = require('./dbpgrnr.js');

function createSchemaAndTable() {
  const schemaName = 'rnr';
  const tableName = 'reviews';
  const photoTableName = 'revpics';
  const charTable = 'chars';
  const revCharTable = 'revchars';

  const createSchema = `CREATE SCHEMA IF NOT EXISTS ${schemaName}`;
  const createTable = `
    CREATE TABLE IF NOT EXISTS ${schemaName}.${tableName} (
      review_id serial PRIMARY KEY,
      product_id numeric(50) NOT NULL,
      rating numeric(50) NOT NULL,
      date varchar(50),
      summary varchar(500),
      body varchar(1000),
      recommend boolean,
      reported boolean,
      reviewer_name varchar(50),
      reviewer_email varchar(50),
      response varchar(500),
      helpfulness numeric (50)
    )
  `;
  const createPhotoTable = `
    CREATE TABLE IF NOT EXISTS ${schemaName}.${photoTableName} (
      id serial PRIMARY KEY,
      review_id INT REFERENCES ${schemaName}.${tableName}(review_id),
      url varchar (500)
    )
  `;

  const createCharTable = `
  CREATE TABLE IF NOT EXISTS ${schemaName}.${charTable} (
    id serial PRIMARY KEY,
    product_id INT,
    name varchar (100)
  )
`;

  const createRevCharTable = `
    CREATE TABLE IF NOT EXISTS ${schemaName}.${revCharTable} (
      id serial PRIMARY KEY,
      char_id INT REFERENCES ${schemaName}.${charTable}(id),
      review_id INT REFERENCES ${schemaName}.${tableName}(id),
      value numeric(30,4)
    )
  `;

  pool.query(createSchema, (schemaErr) => {
    if (schemaErr) {
      console.error('Error creating schema:', schemaErr);
      return;
    }

    console.log(`Schema "${schemaName}" created or already exists`);

    pool.query(createTable, (tableErr) => {
      if (tableErr) {
        console.error('Error creating table:', tableErr);
        return;
      }

      console.log(`Table "${tableName}" created or already exists in schema "${schemaName}"`);

      pool.query(createPhotoTable, (photoerror) => {
        if (photoerror) {
          console.error('Error creating photo table:', photoerror);
          return;
        }
        console.log('Photo table created or already exists');

        pool.query(createCharTable, (charror) => {
          if (charror) {
            console.error('Error creating char table:', charror);
            return;
          }
          console.log('Char table created or already exists');

          pool.query(createRevCharTable, (revcharerror) => {
            if (revcharerror) {
              console.error('Error creating revchar table:', revcharerror);
              return;
            } else {
              console.log('Revchar table created or already exists');
            }
          });
        });
      });
    });
  });
};

  createSchemaAndTable();