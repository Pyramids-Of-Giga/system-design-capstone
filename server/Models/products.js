const client = require('../../databases/products/products_db.js');
// utilize db connection here
const queryDB = (queryString) => {
  return client.query(queryString).then(r => {
    return r.rows;
  }).catch(e => {
    console.log(e);
  });
}
module.exports = {
  getProducts: (page, count) => {
    return queryDB(`SELECT * FROM products LIMIT ${count} OFFSET ${(page - 1) * count};`);
  },
  getProductById: (id) => {
    return queryDB(`SELECT * FROM products WHERE id = ${id};`);
  }
}