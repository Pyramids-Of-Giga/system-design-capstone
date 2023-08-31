const { answers, photos, questions } = require("../../exampleData/qa_data");

const filterArray = (array, page, count) => {
  const length = array.length;
  let start = (page * count) - count;
  // console.log({length, start, page, count});
  // need to test this thoroughly

  if (length < (page * count)) { // if we don't have enough results to do what user specified
    if (length < count) {
      start = 0; // return what we have
    } else {
      start = length - count - 1; // count backwards from end of array and return count
    }
  }

  return array.slice(start);
}

const formatTime = (obj, property) => {
  let newObj = obj;
  newObj[property] = new Date(Number(obj[property]));
  return newObj;
}

const nestObj = (parent, child, parentJoinKey, childJoinKey, childName) => {
  if (childName === 'photos') {
    var storageFunc = (tempStore, childObj) => {
      tempStore.push(childObj);
    }
  } else {
    var storageFunc = (tempStore, childObj) => {
      tempStore[childObj.id] = childObj;
    }
  }

  for (var i = 0; i < parent.length; i++) {
    let tempStore = (childName === 'photos') ? [] : {};

    for (var j = 0; j < child.length; j++) {
      let childObj = child[j];
      if (childObj[childJoinKey] === parent[i][parentJoinKey]) {
        delete childObj[childJoinKey];
        storageFunc(tempStore, childObj);
      }
    }
    parent[i][childName] = tempStore;
  }
  // console.log(parent);
  return parent;
}

module.exports.nestObj = nestObj;
module.exports.formatTime = formatTime;
module.exports.filterArray = filterArray;
// nestObj(answers, photos, 'id', 'answer_id', 'photos');
// nestObj(questions, answers, 'question_id', 'question_id', 'answers');
// formatTime(questions[0].question_date);
