const Reviews = require("../../databases/dbpgrnr.js");

exports.getReviews = (productId, sort, count, offset) => {
  let orderBy;

  if (sort === 'newest') {
    orderBy = 'date DESC';
  } else if (sort === 'helpful') {
    orderBy = 'helpfulness DESC';
  } else {
    orderBy = 'date DESC';
  }

  const query = `
    SELECT rnr.reviews.*,
    ARRAY_AGG(
      jsonb_build_object(
        'id', revpics.id,
        'url', revpics.url
      )
    ) AS photos
    FROM rnr.reviews
    LEFT JOIN rnr.revpics ON rnr.reviews.review_id = revpics.review_id
    WHERE reviews.product_id = $1
    GROUP BY reviews.review_id
    ORDER BY ${orderBy}
    LIMIT $2
    OFFSET $3;
  `;

  return Reviews.query(query, [productId, count, offset]);
};

exports.getMeta = (product_id) => {

}

// exports.addRecipe = (req, res) => {
//   const formData = req.body;
//   const newRecipe = new Recipe (formData);
//   newRecipe.save()
//     .then(newRecipe => {
//       console.log('New recipe saved:', newRecipe);
//       res.status(200).json({message: 'New recipe saved'});
//     })
//     .catch(error => {
//       console.error('Error saving new recipe:', error);
//       res.status(500).json({error: "Error saving new recipe"});
//     });
// };