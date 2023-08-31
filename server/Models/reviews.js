const Reviews = require("../../databases/dbpgrnr.js");

exports.getReviews = (productId, sort, count, offset) => {
  const query = `
    SELECT * FROM rnr.reviews
    WHERE product_id = $1
    ORDER BY ${sort}
    LIMIT $2
    OFFSET $3;
  `;

  return Reviews.query(query, [productId, count, offset]);
};


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