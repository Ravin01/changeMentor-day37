import Express from "express";
import { mentorModel, studentModel } from "../db/models.js";

// router
export const nonAssignedStudents = Express.Router();


// to get all non assigned students
nonAssignedStudents.get("/", async (req, res) => {
  const totalStudent = [];
  const assignedStu = [];
  const assignedStudents = await mentorModel.find(
    {},
    { _id: 0, students: 1 }
  );
  const student = await studentModel.find({}, { _id: 0, studentEmail: 1 });
  for (let i = 0; i < student.length; i++) {
    totalStudent.push(student[i].studentEmail);
  }
  for (let i = 0; i < assignedStudents.length; i++) {
    assignedStu.push(...assignedStudents[i].students);
  }
  const result = [];
  for (let i = 0; i < totalStudent.length; i++) {
    let flag = false;
    for (let j = 0; j < assignedStu.length; j++) {
      if (totalStudent[i] === assignedStu[j]) {
        flag = true;
        break;
      }
    }
    if (!flag) {
      result.push(totalStudent[i]);
    }
  }
  let finalResult = []
console.log("result", result)
  for(let i=0;i<result.length;i++){
    console.log('first',result[i])
    let res = await studentModel.findOne({studentEmail : result[i]})
    console.log('second',result[i])
    finalResult.push(res)
  } 
  console.log(finalResult)
  res.send(finalResult);
});
