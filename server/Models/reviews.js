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
  const query = `
  WITH RatingsSummary AS (
    SELECT jsonb_object_agg(rating::text, cnt) AS ratings
    FROM (
        SELECT rating, COUNT(*) AS cnt
        FROM rnr.reviews
        WHERE product_id = ${product_id}
        GROUP BY rating
    ) sub
),

Recommended AS (
  SELECT
      COUNT(*) FILTER (WHERE recommend = true) AS recommend_count,
      COUNT(*) FILTER (WHERE recommend = false) AS not_recommend_count
  FROM rnr.reviews
  WHERE product_id = ${product_id}
),

Characteristics AS (
    SELECT chars.name, chars.id AS id, CAST(ROUND(AVG(revchars.value), 4) AS TEXT) AS value
    FROM rnr.chars
    JOIN rnr.revchars ON chars.id = revchars.char_id
    WHERE chars.product_id = ${product_id}
    GROUP BY chars.id
)

SELECT
    (SELECT ratings FROM RatingsSummary) AS ratings,
    (SELECT jsonb_build_object('0', recommend_count, '1', not_recommend_count) FROM Recommended) AS recommended,
    jsonb_object_agg(name, jsonb_build_object('id', id, 'value', value)) AS characteristics
FROM Characteristics;
`

  return Reviews.query(query);
};

exports.postReview = (product_id, rating, summary, body, recommend, reviewer_name, reviewer_email, photos, characteristics) => {
  const insertReview = `
  INSERT INTO rnr.reviews (product_id, rating, summary, body, recommend, reviewer_name, reviewer_email)
  VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING review_id`;

  return Reviews.query(insertReview, [product_id, rating, summary, body, recommend, reviewer_name, reviewer_email])
  .then(result => {
    const reviewId = result.rows[0].review_id;
    const photoPromises = photos.map(photoUrl => {
      return Reviews.query('INSERT INTO rnr.revpics (review_id, url) VALUES ($1, $2);', [reviewId, photoUrl]);
    });

  const charPromises = Object.entries(characteristics).map(([charId, value]) => {
    return Reviews.query('INSERT INTO rnr.revchars (review_id, characteristic_id, value) VALUES ($1, $2, $3);', [reviewId, charId, value]);
  });

  return Promise.all([...photoPromises, ...charPromises]);
})
}
exports.updateHelpfulness = (review_id) => {
  const updateQuery = `
    UPDATE rnr.reviews
    SET helpfulness = helpfulness + 1
    WHERE review_id = $1;
  `;

  return Reviews.query(updateQuery, [review_id]);
};

exports.toggleReportStatus = (review_id) => {
  const toggleQuery = `
    UPDATE rnr.reviews
    SET reported = CASE
                  WHEN reported = TRUE THEN FALSE
                  ELSE TRUE
                 END
    WHERE review_id = $1;
  `;

  return Reviews.query(toggleQuery, [review_id]);
};

exports.toggleRecommendStatus = (review_id) => {
  const toggleQuery = `
    UPDATE rnr.reviews
    SET recommend = CASE
                  WHEN recommend = TRUE THEN FALSE
                  ELSE TRUE
                 END
    WHERE review_id = $1;
  `;

  return Reviews.query(toggleQuery, [review_id]);
};




