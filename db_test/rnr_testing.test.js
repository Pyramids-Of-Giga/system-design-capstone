
//npm run test -- db_test/rnr_testing.test.js

if (typeof TextEncoder === "undefined") {
  global.TextEncoder = require("util").TextEncoder;
}
if (typeof TextDecoder === "undefined") {
  global.TextDecoder = require("util").TextDecoder;
}

const pool = require('../databases/dbpgrnr.js');

describe('Database Integration Tests', () => {

  test('reviews table should exist', async () => {
    const result = await pool.query("SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'rnr' AND table_name = 'reviews')");
    expect(result.rows[0].exists).toBe(true);
  });

  test('revpics table should exist', async () => {
    const result = await pool.query("SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'rnr' AND table_name = 'revpics')");
    expect(result.rows[0].exists).toBe(true);
  });

  test('chars table should exist', async () => {
    const result = await pool.query("SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'rnr' AND table_name = 'chars')");
    expect(result.rows[0].exists).toBe(true);
  });

  test('revchars table should exist', async () => {
    const result = await pool.query("SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'rnr' AND table_name = 'revchars')");
    expect(result.rows[0].exists).toBe(true);
  });

test('reviews table should have all my columns', async () => {
  const result = await pool.query("SELECT column_name FROM information_schema.columns WHERE table_schema = 'rnr' AND table_name = 'reviews'");
  const columns = result.rows.map(row => row.column_name);
  const myColumns = ['review_id', 'product_id', 'rating', 'date', 'summary', 'body', 'recommend', 'reported', 'reviewer_name', 'reviewer_email', 'response' ];
  myColumns.forEach(column => {
    expect(columns).toContain(column);
  });
});

test('reviews should have a known number of rows', async () => {
  const result = await pool.query("SELECT COUNT(*) FROM rnr.reviews");
  const rowCount = parseInt(result.rows[0].count, 10);
  const expectedRowCount = 5774965;
  expect(rowCount).toEqual(expectedRowCount);
});

test('reviews table should contain a specific review', async () => {
  const knownReviewId = 123;
  const result = await pool.query("SELECT * FROM rnr.reviews WHERE review_id = $1", [knownReviewId]);
  expect(result.rows).toHaveLength(1);
  expect(result.rows[0].review_id).toBe(knownReviewId);
});

});



afterAll(() => {
  pool.end();
});