
if (typeof TextEncoder === "undefined") {
  global.TextEncoder = require("util").TextEncoder;
}
if (typeof TextDecoder === "undefined") {
  global.TextDecoder = require("util").TextDecoder;
}


const client = require('../databases/dbpgrnr.js');

beforeAll(async () => {
  await client.connect();
});

afterAll(async () => {
  await client.end();
});

describe('Database Integration Tests', () => {

  test('reviews table should exist', async () => {
    const result = await client.query("SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'rnr' AND table_name = 'reviews')");
    expect(result.rows[0].exists).toBe(true);
  });

  test('revpics table should exist', async () => {
    const result = await client.query("SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'rnr' AND table_name = 'revpics')");
    expect(result.rows[0].exists).toBe(true);
  });

  test('chars table should exist', async () => {
    const result = await client.query("SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'rnr' AND table_name = 'chars')");
    expect(result.rows[0].exists).toBe(true);
  });

  test('revchars table should exist', async () => {
    const result = await client.query("SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'rnr' AND table_name = 'revchars')");
    expect(result.rows[0].exists).toBe(true);
  });

});

