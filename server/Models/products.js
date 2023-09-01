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
    return queryDB(`
    SELECT
        products.*,
        (
            SELECT json_agg(json_build_object('feature', features.feature, 'value', features.value))
            FROM features
            WHERE features.product_id =products.id
        ) AS features
      FROM products
      WHERE products.id = ${id};`
    );
  },
  getProductStyles: (id) => {
    return queryDB(`
      SELECT
        products.id AS product_id,
        json_agg(
          json_build_object(
            'style_id', styles.id,
            'name', styles.name,
            'original_price', styles.original_price,
            'sale_price', styles.sale_price,
            'default?', styles.default_style,
            'photos', (
              SELECT json_agg(
                json_build_object(
                  'thumbnail_url', photos.thumbnail_url,
                  'url', photos.url
                )
              )
              FROM photos
              WHERE photos.style_id = styles.id
            ),
            'skus', (
              SELECT json_object_agg(skus.id::text, json_build_object('quantity', skus.quantity, 'size', skus.size))
              FROM skus
              WHERE skus.style_id = styles.id
            )
          )
        ) AS results
      FROM products
      LEFT JOIN styles ON products.id = styles.product_id
      WHERE products.id = ${id}
      GROUP BY products.id;`
    );
  },
  getRelatedProducts: (id) => {
    return queryDB(`
      SELECT array_agg(related_product_id) AS related_products
      FROM related
      WHERE current_product_id = ${id};`
    );
  }
}