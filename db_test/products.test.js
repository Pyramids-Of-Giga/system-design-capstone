/**
 * @jest-environment node
 */
const productsDB = require('../server/Models/products.js');
const  { getProducts, getPRoductById, getProductStyles, getRelatedProducts } = require('../server/Routers/product_router.js');
const { Client } = require('pg'); // Import the PostgreSQL client library
let client; // Declare the client variable

beforeAll(() => {
  // Create and configure the client here
  client = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'mypass123',
    database: 'products'
  });

  // Establish the database connection
  return client.connect(); // Return the promise to Jest
});

afterAll(() => {
  // Close the database connection when all tests are done
  return client.end(); // Return the promise to Jest
});
describe('Database operations', () => {
  it('getProducts should return correct item', () => {
    const page = 1, count = 1;
    productsDB.getProducts(page, count)
      .then((result) => {
        var expResult = [{"category": "Jackets",
          "default_price": "140.00",
          "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
          "id": 1,
          "name": "Camo Onesie",
          "slogan": "Blend in to your crowd"
        }]
        expect(result).toStrictEqual(expResult)
      });
  });
  it('getProductById should return correct item', () => {
    const id = 1;
    productsDB.getProductById(id)
      .then((result) => {
        var expResult = [
          {
            id: 1,
            name: 'Camo Onesie',
            slogan: 'Blend in to your crowd',
            description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
            category: 'Jackets',
            default_price: '140.00',
            features: [
              { feature: 'Fabric', value: 'Canvas' },
              { feature: 'Buttons', value: 'Brass' }
            ]
          }
        ];
        expect(result).toStrictEqual(expResult)
      });
  });
  it('getProductStyles should return correct item', () => {
    const id = 1;
    productsDB.getProductStyles(id)
      .then((result) => {
        expect(result[0]).toHaveProperty("results")
      });
  });
});
describe('Database speeds', () => {
  it('getProducts should run in under 50ms', () => {
    const page = 5, count = 10;
    const t0 = performance.now();
    productsDB.getProducts(page, count)
      .then((result) => {
        var queryTime = performance.now() - t0;
        expect(queryTime).toBeLessThan(50)
      });
  });
  it('getProductById should run in under 50ms', () => {
    const id = Math.floor(1 + Math.random() * 1000);
    const t0 = performance.now();
    productsDB.getProductById(id)
      .then((result) => {
        var queryTime = performance.now() - t0;
        expect(queryTime).toBeLessThan(50)
      });
  });
  it('getProductStyles should run in under 50ms', () => {
    const id = Math.floor(1 + Math.random() * 1000);
    const t0 = performance.now();
    productsDB.getProductStyles(id)
      .then((result) => {
        var queryTime = performance.now() - t0;
        expect(queryTime).toBeLessThan(50)
      });
  });
  it('getRelatedProducts should run in under 50ms', () => {
    const id = Math.floor(1 + Math.random() * 1000);
    const t0 = performance.now();
    productsDB.getRelatedProducts(id)
      .then((result) => {
        var queryTime = performance.now() - t0;
        expect(queryTime).toBeLessThan(50)
      });
  });
});