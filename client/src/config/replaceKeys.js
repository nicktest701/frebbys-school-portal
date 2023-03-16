import _ from "lodash";

export function replaceKeys(oldStudents, fields) {
  const modifiedFields = _.map(fields, "field").sort((a, b) => a - b);

  const students = oldStudents.map((person) => {
    const me = renameKeys(modifiedFields, person);

    return {
      ...me,
    };
  });

  return students;
}

function renameKeys(fields, oldStudent) {
  const oldKeys = Object.keys(oldStudent);

  const newStudent = {};

  for (let field in fields) {
    newStudent[fields[field]] = oldStudent[oldKeys[field]];
    oldStudent[fields[field]] = oldStudent[oldKeys[field]];
    delete oldStudent[oldKeys[field]];
  }

  return newStudent;
}
