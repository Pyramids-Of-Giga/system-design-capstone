const { filterArray, formatTime, nestObj } = require("../server/helpers/qa_helpers");
const { answers, photos, questions } = require("../exampleData/qa_data");

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
})