export const generateGrade = (cs, es) => {
  const totalScore = Number(cs) + Number(es);
  let grade = "";
  let remarks = "";

  if (totalScore >= 75) {
    grade = "A1";
    remarks = "Excellent";
  } else if (totalScore >= 70) {
    grade = "B2";
    remarks = "Very Good";
  } else if (totalScore >= 65) {
    grade = "B3";
    remarks = "Good";
  } else if (totalScore >= 60) {
    grade = "C4";
    remarks = "Good";
  } else if (totalScore >= 55) {
    grade = "C5";
    remarks = "Average";
  } else if (totalScore >= 50) {
    grade = "C6";
    remarks = "Average";
  } else if (totalScore >= 45) {
    grade = "D7";
    remarks = "Pass";
  } else if (totalScore >= 40) {
    grade = "E8";
    remarks = "Weak";
  } else {
    grade = "F9";
    remarks = "Fail";
  }

  return {
    totalScore,
    grade,
    remarks,
  };
};
