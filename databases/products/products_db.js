const {Client} = require ('pg');
const dataParser = require('./products_parser.js');

const client = new Client({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  password: 'mypass123',
  database: 'products'
});

var productsSeeded = true;

client.connect()
  .then(() => {
    console.log('Connected to products PG')
    if (productsSeeded === false) {
      seedTables();
    }
  }).catch(err => {
    console.log('Error connecting to products PG', err)
  })

  const createCopyQuery = (table, columns) => {
    return `
    COPY ${table} (${columns.join(',')})
    FROM '/tmp/sdc-data/${table}.csv' WITH DELIMITER ',' CSV HEADER NULL 'null';`;
  }

  var seedTables = async () => {

    const tables = [
      {name: 'products', columns: ['id', 'name', 'slogan', 'description', 'category', 'default_price']},
      {name: 'styles', columns: ['id', 'product_id', 'name', 'sale_price', 'original_price', 'default_style']},
      {name: 'skus', columns: ['id', 'style_id', 'size', 'quantity']},
      {name: 'features', columns: ['id', 'product_id', 'feature', 'value']},
      {name: 'related', columns: ['id', 'current_product_id', 'related_product_id']},
    ]
    for (var table of tables) {
      await client.query(createCopyQuery(table.name, table.columns)).then(r => {
        console.log('Seeded table: ', table.name);
      }).catch(e => {
        console.log('Error seeding: ', table.name);
        console.log(e);
      })
    }
  };

module.exports = client;
