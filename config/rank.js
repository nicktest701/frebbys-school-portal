const _ = require("lodash");

function getPosition(students) {
  const sorted = _.map(
    _.orderBy(students, "overallScore", "desc"),
    "overallScore"
  );
  return students.slice().map((student) => {
    return {
      _id: student._id,
      overallScore: student.overallScore,
      position: sorted.indexOf(student.overallScore) + 1,
    };
  });
}
module.exports = getPosition;

//  function rankings(arr) {
//    const sorted = [...arr].sort((a, b) => b - a);
// console.log(sorted);
//   return arr.map((x) => sorted.indexOf(x) + 1);
//  }

//  console.log(rankings([10, 5, 20, 20,20]));
