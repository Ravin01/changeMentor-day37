import Express from "express";
import { studentModel } from "../db/models.js";
import { v4 } from "uuid";

// Router
export const studentRouter = Express.Router();

// To get all students data
studentRouter.get("/", async (req, res) => {
  const students = await studentModel.find();
  res.send(students);
});


// input format:
// {
//   "studentEmail" : "student01@gmail.com",
//   "studentName" : "Student01",
//   "Batch" : "B44WETamil",
//   "program":"FSD"
// }

// To create a new student
studentRouter.post("/", async (req, res) => {
  const data = req.body;
  try {
    const newStudent = await studentModel.findOne(
      { studentEmail: data.studentEmail },
      { _id: 0, studentEmail: 1 }
    );
    if (newStudent) {
      res.status(401).send("Student already registered");
    } else {
      const student = await studentModel.create({ ...data, studentId: v4() });
      if (student) {
        res.send("Student created successfully");
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("error while creating student");
  }
});

// to update a student data
studentRouter.put("/:studentEmail", async (req, res) => {
  const { studentEmail } = req.params;
  try {
    const updatedStudent = await studentModel.findOneAndUpdate(
      { studentEmail: studentEmail }, // Use the correct field name
      req.body, // Updated data
      { new: true } // Return the updated document
    );
    if (updatedStudent) {
      res.send("Student updated successfully");
    } else {
      res.status(404).send("Student not found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Error while updating");
  }
});

// to delete a student from db
studentRouter.delete("/:studentId", async (req, res) => {
  const { studentEmail } = req.params;
  try {
    const deleteStudent = await studentModel.deleteOne({
      studentEmail: studentEmail,
    });
    if (deleteStudent) {
      res.send("Student deleted successfully");
    } else {
      res.send("Student not found");
    }
  } catch (err) {
    res.status(500).send("Error while deleting");
  }
});
