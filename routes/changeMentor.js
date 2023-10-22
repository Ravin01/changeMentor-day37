import Express from "express";
import {
  mentorModel,
  studentModel,
} from "../db/models.js";

// Router
export const changeMentor = Express.Router();

// get call for get all mentors
changeMentor.get("/", async (req, res) => {
  const data = await mentorModel.find({});
  res.send(data);
});

// input format
// {
//   "studentEmail": "student01@gmail.com",
//   "studentName": "Student01",
//   "mentorEmail": "mentor02@gmail.com",
//   "mentorName": "Mentor02"
// }

// to get specific mentor
changeMentor.get("/:email", async (req, res) => {
  const { email } = req.params;
  const singleData = await mentorModel.findOne({ mentorEmail: email });
  if (singleData) {
    res.send(singleData);
  } else {
    res.send("mentor is not found");
  }
});



// to change the mentor for a particular student
changeMentor.post("/", async (req, res) => {
  const data = req.body;

  let stuEmail = data.studentEmail;
  let menEmail = data.mentorEmail;

  try {
    const checkStudent = await studentModel.findOne({ studentEmail: stuEmail });
    if (checkStudent) {
      const findStudent = await mentorModel.findOne(
        { students: stuEmail },
        { _id: 0, students: 1, mentorEmail: 1 }
      );
      if (findStudent) {
        const totalStudents = findStudent.students;
        const filterStudent = totalStudents.filter(
          (email) => email !== stuEmail
        );
        const updateAssignStudent = await mentorModel.findOneAndUpdate(
          { mentorEmail: findStudent.mentorEmail },
          { students: filterStudent }
        );
        const previousStudent = await mentorModel.findOneAndUpdate({mentorEmail: findStudent.mentorEmail},{$push:{previousStudents:stuEmail}})
        const mentorUpdate = await mentorModel.findOneAndUpdate(
          { mentorEmail: menEmail },
          { $push: { students: stuEmail } }
        );
        res.send('Updated students')
      }else{
        await mentorModel.findOneAndUpdate({mentorEmail:menEmail},{$push:{students:stuEmail}})
        res.send('New mentor assigned for student')
      }
    } else {
      res.send("student not found");
    }

    console.log(findStudent.students)
  } catch (err) {
    console.log(err);
  }
});


