const { answers, photos, questions } = require("../../exampleData/qa_data");

// console.log({ answers, photos, questions });

const formatTime = (obj, property) => {
  let newObj = obj;
  newObj[property] = new Date(Number(obj[property]));
  return newObj;
}

const nestObj = (parent, child, parentJoinKey, childJoinKey, childName) => {
  if (child.length === 0) {
    return parent;
  }

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
    let tempStore = childName === 'photos' ? [] : {};

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
// nestObj(answers, photos, 'id', 'answer_id', 'photos');
// nestObj(questions, answers, 'question_id', 'question_id', 'answers');
// formatTime(questions[0].question_date);
