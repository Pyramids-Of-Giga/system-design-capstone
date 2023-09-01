const { answers, photos, questions } = require("../../exampleData/qa_data");

const filterArray = (array, page, count) => {
  const length = array.length;
  let start = (page * count) - count;
  if (length < (page * count)) {
    if (length <= count) {
      start = 0;
    } else {
      start = length - count - 1;
    }
  }
  const end = start + 5
  return array.slice(start, end);
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
        delete childObj[childJoinKey]; // if join keys are equal this will make a key 'undefined'
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
