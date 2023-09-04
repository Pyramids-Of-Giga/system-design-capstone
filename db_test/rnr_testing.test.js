
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

});
