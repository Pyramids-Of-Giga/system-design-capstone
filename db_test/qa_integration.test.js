/**
 * @jest-environment node
 */
const { filterArray, formatTime, nestObj } = require("../server/helpers/qa_helpers");
const { queryFuncObj, queryDb } = require("../server/Models/qa");
//const { answers, photos, questions } = require("../exampleData/qa_data");

describe('filterArray function', () => {
  it('should return an array of length equal to count variable', () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let page = 1;
    let count = 5;
    let result = filterArray(array, page, count);
    expect(result.length).toBe(count);
  });

  it('should return an array with the last page of values if they are available', () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let page = 2;
    let count = 5;
    let result = filterArray(array, page, count);
    expect(result).toEqual([6, 7, 8, 9, 10]);
  });

  it('should return an empty array if an empty array is passed in as argument', () => {
    const array = [];
    let page = 1;
    let count = 5;
    let result = filterArray(array, page, count);
    expect(result.length).toBe(0);
  });

  it('should return an array of length equal to input array length if that length is less than count', () => {
    const array = [1, 2, 3, 4];
    let page = 1;
    let count = 5;
    let result = filterArray(array, page, count);
    expect(result.length).toBe(array.length);
  });
});

describe('formatTime function', () => {
  it('should turn a ms string into a date', () => {
    let obj = {
      name: 'Jimmy',
      email: 'Jimmy@email.com',
      date: '1232342342345',
    };
    let property = 'date';
    let result = formatTime (obj, property);
    const expectedDate = new Date(obj.date);
    expect(result).toEqual(
      {
        name: 'Jimmy',
        email: 'Jimmy@email.com',
        date: expectedDate,
      }
    );
  });
});

describe('nestObj function', () => {
  const parent = [
    { name: 'foo',
      id: 42
    },
    { name: 'elvis',
      id: 35
    },
  ]
  const child = [
    { name: 'bar',
      property: 'test',
      child_id: 3,
      parent_id: 42
    },
    { name: 'presley',
      property: 'musician',
      child_id: 1,
      parent_id: 35
    },
    { name: 'costello',
      property: 'also musician',
      child_id: 2,
      parent_id: 35,
    },
  ];
  const parentJoinKey = 'id';
  const childJoinKey = 'parent_id';
  const childName = 'child';

  it('should nest an object in another object', () => {
    const result = nestObj(parent, child, parentJoinKey, childJoinKey, childName);
    expect(Object.keys(result[0])).toEqual(['name', 'id', 'child']);
  });
  // test if child is empty
  // test if parent is empty
});

const { Client } = require('pg'); // Import the PostgreSQL client library
let client; // Declare the client variable

beforeAll(() => {
  // Create and configure the client here
  client = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'giga',
    database: 'SDC_QuestionsAnswers'
  });

  // Establish the database connection
  return client.connect(); // Return the promise to Jest
});

afterAll(() => {
  // Close the database connection when all tests are done
  return client.end(); // Return the promise to Jest
});

describe('Test query speeds - ', () => {
  it('getQuestions should run in under 50ms', () => {
    const id = Math.floor(Math.random() * 1000000);
    const limit = 5;
    const start = performance.now();
    queryDb(queryFuncObj.getQuestions, [id], limit)
      .then(() => performance.now())
      .then((end) => end - start)
      .then((queryTime) => {
        console.log('getQuestions ',queryTime);
        expect(queryTime).toBeLessThan(50)
      });
  });

  it('getAnswers should run in under 50ms', () => {
    const id = Math.floor(Math.random() * 1000000);
    const limit = 5;
    const start = performance.now();
    queryDb(queryFuncObj.getAnswers, [id], limit)
      .then(() => performance.now())
      .then((end) => end - start)
      .then((queryTime) => {
        console.log('getAnswers ',queryTime);
        expect(queryTime).toBeLessThan(50)
      });
  });

  it('getAnswersPhotos should run in under 50ms', () => {
    const id = Math.floor(Math.random() * 1000000);
    const limit = 5;
    const start = performance.now();
    queryDb(queryFuncObj.getAnswerPhotos, [id])
      .then(() => performance.now())
      .then((end) => end - start)
      .then((queryTime) => {
        console.log('getAnswersPhotos ',queryTime);
        expect(queryTime).toBeLessThan(50)
      });
  });

  it('getDistinctQuestionIds should run in under 50ms', () => {
    const id = Math.floor(Math.random() * 1000000);
    const limit = 5;
    const start = performance.now();
    queryDb(queryFuncObj.getDistinctQuestionIds, [id])
      .then(() => performance.now())
      .then((end) => end - start)
      .then((queryTime) => {
        console.log('getDistinctQuestionIds ',queryTime);
        expect(queryTime).toBeLessThan(50)
      });
  });
});